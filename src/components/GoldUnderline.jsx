import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Editorial accent — wraps italic/highlighted text and animates a 2px cobalt underline on scroll.
 * Usage: <GoldUnderline>your text</GoldUnderline>
 */
export default function GoldUnderline({ children, className = '', delay = 0.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <span ref={ref} className={`relative inline-block text-rtm-cobalt ${className}`}>
      {children}
      <motion.span
        className="absolute left-0 bottom-0 h-[2px] bg-rtm-yellow block"
        initial={{ width: '0%' }}
        animate={inView ? { width: '100%' } : { width: '0%' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay }}
      />
    </span>
  );
}