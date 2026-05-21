import React from 'react';
import { motion } from 'framer-motion';

export default function QuoteSection() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: '#F2EBDE', borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="w-12 h-px mx-auto mb-10" style={{ background: 'rgba(244,196,48,0.6)' }} />
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-rtm-ink leading-relaxed italic mb-8">
            "For at the end of the day, what matters is never the wine, it's always the moment; it's always the people."
          </blockquote>
          <cite className="font-footnote text-xs tracking-widest uppercase not-italic" style={{ color: 'rgba(26,24,20,0.5)' }}>
            — Olivier Magny
          </cite>
          <div className="w-12 h-px mx-auto mt-10" style={{ background: 'rgba(244,196,48,0.6)' }} />
        </motion.div>
      </div>
    </section>
  );
}