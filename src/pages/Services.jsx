import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Palette, FileCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GoldUnderline from '../components/GoldUnderline';

const SERVICES_HERO = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

const SERVICES = [
  {
    id: 'asian-beverage',
    path: '/products/asian-beverage',
    icon: Globe,
    label: 'Products We Represent',
    title: '',
    description: 'Thirty years of representing beverages at both ends of the spectrum, from the world\'s finest wine and spirit producers to the fastest-emerging categories in the market. Our producer relationships and wholesale infrastructure span categories and continents. Asian beverage is the newest addition to our portfolio and currently the highest-growth segment in the US market.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/d3a797d59_image.png',
    cta: 'Explore Asian Beverages',
  },
  {
    id: 'custom-labels',
    path: '/products/custom-labels',
    icon: Palette,
    label: 'Custom Labels',
    title: 'Your brand. Our expertise. Their shelf.',
    description: 'Producer relationships across all major producing regions available to retailers and operators building proprietary brands. From liquid development to label approval to wholesaler onboarding, end-to-end, without the catalog.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/99ef3b2d5_image.png',
    cta: 'Explore Custom Labels',
  },
  {
    id: 'compliance',
    path: '/products/compliance',
    icon: FileCheck,
    label: 'Compliance & Licensing',
    title: 'The infrastructure that enables national distribution',
    description: 'An active importer and wholesaler license network covering all 50 states. We handle both federal TTB compliance and state-level registration, making this infrastructure available to select producers and retailers so you don\'t have to build it from scratch.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/bf0be4185_generated_ed6f371b.png',
    cta: 'Explore Compliance',
  },
];

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 min-h-[60vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={SERVICES_HERO} alt="Premium spirits" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-rtm-ink via-rtm-ink/90 to-rtm-ink/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep block mb-8">What We Bring to Market</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.01em] text-rtm-white leading-tight max-w-2xl">
              Three disciplines.{' '}
              <span className="font-display font-normal normal-case italic text-rtm-yellow">
                <GoldUnderline>One focus.</GoldUnderline>
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Overview intro */}
      <section className="py-24 md:py-32 bg-rtm-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="font-display text-2xl md:text-3xl text-rtm-ink leading-relaxed italic">
                RTM Imports operates across three disciplines. Every brand in our current focus portfolio is actively distributed through our national wholesale network. Every service we offer is built on decades of doing this well.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24 md:pb-32 bg-rtm-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative overflow-hidden aspect-[4/3]" style={{ borderRadius: '4px' }}>
                  <img src={service.image} alt={service.label} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <service.icon className="w-5 h-5 text-rtm-cobalt" />
                  <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-cobalt">{service.label}</span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-[0.02em] text-rtm-ink mb-6">{service.title}</h2>
                <p className="font-body text-base text-rtm-ink-soft leading-relaxed mb-8">
                  {service.description}
                </p>
                <Link
                  to={service.path}
                  className="inline-flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-rtm-cobalt hover:text-rtm-cobalt-deep transition-colors duration-200 group"
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-rtm-cream-warm border-t border-rtm-stone-light text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-[0.02em] text-rtm-ink mb-6">
              A specialist partner for{' '}
              <span className="font-display font-normal normal-case italic text-rtm-cobalt">
                <GoldUnderline>serious brands.</GoldUnderline>
              </span>
            </h2>
            <p className="font-body text-base text-rtm-ink-soft leading-relaxed mb-8">
              RTM operates exclusively in the B2B wholesale channel. If you are a producer seeking U.S. market entry, or a wholesale partner evaluating your beverage portfolio, we would like to hear from you.
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
      </section>
    </>
  );
}