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
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/369a4f0ab_generated_b2886f05.png',
    path: '/products/asian-beverage',
  },
  {
    number: '02',
    title: 'Custom Labels',
    description: 'Producer relationships across all major producing regions are available to retailers and operators building proprietary brands. From liquid development to label approval to wholesaler onboarding, end-to-end, without the catalog.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/e0f7395d8_generated_bf53f207.png',
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
          label="What We Do"
          title="What we do"
          description="Three disciplines. One focus: getting your product to market."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group"
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <span className="absolute top-4 left-4 font-display text-4xl text-primary/30 font-bold">
                  {service.number}
                </span>
              </div>
              <h3 className="font-display text-2xl text-foreground mb-3">{service.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <Link
                to={service.path}
                className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-primary hover:text-foreground transition-colors duration-300 group/link"
              >
                Learn More
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}