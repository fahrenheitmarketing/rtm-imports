import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { Jimp } from 'npm:jimp@1.6.0';
import { getBrandGuideText, uploadAttachmentToClickUpTask } from '../../shared/clickup.ts';
import { buildImagePrompt, resizeAndUploadImage, getYoboBottleRefs } from '../../shared/imageRules.ts';

async function runConcurrent(items, fn, concurrency = 4) {
  let index = 0;
  const workers = Array(Math.min(concurrency, items.length)).fill(0).map(async () => {
    while (index < items.length) {
      const i = index++;
      await fn(items[i]);
    }
  });
  await Promise.all(workers);
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { campaignMonth, regenerate, editExisting, dates } = await req.json();
    if (!campaignMonth) {
      return Response.json({ error: 'campaignMonth is required' }, { status: 400 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';

    let posts = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: campaignMonth }, 'scheduled_date', 200);
    if (editExisting) {
      posts = posts.filter((p) => p.image_url);
      if (Array.isArray(dates) && dates.length > 0) {
        posts = posts.filter((p) => dates.includes((p.scheduled_date || '').slice(0, 10)));
      }
    } else if (!regenerate) {
      posts = posts.filter((p) => !p.image_url);
    }

    // EDIT EXISTING MODE: keep the current creatives but change one aspect
    // (e.g. glassware) — one edit per calendar date, shared by all platform
    // siblings of that date so the trio stays in sync.
    if (editExisting) {
      const groups = {};
      for (const p of posts) {
        const key = (p.scheduled_date || '').slice(0, 10);
        (groups[key] = groups[key] || []).push(p);
      }
      const groupList = Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)).map(([date, group]) => ({ date, posts: group }));
      if (groupList.length === 0) {
        return Response.json({ success: true, message: 'No posts with existing images to edit.', edited: 0, failed: 0 });
      }

      const EDIT_INSTRUCTION = `EDIT EXISTING IMAGE — CRITICAL GLASSWARE CORRECTION: The first attached image is the current creative. A previous edit attempt FAILED to fix the glassware, so apply this change aggressively. Recreate this EXACT same scene, composition, subjects, lighting, and mood, changing ONLY the glassware. REMOVE every stemmed glass completely: no wine glasses, no stemware, no coupe glasses, no champagne flutes, no martini glasses, no glasses on stems of any kind — these are FORBIDDEN. Every drinking glass in the scene MUST be a traditional Korean soju glass: a small, short, squat, straight-sided CLEAR tumbler cup, roughly 2 to 4 inches tall, with NO stem, NO taper, flat bottom — the kind served in Korean bars, Korean restaurants, and pocha street-food scenes. If a hand is shown holding or raising a glass, that glass must also be a stemless soju tumbler. Keep everything else in the image identical — same people, food, setting, colors, and bottles.`;

      let edited = 0;
      let failed = 0;
      await runConcurrent(groupList, async ({ posts: group }) => {
        try {
          const primary = group[0];
          const prompt = `${buildImagePrompt({ ...primary, platform: 'facebook' }, brandGuide)} ${EDIT_INSTRUCTION}`;
          const bottleRefs = getYoboBottleRefs(primary);
          const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt, existing_image_urls: [primary.image_url, ...bottleRefs] });
          const safeTopic = (primary.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
          const resizedUrl = await resizeAndUploadImage(base44, Jimp, 'facebook', url, `${primary.id}-core-${safeTopic}`);
          await base44.asServiceRole.entities.SocialPost.bulkUpdate(group.map((p) => ({ id: p.id, image_url: resizedUrl })));
          edited++;
        } catch (e) {
          console.error('image edit failed for date group', e.message);
          failed++;
        }
      }, 3);

      return Response.json({ success: true, mode: 'edit_existing', campaign_month: campaignMonth, core_posts: groupList.length, edited, failed });
    }

    if (posts.length === 0) {
      return Response.json({ success: true, message: 'No posts need image generation.', generated: 0, failed: 0, attached: 0 });
    }

    let generated = 0;
    let failed = 0;
    let attached = 0;

    await runConcurrent(posts, async (post) => {
      try {
        const prompt = buildImagePrompt(post, brandGuide);
        const bottleRefs = getYoboBottleRefs(post);
        const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt, existing_image_urls: bottleRefs.length ? bottleRefs : undefined });
        // Resize to the platform's exact dimensions so the designer receives a correctly-sized creative.
        const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
        const resizedUrl = await resizeAndUploadImage(base44, Jimp, post.platform, url, `${post.id}-${post.platform}-${safeTopic}`);
        await base44.asServiceRole.entities.SocialPost.update(post.id, { image_url: resizedUrl });
        generated++;
        if (post.clickup_task_id) {
          try {
            const filename = `${post.platform}-${post.scheduled_date || 'undated'}-${safeTopic}.jpg`;
            await uploadAttachmentToClickUpTask(base44, post.clickup_task_id, resizedUrl, filename);
            attached++;
          } catch (e) { console.error('attach failed', e.message); }
        }
      } catch (e) {
        console.error('image gen failed for post', post.id, e.message);
        failed++;
      }
    }, 4);

    return Response.json({
      success: true,
      generated,
      failed,
      attached,
      total: posts.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}