import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Calendar, Tag } from 'lucide-react';
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
      <section className="pt-32 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">News & Insights</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-2xl">
              The Asian beverage <GoldUnderline className="italic">category, covered.</GoldUnderline>
            </h1>
            <p className="font-body text-lg text-foreground/80 mt-6 max-w-xl leading-relaxed">
              Industry trends, partnership announcements, market data, and perspectives from RTM's 30+ years in the category.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="pb-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-primary/30 cursor-pointer group"
              onClick={() => featured.external_url ? window.open(featured.external_url, '_blank') : setSelectedPost(featured)}
            >
              {featured.image_url && (
                <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className={`p-10 md:p-14 bg-card flex flex-col justify-between ${!featured.image_url ? 'lg:col-span-2' : ''}`}>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-body text-xs tracking-widest uppercase text-primary bg-primary/10 px-3 py-1">{featured.category}</span>
                    <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(featured.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 leading-tight">{featured.title}</h2>
                  <p className="font-body text-base text-foreground/80 leading-relaxed">{featured.summary}</p>
                </div>
                <div className="flex items-center gap-2 mt-8 font-body text-sm tracking-widest uppercase text-primary group-hover:text-foreground transition-colors duration-300">
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
      <section className="py-10 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                }`}
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
                <div key={i} className="bg-card border border-border p-8 animate-pulse">
                  <div className="h-3 bg-muted rounded w-1/3 mb-4" />
                  <div className="h-5 bg-muted rounded w-full mb-2" />
                  <div className="h-5 bg-muted rounded w-2/3 mb-6" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body text-muted-foreground">No posts in this category yet.</p>
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

      {/* Post Modal */}
      {selectedPost && <NewsModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </>
  );
}