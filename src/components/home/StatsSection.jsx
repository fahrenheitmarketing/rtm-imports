import React from 'react';
import { motion } from 'framer-motion';
import useCountUp from '../../hooks/useCountUp';

const STATS = [
  { value: '30', suffix: '+', label: 'Years in the Industry' },
  { value: '25', suffix: '+', label: 'Wholesale Partners' },
  { value: '50', suffix: '', label: 'States Served' },
  { value: '1', suffix: '', label: 'Singular Focus' },
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
      <div className="font-display text-4xl md:text-5xl text-primary mb-2">
        {count}<span className="text-primary/60">{stat.suffix}</span>
      </div>
      <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section
      className="py-20 border-y border-border relative"
      style={{
        backgroundImage: `url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/6eb369566_Gemini_Generated_Image_6ze67b6ze67b6ze6.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: '500px auto',
      }}
    >
      <div className="absolute inset-0 bg-background/70" />
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