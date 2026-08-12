import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { base44 } from '@/api/base44Client';
import { slugify } from '@/lib/newsSlug';
import GoldUnderline from '../components/GoldUnderline';

export default function NewsArticle() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    // Resolve by slug first; fall back to the raw id for backward-compatible links.
    base44.entities.NewsPost.filter({ slug: slugify(id) }, '-published_date', 1)
      .then(async (results) => {
        if (results && results.length > 0) return results[0];
        return base44.entities.NewsPost.get(id);
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  // SEO: document title, meta description, and JSON-LD Article schema
  useEffect(() => {
    if (!post) return;

    const previousTitle = document.title;
    document.title = `${post.title} | RTM Imports`;

    let metaDesc = document.querySelector('meta[name="description"]');
    const descContent = post.summary || post.title;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const previousDesc = metaDesc.getAttribute('content');
    metaDesc.setAttribute('content', descContent);

    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', post.title);
    document.head.appendChild(ogTitle);

    const ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    ogDesc.setAttribute('content', descContent);
    document.head.appendChild(ogDesc);

    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'article');
    document.head.appendChild(ogType);

    if (post.image_url) {
      const ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      ogImage.setAttribute('content', post.image_url);
      document.head.appendChild(ogImage);
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.summary,
      datePublished: post.published_date,
      dateModified: post.published_date,
      author: post.author ? { '@type': 'Organization', name: post.author } : { '@type': 'Organization', name: 'RTM Imports' },
      publisher: { '@type': 'Organization', name: 'RTM Imports' },
      ...(post.image_url ? { image: post.image_url } : {}),
      articleSection: post.category,
      keywords: (post.tags || []).join(', '),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.title = previousTitle;
      metaDesc.setAttribute('content', previousDesc || '');
      document.head.removeChild(ogTitle);
      document.head.removeChild(ogDesc);
      document.head.removeChild(ogType);
      if (post.image_url) {
        const ogImg = document.querySelector('meta[property="og:image"][content="' + post.image_url + '"]');
        if (ogImg) document.head.removeChild(ogImg);
      }
      document.head.removeChild(script);
    };
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background px-6 text-center">
        <h1 className="font-display text-3xl mb-4" style={{ color: '#F8F3E8' }}>Article not found</h1>
        <p className="font-body mb-8" style={{ color: 'rgba(248,243,232,0.7)' }}>The article you're looking for may have been moved or removed.</p>
        <Link to="/news" className="inline-flex items-center gap-2 font-eyebrow text-sm tracking-widest uppercase text-primary hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 min-h-[40vh] flex items-end" style={{ background: '#0A2454' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 font-eyebrow text-xs tracking-widest uppercase mb-8 transition-colors duration-300"
              style={{ color: 'rgba(244,196,48,0.9)' }}
            >
              <ArrowLeft className="w-3 h-3" /> News
            </Link>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="font-eyebrow text-xs tracking-widest uppercase px-3 py-1 rounded-full border" style={{ borderColor: 'rgba(244,196,48,0.45)', color: '#F4C430' }}>
                {post.category}
              </span>
              <span className="font-footnote text-xs flex items-center gap-1.5" style={{ color: 'rgba(248,243,232,0.7)' }}>
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
              {post.author && (
                <span className="font-footnote text-xs flex items-center gap-1.5" style={{ color: 'rgba(248,243,232,0.7)' }}>
                  <User className="w-3 h-3" />
                  {post.author}
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight" style={{ color: '#F8F3E8' }}>
              {post.title}
            </h1>
            <p className="font-body text-base leading-relaxed mt-6" style={{ color: 'rgba(248,243,232,0.85)' }}>
              {post.summary}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && (
        <div className="max-w-4xl mx-auto px-6 lg:px-12 -mt-8 md:-mt-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-[4/3] rounded-[18px] overflow-hidden border"
            style={{ borderColor: 'rgba(244,196,48,0.45)' }}
          >
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" style={{ objectPosition: 'center center' }} />
          </motion.div>
        </div>
      )}

      {/* Body */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <article className="font-body text-base md:text-lg leading-relaxed prose-rtm" style={{ color: 'rgba(248,243,232,0.9)' }}>
            <ReactMarkdown>{post.body || post.summary}</ReactMarkdown>
          </article>

          {post.external_url && (
            <a
              href={post.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 font-eyebrow text-sm tracking-widest uppercase text-primary hover:opacity-70 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" /> View Original Source
            </a>
          )}

          {post.tags?.length > 0 && (
            <div className="mt-12 pt-8 flex flex-wrap gap-2" style={{ borderTop: '1px solid rgba(244,196,48,0.3)' }}>
              {post.tags.map((tag) => (
                <span key={tag} className="font-footnote text-xs rounded-full px-3 py-1" style={{ color: 'rgba(248,243,232,0.6)', border: '1px solid rgba(244,196,48,0.3)' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-16 pt-10 text-center" style={{ borderTop: '1px solid rgba(244,196,48,0.2)' }}>
            <p className="font-body text-base mb-6" style={{ color: 'rgba(248,243,232,0.75)' }}>
              Looking for more from <GoldUnderline>RTM Imports?</GoldUnderline>
            </p>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-6 py-3 font-eyebrow text-xs tracking-widest uppercase rounded-lg transition-all duration-300"
              style={{ background: '#F4C430', color: '#0A2454' }}
            >
              <ArrowLeft className="w-3 h-3" /> All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}