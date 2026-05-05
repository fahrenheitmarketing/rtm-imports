import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const SERVICES = [
  {
    number: '01',
    title: 'Asian Beverage',
    description: 'Three decades of dedicated sourcing across South Korea, Japan, China, Thailand, and Taiwan. Soju and wine-based RTDs are our primary category — the highest-growth segments in the U.S. market, covered by a specialist who was building producer relationships long before the mainstream arrived.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/369a4f0ab_generated_b2886f05.png',
  },
  {
    number: '02',
    title: 'Custom Labels',
    description: 'Curated relationships with quality producers across Europe and Asia, available to retailers and operators building proprietary brands. From liquid development to label approval to wholesaler onboarding — end-to-end, no catalog required.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/e0f7395d8_generated_bf53f207.png',
  },
  {
    number: '03',
    title: 'Compliance & Licensing',
    description: 'An active importer and wholesaler license network covering all 50 states, built over 30+ years of operating in the U.S. market. We make this infrastructure available to select producers and retailers — so you don\'t have to build it from scratch.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/bf0be4185_generated_ed6f371b.png',
  },
];

export default function ExpertiseSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading
          label="Areas of Expertise"
          title="What we do best"
          description="Three core disciplines. One singular focus: getting your product to market."
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
                to="/services"
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