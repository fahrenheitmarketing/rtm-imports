import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const STATS = [
  { value: '80,000+', label: 'cases projected nationwide in 2026' },
  { value: '13,266', label: 'cases in a single regional market (2024)' },
  { value: 'Total Wine & More, HEB, Circle K, Albertsons', label: 'Chain authorizations' },
  { value: 'September 2025', label: 'RTM took over national representation' },
];

export default function ProofBlock() {
  return (
    <section className="py-24 md:py-32 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">In Market</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3 leading-tight">
            Our fastest-growing <em>wine-based soju brand</em>
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-12 tracking-widest uppercase">
            Up from 13,266 cases in a single regional market (2024)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-background p-8"
              >
                <div className="font-display text-xl md:text-2xl text-primary mb-2 leading-tight">{stat.value}</div>
                <div className="font-body text-xs text-muted-foreground uppercase tracking-widest leading-relaxed">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 font-body text-sm tracking-widest uppercase text-primary hover:text-foreground transition-colors duration-300 group"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}