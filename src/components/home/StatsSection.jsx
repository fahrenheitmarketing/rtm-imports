import React from 'react';
import { motion } from 'framer-motion';
import useCountUp from '../../hooks/useCountUp';

const STATS = [
  { value: '30', suffix: '+', label: 'Years in the Industry' },
  { value: '25', suffix: '+', label: 'Wholesale Partners' },
  { value: '50', suffix: '', label: 'States Served' },
  { value: '1000', suffix: '+', label: 'Brands Represented' },
];

function StatItem({ stat, idx }) {
  const { count, ref } = useCountUp(stat.value);
  return (
    <motion.div
      ref={ref}
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="text-center px-4 py-2"
    >
      <div
        className="font-display text-5xl md:text-7xl mb-2"
        style={{
          color: '#F8F3E8',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5), -1px -1px 1px rgba(255,255,255,0.06)',
          filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.4))',
        }}
      >
        {count}<span style={{ color: 'rgba(248,243,232,0.5)' }}>{stat.suffix}</span>
      </div>
      <p className="font-eyebrow text-xs tracking-widest uppercase" style={{ color: 'rgba(248,243,232,0.7)' }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section
      className="py-20 relative"
      style={{ background: '#0F3470', borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x"
          style={{ '--tw-divide-opacity': 1, borderColor: 'rgba(244,196,48,0.2)' }}
        >
          {STATS.map((stat, idx) => (
            <StatItem key={stat.label} stat={stat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}