import React from 'react';
import { motion } from 'framer-motion';

/**
 * variant="dark"  — on dark navy backgrounds (uses CSS foreground vars)
 * variant="light" — on cream backgrounds (#FFFCF5 / #F2EBDE), forces solid #0A2454
 */
export default function SectionHeading({ title, description, label, align = 'left', variant = 'dark' }) {
  const isLight = variant === 'light';
  const solidDark = '#0A2454';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      {label && (
        <span
          className="font-eyebrow text-xs tracking-widest uppercase block mb-4"
          style={{ color: isLight ? solidDark : 'hsl(var(--primary))' }}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 ${isLight ? '' : 'text-foreground'}`}
        style={isLight ? { color: solidDark } : {}}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`font-body text-base leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${isLight ? '' : 'text-foreground/80'}`}
          style={isLight ? { color: solidDark } : {}}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}