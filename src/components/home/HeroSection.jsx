import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GoldUnderline from '../GoldUnderline';

export default function HeroSection() {
  return (
    <section
      className="relative pt-44 md:pt-52 pb-24 md:pb-32 overflow-hidden"
      style={{
        background: '#0A2454',
        backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/67555098b_Group7.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle hairline bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(244,196,48,0.45)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="font-eyebrow text-xs tracking-widest uppercase block mb-8" style={{ color: 'rgba(244,196,48,0.9)' }}>
            Route to Market Imports
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6" style={{ color: '#F8F3E8' }}>
            America's specialist
            <span className="block">
              beverage <GoldUnderline>importer.</GoldUnderline>
            </span>
          </h1>
          <p className="font-body text-lg leading-relaxed mb-10 max-w-lg" style={{ color: 'rgba(248,243,232,0.85)' }}>
            A thirty-year track record across wine, spirits, and emerging categories. A national wholesale network and the instinct to find the brands and markets driving the next chapter of beverage alcohol in the U.S.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 group rounded-lg"
              style={{ background: '#0A2454', color: '#F4C430', border: '1px solid rgba(244,196,48,0.45)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F4C430'; e.currentTarget.style.color = '#0A2454'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0A2454'; e.currentTarget.style.color = '#F4C430'; }}
            >
              Our Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 rounded-lg"
              style={{ color: 'rgba(248,243,232,0.85)', border: '1px solid rgba(248,243,232,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(244,196,48,0.45)'; e.currentTarget.style.color = '#F4C430'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,243,232,0.25)'; e.currentTarget.style.color = 'rgba(248,243,232,0.85)'; }}
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}