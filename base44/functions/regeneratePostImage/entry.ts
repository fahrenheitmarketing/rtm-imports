import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { Jimp } from 'npm:jimp@1.6.0';
import { getBrandGuideText } from '../../shared/clickup.ts';
import { buildImagePrompt, resizeAndUploadImage, getYoboBottleRefs } from '../../shared/imageRules.ts';
import { getBrandProfile, buildAudienceRef } from '../../shared/brandContext.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { postId, instruction } = await req.json();
    if (!postId) {
      return Response.json({ error: 'postId is required' }, { status: 400 });
    }

    const post = await base44.asServiceRole.entities.SocialPost.get(postId);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const settingsList = await base44.asServiceRole.entities.SocialMediaSettings.list();
    const brandGuide = settingsList[0] ? await getBrandGuideText(base44, settingsList[0]) : '';
    const brandProfile = await getBrandProfile(base44);
    const audienceRef = buildAudienceRef(brandProfile);

    // Shared core-post image: build the prompt at the 4:5 Facebook/Instagram
    // size — LinkedIn gets its 16:9 cover-crop later at resize/scheduling time.
    const prompt = `${buildImagePrompt({ ...post, platform: 'facebook' }, brandGuide, audienceRef)}${instruction ? ` Additional instruction: ${instruction}` : ''}`;

    const bottleRefs = getYoboBottleRefs(post);
    const { url } = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt, existing_image_urls: bottleRefs.length ? bottleRefs : undefined });

    // Resize once to the shared 4:5 dimensions so every platform variant of
    // this core post receives the same correctly-sized creative.
    const safeTopic = (post.topic || 'creative').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().slice(0, 40);
    const resizedUrl = await resizeAndUploadImage(base44, Jimp, 'facebook', url, `${postId}-core-${safeTopic}`);

    // Apply the new image to this post AND its platform siblings (same campaign
    // month + same calendar date) so the whole trio stays in sync.
    const dateKey = (post.scheduled_date || '').slice(0, 10);
    let targets = [post];
    if (post.campaign_month && dateKey) {
      const monthPosts = await base44.asServiceRole.entities.SocialPost.filter({ campaign_month: post.campaign_month }, 'scheduled_date', 200);
      targets = monthPosts.filter((p) => (p.scheduled_date || '').slice(0, 10) === dateKey);
      if (targets.length === 0) targets = [post];
    }
    await base44.asServiceRole.entities.SocialPost.bulkUpdate(targets.map((p) => ({ id: p.id, image_url: resizedUrl })));

    return Response.json({
      success: true,
      image_url: resizedUrl,
      updated_posts: targets.map((p) => ({ id: p.id, platform: p.platform })),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}