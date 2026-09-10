import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { PLATFORM_TONE, PLATFORM_ORDER, CONTENT_RULES, CONTENT_MODEL_RULES, HASHTAG_RULES, appendAiDisclaimer, buildShortLinkCtaInstruction } from '../../shared/scheduleBuilder.ts';
import { buildImagePrompt, IMAGE_PROMPT_INSTRUCTION, getYoboBottleRefs } from '../../shared/imageRules.ts';
import { getBrandProfile, buildBrandIntro, buildAudienceRef } from '../../shared/brandContext.ts';

// Run async tasks with a concurrency cap to avoid overwhelming the image API.
async function runConcurrent(items, fn, concurrency = 4) {
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

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { campaignMonth, preserveTopics = false } = await req.json();
    if (!campaignMonth) {
      return Response.json({ error: 'campaignMonth is required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const settings = settingsList[0];
    if (!settings) {
      return Response.json({ error: 'Configure your social media settings first' }, { status: 400 });
    }
    const brandGuide = await getBrandGuideText(base44, settings);
    const brandProfile = await getBrandProfile(base44);
    const audienceRef = buildAudienceRef(brandProfile);

    // Only non-approved posts are recreated; approved ones are left untouched.
    const all = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 500);
    const targets = all.filter((p) => p.status !== 'approved');
    if (targets.length === 0) {
      return Response.json({ success: true, message: 'No non-approved posts to regenerate.', regenerated: 0 });
    }

    // Avoid repeating topics from approved posts and other months.
    const targetIds = new Set(targets.map((p) => p.id));
    const usedTopics = [...new Set(all.filter((p) => !targetIds.has(p.id)).map((p) => p.topic).filter(Boolean))].slice(0, 80);

    // Group targets by calendar date — each date is ONE core post shared
    // across its platforms, regenerated as slight platform variations.
    const groups = {};
    for (const p of targets) {
      const key = (p.scheduled_date || '').slice(0, 10);
      (groups[key] = groups[key] || []).push(p);
    }
    const dateKeys = Object.keys(groups).sort();

    const ctaBlock = PLATFORM_ORDER.map((pl) =>
      `### ${pl}\nTone: ${PLATFORM_TONE[pl] || 'friendly, premium, and welcoming'}\n${buildShortLinkCtaInstruction(settings, pl) || '(no short link CTA configured for this platform)'}`
    ).join('\n\n');

    const hashtagBlock = PLATFORM_ORDER.map((pl) => `- ${pl}: ${HASHTAG_RULES[pl]}`).join('\n');

    const genRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `${buildBrandIntro(brandProfile)}

Brand Reference Guide (must strictly follow):
${brandGuide}

${CONTENT_MODEL_RULES}

Platform tone and short-link CTA rules:
${ctaBlock}

Hashtag rules (append hashtags on the final line of each post):
${hashtagBlock}

${preserveTopics ? `REGENERATION MODE — KEEP TOPICS: For each date, keep the given topic EXACTLY as written. Draw the core message from the existing copy provided for that date, then express that ONE message nearly identically on every platform per the content model rules, applying each platform's hashtag and CTA rules. Do NOT invent new claims, statistics, or links — reuse the substance and any short links from the existing copy.` : `Topics already used in approved posts or other months — do NOT repeat these or create near-duplicates:
${usedTopics.map((t) => `- ${t}`).join('\n') || '(none)'}`}

${CONTENT_RULES}

${preserveTopics ? 'Rewrite ONE core post for EACH date below, keeping its topic exactly.' : 'Regenerate ONE fresh core post for EACH date below, in the same order. Produce a NEW, different topic per date (not the previous ones).'}
${dateKeys.map((d, i) => {
  const platforms = [...new Set(groups[d].map((p) => p.platform))].join(', ');
  if (preserveTopics) {
    const existingCopy = groups[d].map((p) => `   - ${p.platform}: ${(p.content || '').trim()}`).join('\n');
    return `${i + 1}. ${d} — platforms: ${platforms}
   Topic (KEEP EXACTLY): "${groups[d][0].topic || 'n/a'}"
   Existing copy to draw the core message from:
${existingCopy}`;
  }
  return `${i + 1}. ${d} — platforms: ${platforms} (previous topics to avoid: ${groups[d].map((p) => `"${p.topic || 'n/a'}"`).join('; ')})`;
}).join('\n')}

For each date return: date, topic (${preserveTopics ? 'the SAME topic given for that date' : 'ONE short new theme shared by ALL platforms'}), facebook_content, instagram_content, linkedin_content (each expressing the SAME core message nearly identically, applying only that platform's hashtag rule, CTA rule, and light tone touch-ups), image_prompt (${IMAGE_PROMPT_INSTRUCTION}${audienceRef ? ' ' + audienceRef : ''}).`,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          posts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                date: { type: 'string' },
                topic: { type: 'string' },
                facebook_content: { type: 'string' },
                instagram_content: { type: 'string' },
                linkedin_content: { type: 'string' },
                image_prompt: { type: 'string' },
              },
              required: ['date', 'topic', 'facebook_content', 'instagram_content', 'linkedin_content', 'image_prompt'],
            },
          },
        },
        required: ['posts'],
      },
    });

    const byDate = {};
    for (const r of (genRes.posts || [])) byDate[(r.date || '').slice(0, 10)] = r;

    const imageTasks = [];
    let regenerated = 0;
    for (const dateKey of dateKeys) {
      const r = byDate[dateKey];
      if (!r || !r.topic) continue;
      let variantIndex = 0;
      for (const post of groups[dateKey]) {
        const variant = r[`${post.platform}_content`];
        if (!variant) continue;
        await base44.asServiceRole.entities.SocialPost.update(post.id, {
          topic: r.topic,
          content: appendAiDisclaimer(variant, variantIndex++),
          brand_compliance_notes: r.image_prompt,
          status: 'pending',
          final_image_url: null,
          resized_image_url: null,
          postiz_post_id: null,
        });
        regenerated++;
      }
      imageTasks.push({ core: r, posts: groups[dateKey] });
    }

    // One image per core date (4:5 Facebook/Instagram size — LinkedIn gets the
    // same visual cover-cropped to 16:9 at resize time), shared across the date's posts.
    let imagesGenerated = 0;
    let imagesFailed = 0;
    await runConcurrent(imageTasks, async ({ core, posts }) => {
      try {
        const imgPost = { platform: 'facebook', topic: core.topic, content: core.facebook_content, image_prompt: core.image_prompt };
        const prompt = buildImagePrompt(imgPost, brandGuide, audienceRef);
        const bottleRefs = getYoboBottleRefs(imgPost);
        const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt, existing_image_urls: bottleRefs.length ? bottleRefs : undefined });
        await base44.asServiceRole.entities.SocialPost.bulkUpdate(posts.map((p) => ({ id: p.id, image_url: url })));
        imagesGenerated++;
      } catch (e) {
        console.error('image gen failed for core post', core.topic, e.message);
        imagesFailed++;
      }
    }, 3);

    return Response.json({
      success: true,
      campaign_month: campaignMonth,
      core_posts: imageTasks.length,
      regenerated,
      images_generated: imagesGenerated,
      images_failed: imagesFailed,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}