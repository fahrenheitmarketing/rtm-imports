import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GoldUnderline from '../GoldUnderline';

const HERO_IMAGE = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/f30f4272b_generated_3941d6fd.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Premium spirits collection in dramatic lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="font-body text-xs tracking-widest uppercase text-primary block mb-6">
            Route to Market Imports
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
          America's dedicated
          <span className="italic block">Asian beverage <GoldUnderline>specialist.</GoldUnderline></span>
          </h1>
          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
            More than 30 years of category depth. A national wholesale network. And a singular focus on the brands and markets that are driving the next chapter of beverage alcohol in the U.S.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
            >
              Our Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-body text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}