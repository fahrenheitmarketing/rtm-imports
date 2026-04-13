import React from 'react';
import { motion } from 'framer-motion';

export default function QuoteSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-px bg-primary mx-auto mb-10" />
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed italic mb-8">
            "For at the end of the day, what matters is never the wine, it's always the moment; it's always the people."
          </blockquote>
          <cite className="font-body text-sm tracking-widest uppercase text-muted-foreground not-italic">
            — Olivier Magny
          </cite>
          <div className="w-12 h-px bg-primary mx-auto mt-10" />
        </motion.div>
      </div>
    </section>
  );
}