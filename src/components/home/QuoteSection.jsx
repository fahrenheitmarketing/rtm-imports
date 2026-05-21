import React from 'react';
import { motion } from 'framer-motion';
import Fireflies from './Fireflies';

export default function QuoteSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69dd75d09559acb6fb908761/6511b041e_Gemini_Generated_Image_vqlwikvqlwikvqlw.png"
          alt=""
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-rtm-ink/60" />
      </div>
      <Fireflies />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="w-12 h-[2px] bg-rtm-cobalt mx-auto mb-10" />
          <blockquote
            className="font-display text-2xl md:text-3xl lg:text-4xl text-rtm-white leading-relaxed italic mb-8"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)' }}
          >
            "For at the end of the day, what matters is never the wine, it's always the moment; it's always the people."
          </blockquote>
          <cite
            className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-rtm-stone-light not-italic"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
          >
            — Olivier Magny
          </cite>
          <div className="w-12 h-[2px] bg-rtm-cobalt mx-auto mt-10" />
        </motion.div>
      </div>
    </section>
  );
}