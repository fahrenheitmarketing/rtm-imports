import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wine, Beer, GlassWater, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GoldUnderline from '../components/GoldUnderline';

const BRANDS = [
  {
    name: 'Good Friends Soju',
    category: 'Wine-Based Soju',
    origin: 'South Korea',
    detail: 'Nationally distributed. Available at major retail and convenience chains nationwide.',
  },
  {
    name: 'Yobo Spirits / KTown',
    category: 'Korean-American Spirits',
    origin: 'Made in the USA',
    detail: 'Crafted by Korean Americans at Laird & Company in New Jersey — America\'s oldest distillery, established before the United States itself. Available through RTM\'s national wholesale network.',
    bevstackLink: true,
  },
  {
    name: 'Kpop & KSoju',
    category: 'Korean Soju',
    origin: 'South Korea',
    detail: 'Available through RTM\'s national wholesale network.',
  },
  {
    name: 'Hokkaido Beer',
    category: 'Craft / Specialty Beer',
    origin: 'Japan',
    detail: 'Available through RTM\'s national wholesale network.',
  },
  {
    name: 'Hwayo Soju',
    category: 'Premium Korean Soju',
    origin: 'South Korea',
    detail: 'Available through RTM\'s national wholesale network.',
  },
];

const CATEGORIES = [
  {
    icon: GlassWater,
    title: 'Soju & Korean Beer',
    description: 'Premium soju and Korean beer from producers across South Korea. Authentic, high-quality brands that resonate with modern consumers and align with the global momentum of K-culture.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/63272a87b_KTOWN_Yuzu_ColoredBG.jpg',
    tags: ['Soju', 'Korean Beer'],
  },
  {
    icon: Wine,
    title: 'Wine-Based RTD',
    description: 'Ready-to-drink beverages built on Asian flavor profiles — a category with access across all US channels and the fastest-growing segment in our current portfolio.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/53e19d755_luxe750_BW.jpg',
    tags: ['Ready-to-Drink', 'Wine-Based', 'Flavored'],
  },
  {
    icon: Beer,
    title: 'Craft & Specialty Beer',
    description: 'Japanese craft and specialty beer for specialty retail and on-premise accounts seeking distinctive, high-quality additions to their beverage programs.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/e7a78d148_hokkaido-brewing-company-fruit-beer.webp',
    tags: ['Craft Beer', 'Specialty Beer'],
  },
];

const REGIONS = [
  { name: 'South Korea', specialty: 'Soju, Korean Beer, Wine-Based RTD' },
  { name: 'Japan', specialty: 'Craft Beer, Specialty Beer' },
  { name: 'China', specialty: 'Baijiu, Craft Spirits, Wine-Based RTD' },
  { name: 'Thailand', specialty: 'Spirits, RTD, Craft Beer' },
  { name: 'Taiwan', specialty: 'Craft Beer, Spirits' },
];

export default function Portfolio() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-24 min-h-[50vh] flex items-end" style={{ background: '#0A2454' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-eyebrow text-xs tracking-widest uppercase block mb-8" style={{ color: 'rgba(244,196,48,0.9)' }}>Our Portfolio</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl" style={{ color: '#F8F3E8' }}>
              Current focus brands. <GoldUnderline>National distribution.</GoldUnderline>
            </h1>
            <p className="font-body text-base leading-relaxed max-w-3xl mt-6" style={{ color: 'rgba(248,243,232,0.85)' }}>
              RTM's portfolio is built around growth, not breadth. The brands below represent our current primary market development effort. Our operating history spans 1,000+ brands across wine, spirits, and emerging categories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Featured Brands"
            title="RTM's active representation focus — the five below represent our current primary market development effort."
            variant="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {BRANDS.map((brand, idx) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-[18px] border p-8 hover:shadow-md transition-all duration-300"
                style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}
              >
                <h3 className="font-display text-xl text-rtm-ink mb-2">{brand.name}</h3>
                <p className="font-eyebrow text-xs tracking-widest uppercase text-rtm-cobalt mb-1">{brand.category}</p>
                <p className="font-footnote text-xs mb-4" style={{ color: '#0A2454' }}>{brand.origin}</p>
                <p className="font-body text-sm leading-relaxed mb-6" style={{ color: '#0A2454' }}>
                  {brand.detail}
                  {brand.bevstackLink && (
                    <>
                      {' '}
                      <a
                        href="https://www.bevstack.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rtm-cobalt hover:text-rtm-yellow inline-flex items-center gap-1 transition-colors"
                      >
                        BevStack
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 font-eyebrow text-xs tracking-widest uppercase transition-all duration-300 rounded-lg"
                  style={{ background: '#0A2454', color: '#F4C430', border: '1px solid rgba(244,196,48,0.45)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F4C430'; e.currentTarget.style.color = '#0A2454'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#0A2454'; e.currentTarget.style.color = '#F4C430'; }}
                >
                  Wholesale Inquiry
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="font-body text-base text-center" style={{ color: 'rgba(248,243,232,0.6)' }}>
            For distributor and retailer availability by state, contact us directly.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 md:py-32" style={{ background: '#FFFCF5', borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Categories"
            title="What we bring to market"
            variant="light"
          />

          <div className="space-y-16">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
              >
                <div className={`lg:col-span-2 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden aspect-[4/3] rounded-[18px] border" style={{ borderColor: 'rgba(244,196,48,0.45)' }}>
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" loading="lazy" width="800" height="600" />
                    <div className="absolute inset-0 rounded-[18px]" style={{ background: 'rgba(10,36,84,0.45)' }} />
                  </div>
                </div>
                <div className={`lg:col-span-3 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <cat.icon className="w-5 h-5 text-rtm-cobalt" />
                    <h3 className="font-display text-2xl text-rtm-ink">{cat.title}</h3>
                  </div>
                  <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#0A2454' }}>
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 font-eyebrow text-xs tracking-widest uppercase rounded-full border"
                        style={{ borderColor: 'rgba(244,196,48,0.45)', color: '#0A2454' }}
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
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Sourcing Regions"
            title="Global reach, focused portfolio"
            align="center"
            variant="dark"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((region, idx) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-[18px] border p-6 hover:shadow-md transition-all duration-300"
                style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}
              >
                <h4 className="font-display text-xl text-rtm-ink mb-2">{region.name}</h4>
                <p className="font-body text-sm" style={{ color: '#0A2454' }}>{region.specialty}</p>
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
              Interested in <GoldUnderline>our brands?</GoldUnderline>
            </h2>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'rgba(248,243,232,0.85)' }}>
              Contact us to learn more about our current portfolio or to discuss bringing your brand to market.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 group rounded-lg"
              style={{ background: '#F4C430', color: '#0A2454' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D9A91A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F4C430'; }}
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