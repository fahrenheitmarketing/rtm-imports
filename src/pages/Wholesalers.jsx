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
    title: 'Category Momentum',
    description: 'Soju has more than doubled in the U.S. over the past five years, reaching approximately $935 million in 2024. Wine-based RTDs are among the fastest-growing SKUs at retail. These are not emerging trends — they are established, growing categories with strong margins and an engaged consumer base.',
  },
  {
    icon: CheckCircle,
    title: 'Proven Velocity',
    description: "RTM's fastest-growing wine-based soju brand is now stocked in markets across the country, with chain authorizations at major retail and convenience groups. Velocity data and case study details are available on request.",
  },
  {
    icon: Users,
    title: 'National Reach, Focused Portfolio',
    description: 'RTM sells into all 50 states through an active network of wholesale partners. We maintain a deliberately focused current portfolio, giving your team fewer SKUs to manage, more attention per brand, and better sell-through.',
  },
  {
    icon: Package,
    title: 'Sales Support',
    description: 'We provide tech sheets, sell sheets, chain authorization documentation, and market-level sales support for every brand in our portfolio. Our national sales manager works directly with market leads to drive velocity and solve placement challenges.',
  },
  {
    icon: TrendingUp,
    title: 'Transparent Pricing',
    description: 'RTM shares full cost and margin data with our wholesale partners. That transparency allows both sides to build programs and pricing structures that work efficiently and without surprises.',
  },
];

export default function Wholesalers() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-80 min-h-[60vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Wholesale distribution network" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-rtm-ink via-rtm-ink/80 to-rtm-ink/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep block mb-8">Wholesale Partners</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.01em] text-rtm-white leading-tight max-w-2xl">
              The fastest-growing category in the U.S. market.{' '}
              <span className="font-display font-normal normal-case italic text-rtm-yellow">
                <GoldUnderline>The brands, the infrastructure, and the team to move it.</GoldUnderline>
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Why Carry RTM */}
      <section className="py-24 md:py-32" style={{
        backgroundImage: `linear-gradient(rgba(26, 45, 74, 0.12), rgba(26, 45, 74, 0.12)), url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/a988dfd7c_ChatGPTImageMay20202609_37_01PM.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Why Carry RTM Brands"
            title="What we bring to your portfolio"
            description="RTM operates exclusively in the B2B wholesale channel. We are not a competitor — we are your supplier, your support team, and your category specialist."
            variant="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_CARRY.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-rtm-white border border-rtm-stone-light p-8 hover:-translate-y-0.5 hover:border-rtm-cobalt transition-all duration-200"
                style={{ borderRadius: '4px' }}
              >
                <div className="w-10 h-10 border border-rtm-cobalt/30 flex items-center justify-center mb-5" style={{ borderRadius: '2px' }}>
                  <item.icon className="w-5 h-5 text-rtm-cobalt" />
                </div>
                <h3 className="font-heading text-base font-bold uppercase tracking-[0.06em] text-rtm-ink mb-3">{item.title}</h3>
                <p className="font-body text-sm text-rtm-ink-soft leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In Market Proof */}
      <section className="py-24 md:py-32 bg-rtm-cream-warm border-y border-rtm-stone-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                label="In Market"
                title="Proof of performance"
                variant="dark"
              />
              <div className="space-y-5 font-body text-base text-rtm-ink-soft leading-relaxed">
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
                <div key={item.label} className="bg-rtm-white border border-rtm-stone-light p-6 flex items-center gap-6" style={{ borderRadius: '4px' }}>
                  <div className="font-display text-3xl text-rtm-cobalt italic tabular-nums min-w-[100px]">{item.stat}</div>
                  <p className="font-body text-sm text-rtm-ink-soft">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Network */}
      <section className="py-24 md:py-32 bg-rtm-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Our Wholesale Network"
            title="National reach. Local relationships."
            align="center"
            variant="dark"
          />
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="font-body text-base text-rtm-ink-soft leading-relaxed">
              RTM's active wholesale partners include some of the largest and most respected names in US beverage distribution.
            </p>
            <p className="font-body text-base text-rtm-ink-soft leading-relaxed">
              RTM works with the largest national beverage wholesalers and their chain teams across both on-premise and off-premise. Our relationships are built on track record and mutual benefit — not cold outreach.
            </p>
          </div>
        </div>
      </section>

      {/* What's Available */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{
        backgroundImage: `url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/c56d4a08c_Yobo.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-rtm-ink via-rtm-ink/85 to-rtm-ink/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Featured Brands"
            title="Available for wholesale distribution"
            description="Our current Asian beverage portfolio is available to qualified wholesale partners. Portfolio scope is expanding — contact us for a full current brand list."
            align="center"
            variant="light"
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
                className="bg-rtm-white/10 border border-white/20 p-6 hover:bg-rtm-white/15 hover:border-white/35 transition-colors duration-200"
                style={{ borderRadius: '4px' }}
              >
                <h4 className="font-heading text-base font-bold uppercase tracking-[0.06em] text-rtm-white mb-2">{item.category}</h4>
                <p className="font-body text-sm text-white/75 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-rtm-cream text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-[0.02em] text-rtm-ink mb-6">
              Ready to add the fastest-growing category to{' '}
              <span className="font-display font-normal normal-case italic text-rtm-cobalt">
                <GoldUnderline>your portfolio?</GoldUnderline>
              </span>
            </h2>
            <p className="font-body text-base text-rtm-ink-soft leading-relaxed mb-8">
              Contact our sales team to discuss brand availability, pricing, and market-specific support. We respond to all wholesale inquiries within 24 business hours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-rtm-cobalt text-white font-heading text-xs font-semibold uppercase tracking-[0.08em] hover:bg-rtm-cobalt-deep transition-all duration-200 hover:-translate-y-px group"
              style={{ borderRadius: '2px' }}
            >
              Contact the Sales Team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}