import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, Users, Award } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import GoldUnderline from '../../components/GoldUnderline';
import FAQSection from '../../components/asian-beverage/FAQSection';

const CATEGORIES = [
  {
    title: 'Soju',
    description: 'The world\'s best-selling spirit by volume. Soju\'s clean, approachable profile and versatility make it a natural fit for the American on-premise market. We bring authentic Korean-produced soju brands designed for the U.S. palate.',
  },
  {
    title: 'Wine-Based RTD',
    description: 'Ready-to-drink beverages built on Asian flavor profiles are expanding rapidly across retail and on-premise. Our wine-based RTD portfolio captures the Gen Z and millennial consumer who wants premium, convenient, and culturally distinct.',
  },
  {
    title: 'Craft & Specialty Beer',
    description: 'Hokkaido Beer represents RTM\'s active position in Japanese craft and specialty beer — a segment gaining traction with an increasingly adventurous American beer drinker.',
  },
];

const STATS = [
  { value: '$935M', label: 'U.S. soju market value in 2024, more than doubled in 5 years' },
  { value: 'Gen Z', label: 'Primary growth demographic driving soju, sake, and Asian RTD demand' },
  { value: '30+', label: 'Years of import infrastructure behind our Asian beverage portfolio' },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What Asian beverage categories does RTM currently represent?", "acceptedAnswer": { "@type": "Answer", "text": "RTM's active portfolio is focused on soju — specifically wine-based soju, which currently comprises the majority of our SKU count — wine-based RTDs, and craft and specialty beer." } },
    { "@type": "Question", "name": "What is wine-based soju, and why does it matter for US distribution?", "acceptedAnswer": { "@type": "Answer", "text": "Wine-based soju is a Korean-origin spirit produced from a wine base rather than a distilled-grain base. In the US regulatory framework, this classification means it can be sold through all licensed channels, including grocery, convenience, and general off-premise." } },
  ]
};

export default function AsianBeverage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-24 min-h-[50vh] flex items-end" style={{ background: '#0A2454' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link to="/services" className="font-eyebrow text-xs tracking-widest uppercase hover:text-rtm-yellow transition-colors mb-4 block" style={{ color: 'rgba(248,243,232,0.5)' }}>
              ← Services
            </Link>
            <span className="font-eyebrow text-xs tracking-widest uppercase block mb-4" style={{ color: 'rgba(244,196,48,0.9)' }}>Asian Beverages</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl" style={{ color: '#F8F3E8' }}>
              The newest addition to our portfolio. <GoldUnderline>Our most active growth category in the US market.</GoldUnderline>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                label="The Opportunity"
                title="Why Asian beverages, why now"
                variant="dark"
              />
              <div className="space-y-5 font-body text-base leading-relaxed" style={{ color: 'rgba(248,243,232,0.75)' }}>
                <p>
                  Soju has more than doubled in the U.S. over the past five years, reaching approximately $935 million in 2024. Growth is driven by Gen Z and millennial demand, the global reach of K-culture, and accessible pricing, validated by major mainstream players now entering the space.
                </p>
                <p>
                  Wine-based RTDs built on authentic Asian flavor profiles are expanding rapidly across retail and on-premise, capturing Gen Z and millennial consumers who want premium, convenient, and culturally distinct. It is the category RTM has moved into ahead of the curve, and it is where our portfolio is most active today.
                </p>
                <p>
                  When RTM identified the Asian beverage opportunity, we brought to the category what most new entrants lacked: three decades of import infrastructure, wholesale relationships, and operational experience. Building that from scratch takes years. We already had it.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {STATS.map((stat) => (
                <div key={stat.value} className="rounded-[18px] border p-6 flex items-center gap-6" style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}>
                  <div className="font-display text-4xl text-rtm-cobalt min-w-[80px]">{stat.value}</div>
                  <p className="font-body text-sm" style={{ color: '#0A2454' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 md:py-32" style={{ background: '#FFFCF5', borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="What We Bring"
            title="Our Asian beverage portfolio"
            description="RTM represents brands across the full spectrum of Asian beverages, focused on quality producers and authentic stories that resonate with today's consumer."
            align="center"
            variant="light"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-[18px] border p-8 hover:shadow-md transition-all duration-300"
                style={{ background: '#F2EBDE', borderColor: 'rgba(244,196,48,0.45)' }}
              >
                <h3 className="font-display text-xl mb-3" style={{ color: '#0A2454' }}>{cat.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#0A2454' }}>{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <span className="font-eyebrow text-xs tracking-widest uppercase block mb-4" style={{ color: 'rgba(244,196,48,0.9)' }}>Wine-Based Soju — Case Study</span>
            <h2 className="font-display text-3xl md:text-4xl mb-2" style={{ color: '#F8F3E8' }}>In Market</h2>
            <p className="font-body text-lg italic" style={{ color: 'rgba(248,243,232,0.5)' }}>From regional to national</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
            <div className="space-y-6 font-body text-base leading-relaxed" style={{ color: 'rgba(248,243,232,0.75)' }}>
              <p>RTM reviewed distributor sales and profit data and identified a wine-based soju brand performing exceptionally well in a single regional market: strong numbers, minimal market penetration, and significant room to grow.</p>
              <p>After direct meetings with the brand owner, RTM was awarded representation rights in a small number of markets. Within twelve months, RTM tripled its previous sales and expanded its representation to most states nationally.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              {[
                { value: '80,000+ cases', label: 'Projected nationwide in 2026' },
                { value: 'Up from 13,266 cases', label: 'In a single regional market (2024)' },
                { value: 'Chain authorizations secured', label: 'Total Wine & More, HEB, Circle K, Albertsons' },
                { value: 'National representation began', label: 'September 2025' },
              ].map((item) => (
                <div key={item.label} className="rounded-[18px] border p-6" style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}>
                  <div className="font-display text-xl text-rtm-cobalt mb-2">{item.value}</div>
                  <p className="font-body text-sm" style={{ color: '#0A2454' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 md:py-32" style={{ background: '#FFFCF5', borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Our Process"
            title="How we bring your brand to the U.S."
            variant="light"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, step: '01', title: 'Producer Sourcing', description: 'We travel to origin regions, visit facilities, and vet producers on quality, authenticity, and capacity to meet U.S. import standards. This includes regular visits to Asia, with our on-the-ground presence expanding as our portfolio grows.' },
              { icon: TrendingUp, step: '02', title: 'Market Positioning', description: 'We define the right consumer, the right channel, and the right price architecture for each brand before a single bottle enters the country. We identify trends from distributor sales and profit reports before the market publicly confirms them.' },
              { icon: Users, step: '03', title: 'Wholesaler Activation', description: 'Our wholesale partner network means your brand has advocacy at the distributor level nationwide, critical for market penetration and sustainable velocity.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative p-8 rounded-[18px] border"
                style={{ background: '#F2EBDE', borderColor: 'rgba(244,196,48,0.45)' }}
              >
                <span className="font-display text-6xl block mb-4" style={{ color: 'rgba(244,196,48,0.2)' }}>{item.step}</span>
                <div className="flex items-center gap-3 mb-3 -mt-8">
                  <item.icon className="w-5 h-5 text-rtm-cobalt" />
                  <h3 className="font-display text-xl" style={{ color: '#0A2454' }}>{item.title}</h3>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#0A2454' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <section className="py-24 md:py-32 text-center" style={{ background: '#0A2454', borderTop: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Award className="w-10 h-10 text-rtm-yellow mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: '#F8F3E8' }}>
              Ready to bring your Asian <GoldUnderline>brand to America?</GoldUnderline>
            </h2>
            <p className="font-body text-base leading-relaxed mb-10" style={{ color: 'rgba(248,243,232,0.85)' }}>
              Whether you're a producer seeking U.S. market entry or a wholesaler looking to strengthen your Asian beverage portfolio, we have the infrastructure, relationships, and expertise to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 group rounded-lg"
                style={{ background: '#F4C430', color: '#0A2454' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#D9A91A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F4C430'; }}
              >
                Start the Conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 rounded-lg"
                style={{ color: 'rgba(248,243,232,0.85)', border: '1px solid rgba(248,243,232,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(244,196,48,0.45)'; e.currentTarget.style.color = '#F4C430'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,243,232,0.25)'; e.currentTarget.style.color = 'rgba(248,243,232,0.85)'; }}
              >
                View Our Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}