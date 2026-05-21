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
      <section className="pt-28 md:pt-36 pb-24 min-h-[45vh] flex items-end" style={{ background: '#0A2454' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-eyebrow text-xs tracking-widest uppercase block mb-8" style={{ color: 'rgba(244,196,48,0.9)' }}>News & Insights</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl" style={{ color: '#F8F3E8' }}>
              The beverage import industry, <GoldUnderline>covered.</GoldUnderline>
            </h1>
            <p className="font-body text-lg mt-6 max-w-xl leading-relaxed" style={{ color: 'rgba(248,243,232,0.85)' }}>
              Industry trends, partnership announcements, market data, and perspectives from RTM's years building brands in the US wholesale channel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[18px] overflow-hidden border cursor-pointer group"
              style={{ borderColor: 'rgba(244,196,48,0.45)' }}
              onClick={() => featured.external_url ? window.open(featured.external_url, '_blank') : setSelectedPost(featured)}
            >
              {featured.image_url && (
                <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className={`p-10 md:p-14 flex flex-col justify-between ${!featured.image_url ? 'lg:col-span-2' : ''}`} style={{ background: '#FFFCF5' }}>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-eyebrow text-xs tracking-widest uppercase text-rtm-cobalt px-3 py-1 rounded-full border" style={{ borderColor: 'rgba(244,196,48,0.45)' }}>{featured.category}</span>
                    <span className="font-footnote text-xs flex items-center gap-1" style={{ color: 'rgba(26,24,20,0.5)' }}>
                      <Calendar className="w-3 h-3" />
                      {new Date(featured.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-rtm-ink mb-4 leading-tight">{featured.title}</h2>
                  <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(26,24,20,0.75)' }}>{featured.summary}</p>
                </div>
                <div className="flex items-center gap-2 mt-8 font-eyebrow text-sm tracking-widest uppercase text-rtm-cobalt group-hover:text-rtm-yellow transition-colors duration-300">
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
      <section className="py-10 bg-background" style={{ borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-eyebrow text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200"
                style={activeCategory === cat
                  ? { background: '#0A2454', color: '#F4C430', borderColor: 'rgba(244,196,48,0.45)' }
                  : { background: 'transparent', color: 'rgba(26,24,20,0.55)', borderColor: 'rgba(244,196,48,0.45)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-[18px] border p-8 animate-pulse" style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.3)' }}>
                  <div className="h-3 rounded w-1/3 mb-4" style={{ background: 'rgba(26,24,20,0.1)' }} />
                  <div className="h-5 rounded w-full mb-2" style={{ background: 'rgba(26,24,20,0.1)' }} />
                  <div className="h-5 rounded w-2/3 mb-6" style={{ background: 'rgba(26,24,20,0.1)' }} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body" style={{ color: 'rgba(26,24,20,0.5)' }}>No posts in this category yet.</p>
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