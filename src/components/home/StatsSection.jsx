import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '50', suffix: '+', label: 'States Served' },
  { value: '100', suffix: '+', label: 'Wholesale Partners' },
  { value: '3', suffix: '', label: 'Core Disciplines' },
  { value: '1', suffix: '', label: 'Singular Focus' },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl text-primary mb-2">
                {stat.value}<span className="text-primary/60">{stat.suffix}</span>
              </div>
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}