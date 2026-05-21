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
      className="text-center"
    >
      <div className="font-display text-4xl md:text-5xl text-rtm-yellow font-normal italic mb-2 tabular-nums">
        {count}<span className="text-rtm-yellow/70">{stat.suffix}</span>
      </div>
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-rtm-stone-light">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section
      className="py-20 border-y border-rtm-ink-soft relative bg-rtm-ink"
      style={{
        backgroundImage: `url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/6eb369566_Gemini_Generated_Image_6ze67b6ze67b6ze6.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '500px auto',
      }}
    >
      <div className="absolute inset-0 bg-rtm-ink/80" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <StatItem key={stat.label} stat={stat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}