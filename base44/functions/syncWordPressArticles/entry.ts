import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

// Replicate of src/lib/newsSlug.js slugify (backend can't import frontend modules)
function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join('-')
    .slice(0, 45)
    .replace(/-+$/g, '');
}

function normalizeTitle(title = '') {
  return String(title).toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function stripHtml(html) {
  return String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function decodeEntities(str) {
  return String(str)
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…');
}

function htmlToMarkdown(html) {
  if (!html) return '';
  let md = String(html);

  // Remove WordPress shortcodes and comments
  md = md.replace(/\[caption[^\]]*\][\s\S]*?\[\/caption\]/gi, '');
  md = md.replace(/<!--more-->/gi, '');
  md = md.replace(/<!--[\s\S]*?-->/g, '');

  // Headings
  md = md.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (m, level, content) => {
    return '\n\n' + '#'.repeat(parseInt(level)) + ' ' + decodeEntities(stripHtml(content)).trim() + '\n\n';
  });

  // Links — preserve href and text
  md = md.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (m, href, text) => {
    const cleanText = decodeEntities(stripHtml(text)).trim();
    if (!cleanText || !href) return cleanText;
    return `[${cleanText}](${href})`;
  });

  // Images
  md = md.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, (m, src) => `\n\n![image](${src})\n\n`);

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, content) => {
    return '\n\n' + decodeEntities(stripHtml(content)).trim().split('\n').map(l => '> ' + l).join('\n') + '\n\n';
  });

  // Unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (m, content) => {
    const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    return '\n\n' + items.map(item => '- ' + decodeEntities(stripHtml(item)).trim()).join('\n') + '\n\n';
  });

  // Ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (m, content) => {
    const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    return '\n\n' + items.map((item, i) => (i + 1) + '. ' + decodeEntities(stripHtml(item)).trim()).join('\n') + '\n\n';
  });

  // Bold and italic
  md = md.replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, '**$2**');
  md = md.replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, '*$2*');

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n');

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Strip remaining tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode entities
  md = decodeEntities(md);

  // Clean whitespace
  md = md.replace(/\n{3,}/g, '\n\n').trim();

  return md;
}

function mapCategory(wpCategories) {
  const validCategories = ['Industry Trend', 'Partnership', 'Press Release', 'Market Data', 'Company Update'];
  const all = (wpCategories || []).map(c => c.toLowerCase());

  // Exact match
  for (const cat of validCategories) {
    if (all.includes(cat.toLowerCase())) return cat;
  }

  // Keyword matching
  const combined = all.join(' ');
  if (combined.includes('trend')) return 'Industry Trend';
  if (combined.includes('partner')) return 'Partnership';
  if (combined.includes('press')) return 'Press Release';
  if (combined.includes('market') || combined.includes('data')) return 'Market Data';
  if (combined.includes('company') || combined.includes('update')) return 'Company Update';

  return 'Company Update';
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const siteUrl = secrets.get("WORDPRESS_STAGING_URL");
    const wpUser = secrets.get("WORDPRESS_STAGING_USER");
    const wpPass = secrets.get("WORDPRESS_STAGING_APP_PASS");

    if (!siteUrl || !wpUser || !wpPass) {
      return Response.json({ error: 'WordPress staging secrets not configured. Set WORDPRESS_STAGING_URL, WORDPRESS_STAGING_USER, WORDPRESS_STAGING_APP_PASS.' }, { status: 500 });
    }

    // Fetch all published posts with embedded data (images, author, terms)
    const authHeader = 'Basic ' + btoa(`${wpUser}:${wpPass}`);
    const postsUrl = `${siteUrl}/wp-json/wp/v2/posts?status=publish&per_page=100&_embed`;

    const wpResponse = await fetch(postsUrl, {
      headers: { 'Authorization': authHeader, 'Accept': 'application/json' }
    });

    if (!wpResponse.ok) {
      const errText = await wpResponse.text().catch(() => '');
      return Response.json({ error: `WordPress API error: ${wpResponse.status} ${errText.slice(0, 200)}` }, { status: 502 });
    }

    const wpPosts = await wpResponse.json();

    // Convert each WordPress post to article data
    const articles = wpPosts.map(post => {
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
      const imageUrl = featuredMedia?.source_url || '';
      const authorName = post._embedded?.author?.[0]?.name || 'RTM Imports Team';

      const terms = post._embedded?.['wp:term'] || [];
      const wpCategories = (terms[0] || []).map(t => t.name);
      const wpTags = (terms[1] || []).map(t => t.name);

      const body = htmlToMarkdown(post.content?.rendered || '');
      const summary = decodeEntities(stripHtml(post.excerpt?.rendered || '')).slice(0, 250);

      return {
        title: decodeEntities(stripHtml(post.title?.rendered || '')),
        category: mapCategory(wpCategories),
        summary,
        body,
        author: authorName,
        published_date: (post.date_gmt || post.date || '').split('T')[0],
        image_url: imageUrl,
        tags: wpTags
      };
    });

    // Fetch existing NewsPosts to match against
    const existing = await base44.asServiceRole.entities.NewsPost.list('-created_date', 100);

    const created = [];
    const updated = [];

    for (const article of articles) {
      const normalizedNew = normalizeTitle(article.title);
      const match = existing.find(e => normalizeTitle(e.title) === normalizedNew);

      if (match) {
        // Update existing — preserve slug and is_featured to avoid breaking indexed URLs
        await base44.asServiceRole.entities.NewsPost.update(match.id, {
          body: article.body,
          summary: article.summary,
          category: article.category,
          author: article.author,
          published_date: article.published_date,
          image_url: article.image_url,
          tags: article.tags,
          is_published: true
        });
        updated.push({ title: article.title, id: match.id });
      } else {
        // Create new with generated slug
        const newSlug = slugify(article.title);
        const rec = await base44.asServiceRole.entities.NewsPost.create({
          title: article.title,
          slug: newSlug,
          category: article.category,
          summary: article.summary,
          body: article.body,
          author: article.author,
          published_date: article.published_date,
          is_published: true,
          is_featured: false,
          image_url: article.image_url,
          tags: article.tags
        });
        created.push({ title: article.title, id: rec.id, slug: newSlug });
      }
    }

    return Response.json({
      total_wp_articles: articles.length,
      created: created.length,
      updated: updated.length,
      created_titles: created.map(c => c.title),
      updated_titles: updated.map(u => u.title)
    });
  } catch (error) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}