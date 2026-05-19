import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wine, Beer, GlassWater } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GoldUnderline from '../components/GoldUnderline';

const PORTFOLIO_HERO = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/635a9f96e_generated_16b3013c.png';

const CATEGORIES = [
  {
    icon: GlassWater,
    title: 'Asian Spirits',
    description: 'Premium sake, soju, shochu, and Japanese whisky from artisan producers across Asia. Authentic, high-quality spirits that resonate with modern consumers.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/369a4f0ab_generated_b2886f05.png',
    tags: ['Sake', 'Soju', 'Shochu', 'Japanese Whisky'],
  },
  {
    icon: Wine,
    title: 'European Wines',
    description: 'Curated selections from established producers in France, Italy, Spain, and beyond. Quality-first private-label and branded wines for discerning palates.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/a02300f19_generated_8b23f0b1.png',
    tags: ['French', 'Italian', 'Spanish', 'Portuguese'],
  },
  {
    icon: Beer,
    title: 'Craft & RTD',
    description: 'Wine-based ready-to-drink beverages and craft beer selections that capture the attention of new-generation consumers seeking premium, convenient options.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/e0f7395d8_generated_bf53f207.png',
    tags: ['Ready-to-Drink', 'Craft Beer', 'Flavored', 'Wine-Based'],
  },
];

const REGIONS = [
  { name: 'South Korea', specialty: 'Soju, Korean Beer, Rice Wine, RTD' },
  { name: 'Japan', specialty: 'Sake, Whisky, Shochu, Craft Beer' },
  { name: 'China', specialty: 'Baijiu, Craft Spirits, Wine-Based RTD' },
  { name: 'Thailand', specialty: 'Spirits, RTD, Craft Beer' },
  { name: 'Taiwan', specialty: 'Whisky, Craft Beer, Spirits' },
  { name: 'France', specialty: 'Wine, Champagne, Sparkling' },
  { name: 'Italy', specialty: 'Wine, Prosecco, Amaro' },
  { name: 'Spain & Portugal', specialty: 'Wine, Cava, Sherry, Port' },
];

export default function Portfolio() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={PORTFOLIO_HERO} alt="Wine cellar with premium barrels" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">Our Portfolio</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-2xl">
              Curated, <GoldUnderline className="italic">not collected.</GoldUnderline>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">Our Philosophy</span>
              <p className="font-display text-2xl md:text-3xl text-foreground leading-relaxed italic">
                Due to the stringency of our wholesaler partner demands, our focus has and will continue to be on a selection of quality producers rather than a comprehensive portfolio.
              </p>
              <p className="font-body text-base text-foreground/80 mt-6">
                In other words — we stick to what we know we do well.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-24 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Categories"
            title="What we bring to market"
          />

          <div className="space-y-16">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className={`grid grid-cols-1 lg:grid-cols-5 gap-8 items-center ${
                  idx % 2 === 1 ? '' : ''
                }`}
              >
                <div className={`lg:col-span-2 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className={`lg:col-span-3 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <cat.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-2xl text-foreground">{cat.title}</h3>
                  </div>
                  <p className="font-body text-base text-foreground/80 leading-relaxed mb-5">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-border font-body text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Sourcing Regions"
            title="Global reach, curated focus"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((region, idx) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="border border-border p-6 hover:border-primary/40 transition-colors duration-300"
              >
                <h4 className="font-display text-xl text-foreground mb-2">{region.name}</h4>
                <p className="font-body text-sm text-foreground/80">{region.specialty}</p>
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
              Interested in <GoldUnderline className="italic">our brands?</GoldUnderline>
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed mb-8">
              Contact us to learn more about our current portfolio or to discuss bringing your brand to market.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
            >
              Request Portfolio Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}