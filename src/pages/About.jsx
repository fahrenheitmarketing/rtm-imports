import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Zap, Shield } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GoldUnderline from '../components/GoldUnderline';

const ABOUT_HERO = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/0f2f100f9_generated_631bcf9a.png';

const VALUES = [
  {
    icon: Target,
    title: 'Singular Focus',
    description: 'We only exist to serve the needs of our customers. No competing agendas, no conflicting priorities — just your brand\'s success.',
  },
  {
    icon: Zap,
    title: 'Streamlined Efficiency',
    description: 'Our advantage is speed and simplicity. We cut through the complexity of beverage imports with lean, proven processes.',
  },
  {
    icon: Shield,
    title: 'Compliance First',
    description: 'A nationwide network of licenses and wholesaler relationships means your brand meets every regulatory requirement, every time.',
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[60vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img
            src={ABOUT_HERO}
            alt="Sophisticated bar setup with premium spirits"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">About Us</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-2xl">
              Built for <GoldUnderline className="italic">partners,</GoldUnderline> not portfolios.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                label="Our Story"
                title="What RTM stands for"
              />
              <div className="space-y-6 font-body text-base text-muted-foreground leading-relaxed">
                <p>
                  RTM Imports is what its name defines it as: a <strong className="text-foreground">Route to Market.</strong> We are not a traditional importer seeking to build the largest portfolio or the widest distribution footprint. We are a focused, efficient partner for brands that need a clear path from production to shelf.
                </p>
                <p>
                  Our focus is on developing and importing products for the adult beverage industry per the demands of our wholesale partners. Our advantage is our streamlined processes and our singular focus.
                </p>
                <p>
                  We stick to what we know we do well. No filler, no noise — just results.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border p-8">
                <span className="font-display text-6xl text-primary/20 block mb-2">"</span>
                <p className="font-display text-xl text-foreground italic leading-relaxed -mt-6">
                  We only exist to serve the needs of our customers, not to promote our own agenda, products or market positions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card border border-border p-6 text-center">
                  <div className="font-display text-3xl text-primary mb-2">50+</div>
                  <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">States</p>
                </div>
                <div className="bg-card border border-border p-6 text-center">
                  <div className="font-display text-3xl text-primary mb-2">100+</div>
                  <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Our Approach"
            title="Why RTM"
            description="While our competitors build massive portfolios and chase scale, we build focused partnerships and chase results."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="text-center p-8"
              >
                <div className="w-14 h-14 mx-auto mb-6 border border-primary/30 rounded-full flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{value.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-background text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Let's find your <GoldUnderline className="italic">route.</GoldUnderline>
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              Whether you're an established producer or an emerging brand, we'd love to hear about your project.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
            >
              Start the Conversation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}