import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionHeading({ title, description, align = 'left', variant = 'dark' }) {
  const isLight = variant === 'light';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 ${isLight ? 'text-[#1a2d4a]' : 'text-foreground'}`}>
        {title}
      </h2>
      {description && (
        <p className={`font-body text-base leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${isLight ? 'text-foreground/80' : 'text-[#1a2d4a]/80'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}