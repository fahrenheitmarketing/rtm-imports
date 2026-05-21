import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: '#0A2454', borderTop: '1px solid rgba(244,196,48,0.45)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-eyebrow text-xs tracking-widest uppercase block mb-4" style={{ color: 'rgba(244,196,48,0.9)' }}>
              Let's Work Together
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-6" style={{ color: '#F8F3E8' }}>
              A specialist partner
              <span className="italic" style={{ color: '#F4C430' }}> for serious brands.</span>
            </h2>
            <p className="font-body text-base leading-relaxed mb-10" style={{ color: 'rgba(248,243,232,0.85)' }}>
              RTM operates exclusively in the B2B wholesale channel, working with the largest national beverage wholesalers across on- and off-premise. If you are a producer seeking U.S. market entry or a wholesale partner evaluating your beverage portfolio, we would like to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 group rounded-lg"
              style={{ background: '#F4C430', color: '#0A2454' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D9A91A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F4C430'; }}
            >
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}