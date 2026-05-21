import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Calendar } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SectionHeading from '../components/SectionHeading';
import GoldUnderline from '../components/GoldUnderline';
import NewsCard from '../components/news/NewsCard';
import NewsModal from '../components/news/NewsModal';

const CATEGORIES = ['All', 'Industry Trend', 'Partnership', 'Press Release', 'Market Data', 'Company Update'];

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    base44.entities.NewsPost.filter({ is_published: true }, '-published_date').then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const featured = posts.find((p) => p.is_featured);
  const filtered = posts.filter((p) => !p.is_featured && (activeCategory === 'All' || p.category === activeCategory));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69dd75d09559acb6fb908761/436390659_ChatGPTImageMay20202608_46_33PM.png"
            alt="News hero"
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rtm-ink via-rtm-ink/85 to-rtm-ink/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep block mb-8">News & Insights</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.01em] text-rtm-white leading-tight max-w-2xl">
              The beverage import industry,{' '}
              <span className="font-display font-normal normal-case italic text-rtm-yellow">
                <GoldUnderline>covered.</GoldUnderline>
              </span>
            </h1>
            <p className="font-body text-lg text-rtm-stone-light mt-6 max-w-xl leading-relaxed">
              Industry trends, partnership announcements, market data, and perspectives from RTM's years building brands in the US wholesale channel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="pb-16 bg-rtm-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-rtm-cobalt/30 cursor-pointer group overflow-hidden"
              style={{ borderRadius: '4px' }}
              onClick={() => featured.external_url ? window.open(featured.external_url, '_blank') : setSelectedPost(featured)}
            >
              {featured.image_url && (
                <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className={`p-10 md:p-14 bg-rtm-white flex flex-col justify-between ${!featured.image_url ? 'lg:col-span-2' : ''}`}>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.1em] text-white bg-rtm-cobalt px-2.5 py-1" style={{ borderRadius: '999px' }}>
                      {featured.category}
                    </span>
                    <span className="font-body text-xs text-rtm-stone flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(featured.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-[0.02em] text-rtm-ink mb-4 leading-tight">{featured.title}</h2>
                  <p className="font-body text-base text-rtm-ink-soft leading-relaxed">{featured.summary}</p>
                </div>
                <div className="flex items-center gap-2 mt-8 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-rtm-cobalt group-hover:text-rtm-cobalt-deep transition-colors duration-200">
                  {featured.external_url ? (
                    <><ExternalLink className="w-4 h-4" /> Read Full Story</>
                  ) : (
                    <><ArrowRight className="w-4 h-4" /> Read More</>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-rtm-cream-warm border-y border-rtm-stone-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-heading text-xs font-semibold uppercase tracking-[0.08em] px-4 py-2 border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-rtm-cobalt text-white border-rtm-cobalt'
                    : 'border-rtm-stone-light text-rtm-stone hover:border-rtm-cobalt hover:text-rtm-cobalt bg-transparent'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 md:py-28 bg-rtm-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-rtm-white border border-rtm-stone-light p-8 animate-pulse" style={{ borderRadius: '4px' }}>
                  <div className="h-3 bg-rtm-cream-warm rounded w-1/3 mb-4" />
                  <div className="h-5 bg-rtm-cream-warm rounded w-full mb-2" />
                  <div className="h-5 bg-rtm-cream-warm rounded w-2/3 mb-6" />
                  <div className="h-3 bg-rtm-cream-warm rounded w-full mb-2" />
                  <div className="h-3 bg-rtm-cream-warm rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body text-rtm-stone">No posts in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, idx) => (
                <NewsCard key={post.id} post={post} idx={idx} onOpen={setSelectedPost} />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedPost && <NewsModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </>
  );
}