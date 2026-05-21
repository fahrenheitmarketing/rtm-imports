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
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading
          title="What we do"
          description="Three disciplines. Thirty years of doing them well."
          variant="dark"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group rounded-[18px] overflow-hidden border"
              style={{ borderColor: 'rgba(244,196,48,0.45)', background: '#FFFCF5' }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 font-display text-4xl font-bold" style={{ color: 'rgba(244,196,48,0.5)' }}>
                  {service.number}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-rtm-ink mb-3">{service.title}</h3>
                <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'rgba(26,24,20,0.7)' }}>
                  {service.description}
                </p>
                <Link
                  to={service.path}
                  className="inline-flex items-center gap-2 font-eyebrow text-xs tracking-widest uppercase text-rtm-cobalt hover:text-rtm-yellow transition-colors duration-300 group/link"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}