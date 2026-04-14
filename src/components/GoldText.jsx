import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function GoldText({ children, className = '', tag: Tag = 'span', animate = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <Tag ref={ref} className={`relative inline-block text-primary ${className}`}>
      {children}
      {animate && (
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-primary block"
          initial={{ width: '0%' }}
          animate={inView ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        />
      )}
    </Tag>
  );
}