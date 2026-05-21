import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GoldUnderline from '../GoldUnderline';

const HERO_IMAGE = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/238ecefcf_generated_image.png';

export default function HeroSection() {
  return (
    <section className="relative pt-80 min-h-[60vh] flex items-end pb-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Premium spirits collection in dramatic lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rtm-ink via-rtm-ink/70 to-rtm-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-rtm-ink/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep block mb-8">
            Route to Market Imports
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.01em] text-rtm-white leading-tight mb-6">
            America's specialist
            <span className="block font-display font-normal normal-case italic text-rtm-yellow">
              beverage <GoldUnderline>importer.</GoldUnderline>
            </span>
          </h1>
          <p className="font-body text-lg text-rtm-stone-light leading-relaxed mb-10 max-w-lg">
            A thirty-year track record across wine, spirits, and emerging categories. A national wholesale network and the instinct to find the brands and markets driving the next chapter of beverage alcohol in the U.S.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-rtm-cobalt text-white font-heading text-xs font-semibold uppercase tracking-[0.08em] hover:bg-rtm-cobalt-deep transition-all duration-200 hover:-translate-y-px group"
              style={{ borderRadius: '2px' }}
            >
              Our Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 border-2 border-rtm-stone-light text-rtm-white font-heading text-xs font-semibold uppercase tracking-[0.08em] hover:border-rtm-white transition-all duration-200"
              style={{ borderRadius: '2px' }}
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}