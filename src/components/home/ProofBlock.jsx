import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const STATS = [
  { value: '80,000+', label: 'Cases projected nationwide in 2026' },
  { value: '13,266', label: 'Cases in a single regional market (2024)' },
  { value: 'Total Wine & More, HEB, Circle K, Albertsons', label: 'Chain authorizations secured' },
  { value: 'Sep 2025', label: 'RTM took over national representation' },
];

export default function ProofBlock() {
  return (
    <section className="py-24 md:py-32" style={{ background: '#FFFCF5', borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="font-eyebrow text-xs tracking-widest uppercase block mb-4" style={{ color: '#0A2454' }}>In Market</span>
          <h2 className="font-display text-3xl md:text-4xl mb-3 leading-tight" style={{ color: '#0A2454' }}>
            Our fastest-growing <em style={{ color: '#F4C430' }}>wine-based soju brand</em>
          </h2>
          <p className="font-footnote text-xs tracking-widest uppercase" style={{ color: '#0A2454' }}>
            Up from 13,266 cases in a single regional market (2024)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-[18px] border p-8 flex flex-col gap-4"
              style={{ background: '#0A2454', borderColor: 'rgba(244,196,48,0.45)' }}
            >
              <div className="font-display text-2xl md:text-3xl leading-tight" style={{ color: '#F4C430' }}>
                {stat.value}
              </div>
              <div className="font-eyebrow text-xs uppercase tracking-widest leading-relaxed" style={{ color: 'rgba(248,243,232,0.75)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 font-eyebrow text-sm tracking-widest uppercase transition-colors duration-300 group"
            style={{ color: '#0A2454' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#D9A91A'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#0A2454'; }}
          >
            View Portfolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}