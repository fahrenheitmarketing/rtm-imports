import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionHeading({ label, title, description, align = 'left' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      {label && (
        <span ref={ref} className={`relative inline-block font-body text-xs tracking-widest uppercase text-primary mb-4 ${align === 'center' ? 'block' : 'block'}`}>
          {label}
          <motion.span
            className="absolute bottom-0 left-0 h-px bg-primary block"
            initial={{ width: '0%' }}
            animate={inView ? { width: '100%' } : { width: '0%' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          />
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className={`font-body text-base text-foreground/80 leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}