import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const NETWORK_IMAGE = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/33f99e170_generated_db9c9aed.png';

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={NETWORK_IMAGE}
          alt="Global trade network visualization"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">
              Let's Work Together
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Ready to bring your
              <span className="italic text-primary"> product to market?</span>
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-10">
              Drop us a line to discover how RTM can take your project from concept to shelf. Our streamlined processes and national network are ready to work for you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
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