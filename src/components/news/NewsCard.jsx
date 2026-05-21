import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Calendar } from 'lucide-react';

const CATEGORY_STYLES = {
  'Industry Trend': 'bg-rtm-cobalt text-white',
  'Partnership':    'bg-rtm-success text-white',
  'Press Release':  'bg-rtm-cobalt-light text-white',
  'Market Data':    'bg-rtm-warning text-white',
  'Company Update': 'bg-rtm-ink-soft text-white',
};

export default function NewsCard({ post, idx, onOpen }) {
  const handleClick = () => {
    if (post.external_url) {
      window.open(post.external_url, '_blank');
    } else {
      onOpen(post);
    }
  };

  const badgeStyle = CATEGORY_STYLES[post.category] || 'bg-rtm-cobalt text-white';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      onClick={handleClick}
      className="bg-rtm-white border border-rtm-stone-light hover:border-rtm-cobalt hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col"
      style={{ borderRadius: '4px' }}
    >
      {post.image_url && (
        <div className="aspect-[16/9] overflow-hidden" style={{ borderRadius: '4px 4px 0 0' }}>
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`font-heading text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 ${badgeStyle}`}
            style={{ borderRadius: '999px' }}
          >
            {post.category}
          </span>
        </div>
        <h3 className="font-heading text-lg font-bold uppercase tracking-[0.04em] text-rtm-ink mb-3 leading-snug group-hover:text-rtm-cobalt transition-colors duration-200">
          {post.title}
        </h3>
        <p className="font-body text-sm text-rtm-ink-soft leading-relaxed flex-1">
          {post.summary}
        </p>
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-rtm-stone-light">
          <span className="font-body text-xs text-rtm-stone flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {new Date(post.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-rtm-cobalt flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            {post.external_url ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
            {post.external_url ? 'Source' : 'Read'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}