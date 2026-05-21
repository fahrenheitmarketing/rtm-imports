import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/4af9a8ea6_generated_image.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '500px',
      }}
    >
      <div className="absolute inset-0 bg-rtm-ink/88" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep block mb-4">
              Let's Work Together
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.02em] text-rtm-white leading-tight mb-4">
              A specialist partner
            </h2>
            <p className="font-display italic text-2xl md:text-3xl text-rtm-yellow mb-6">for serious brands.</p>
            <p className="font-body text-base text-rtm-stone-light leading-relaxed mb-10">
              RTM operates exclusively in the B2B wholesale channel, working with the largest national beverage wholesalers across on- and off-premise. If you are a producer seeking U.S. market entry or a wholesale partner evaluating your beverage portfolio, we would like to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-rtm-cobalt text-white font-heading text-xs font-semibold uppercase tracking-[0.08em] hover:bg-rtm-cobalt-deep transition-all duration-200 hover:-translate-y-px group"
              style={{ borderRadius: '2px' }}
            >
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}