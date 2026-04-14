import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Wraps gold/primary italic text and animates a 1px underline from left to right on scroll/load.
 * Usage: <GoldUnderline>your text</GoldUnderline>
 */
export default function GoldUnderline({ children, className = '', delay = 0.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        className="absolute left-0 bottom-0 h-px bg-primary block"
        initial={{ width: '0%' }}
        animate={inView ? { width: '100%' } : { width: '0%' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay }}
      />
    </span>
  );
}