import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Palette, FileCheck, TrendingUp, Users, BarChart3 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const SERVICES_HERO = '/__generating__/img_d214354e5d2b.png';

const SERVICES = [
  {
    id: 'asian-beverage',
    icon: Globe,
    title: 'Asian Beverage',
    subtitle: 'Leading the fastest-growing category',
    image: '/__generating__/img_fe34159e76d5.png',
    description: 'Asian beverage is one of the few categories showing significant growth, specifically within the Gen Z age demographic. RTM has become a leader within this trend with national brands that span this diverse category.',
    features: [
      'Premium distilled spirits (sake, soju, shochu)',
      'Craft beer and specialty brews',
      'Wine-based ready-to-drink brands',
      'Market positioning and brand strategy',
    ],
  },
  {
    id: 'custom-labels',
    icon: Palette,
    title: 'Custom Labels',
    subtitle: 'Private label programs built on quality',
    image: '/__generating__/img_923af50453de.png',
    description: 'As competition increases, so does the need for differentiation and brand loyalty. Our curated relationships with established producers in Europe offer our customers a core selection of products to meet the majority of their needs.',
    features: [
      'Established European producer relationships',
      'Quality-focused curation over volume',
      'Exclusive private-label development',
      'Brand differentiation strategy',
    ],
  },
  {
    id: 'compliance',
    icon: FileCheck,
    title: 'Compliance & Licensing',
    subtitle: 'Nationwide regulatory infrastructure',
    image: '/__generating__/img_acc9271550c8.png',
    description: 'Working with national wholesalers and retailers requires a comprehensive setup of licenses and wholesaler relationships nationwide. We offer this network to select producers and national retailers looking to create their own brands.',
    features: [
      'Comprehensive license network across 50+ states',
      'Wholesaler relationship management',
      'Regulatory compliance consulting',
      'Market entry support for new brands',
    ],
  },
];

const ADVANTAGES = [
  { icon: TrendingUp, title: 'Speed to Market', description: 'Lean processes mean faster timelines from concept to shelf.' },
  { icon: Users, title: 'Partner-Centric', description: 'We serve your goals, not our own product agenda.' },
  { icon: BarChart3, title: 'Data-Driven', description: 'Market intelligence informs every strategic recommendation.' },
];

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={SERVICES_HERO} alt="Premium spirits being poured" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">Our Services</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-2xl">
              Three disciplines. <span className="italic text-primary">One focus.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                idx % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                </div>
              </div>

              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <service.icon className="w-5 h-5 text-primary" />
                  <span className="font-body text-xs tracking-widest uppercase text-primary">{service.subtitle}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">{service.title}</h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="font-body text-sm text-secondary-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="The RTM Advantage"
            title="Why partner with us"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ADVANTAGES.map((adv, idx) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="text-center p-8"
              >
                <div className="w-14 h-14 mx-auto mb-6 border border-primary/30 rounded-full flex items-center justify-center">
                  <adv.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{adv.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-background text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Have a project <span className="italic text-primary">in mind?</span>
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              We'd love to learn about your brand and explore how our services can serve your goals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}