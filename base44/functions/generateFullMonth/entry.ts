import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { PLATFORM_TONE, PLATFORM_ORDER, buildSchedule, CONTENT_RULES, HASHTAG_RULES, appendAiDisclaimer, buildShortLinkCtaInstruction } from '../../shared/scheduleBuilder.ts';
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

    const { month, year } = await req.json();
    if (!month || !year) {
      return Response.json({ error: 'month and year are required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const settings = settingsList[0];
    if (!settings || !settings.clickup_list_id) {
      return Response.json({ error: 'Configure your ClickUp list ID in Settings first' }, { status: 400 });
    }

    const brandGuide = await getBrandGuideText(base44, settings);
    const brandProfile = await getBrandProfile(base44);
    const audienceRef = buildAudienceRef(brandProfile);

    // Fetch topics used in previous months to avoid repetition
    const existingPosts = await base44.asServiceRole.entities.SocialPost.filter({}, 'scheduled_date', 500);
    const usedTopics = [...new Set(existingPosts.map((p) => p.topic).filter(Boolean))].slice(0, 80);

    // 1. Research trends
    const trendsRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `List 8 currently high-performing content trends/topics for premium Asian beverage brands (soju, sake, Korean and Japanese drinks) to post about on social media, covering product highlights, K-culture lifestyle, food pairings, retail and wholesale trade topics, and responsible adult enjoyment. Keep each topic to one short line, trade- and consumer-friendly (no jargon).`,
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: { topics: { type: 'array', items: { type: 'string' } } },
        required: ['topics'],
      },
    });
    const topics = trendsRes.topics || [];

    // 2. Build the schedule and collapse it into CORE dates (two per week).
    // Each core date = ONE post published on all platforms as slight variations.
    const schedule = buildSchedule(month, year);
    const slotMap = {}; // `${date}|${platform}` -> full ISO datetime
    const dateSet = new Set();
    for (const s of schedule) {
      slotMap[`${s.date.slice(0, 10)}|${s.platform}`] = s.date;
      dateSet.add(s.date.slice(0, 10));
    }
    const coreDates = [...dateSet].sort();
    const monthName = new Date(Date.UTC(year, month - 1, 1)).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const campaignMonth = `${monthName} ${year}`;

    // 3. Generate the core posts (one per date) with platform variations in one call
    const genRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `${buildBrandIntro(brandProfile)}

Brand Reference Guide (must strictly follow):
${brandGuide}

Trending topics to draw from:
${topics.map((t) => `- ${t}`).join('\n')}

Topics already used in previous months — do NOT repeat these or create near-duplicates:
${usedTopics.map((t) => `- ${t}`).join('\n')}

CONTENT MODEL — IMPORTANT: Each calendar date below is ONE core post that gets published on all three platforms as slight variations of the SAME message. Do NOT create separate unique posts per platform. Every platform's copy must cover the same topic and the same core facts, only adapted to that platform's audience and format.

Core dates (two per week):
${coreDates.map((d, i) => `${i + 1}. ${d}`).join('\n')}

Platform tone/identity rules:
${PLATFORM_ORDER.map((pl) => `- ${pl}: ${PLATFORM_TONE[pl]}`).join('\n')}

Hashtag rules (append hashtags on the final line of each post):
${PLATFORM_ORDER.map((pl) => `- ${pl}: ${HASHTAG_RULES[pl]}`).join('\n')}

Short link CTA rules (if no rule is given for a platform, do NOT include any URL in that platform's posts):
${PLATFORM_ORDER.map((pl) => buildShortLinkCtaInstruction(settings, pl)).filter(Boolean).join('\n') || 'No short links configured — do not include any URLs.'}

${CONTENT_RULES}

For each core date return: date, topic (ONE short theme shared by ALL platforms), facebook_content, instagram_content, linkedin_content (each a platform-specific variation of the same core message, applying that platform's tone, hashtag rule, and CTA rule), image_prompt (${IMAGE_PROMPT_INSTRUCTION}${audienceRef ? ' ' + audienceRef : ''}).`,
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

    const cores = (genRes.posts || []).filter((c) => c.topic && c.image_prompt && coreDates.includes((c.date || '').slice(0, 10)));

    // 4. Create one SocialPost record per platform per core date.
    const records = [];
    const coreGroups = []; // { core, indices } — indices into `records`
    for (const [i, core] of cores.entries()) {
      const dateKey = (core.date || '').slice(0, 10);
      const indices = [];
      for (const pl of PLATFORM_ORDER) {
        const when = slotMap[`${dateKey}|${pl}`];
        if (!when) continue;
        records.push({
          platform: pl,
          topic: core.topic,
          content: appendAiDisclaimer(core[`${pl}_content`] || '', i),
          status: 'pending',
          scheduled_date: when,
          campaign_month: campaignMonth,
          clickup_list_id: settings.clickup_list_id,
          brand_compliance_notes: core.image_prompt,
        });
        indices.push(records.length - 1);
      }
      coreGroups.push({ core, indices });
    }
    const created = await base44.asServiceRole.entities.SocialPost.bulkCreate(records);

    // 5. Generate ONE image per core post (4:5, the Facebook/Instagram size —
    // LinkedIn gets the same visual cover-cropped to 16:9 at resize time) and
    // share it across that core post's platform records.
    let imagesGenerated = 0;
    let imagesFailed = 0;

    await runConcurrent(coreGroups, async ({ core, indices }) => {
      try {
        const imgPost = { platform: 'facebook', topic: core.topic, content: core.facebook_content, image_prompt: core.image_prompt };
        const prompt = buildImagePrompt(imgPost, brandGuide, audienceRef);
        const bottleRefs = getYoboBottleRefs(imgPost);
        const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt, existing_image_urls: bottleRefs.length ? bottleRefs : undefined });
        await base44.asServiceRole.entities.SocialPost.bulkUpdate(indices.map((idx) => ({ id: created[idx].id, image_url: url })));
        imagesGenerated++;
      } catch (imgErr) {
        console.error('Image generation failed for core post', core.topic, imgErr.message);
        imagesFailed++;
      }
    }, 3);

    return Response.json({
      success: true,
      campaign_month: campaignMonth,
      core_posts: cores.length,
      posts_created: created.length,
      images_generated: imagesGenerated,
      images_failed: imagesFailed,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}