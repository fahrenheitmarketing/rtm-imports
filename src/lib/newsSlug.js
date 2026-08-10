// Shared helpers for SEO-friendly news article slugs.

export function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// Build the public URL path for a post, preferring its slug over the raw id.
export function articlePath(post) {
  const seg = post?.slug ? slugify(post.slug) : post?.id;
  return `/news/${seg}`;
}