import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Calendar } from 'lucide-react';

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
      className="rounded-[18px] border hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col overflow-hidden"
      style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}
    >
      {post.image_url && (
        <div className="aspect-[16/9] overflow-hidden">
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-eyebrow text-xs tracking-widest uppercase text-rtm-cobalt px-3 py-1 rounded-full border" style={{ borderColor: 'rgba(244,196,48,0.45)' }}>
            {post.category}
          </span>
        </div>
        <h3 className="font-display text-xl text-rtm-ink mb-3 leading-snug group-hover:text-rtm-cobalt transition-colors duration-200">
          {post.title}
        </h3>
        <p className="font-body text-sm leading-relaxed flex-1" style={{ color: 'rgba(26,24,20,0.7)' }}>
          {post.summary}
        </p>
        <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: '1px solid rgba(244,196,48,0.3)' }}>
          <span className="font-footnote text-xs flex items-center gap-1.5" style={{ color: 'rgba(26,24,20,0.5)' }}>
            <Calendar className="w-3 h-3" />
            {new Date(post.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="font-eyebrow text-xs tracking-widest uppercase text-rtm-cobalt flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            {post.external_url ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
            {post.external_url ? 'Source' : 'Read'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}