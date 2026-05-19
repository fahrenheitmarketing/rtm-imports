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
    title: 'Fearless Creativity',
    description: 'We pursue categories and producers that others overlook. Asian beverage alcohol was a niche before it was a trend — we were already there.',
  },
  {
    icon: Zap,
    title: 'Aggressive Adaptability',
    description: 'The U.S. wholesale landscape is consolidating rapidly. Our independence and lean operating model mean we move faster than any generalist importer.',
  },
  {
    icon: Shield,
    title: 'Relationship-First Execution',
    description: 'Long-term partnerships — with Asian producers and national wholesalers alike — are the foundation of everything we do. Trust is built over decades, not campaigns.',
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
              Thirty years in the category.
              <GoldUnderline className="italic block"> Built to move first.</GoldUnderline>
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
                  RTM Imports is a San Antonio-based importer of Asian beverage alcohol with more than <strong className="text-foreground">30 years of operational history</strong> in the category. Originally established in the early 1990s alongside one of the largest wholesale networks in the country, RTM was formally structured as an independent LLC and has been led by Benjamin Roberts since 2016.
                </p>
                <p>
                  We operate exclusively in the <strong className="text-foreground">B2B wholesale channel</strong> — working with the largest national beverage wholesalers and their chain teams across both on-premise and off-premise. We do not sell to consumers. We do not chase broad portfolios. We exist to serve our wholesale partners.
                </p>
                <p>
                  Our specialization spans South Korea, Japan, China, Thailand, and Taiwan — covering the most significant growth segments in the U.S. market: soju, sake, shochu, Korean beer, Japanese whisky, and Asian RTDs. We were building relationships in these markets long before the mainstream conversation arrived.
                </p>
                <p>
                  We stick to what we know we do well. No filler, no noise — just results.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card border border-border p-6 text-center">
                  <div className="font-display text-3xl text-primary mb-2">30+</div>
                  <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">Years in Category</p>
                </div>
                <div className="bg-card border border-border p-6 text-center">
                  <div className="font-display text-3xl text-primary mb-2">25+</div>
                  <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">Wholesale Partners</p>
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
      <section className="py-24 md:py-32 text-center relative" style={{ backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/291358c6a_Gemini_Generated_Image_6ze67b6ze67b6ze6.png)', backgroundRepeat: 'repeat', backgroundSize: '500px' }}>
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Let's find your <GoldUnderline className="italic">route.</GoldUnderline>
            </h2>
            <p className="font-body text-base text-white leading-relaxed mb-8">
              Whether you're an Asian producer evaluating U.S. market entry, or a wholesaler looking to strengthen your portfolio in the fastest-growing beverage category, we'd like to hear from you.
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