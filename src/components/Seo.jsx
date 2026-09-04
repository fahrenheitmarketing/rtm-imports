import { useEffect } from 'react';

const SITE_URL = 'https://prime-spirit-flow.base44.app';
const SITE_NAME = 'RTM Imports';

// Injects per-page SEO: document title, meta description, canonical URL,
// Open Graph tags, and JSON-LD (page schema + BreadcrumbList). Cleans
// everything up on unmount. Site-wide Organization and WebSite schema
// live in index.html.
export default function Seo({ title, description, path, pageType = 'WebPage', breadcrumb = [] }) {
  const breadcrumbKey = JSON.stringify(breadcrumb);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    const created = [];
    const addMeta = (attr, name, content) => {
      const meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
      created.push(meta);
    };

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
      created.push(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${SITE_URL}${path}`;
    document.head.appendChild(canonical);
    created.push(canonical);

    // Open Graph / Twitter
    addMeta('property', 'og:title', document.title);
    addMeta('property', 'og:description', description);
    addMeta('property', 'og:url', `${SITE_URL}${path}`);
    addMeta('property', 'og:type', 'website');
    addMeta('property', 'og:site_name', SITE_NAME);
    addMeta('name', 'twitter:card', 'summary_large_image');

    // JSON-LD page schema + breadcrumbs
    const crumbs = JSON.parse(breadcrumbKey);
    const schema = {
      '@context': 'https://schema.org',
      '@type': pageType,
      name: title,
      description,
      url: `${SITE_URL}${path}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      ...(crumbs.length > 0 && {
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: crumbs.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: `${SITE_URL}${c.path}`,
          })),
        },
      }),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    created.push(script);

    return () => {
      document.title = previousTitle;
      metaDesc.setAttribute('content', previousDesc);
      created.forEach((el) => el.remove());
    };
  }, [title, description, path, pageType, breadcrumbKey]);

  return null;
}