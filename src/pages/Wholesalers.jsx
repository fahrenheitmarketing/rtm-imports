import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Users, Package } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GoldUnderline from '../components/GoldUnderline';

const HERO_IMAGE = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/33f99e170_generated_db9c9aed.png';

const WHY_CARRY = [
  {
    icon: TrendingUp,
    title: 'Fastest-Growing Category',
    description: 'Asian beverage alcohol — led by soju and wine-based RTDs — is one of the few categories showing significant, sustained growth. Adding RTM brands means adding volume in a segment your competitors are scrambling to catch up to.',
  },
  {
    icon: Users,
    title: 'Built for the Wholesale Channel',
    description: 'We are a B2B-only operation. We do not sell direct to consumers. Every brand we represent is built to move through the wholesale channel, with sell sheets, pricing architecture, and marketing support designed for your sales team.',
  },
  {
    icon: Package,
    title: 'Proven Market Performance',
    description: "RTM's fastest-growing wine-based soju brand is now stocked in markets across the country, with chain authorizations at major retail and convenience groups. Velocity data and case study details are available on request.",
  },
];

const NETWORK_STATS = [
  { value: '25+', label: 'Active Wholesale Partners' },
  { value: '50', label: 'States Served' },
  { value: '30+', label: 'Years of Wholesaler Relationships' },
];

export default function Wholesalers() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Wholesale distribution network" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">Wholesale Partners</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-2xl">
              Built for the <GoldUnderline className="italic">wholesale channel.</GoldUnderline>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Why Carry RTM */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Why Carry RTM Brands"
            title="What we bring to your portfolio"
            description="RTM operates exclusively in the B2B wholesale channel. We are not a competitor — we are your supplier, your support team, and your category specialist."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_CARRY.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-card border border-border p-8 hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 border border-primary/30 rounded-full flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In Market Proof */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                label="In Market"
                title="Proof of performance"
              />
              <div className="space-y-5 font-body text-base text-foreground/80 leading-relaxed">
                <p>
                  Our fastest-growing wine-based soju brand demonstrates what focused national representation can deliver. Since RTM took over national representation in September 2025, the brand has achieved chain authorizations at Total Wine & More, HEB, Circle K, and Albertsons — with 80,000+ cases projected nationwide in 2026.
                </p>
                <p>
                  That growth came from 13,266 cases in a single regional market in 2024. The infrastructure, relationships, and execution model are already in place for your market.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { stat: '80,000+', label: 'Cases projected nationwide in 2026' },
                { stat: '13,266', label: 'Cases in a single regional market (2024)' },
                { stat: 'Sep 2025', label: 'RTM took over national representation' },
              ].map((item) => (
                <div key={item.label} className="bg-background border border-border p-6 flex items-center gap-6">
                  <div className="font-display text-3xl text-primary min-w-[100px]">{item.stat}</div>
                  <p className="font-body text-sm text-foreground/80">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Network */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Our Wholesale Network"
            title="National reach. Local relationships."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {NETWORK_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-card border border-border p-8 text-center"
              >
                <div className="font-display text-4xl text-primary mb-3">{stat.value}</div>
                <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-base text-foreground/80 leading-relaxed">
              RTM works with the largest national beverage wholesalers and their chain teams across both on-premise and off-premise. Our relationships are built on track record and mutual benefit — not cold outreach.
            </p>
          </div>
        </div>
      </section>

      {/* What's Available */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Featured Brands"
            title="Available for wholesale distribution"
            description="Our current Asian beverage portfolio is available to qualified wholesale partners. Portfolio scope is expanding — contact us for a full current brand list."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: 'Wine-Based Soju', description: 'The fastest-growing segment. Approachable, versatile, and resonating strongly with Gen Z and millennial consumers.' },
              { category: 'Korean Beer', description: 'Premium import beer from South Korea with strong on-premise velocity and growing off-premise presence.' },
              { category: 'Soju', description: 'Traditional and flavored soju from authentic Korean producers, positioned for on-premise activation.' },
              { category: 'Asian RTD', description: 'Ready-to-drink formats built on Asian flavor profiles — among the fastest-growing SKUs at retail.' },
              { category: 'Craft Beer', description: 'Distinctive Asian craft beer with compelling stories for specialty retail and on-premise accounts.' },
            ].map((item, idx) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-background border border-border p-6 hover:border-primary/40 transition-colors duration-300"
              >
                <h4 className="font-display text-lg text-foreground mb-2">{item.category}</h4>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">{item.description}</p>
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
              Ready to add RTM to <GoldUnderline className="italic">your portfolio?</GoldUnderline>
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed mb-8">
              Contact us to discuss current brand availability, pricing, and how RTM can support your sales team in the fastest-growing segment of beverage alcohol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border text-muted-foreground font-body text-sm tracking-widest uppercase hover:border-foreground hover:text-foreground transition-all duration-300"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}