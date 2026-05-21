import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const SERVICES = [
  {
    number: '01',
    title: 'Products We Represent',
    description: 'Thirty years of representing beverages at both ends of the spectrum, from the world\'s finest wine and spirit producers to the fastest-emerging categories in the market. Our producer relationships and wholesale infrastructure span categories and continents. Asian beverage is the newest addition to our portfolio and currently the highest-growth segment in the US market.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/d3a797d59_image.png',
    path: '/products/asian-beverage',
  },
  {
    number: '02',
    title: 'Custom Labels',
    description: 'Producer relationships across all major producing regions are available to retailers and operators building proprietary brands. From liquid development to label approval to wholesaler onboarding, end-to-end, without the catalog.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/99ef3b2d5_image.png',
    path: '/products/custom-labels',
  },
  {
    number: '03',
    title: 'Compliance & Licensing',
    description: 'An active importer and wholesaler license network covering all 50 states. We handle both federal TTB compliance and state-level registration, making this infrastructure available to select producers and retailers so you don\'t have to build it from scratch.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/bf0be4185_generated_ed6f371b.png',
    path: '/products/compliance',
  },
];

export default function ExpertiseSection() {
  return (
    <section className="py-24 md:py-32" style={{
      backgroundImage: `linear-gradient(rgba(26, 45, 74, 0.15), rgba(26, 45, 74, 0.15)), url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/a988dfd7c_ChatGPTImageMay20202609_37_01PM.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading
          title="What we do"
          description="Three disciplines. Thirty years of doing them well."
          variant="light"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group bg-rtm-white hover:-translate-y-0.5 transition-transform duration-200"
              style={{ borderRadius: '4px', border: '1px solid var(--rtm-stone-light)' }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ borderRadius: '4px 4px 0 0' }}
                />
                <span className="absolute top-4 left-4 font-display text-4xl text-rtm-yellow/60 italic font-normal">
                  {service.number}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold uppercase tracking-[0.06em] text-rtm-ink mb-3">{service.title}</h3>
                <p className="font-body text-sm text-rtm-ink-soft leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  to={service.path}
                  className="inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-rtm-cobalt hover:text-rtm-cobalt-deep transition-colors duration-200 group/link"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}