import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { PLATFORM_TONE, HASHTAG_RULES, CONTENT_RULES, AI_DISCLAIMERS, appendAiDisclaimer } from '../../shared/scheduleBuilder.ts';
import { IMAGE_PROMPT_INSTRUCTION } from '../../shared/imageRules.ts';

// One-off maintenance function: converts an existing campaign month from
// "unique post per platform per date" to the unified core-post model —
// each calendar date becomes ONE topic with slight platform-specific copy
// variations and ONE shared image (the date's 4:5 Facebook/Instagram image).

async function runConcurrent(items, fn, concurrency = 3) {
  const results = new Array(items.length);
  let index = 0;
  const workers = Array(Math.min(concurrency, items.length)).fill(0).map(async () => {
    while (index < items.length) {
      const i = index++;
      try { results[i] = await fn(items[i]); } catch (e) { results[i] = { error: e.message }; }
    }
  });
  await Promise.all(workers);
  return results;
}

function stripDisclaimer(text) {
  let out = String(text || '');
  for (const d of AI_DISCLAIMERS) {
    out = out.split(d).join('');
  }
  return out.trim();
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { campaignMonth } = await req.json();
    if (!campaignMonth) {
      return Response.json({ error: 'campaignMonth is required' }, { status: 400 });
    }

    const posts = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 500);
    if (posts.length === 0) {
      return Response.json({ error: 'No posts found for this campaign month' }, { status: 404 });
    }

    // Group by calendar date — each date becomes one core post.
    const groups = {};
    for (const p of posts) {
      const key = (p.scheduled_date || '').slice(0, 10);
      (groups[key] = groups[key] || []).push(p);
    }
    const dateKeys = Object.keys(groups).sort();

    // Unify each date's posts into one topic + platform variations.
    const results = await runConcurrent(dateKeys, async (dateKey) => {
      const group = groups[dateKey];
      const existing = group.map((p) => ({
        platform: p.platform,
        topic: p.topic || '',
        content: stripDisclaimer(p.content),
      }));

      const gen = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `Unify the social media posts below into ONE core post concept shared across platforms. The posts for this date currently each have their own angle on the same general theme; they must become slight variations of a single post.

${CONTENT_RULES}

Platform tone rules:
${group.map((p) => `- ${p.platform}: ${PLATFORM_TONE[p.platform] || 'friendly, premium, and welcoming'}`).join('\n')}

Hashtag rules (append hashtags on the final line of each post):
${group.map((p) => `- ${p.platform}: ${HASHTAG_RULES[p.platform] || ''}`).join('\n')}

Existing posts for ${dateKey}:
${existing.map((e) => `- ${e.platform} — topic: "${e.topic}"\n  copy:\n${e.content}`).join('\n\n')}

Produce ONE unified concept. Requirements:
1. topic — a single short theme ALL platforms share (merge the existing topics into the strongest one).
2. The SAME core message and facts for every platform — do NOT invent new claims, statistics, or links. Reuse exactly the substance of the existing copy.
3. facebook_content — conversational, community/trade-friendly. If the existing Facebook copy ends with a short link URL, copy that URL exactly at the end. 0-2 hashtags on the final line.
4. instagram_content — punchy, visual, trendy. NO URLs in the copy (at most a "link in bio" style line if the existing Instagram copy has one). 3-5 hashtags on the final line.
5. linkedin_content — professional B2B voice for trade partners and industry peers. If the existing LinkedIn copy ends with a short link URL, copy that URL exactly at the end. 3-5 industry hashtags on the final line.
6. image_prompt — ONE image brief representing the unified topic (${IMAGE_PROMPT_INSTRUCTION}). Reuse the strongest existing visual direction for this date.

Each platform's copy must read as a slight variation of the same post, tailored to that platform's audience.`,
        model: 'gemini_3_flash',
        response_json_schema: {
          type: 'object',
          properties: {
            topic: { type: 'string' },
            facebook_content: { type: 'string' },
            instagram_content: { type: 'string' },
            linkedin_content: { type: 'string' },
            image_prompt: { type: 'string' },
          },
          required: ['topic', 'facebook_content', 'instagram_content', 'linkedin_content', 'image_prompt'],
        },
      });
      return { dateKey, group, gen };
    }, 3);

    let updated = 0;
    let failed = 0;
    for (const r of results) {
      if (!r || r.error || !r.gen || !r.gen.topic) {
        console.error('Unify failed for date', r && r.dateKey, r && r.error);
        failed++;
        continue;
      }
      const gen = r.gen;
      // One shared image per date: prefer the 4:5 Facebook/Instagram image.
      const sharedPost = r.group.find((p) => p.platform === 'facebook' && p.image_url)
        || r.group.find((p) => p.platform === 'instagram' && p.image_url)
        || r.group.find((p) => p.image_url);
      const sharedImage = sharedPost ? sharedPost.image_url : null;

      let variantIndex = 0;
      for (const post of r.group) {
        const variant = gen[`${post.platform}_content`];
        const content = variant ? appendAiDisclaimer(variant, variantIndex++) : post.content;
        await base44.asServiceRole.entities.SocialPost.update(post.id, {
          topic: gen.topic,
          content,
          brand_compliance_notes: gen.image_prompt || post.brand_compliance_notes,
          image_url: sharedImage || post.image_url,
          status: 'pending',
          final_image_url: null,
          resized_image_url: null,
          postiz_post_id: null,
        });
        updated++;
      }
    }

    return Response.json({
      success: true,
      campaign_month: campaignMonth,
      core_dates: dateKeys.length,
      posts_updated: updated,
      dates_failed: failed,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}