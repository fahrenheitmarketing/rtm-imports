import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Calendar } from 'lucide-react';

const CATEGORY_COLORS = {
  'Industry Trend': 'text-primary bg-primary/10',
  'Partnership': 'text-green-400 bg-green-400/10',
  'Press Release': 'text-blue-400 bg-blue-400/10',
  'Market Data': 'text-orange-400 bg-orange-400/10',
  'Company Update': 'text-purple-400 bg-purple-400/10',
};

export default function NewsCard({ post, idx, onOpen }) {
  const handleClick = () => {
    if (post.external_url) {
      window.open(post.external_url, '_blank');
    } else {
      onOpen(post);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      onClick={handleClick}
      className="bg-card border border-border hover:border-primary/40 transition-colors duration-300 cursor-pointer group flex flex-col"
    >
      {post.image_url && (
        <div className="aspect-[16/9] overflow-hidden">
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className={`font-body text-xs tracking-widest uppercase px-2 py-0.5 ${CATEGORY_COLORS[post.category] || 'text-primary bg-primary/10'}`}>
            {post.category}
          </span>
        </div>
        <h3 className="font-display text-xl text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
          {post.summary}
        </p>
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
          <span className="font-body text-xs text-muted-foreground flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {new Date(post.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="font-body text-xs tracking-widest uppercase text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            {post.external_url ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
            {post.external_url ? 'Source' : 'Read'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}