import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

function markdownToHtml(md = '') {
  let html = String(md);

  // Headings
  html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*)$/gm, '<h2>$1</h2>');

  // Bold / italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Images
  html = html.replace(/!\[[^\]]*\]\(([^)]+)\)/g, '<img src="$1" />');

  // Blockquotes
  html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');

  // Lists (simple, contiguous blocks)
  html = html.replace(/(^- .*(\n- .*)*)/gm, (block) => {
    const items = block.split('\n').map(l => l.replace(/^- /, '').trim()).filter(Boolean);
    return '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>';
  });
  html = html.replace(/(^\d+\. .*(\n\d+\. .*)*)/gm, (block) => {
    const items = block.split('\n').map(l => l.replace(/^\d+\. /, '').trim()).filter(Boolean);
    return '<ol>' + items.map(i => `<li>${i}</li>`).join('') + '</ol>';
  });

  // Paragraphs: wrap remaining plain-text blocks
  html = html
    .split(/\n{2,}/)
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(h2|h3|ul|ol|blockquote|img)/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n\n');

  return html.trim();
}

async function findCategoryTermId(siteUrl, authHeader, categoryName) {
  const res = await fetch(`${siteUrl}/wp-json/wp/v2/categories?search=${encodeURIComponent(categoryName)}&per_page=5`, {
    headers: { 'Authorization': authHeader, 'Accept': 'application/json' }
  });
  if (!res.ok) return null;
  const terms = await res.json();
  const match = terms.find(t => t.name.toLowerCase() === categoryName.toLowerCase());
  if (match) return match.id;

  // Create it if missing
  const createRes = await fetch(`${siteUrl}/wp-json/wp/v2/categories`, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: categoryName })
  });
  if (!createRes.ok) return null;
  const created = await createRes.json();
  return created.id;
}

async function uploadFeaturedImage(siteUrl, authHeader, imageUrl, title) {
  if (!imageUrl) return null;
  try {
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return null;
    const arrayBuffer = await imgRes.arrayBuffer();
    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
    const ext = contentType.includes('png') ? 'png' : 'jpg';
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}.${ext}`;

    const mediaRes = await fetch(`${siteUrl}/wp-json/wp/v2/media`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`
      },
      body: arrayBuffer
    });
    if (!mediaRes.ok) return null;
    const media = await mediaRes.json();
    return media.id;
  } catch (e) {
    return null;
  }
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
      return Response.json({ error: 'WordPress staging secrets not configured.' }, { status: 500 });
    }

    const authHeader = 'Basic ' + btoa(`${wpUser}:${wpPass}`);

    // Get all published app articles (source of truth)
    const appPosts = await base44.asServiceRole.entities.NewsPost.filter({ is_published: true }, '-published_date', 100);

    // Get existing staging posts (any status) to match by slug
    const stagingListRes = await fetch(`${siteUrl}/wp-json/wp/v2/posts?status=publish,future,draft,pending&per_page=100`, {
      headers: { 'Authorization': authHeader, 'Accept': 'application/json' }
    });
    if (!stagingListRes.ok) {
      const errText = await stagingListRes.text().catch(() => '');
      return Response.json({ error: `Failed to list staging posts: ${stagingListRes.status} ${errText.slice(0, 200)}` }, { status: 502 });
    }
    const stagingPosts = await stagingListRes.json();

    const created = [];
    const updated = [];
    const errors = [];

    const now = new Date();

    for (const post of appPosts) {
      try {
        const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 45);
        const match = stagingPosts.find(p => p.slug === slug);

        const contentHtml = markdownToHtml(post.body || post.summary || '');
        const publishDate = post.published_date ? new Date(post.published_date + 'T09:00:00') : now;
        const isFuture = publishDate > now;

        const categoryId = await findCategoryTermId(siteUrl, authHeader, post.category);
        const featuredMediaId = await uploadFeaturedImage(siteUrl, authHeader, post.image_url, post.title);

        const payload = {
          title: post.title,
          slug,
          content: contentHtml,
          excerpt: post.summary || '',
          status: isFuture ? 'future' : 'publish',
          date: publishDate.toISOString(),
          ...(categoryId ? { categories: [categoryId] } : {}),
          ...(featuredMediaId ? { featured_media: featuredMediaId } : {})
        };

        if (match) {
          const updateRes = await fetch(`${siteUrl}/wp-json/wp/v2/posts/${match.id}`, {
            method: 'POST',
            headers: { 'Authorization': authHeader, 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!updateRes.ok) {
            const errText = await updateRes.text().catch(() => '');
            errors.push({ title: post.title, error: `Update failed: ${updateRes.status} ${errText.slice(0, 150)}` });
            continue;
          }
          updated.push({ title: post.title, id: match.id, slug });
        } else {
          const createRes = await fetch(`${siteUrl}/wp-json/wp/v2/posts`, {
            method: 'POST',
            headers: { 'Authorization': authHeader, 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!createRes.ok) {
            const errText = await createRes.text().catch(() => '');
            errors.push({ title: post.title, error: `Create failed: ${createRes.status} ${errText.slice(0, 150)}` });
            continue;
          }
          const rec = await createRes.json();
          created.push({ title: post.title, id: rec.id, slug });
        }
      } catch (innerErr) {
        errors.push({ title: post.title, error: innerErr.message });
      }
    }

    return Response.json({
      total_app_articles: appPosts.length,
      created: created.length,
      updated: updated.length,
      created_titles: created.map(c => c.title),
      updated_titles: updated.map(u => u.title),
      errors
    });
  } catch (error) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}