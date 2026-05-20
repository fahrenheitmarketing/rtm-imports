import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function NewsModal({ post, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 bg-background/80 backdrop-blur-sm overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="relative w-full max-w-3xl bg-[#f8f9fa] border border-border mt-4 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {post.image_url && (
            <div className="aspect-[16/7] overflow-hidden">
              <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 border border-border bg-card flex items-center justify-center hover:border-foreground transition-colors duration-200"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="font-body text-xs tracking-widest uppercase text-primary bg-primary/10 px-3 py-1">
                {post.category}
              </span>
              <span className="font-body text-xs text-[#555] flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {new Date(post.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {post.author && (
                <span className="font-body text-xs text-[#555] flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  {post.author}
                </span>
              )}
            </div>

            <h2 className="font-display text-2xl md:text-3xl text-[#1a1a1a] mb-6 leading-tight">
              {post.title}
            </h2>

            <div className="prose-custom font-body text-sm text-[#333] leading-relaxed">
              <ReactMarkdown>{post.body || post.summary}</ReactMarkdown>
            </div>

            {post.external_url && (
              <a
                href={post.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 font-body text-sm tracking-widest uppercase text-primary hover:text-foreground transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                View Original Source
              </a>
            )}

            {post.tags?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#e0e0e0] flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-body text-xs text-[#555] border border-[#e0e0e0] px-3 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}