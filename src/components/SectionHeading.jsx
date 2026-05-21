import React from 'react';
import { motion } from 'framer-motion';

/**
 * variant="dark"  — on cream/light backgrounds (default)
 * variant="light" — on dark/image backgrounds
 */
export default function SectionHeading({ label, title, description, align = 'left', variant = 'dark' }) {
  const isLight = variant === 'light';

  const headingColor = isLight ? 'text-rtm-white' : 'text-rtm-ink';
  const descColor    = isLight ? 'text-white/80'  : 'text-rtm-ink-soft';
  const eyebrowColor = isLight ? 'text-rtm-yellow-light' : 'text-rtm-cobalt';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      {label && (
        <span className={`font-heading text-xs font-semibold uppercase tracking-[0.15em] block mb-3 ${eyebrowColor}`}>
          {label}
        </span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.02em] leading-tight mb-4 ${headingColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`font-body text-base leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${descColor}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}