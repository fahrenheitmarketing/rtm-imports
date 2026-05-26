import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Users, Package } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GoldUnderline from '../components/GoldUnderline';

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
      <section className="pt-28 md:pt-36 pb-24 min-h-[50vh] flex items-end" style={{ background: '#0A2454' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-eyebrow text-xs tracking-widest uppercase block mb-8" style={{ color: 'rgba(244,196,48,0.9)' }}>Wholesale Partners</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl" style={{ color: '#F8F3E8' }}>
              The fastest-growing category in the U.S. market. <GoldUnderline>The brands, the infrastructure, and the team to move it.</GoldUnderline>
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
            variant="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_CARRY.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="rounded-[18px] border p-8 hover:shadow-md transition-all duration-300"
                style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}
              >
                <div className="w-12 h-12 border rounded-full flex items-center justify-center mb-5" style={{ borderColor: 'rgba(244,196,48,0.45)' }}>
                  <item.icon className="w-5 h-5 text-rtm-cobalt" />
                </div>
                <h3 className="font-display text-xl mb-3" style={{ color: '#0A2454' }}>{item.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#0A2454' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In Market Proof */}
      <section className="py-24 md:py-32" style={{ background: '#FFFCF5', borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                label="In Market"
                title="Proof of performance"
                variant="light"
              />
              <div className="space-y-5 font-body text-base leading-relaxed" style={{ color: 'rgba(26,24,20,0.75)' }}>
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
                <div key={item.label} className="rounded-[18px] border p-6 flex items-center gap-6" style={{ background: '#F2EBDE', borderColor: 'rgba(244,196,48,0.45)' }}>
                  <div className="font-display text-3xl text-rtm-cobalt min-w-[100px]">{item.stat}</div>
                  <p className="font-body text-sm" style={{ color: '#0A2454' }}>{item.label}</p>
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
            variant="dark"
          />
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(248,243,232,0.75)' }}>
              RTM's active wholesale partners include some of the largest and most respected names in US beverage distribution.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(248,243,232,0.75)' }}>
              RTM works with the largest national beverage wholesalers and their chain teams across both on-premise and off-premise. Our relationships are built on track record and mutual benefit — not cold outreach.
            </p>
          </div>
        </div>
      </section>

      {/* What's Available */}
      <section className="py-24 md:py-32" style={{ background: '#FFFCF5', borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
                className="rounded-[18px] border p-6 hover:shadow-md transition-all duration-300"
                style={{ background: '#F2EBDE', borderColor: 'rgba(244,196,48,0.45)' }}
              >
                <h4 className="font-display text-lg mb-2" style={{ color: '#0A2454' }}>{item.category}</h4>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,24,20,0.7)' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center" style={{ background: '#0A2454', borderTop: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: '#F8F3E8' }}>
              Ready to add the fastest-growing category to <GoldUnderline>your portfolio?</GoldUnderline>
            </h2>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'rgba(248,243,232,0.85)' }}>
              Contact our sales team to discuss brand availability, pricing, and market-specific support. We respond to all wholesale inquiries within 24 business hours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 group rounded-lg"
              style={{ background: '#F4C430', color: '#0A2454' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D9A91A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F4C430'; }}
            >
              Contact the Sales Team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}