import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wine, Beer, GlassWater, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GoldUnderline from '../components/GoldUnderline';

const PORTFOLIO_HERO = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/cf1984e2c_image.png';

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
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/11b2b739e_image.png',
    tags: ['Soju', 'Korean Beer'],
  },
  {
    icon: Wine,
    title: 'Wine-Based RTD',
    description: 'Ready-to-drink beverages built on Asian flavor profiles — a category with access across all US channels and the fastest-growing segment in our current portfolio.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/6a6599590_ChatGPTImageMay20202608_04_40PM.png',
    tags: ['Ready-to-Drink', 'Wine-Based', 'Flavored'],
  },
  {
    icon: Beer,
    title: 'Craft & Specialty Beer',
    description: 'Japanese craft and specialty beer for specialty retail and on-premise accounts seeking distinctive, high-quality additions to their beverage programs.',
    image: 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/21dedb446_ChatGPTImageMay20202608_09_18PM.png',
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
      <section className="relative pt-32 min-h-[60vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={PORTFOLIO_HERO} alt="Wine cellar with premium barrels" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-rtm-ink via-rtm-ink/80 to-rtm-ink/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep block mb-8">Our Portfolio</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.01em] text-rtm-white leading-tight max-w-2xl">
              Current focus brands.{' '}
              <span className="font-display font-normal normal-case italic text-rtm-yellow">
                <GoldUnderline>National distribution.</GoldUnderline>
              </span>
            </h1>
            <p className="font-body text-base text-rtm-stone-light leading-relaxed max-w-3xl mt-6">
              RTM's portfolio is built around growth, not breadth. The brands below represent our current primary market development effort. Our operating history spans 1,000+ brands across wine, spirits, and emerging categories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-24 md:py-32" style={{
        backgroundImage: `linear-gradient(rgba(26, 45, 74, 0.12), rgba(26, 45, 74, 0.12)), url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/a988dfd7c_ChatGPTImageMay20202609_37_01PM.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Featured Brands"
            title="RTM's active representation focus — the five below represent our current primary market development effort."
            variant="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {BRANDS.map((brand, idx) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-rtm-white border border-rtm-stone-light p-8 hover:-translate-y-0.5 hover:border-rtm-cobalt transition-all duration-200"
                style={{ borderRadius: '4px' }}
              >
                <h3 className="font-heading text-lg font-bold uppercase tracking-[0.04em] text-rtm-ink mb-2">{brand.name}</h3>
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-cobalt mb-1">{brand.category}</p>
                <p className="font-body text-xs text-rtm-stone mb-4">{brand.origin}</p>
                <p className="font-body text-sm text-rtm-ink-soft leading-relaxed mb-6">
                  {brand.detail}
                  {brand.bevstackLink && (
                    <>
                      {' '}
                      <a
                        href="https://www.bevstack.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rtm-cobalt hover:underline inline-flex items-center gap-1"
                      >
                        BevStack
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-rtm-cobalt text-white font-heading text-xs font-semibold uppercase tracking-[0.08em] hover:bg-rtm-cobalt-deep transition-all duration-200 hover:-translate-y-px"
                  style={{ borderRadius: '2px' }}
                >
                  Wholesale Inquiry
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="font-body text-sm text-white/70 text-center">
            For distributor and retailer availability by state, contact us directly.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="pt-24 md:pt-32 pb-24 md:pb-32 bg-rtm-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Categories"
            title="What we bring to market"
            variant="dark"
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
                  <div className="relative overflow-hidden aspect-[4/3]" style={{ borderRadius: '4px' }}>
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className={`lg:col-span-3 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <cat.icon className="w-5 h-5 text-rtm-cobalt" />
                    <h3 className="font-heading text-xl font-bold uppercase tracking-[0.06em] text-rtm-ink">{cat.title}</h3>
                  </div>
                  <p className="font-body text-base text-rtm-ink-soft leading-relaxed mb-5">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-rtm-stone-light font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-stone"
                        style={{ borderRadius: '999px' }}
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
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/55e46eff5_ChatGPTImageMay20202608_13_51PM.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-rtm-ink/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Sourcing Regions"
            title="Global reach, focused portfolio"
            align="center"
            variant="light"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((region, idx) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-rtm-white/10 border border-white/25 p-6 hover:bg-rtm-white/15 hover:border-white/40 transition-all duration-200"
                style={{ borderRadius: '4px' }}
              >
                <h4 className="font-heading text-lg font-bold uppercase tracking-[0.06em] text-rtm-white mb-2">{region.name}</h4>
                <p className="font-body text-sm text-white/75">{region.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32 text-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 45, 74, 0.08), rgba(26, 45, 74, 0.08)), url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/4af9a8ea6_generated_image.png)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '500px',
        }}
      >
        <div className="absolute inset-0 bg-rtm-cream/80" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-[0.02em] text-rtm-ink mb-6">
              Interested in{' '}
              <span className="font-display font-normal normal-case italic text-rtm-cobalt">
                <GoldUnderline>our brands?</GoldUnderline>
              </span>
            </h2>
            <p className="font-body text-base text-rtm-ink-soft leading-relaxed mb-8">
              Contact us to learn more about our current portfolio or to discuss bringing your brand to market.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-rtm-cobalt text-white font-heading text-xs font-semibold uppercase tracking-[0.08em] hover:bg-rtm-cobalt-deep transition-all duration-200 hover:-translate-y-px group"
              style={{ borderRadius: '2px' }}
            >
              Request Portfolio Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}