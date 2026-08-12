import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Calendar } from 'lucide-react';
import { articlePath as buildArticlePath } from '@/lib/newsSlug';

const MotionLink = motion(Link);

export default function NewsCard({ post, idx }) {
  const isExternal = !!post.external_url;
  const articlePath = buildArticlePath(post);

  const className = "rounded-[18px] border hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col overflow-hidden block";
  const style = { background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' };

  const inner =
  <>
      {post.image_url &&
    <div className="aspect-[16/9] overflow-hidden">
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
    }
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-eyebrow text-xs tracking-widest uppercase text-rtm-cobalt px-3 py-1 rounded-full border" style={{ borderColor: 'rgba(244,196,48,0.45)' }}>
            {post.category}
          </span>
        </div>
        <h3 className="font-display text-xl mb-3 leading-snug group-hover:opacity-70 transition-opacity duration-200" style={{ color: '#0A2454' }}>
          {post.title}
        </h3>
        <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#0A2454' }}>
          {post.summary}
        </p>
        <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: '1px solid rgba(244,196,48,0.3)' }}>
          <span className="font-footnote text-xs flex items-center gap-1.5" style={{ color: '#0A2454' }}>
            <Calendar className="w-3 h-3" />
            {new Date(post.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="font-eyebrow text-xs tracking-widest uppercase text-rtm-cobalt flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            {isExternal ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
            {isExternal ? 'Source' : 'Read'}
          </span>
        </div>
      </div>
    </>;


  if (isExternal) {
    return (
      <motion.a
        href={post.external_url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.08 }}
        className={className}
        style={style}>
        
        {inner}
      </motion.a>);

  }

  return (
    <MotionLink
      to={articlePath}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      className={className}
      style={style}>
      
      {inner}
    </MotionLink>);

}