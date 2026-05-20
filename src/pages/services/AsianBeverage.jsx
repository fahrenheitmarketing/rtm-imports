import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, TrendingUp, Users, Star, ShoppingBag, Award } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import GoldUnderline from '../../components/GoldUnderline';

const HERO_IMAGE = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/a1ae5ba92_image.png';

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

export default function AsianBeverage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[60vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Asian premium spirits" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link to="/services" className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-4 block">
              ← Services
            </Link>
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">Asian Beverages</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl">
              The newest addition to our portfolio. <GoldUnderline className="italic">Our most active growth category in the US market.</GoldUnderline>
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
              />
              <div className="space-y-5 font-body text-base text-foreground/80 leading-relaxed">
                <p>
                  Soju has more than doubled in the U.S. over the past five years, reaching approximately $935 million in 2024. Growth is driven by Gen Z and millennial demand, the global reach of K-culture, and accessible pricing, validated by major mainstream players now entering the space. Spirit of Gallo's 2024 partnership with Lotte Chilsung is one indicator of the category's momentum, with reported volume surges across Lotte's US brands in the year following the partnership.
                </p>
                <p>
                  Wine-based RTDs built on authentic Asian flavor profiles are expanding rapidly across retail and on-premise, capturing Gen Z and millennial consumers who want premium, convenient, and culturally distinct. It is the category RTM has moved into ahead of the curve, and it is where our portfolio is most active today.
                </p>
                <p>
                  When RTM identified the Asian beverage opportunity, we brought to the category what most new entrants lacked: three decades of import infrastructure, wholesale relationships, and operational experience. Building that from scratch takes years. We already had it. That is the foundation of what we bring to every partner.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {STATS.map((stat) => (
                <div key={stat.value} className="bg-card border border-border p-6 flex items-center gap-6">
                  <div className="font-display text-4xl text-primary min-w-[80px]">{stat.value}</div>
                  <p className="font-body text-sm text-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative py-24 md:py-32 bg-card border-y border-border overflow-hidden" style={{ backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/802bd1488_Asian.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="What We Bring"
            title="Our Asian beverage portfolio"
            description="RTM represents brands across the full spectrum of Asian beverages, focused on quality producers and authentic stories that resonate with today's consumer."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-background border border-border p-8 hover:border-primary/40 transition-colors duration-300"
              >
                <h3 className="font-display text-xl text-foreground mb-3">{cat.title}</h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">Wine-Based Soju — Case Study</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">In Market</h2>
            <p className="font-body text-lg text-foreground/80 italic">From regional to national</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
            <div className="space-y-6">
              <p className="font-body text-base text-foreground/80 leading-relaxed">
                RTM reviewed distributor sales and profit data and identified a wine-based soju brand performing exceptionally well in a single regional market: strong numbers, minimal market penetration, and significant room to grow.
              </p>
              <p className="font-body text-base text-foreground/80 leading-relaxed">
                After direct meetings with the brand owner, RTM was awarded representation rights in a small number of markets. Within twelve months, RTM tripled its previous sales and expanded its representation to most states nationally.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="bg-background border border-border p-6">
                <div className="font-display text-3xl text-primary mb-2">80,000+ cases</div>
                <p className="font-body text-sm text-foreground/80">Projected nationwide in 2026</p>
              </div>
              <div className="bg-background border border-border p-6">
                <div className="font-display text-3xl text-primary mb-2">Up from 13,266 cases</div>
                <p className="font-body text-sm text-foreground/80">In a single regional market (2024)</p>
              </div>
              <div className="bg-background border border-border p-6">
                <div className="font-display text-3xl text-primary mb-2">Chain authorizations secured</div>
                <p className="font-body text-sm text-foreground/80">Total Wine & More, HEB, Circle K, Albertsons</p>
              </div>
              <div className="bg-background border border-border p-6">
                <div className="font-display text-3xl text-primary mb-2">National representation began</div>
                <p className="font-body text-sm text-foreground/80">September 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Our Process"
            title="How we bring your brand to the U.S."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, step: '01', title: 'Producer Sourcing', description: 'We travel to origin regions, visit facilities, and vet producers on quality, authenticity, and capacity to meet U.S. import standards. This includes regular visits to Asia, with our on-the-ground presence expanding as our portfolio grows.' },
              { icon: TrendingUp, step: '02', title: 'Market Positioning', description: 'We define the right consumer, the right channel, and the right price architecture for each brand before a single bottle enters the country. We identify trends from distributor sales and profit reports before the market publicly confirms them.' },
              { icon: Users, step: '03', title: 'Wholesaler Activation', description: 'Our national wholesaler network means your brand has advocacy at the distributor level — critical for market penetration and sustainable velocity.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <span className="font-display text-6xl text-primary/10 block mb-4">{item.step}</span>
                <div className="flex items-center gap-3 mb-3 -mt-8">
                  <item.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                </div>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary/5 border-y border-primary/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Award className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Ready to bring your Asian <GoldUnderline className="italic">brand to America?</GoldUnderline>
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed mb-10">
              Whether you're a producer seeking U.S. market entry or a wholesaler looking to strengthen your Asian beverage portfolio, we have the infrastructure, relationships, and expertise to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
              >
                Start the Conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border text-muted-foreground font-body text-sm tracking-widest uppercase hover:border-foreground hover:text-foreground transition-all duration-300"
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