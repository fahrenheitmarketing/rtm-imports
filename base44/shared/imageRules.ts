// base44/shared/imageRules.ts
// Centralized brand-compliant image rules for all social media image generation.
// Enforced across every image prompt — no health claims, no underage or
// excessive-drinking imagery, no invented brand marks in generated imagery.

export const PLATFORM_DIMENSIONS = {
  facebook: { width: 1080, height: 1350, hint: 'composed for a 4:5 portrait crop — keep key subjects centered' },
  instagram: { width: 1080, height: 1350, hint: 'composed for a 4:5 portrait crop — keep key subjects centered' },
  twitter: { width: 1600, height: 900, hint: 'composed for a 16:9 landscape crop — keep key subjects centered horizontally' },
  linkedin: { width: 1600, height: 900, hint: 'composed for a 16:9 landscape crop — keep key subjects centered horizontally' },
  google_business: { width: 1200, height: 900, hint: 'composed for a 4:3 landscape crop — keep key subjects centered' },
};

// Cover-crops an image to the platform's exact dimensions and uploads the
// result, returning the hosted file_url. Used right after AI generation so
// creatives arrive at ClickUp already correctly sized.
// Jimp is passed in by the caller (entry file) because its default export
// doesn't resolve correctly when imported from a shared module.
export async function resizeAndUploadImage(base44, Jimp, platform, imageUrl, filenameBase) {
  const dims = PLATFORM_DIMENSIONS[platform];
  if (!dims) throw new Error(`Unknown platform: ${platform}`);
  let image;
  try {
    image = await Jimp.read(imageUrl);
  } catch (e) { throw new Error(`Jimp.read failed: ${e.message}`); }
  try {
    image.cover({ w: dims.width, h: dims.height });
  } catch (e) { throw new Error(`Jimp.cover failed: ${e.message}`); }
  let buffer;
  try {
    buffer = await image.getBuffer('image/jpeg');
  } catch (e) { throw new Error(`Jimp.getBuffer failed: ${e.message} | buffer type: ${typeof buffer}`); }
  try {
    const file = new File([buffer], `${filenameBase}.jpg`, { type: 'image/jpeg' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });
    return result.file_url;
  } catch (e) { throw new Error(`UploadFile failed: ${e.message}`); }
}

// RTM Imports moodboard (rtm-imports-wireframe.fmkt.agency/moodboard) —
// the visual basis for all generated social post imagery.
export const MOODBOARD_STYLE = `MOODBOARD STYLE DIRECTION (must follow): Mood — bold, refined, industrial, trustworthy, global, warm, premium, authoritative, clean, sophisticated, grounded, timeless, approachable. Palette — deep midnight (#1C2026) and charcoal (#2E3440) backgrounds with slate (#6B7280) mid-tones, warm gold (#C5913A) and amber (#D4A24E) accent lighting, ivory (#F9F6F0) highlights. Favor moody, cinematic low-key lighting with warm gold tones on dark backgrounds — premium bar atmospheres, cellar heritage textures, stocked high-end retail shelves, sophisticated dining scenes — rather than bright airy stock-photo looks. Design principles: Authority (confident subject placement, commanding focal point), Trust (clean, professional composition), Warmth (natural textures, golden light, human warmth), Clarity (generous negative space, one clear focal subject).`;

export const IMAGE_FORBIDDEN_SUFFIX = `CRITICAL BRAND RULES — ABSOLUTELY FORBIDDEN IN THE IMAGE: No one who appears under the legal drinking age, no excessive drinking, drunkenness, or out-of-control party scenes, no medical or health-treatment settings, no invented brand labels, logos, or competitor products, ABSOLUTELY NO TEXT OF ANY KIND in the image — no words, letters, numbers, captions, quotes, headlines, watermarks, readable signage, or labels with legible writing; any bottles or packages must show blank/unreadable labels. If the post copy references the team, warehouse, or "behind the scenes", you MUST NOT depict offices, warehouses, or logistics clutter — instead use a relevant visual metaphor (a beautifully arranged product flat-lay, a stocked retail shelf in morning light, a set table for a shared meal, a city café scene, or a "raising a glass together" celebration scene). Ensure the image is anatomically correct and logically coherent — no extra limbs, no distorted faces, no physically impossible objects. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. When people are shown, feature adults of legal drinking age enjoying the moment responsibly.`;

export const IMAGE_PROMPT_INSTRUCTION = `a short, SPECIFIC description of a brand-compliant, premium, bright, lifestyle photo that VISUALLY REPRESENTS the post's content/copy. The image MUST directly reflect what the post is about so a reader who reads the copy finds the image naturally relevant — e.g., if the copy is about food pairings, show a beautifully plated Korean meal beside the drink category; if it's about a product category highlight, show a premium retail shelf or flat-lay of that category; if it's about K-culture trends, show a trendy Korean café or street-food scene; if it's about wholesale distribution, show a well-stocked, tidy retail shelf scene. CRITICAL: if the post is about the team, warehouse, or "behind the scenes", do NOT depict offices, warehouses, or logistics clutter — instead describe a relevant visual metaphor like a stocked retail shelf in morning light, a set table for a shared meal, or a "raising a glass together" scene. Do NOT default to generic "friends partying" — match the specific message. Describe the scene in the brand moodboard style: moody, cinematic, premium — dark midnight/charcoal settings with warm gold accent lighting, natural textures, generous negative space; avoid bright airy stock-photo looks. Ensure the image is anatomically correct and logically coherent — no extra limbs, no distorted faces, no physically impossible objects. Prefer simple, clean compositions with at most one or two people to avoid AI artifacts. When people are shown, feature adults of legal drinking age enjoying the moment responsibly. ABSOLUTELY FORBIDDEN: no minors, no excessive drinking or drunkenness, no medical settings, no invented brand logos, and ABSOLUTELY NO TEXT OF ANY KIND — the image must contain no words, letters, numbers, captions, headlines, watermarks, readable signage, or legible label writing. Do NOT describe a lone bottle on a surface as the main subject — prefer a lived-in lifestyle scene (adults sharing a meal or a toast, a high-end bar moment, a stocked retail shelf, a trendy Korean café or dining scene) where any bottle is part of a wider scene, never the isolated focal point`;

// Authentic Yobo bottle shots (source: yobospirits.com/collections/all-products).
// Matched by keyword against a post's topic/copy/brief and passed to image
// generation as reference images so Yobo/Soju posts depict the REAL bottles.
export const YOBO_BOTTLE_PRODUCTS = [
  { line: 'yobo', label: 'Yobo Soju Luxe 375ml', keywords: ['yobo', 'soju'], url: 'https://yobospirits.com/cdn/shop/files/luxe-375.jpg?v=1695306100&width=1200' },
  { line: 'yobo', label: 'Yobo Soju Luxe 750ml', keywords: ['luxe'], url: 'https://yobospirits.com/cdn/shop/files/luxe-750.jpg?v=1695306071&width=1200' },
  { line: 'ktown', label: 'KTOWN Soju Yuzu + Elderflower', keywords: ['yuzu', 'elderflower', 'ktown', 'k-town', 'k town'], url: 'https://yobospirits.com/cdn/shop/files/KTOWN-Yuzu.jpg?v=1694531749&width=1200' },
  { line: 'ktown', label: 'KTOWN Soju Korean Pear + Perilla', keywords: ['korean pear', 'perilla', 'ktown', 'k-town', 'k town'], url: 'https://yobospirits.com/cdn/shop/files/KTOWN-Pear.jpg?v=1694532022&width=1200' },
  { line: 'ktown', label: 'KTOWN Soju Peach + Chili', keywords: ['peach', 'chili', 'ktown', 'k-town', 'k town'], url: 'https://yobospirits.com/cdn/shop/files/KTOWN-Peach.jpg?v=1694532098&width=1200' },
  { line: 'ktown', label: 'KTOWN Soju Grape + Ginger', keywords: ['grape', 'ginger', 'ktown', 'k-town', 'k town'], url: 'https://yobospirits.com/cdn/shop/files/KTOWN-Grape.jpg?v=1694531948&width=1200' },
  { line: 'ktown', label: 'KTOWN Soju Watermelon Cooler', keywords: ['watermelon', 'ktown', 'k-town', 'k town'], url: 'https://yobospirits.com/cdn/shop/files/KTOWN_newflavors_Watermelon_0.jpg?v=1784643956&width=1200' },
  { line: 'ktown', label: 'KTOWN Soju Tropical Colada', keywords: ['tropical', 'colada', 'coconut', 'pineapple', 'ktown', 'k-town', 'k town'], url: 'https://yobospirits.com/cdn/shop/files/KTOWN_newflavors_Tropical_0.jpg?v=1784644226&width=1200' },
  { line: 'ktown', label: 'KTOWN Soju Dalgona Coffee', keywords: ['dalgona', 'coffee', 'ktown', 'k-town', 'k town'], url: 'https://yobospirits.com/cdn/shop/files/KTOWN_newflavors_Coffee_0.jpg?v=1784644594&width=1200' },
  { line: 'ktown', label: 'KTOWN Soju Blueberry Lychee', keywords: ['blueberry', 'lychee', 'ktown', 'k-town', 'k town'], url: 'https://yobospirits.com/cdn/shop/files/KTOWN_newflavors_Blueberry_0.jpg?v=1784644796&width=1200' },
  { line: 'kish', label: 'Kish Earth — Smoked Mushroom, Umami', keywords: ['kish', 'mushroom', 'umami'], url: 'https://yobospirits.com/cdn/shop/files/KishProductEarth.jpg?v=1728861586&width=1200' },
  { line: 'kish', label: 'Kish Shine — Kumquat, Rose', keywords: ['kumquat'], url: 'https://yobospirits.com/cdn/shop/files/KishProductShine.jpg?v=1728861685&width=1200' },
  { line: 'kish', label: 'Kish Bliss — Sour Cherry, Licorice', keywords: ['sour cherry', 'licorice'], url: 'https://yobospirits.com/cdn/shop/files/KishProductBliss.jpg?v=1728861653&width=1200' },
  { line: 'kish', label: 'Kish Seoul — Hibiscus, Lemon Balm', keywords: ['hibiscus', 'lemon balm'], url: 'https://yobospirits.com/cdn/shop/files/KishProductSeoul_bfc9c647-9ad7-4651-9e68-bb18396c8da7.jpg?v=1728861548&width=1200' },
];

// Returns up to 3 authentic bottle image URLs relevant to this post, or [] if
// the post doesn't mention Yobo/Soju/any Yobo family product.
// When the post references KTOWN (in any spelling), only KTOWN collection
// bottles (yobospirits.com/collections/k-town-soju) are used as references.
export function getYoboBottleRefs(post) {
  const text = `${post.topic || ''} ${post.content || ''} ${post.image_prompt || post.brand_compliance_notes || ''}`.toLowerCase();
  const isKtown = text.includes('ktown') || text.includes('k-town') || text.includes('k town');
  const urls = [];
  // Flavor-specific matches first, so a named flavor beats the generic set.
  const flavorFirst = (a, b) => (b.keywords.some((k) => !['ktown', 'k-town', 'k town'].includes(k) && text.includes(k)) ? 1 : -1);
  const products = isKtown ? YOBO_BOTTLE_PRODUCTS.filter((p) => p.line === 'ktown') : YOBO_BOTTLE_PRODUCTS;
  for (const product of [...products].sort(flavorFirst)) {
    if (product.keywords.some((k) => text.includes(k)) && !urls.includes(product.url)) {
      urls.push(product.url);
      if (urls.length >= 3) break;
    }
  }
  return urls;
}

export const YOBO_REF_SUFFIX = `AUTHENTIC PRODUCT EXCEPTION: reference photos of the actual Yobo/KTOWN/Kish bottles are attached. You MUST depict the EXACT bottles shown in the attached reference images — reproduce their real shapes, colors, and label designs faithfully; do NOT alter, redesign, or invent bottles or labels for them. The "blank/unreadable labels" rule applies only to any OTHER bottles in the scene, not to these authentic products.`;

export const IMAGE_SUBJECT_RULE = `IMAGE SUBJECT RULE: Do NOT make a lone bottle or product-only shot the main subject — a single bottle on a surface is NOT acceptable unless the brief explicitly calls for a product highlight. Prefer a lived-in lifestyle scene where the beverage plays a supporting role: adults of legal drinking age sharing a meal or a toast, a high-end bar moment, a stocked and tidy retail shelf, a trendy Korean café or dining scene, a beautifully set table. Any bottles in the scene must be part of a wider composition with people, food, or ambiance — not the isolated focal point.`;

export function buildImagePrompt(post, brandGuide, audienceRef) {
  const brief = post.image_prompt || post.brand_compliance_notes || '';
  const imageDirection = brief ? `Visual direction from creative brief: ${brief}. ` : '';
  const dims = PLATFORM_DIMENSIONS[post.platform];
  const cropHint = dims ? `The image will be cropped to ${dims.width}x${dims.height}px — ${dims.hint}. ` : '';
  const yoboRefs = getYoboBottleRefs(post);
  return `${imageDirection}A premium lifestyle photo for a ${post.platform} social media post by an Asian beverage importer about "${post.topic}". The post copy is: "${post.content}". Create an image that VISUALLY REPRESENTS this content — the image must directly reflect the message, not be a generic stock photo. ${cropHint}${MOODBOARD_STYLE} ${IMAGE_FORBIDDEN_SUFFIX} ${IMAGE_SUBJECT_RULE}${yoboRefs.length ? ` ${YOBO_REF_SUFFIX}` : ''} ${brandGuide}${audienceRef ? ' ' + audienceRef : ''}`;
}