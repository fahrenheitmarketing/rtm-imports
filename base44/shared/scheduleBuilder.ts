// Shared scheduling constants and builders for social media content generation.
// Used by generateSocialMediaContent (copy-only) and generateFullMonth (end-to-end with images).

export const PLATFORM_TONE = {
  facebook: "Conversational, community-focused, and trade-partner friendly.",
  instagram: "Trendy, visual-first, premium product and K-culture moments, punchy hooks, no links in the copy.",
  twitter: "Professional thought-leadership, beverage industry insights, import and distribution updates.",
  linkedin: "Professional B2B voice for trade partners, distributors, and industry peers — wholesale, import, retail, and category insights.",
  google_business: "Local business updates, clear calls to action, trade and retail partner focused.",
};

export const PLATFORM_LABEL = {
  facebook: "FACEBOOK",
  instagram: "INSTAGRAM",
  twitter: "TWITTER / X",
  linkedin: "LINKEDIN",
  google_business: "GOOGLE BUSINESS",
};

export const PLATFORM_ORDER = ['facebook', 'instagram', 'linkedin'];

const SHORT_LINK_PAGE_LABELS = {
  '/': 'Home page',
  '/about': 'About',
  '/services': 'Services',
  '/services/asian-beverage': 'Asian Beverage Sourcing',
  '/services/custom-labels': 'Custom Labels',
  '/services/compliance': 'Compliance & Import Support',
  '/portfolio': 'Portfolio',
  '/wholesalers': 'Wholesalers',
  '/suppliers': 'Supplier Portal',
  '/news': 'News & Insights',
  '/contact': 'Contact Us',
};

// Build a per-platform short-link CTA instruction for the LLM.
// Returns '' if no short links are configured for the platform.
export function buildShortLinkCtaInstruction(settings, platform) {
  if (platform === 'google_business') return '';
  const links = (settings && Array.isArray(settings.short_links)) ? settings.short_links : [];
  const platformLinks = links.filter((l) => l.platform === platform || l.platform === 'all');
  if (platformLinks.length === 0) return '';
  const list = platformLinks
    .map((l) => `- ${SHORT_LINK_PAGE_LABELS[l.page] || l.page}: ${l.url}`)
    .join('\n');
  if (platform === 'instagram') {
    return `SHORT LINK CTA RULE (instagram): Do NOT paste any URL in the copy. If relevant to the topic, end with a soft call-to-action like "Tap the link in our bio to learn more" or "Link in bio for details." Pick the most relevant landing page above as the bio-link target, but do NOT include the URL in the copy text.`;
  }
  return `SHORT LINK CTA RULE: End the post with a concise, natural call-to-action linking to the single most relevant landing page for the post's topic. Choose ONE short link from this list (pick the best topical match):
${list}
Paste the short link URL as-is at the end of the post. Do not add UTM params, do not repeat the URL, and only include a link if one is topically relevant.`;
}

export const GBP_CTA_PAGES = [
  { path: '/', label: 'Home page' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/services/asian-beverage', label: 'Asian Beverage Sourcing' },
  { path: '/services/custom-labels', label: 'Custom Labels' },
  { path: '/services/compliance', label: 'Compliance & Import Support' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/wholesalers', label: 'Wholesalers' },
  { path: '/suppliers', label: 'Supplier Portal' },
  { path: '/news', label: 'News & Insights' },
  { path: '/contact', label: 'Contact Us' },
];

export const GBP_BUTTON_TYPES = ['LEARN_MORE', 'BOOK', 'GET_OFFER', 'CALL', 'SIGN_UP'];

export function buildGbpCtaInstruction() {
  const pageList = GBP_CTA_PAGES.map((p) => `- ${p.path} (${p.label})`).join('\n');
  return `GBP CTA RULE (google_business): Do NOT include any URL in the post copy. Instead, choose the single most relevant landing page and the best GMB button type for the post's topic.
Landing pages:
${pageList}
Button types: LEARN_MORE (educational/general info), GET_OFFER (specials/discounts), BOOK (appointment-focused), CALL (contact/phone-focused), SIGN_UP (newsletter/new customer sign-up).
Return cta_page_path (one of the paths above) and cta_button_type (one of the button types above) as separate fields. The copy itself must never contain a URL.`;
}

export const CONTENT_RULES = `CONTENT RULES — strictly enforced: Do NOT make any health, medical, or therapeutic claims about any beverage. No claims that a drink "improves health," "aids digestion," "cures hangovers," "reduces stress," "boosts immunity," or any similar definitive statement. Do NOT promise results, outcomes, or benefits from consuming any product. Frame everything as lifestyle, culture, food-pairing, and trade-focused content using soft language like "pairs well with," "many people enjoy," "consider," "a great match for," or "a popular choice." Never market to or depict anyone under the legal drinking age, never depict or encourage excessive consumption, and never include specific pricing or discount guarantees. Keep content informational, conversational, and premium in tone.

STYLE RULES: Use the em dash ("—") sparingly — at most once per post, and prefer regular punctuation (commas, periods, colons) instead. Do NOT use the sparkles emoji ("✨") at all. Limit emojis in general to one or two per post maximum, and only use common, natural ones (a toast, a cocktail glass, a bowl of food) when they fit the tone — never force them.`;

// Content model for unified core posts: one post per calendar date, published on
// all platforms as the SAME message with only platform-specific adjustments.
export const CONTENT_MODEL_RULES = `CONTENT MODEL — IMPORTANT: Each calendar date is ONE core post published on all its platforms as the SAME post with only platform-specific adjustments. The platform copies must be VERY SIMILAR — near-identical wording: same hook, same sentences, same facts, same structure. Do NOT write different angles or different messages per platform. The ONLY differences allowed: (1) hashtags per platform rule, (2) link handling (Facebook/LinkedIn keep the short link at the end; Instagram uses "link in bio" wording and never a URL), (3) light tone touch-ups at most (Instagram slightly punchier, LinkedIn slightly more formal) without changing the actual sentences.`;

// RTM's approved strategic content topics. All social content generators draw
// their topics from this list first; trending research only fills leftover slots.
// Status 'hold' topics are documented but excluded from generation.
export const STRATEGIC_TOPICS = [
  {
    title: "Gen Z Isn't Drinking Less — They're Drinking Differently",
    status: 'active',
    angle: "Flagship thought-leadership angle: Gen Z consumption is sessionable and event-based — they show up for a night out, a campus social, or a party, not a quiet glass at home like older generations. Premium, event-ready formats win. ABSOLUTELY NEVER reference THC, cannabis, or any crossover trend in any form.",
  },
  {
    title: "Why Asian Beverages Are America's Fastest-Growing Import Category",
    status: 'active',
    angle: "Category-growth piece: soju growth stats, the K-culture tailwind, and the Gen Z crossover (sessionable, event-based drinking). Position the momentum of the whole category rather than any single brand.",
  },
  {
    title: "Soju 101 for US Retailers: Wine-Based, Sparkling, Premium, and What's Next",
    status: 'active',
    angle: "Expert-positioning, educational piece: walk US retailers through soju styles — wine-based, sparkling, regular, and the upcoming super-premium lines. Keep it strictly educational — never reveal proprietary data, pricing strategy, or supplier terms that competitors could use.",
  },
  {
    title: "What 'Three-Tier Distribution' Actually Means for Importers Like RTM",
    status: 'active',
    angle: "Foundational, definitional piece written for a wholesale buyer who doesn't already know the term: explain producers/importers, distributors, and retailers in plain language with zero industry jargon.",
  },
  {
    title: "From Warehouse to Shelf: How Three-Tier Distribution Gets Your Product to Market",
    status: 'active',
    angle: "Process-level follow-up to the three-tier explainer: follow a product's journey from warehouse to shelf. Reference and build on the 'what three-tier distribution actually means' theme, and point to the Wholesalers page as the natural next step.",
  },
  {
    title: "The Convenience Store Opportunity: Why Asian RTDs Belong in the Cooler",
    status: 'active',
    angle: "Directly targets convenience retail (7-Eleven, Circle K): why Asian RTDs belong in the cooler, using the Gen Z campus/social-event angle as the 'why now' hook. Stay general about placement strategy — no internal product or placement data.",
  },
  {
    title: "RTM vs. the Generalist Importer: What a Specialist Distribution Partner Offers",
    status: 'hold',
    angle: "Search-authority comparison of specialist vs. generalist importers — an authority play, not a takedown. ON HOLD until the competitor framing is confirmed internally; do not use yet.",
  },
];

// Prompt instruction for the LLM: strategic topics are the primary source of
// every generated topic; anything else only fills the remaining slots.
export function buildStrategicTopicsInstruction() {
  const active = STRATEGIC_TOPICS.filter((t) => t.status === 'active');
  const list = active.map((t, i) => `${i + 1}. ${t.title}\n   Angle: ${t.angle}`).join('\n');
  return `STRATEGIC TOPICS — PRIMARY SOURCE FOR ALL TOPICS: Build the content around these strategic topics first. Use each active strategic topic at least once before drawing from any trending-topic list, and express each one as a short, social-friendly theme line that keeps its angle intact.
${list}
If there are more slots than active strategic topics, FIRST reuse a strategic topic with a fresh, distinct angle (a different facet or audience of the same theme). Only fall back to the trending list if every strategic topic has already been used twice, and never let a filler topic overlap with a strategic one.`;
}

export const GBP_LENGTH_RULE = "GBP (google_business) length: Aim for 150 to 300 words. Google allows up to 1,500 characters, but shorter text is easier to read. Write a substantive local business update with a few useful details for the reader, and keep the relevant CTA chosen via the GBP CTA rule (never put a URL in the copy).";

// Mandatory AI disclosure appended to the bottom of every social post (all platforms).
// Exactly one of these two lines — never both — must appear at the end of the copy.
export const AI_DISCLAIMERS = [
  'AI tools were used in the creation of this content',
  'This content was created with AI support',
];

// Append one AI disclaimer to the bottom of a post's content. Idempotent: if either
// disclaimer is already present, the content is returned unchanged. `seed` picks which
// of the two disclaimers is used (use an index for variety across a batch).
export function appendAiDisclaimer(content, seed = 0) {
  if (!content) return content;
  const trimmed = String(content).trim();
  if (trimmed.includes(AI_DISCLAIMERS[0]) || trimmed.includes(AI_DISCLAIMERS[1])) {
    return trimmed;
  }
  const choice = AI_DISCLAIMERS[Math.abs(seed) % AI_DISCLAIMERS.length];
  return `${trimmed}\n${choice}`;
}

export const HASHTAG_RULES = {
  instagram: "Use 3 to 5 highly relevant hashtags. Instagram allows up to 30, but a smaller, targeted group keeps captions clean and performs well.",
  twitter: "Use 1 to 2 focused hashtags. Space is tight, so only use core keywords.",
  facebook: "Use 0 to 2 organic hashtags. Many Facebook posts perform best with zero hashtags; never exceed two.",
  linkedin: "Use 3 to 5 industry-specific hashtags relevant to the beverage industry and the post topic.",
  google_business: "Do not include any hashtags. GBP posts must never contain hashtags.",
};

// Enforced hashtag count ranges per platform (used by generation + backfill).
export const HASHTAG_COUNTS = {
  instagram: { min: 3, max: 5 },
  linkedin: { min: 3, max: 5 },
  twitter: { min: 1, max: 2 },
  facebook: { min: 0, max: 2 },
  google_business: { min: 0, max: 0 },
};

export function buildHashtagInstruction(platform) {
  const rule = HASHTAG_RULES[platform];
  return rule
    ? `HASHTAG RULE (${platform}): ${rule} Place all hashtags on the final line of the post, separated by spaces.`
    : '';
}

export function getPlatformsForDate(dayOfWeek) {
  const platforms = [];
  if (dayOfWeek === 2 || dayOfWeek === 4) { platforms.push('facebook'); platforms.push('instagram'); platforms.push('linkedin'); }
  return platforms;
}

// Assign each post on a given day a random time within the 8:00am–11:59am
// local time window, spread at least 15 minutes apart.
// Returns an array of minute-of-day values (in local time) sorted ascending.
function spreadTimesForDay(count) {
  const START = 8 * 60;       // 8:00am = 480
  const END = 11 * 60 + 59;   // 11:59am = 719
  const MIN_GAP = 15;
  if (count <= 0) return [];
  if (count === 1) {
    return [Math.floor(START + Math.random() * (END - START))];
  }
  // Try to find a set of `count` random times that are all ≥ MIN_GAP apart.
  for (let attempt = 0; attempt < 50; attempt++) {
    const times = [];
    for (let i = 0; i < count; i++) {
      times.push(Math.floor(START + Math.random() * (END - START)));
    }
    times.sort((a, b) => a - b);
    let ok = true;
    for (let i = 1; i < times.length; i++) {
      if (times[i] - times[i - 1] < MIN_GAP) { ok = false; break; }
    }
    if (ok) return times;
  }
  // Fallback: evenly spaced across the window.
  const step = (END - START) / (count - 1 || 1);
  return Array.from({ length: count }, (_, i) => Math.round(START + i * step));
}

// Convert a local minute-of-day on a given UTC date into a full ISO datetime.
// South African Standard Time is treated as fixed UTC+2 (no DST), so we
// subtract 2 hours to get UTC.
function localMinutesToISO(year, monthIndex, day, localMinutes) {
  const utcMinutes = localMinutes - 2 * 60;
  const utcHours = Math.floor(utcMinutes / 60);
  const utcMins = utcMinutes % 60;
  const d = new Date(Date.UTC(year, monthIndex, day, utcHours, utcMins, 0, 0));
  return d.toISOString();
}

export function buildSchedule(month, year) {
  const schedule = [];
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month - 1, day));
    const platforms = getPlatformsForDate(date.getUTCDay());
    if (platforms.length === 0) continue;
    const times = spreadTimesForDay(platforms.length);
    for (let i = 0; i < platforms.length; i++) {
      schedule.push({ date: localMinutesToISO(year, month - 1, day, times[i]), platform: platforms[i] });
    }
  }
  return schedule;
}

export function formatDateLabel(dateStr) {
  // Handles both date-only ("2026-08-25") and full ISO ("2026-08-25T13:23:00.000Z")
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function buildTaskDescription(campaignMonth, posts) {
  let desc = `# GP - Social Posts [${campaignMonth}]\n\n`;
  desc += `Monthly social media content pipeline for ${campaignMonth}.\n\n`;
  desc += `**Review instructions:** Comment on this task with "Approved for Publish" or "Approved for Schedule". Reference the platform and date (e.g., "Facebook - Aug 15: Approved for Publish"). For copy edits, quote the platform/date and provide the revised text. For image changes, mention the platform/date and what to change. Creatives are attached to this task as files.\n\n---\n\n`;
  for (const platform of PLATFORM_ORDER) {
    const platformPosts = posts.filter((p) => p.platform === platform);
    if (platformPosts.length === 0) continue;
    desc += `## ${PLATFORM_LABEL[platform]}\n\n`;
    for (const post of platformPosts) {
      desc += `### ${formatDateLabel(post.date)} — ${post.topic}\n\n`;
      desc += `${post.content}\n\n`;
      desc += `*Image direction: ${post.image_prompt}*\n\n`;
      desc += `---\n\n`;
    }
  }
  return desc;
}