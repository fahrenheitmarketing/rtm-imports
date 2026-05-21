import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ChevronRight, Handshake, Plus, Minus } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GoldUnderline from '../components/GoldUnderline';

const FAQS = [
  {
    q: 'How long has RTM Imports been in operation?',
    a: 'RTM Imports has more than 30 years of operational history in the US beverage alcohol import business, with roots going back to the early 1990s. Benjamin Roberts has led the company since 2016, during which time RTM has grown from a regional operator to a nationally active importer selling into markets across the United States.',
  },
  {
    q: 'Where is RTM Imports based?',
    a: 'RTM Imports is headquartered in San Antonio, Texas, and operates nationwide.',
  },
  {
    q: 'Is RTM Imports affiliated with a larger distribution company?',
    a: 'RTM Imports is an independent LLC. The company was originally established in connection with a major US wholesale network and draws on 30 years of relationships built within that framework. RTM now operates fully independently, which allows it to work with wholesale partners across the country without the constraints of a single distribution affiliation.',
  },
  {
    q: 'What makes RTM different from other importers?',
    a: 'Three things set RTM apart: category instinct, relationship depth, and speed. RTM has a long track record of identifying emerging categories before they go mainstream, then building the producer relationships and wholesale infrastructure to capitalize on them. The company maintains a focused portfolio, so every brand receives dedicated attention, and, as an independent operator, RTM moves faster than generalist importers when opportunities arise.',
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

function FAQItem({ item, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className="border-b border-rtm-stone-light"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
      >
        <span className="font-heading text-base md:text-lg font-semibold uppercase tracking-[0.04em] text-rtm-ink leading-snug group-hover:text-rtm-cobalt transition-colors duration-200">
          {item.q}
        </span>
        <span className="mt-1 flex-shrink-0 text-rtm-cobalt">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-body text-base text-rtm-ink-soft leading-relaxed pb-7 pr-10">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const ABOUT_HERO = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/facc46913_generated_image.png';

const VALUES = [
  {
    number: '01',
    icon: Compass,
    title: 'Fearless Creativity',
    description: 'We pursue categories and producers that others overlook. Asian beverage alcohol was a niche before it was a trend. We were already there, and we are already looking at what comes next.',
  },
  {
    number: '02',
    icon: ChevronRight,
    title: 'Aggressive Adaptability',
    description: 'The U.S. wholesale landscape is consolidating fast. Our independence and lean operating model mean we move faster than any generalist importer — and we have the track record to prove it.',
  },
  {
    number: '03',
    icon: Handshake,
    title: 'Relationship-First Execution',
    description: 'The relationships we hold with producers and wholesale partners have been built over years, not quarters. We invest in the people behind the brands as much as the brands themselves, and that personal commitment is what keeps those relationships intact when the market shifts.',
  },
];

export default function About() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(FAQ_SCHEMA);
    script.id = 'about-faq-schema';
    if (!document.getElementById('about-faq-schema')) {
      document.head.appendChild(script);
    }
    return () => { const el = document.getElementById('about-faq-schema'); if (el) el.remove(); };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 min-h-[60vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={ABOUT_HERO} alt="Sophisticated bar setup with premium spirits" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-rtm-ink via-rtm-ink/80 to-rtm-ink/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep block mb-8">About Us</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.01em] text-rtm-white leading-tight max-w-2xl">
              Thirty years in the industry.
              <span className="font-display font-normal normal-case italic text-rtm-yellow block">
                <GoldUnderline> Built to move first.</GoldUnderline>
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 bg-rtm-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading label="Our Story" title="What RTM stands for" variant="dark" />
              <div className="space-y-6 font-body text-base text-rtm-ink-soft leading-relaxed">
                <p>
                  RTM Imports is a San Antonio-based <strong className="text-rtm-ink">specialist beverage importer</strong> with more than 30 years of operational history. Founded in the early 1990s, RTM was formally structured as an independent LLC and has been led by Benjamin Roberts since 2016.
                </p>
                <p>
                  We operate exclusively in the <strong className="text-rtm-ink">B2B wholesale channel</strong> — working with the largest national beverage wholesalers and their chain teams across both on-premise and off-premise. We do not sell to consumers. We build the infrastructure, the relationships, and the programs that get brands to shelf.
                </p>
                <p>
                  Our history spans fine wine, spirits, and emerging categories. Asian beverage is the newest addition — soju, wine-based RTDs, and craft beer, sourced from South Korea, Japan, China, Thailand, and Taiwan — and the fastest-growing segment we represent.
                </p>
                <p>
                  What defines RTM is adaptability. Over 30 years, the business has navigated shifting consumer tastes, distribution consolidation, regulatory change, and market disruption, and has grown through it all.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { stat: '30+', label: 'Years in the Industry' },
                  { stat: '25+', label: 'Active Wholesale Partners' },
                  { stat: '1,000+', label: 'Brands Represented' },
                  { stat: 'All 50', label: 'States Served' },
                ].map((item) => (
                  <div key={item.label} className="bg-rtm-white border border-rtm-stone-light p-6 text-center" style={{ borderRadius: '4px' }}>
                    <div className="font-display text-3xl text-rtm-cobalt italic tabular-nums mb-2">{item.stat}</div>
                    <p className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-stone">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/426cba66c_generated_image.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-rtm-ink/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="How We Work"
            title="Our Approach"
            description="Three principles define how we work."
            align="center"
            variant="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-rtm-white/10 border border-white/20 p-8 hover:bg-rtm-white/15 hover:border-white/35 transition-all duration-200"
                style={{ borderRadius: '4px' }}
              >
                <div className="font-display text-5xl text-rtm-yellow/70 italic mb-4 leading-none tabular-nums">{value.number}</div>
                <div className="w-12 h-12 mb-6 border border-rtm-cobalt-light/40 flex items-center justify-center" style={{ borderRadius: '2px' }}>
                  <value.icon className="w-5 h-5 text-rtm-cobalt-light" />
                </div>
                <h3 className="font-heading text-base font-bold uppercase tracking-[0.06em] text-rtm-white mb-3">{value.title}</h3>
                <p className="font-body text-sm text-white/75 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section
        className="py-24 md:py-32 bg-rtm-cream relative"
        style={{ backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/4af9a8ea6_generated_image.png)', backgroundRepeat: 'repeat', backgroundSize: '500px' }}
      >
        <div className="absolute inset-0 bg-rtm-cream/80" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="block font-display text-3xl md:text-4xl text-rtm-cobalt mb-2">&ldquo;</span>
            <p className="font-display text-2xl md:text-3xl text-rtm-ink leading-relaxed italic mb-6">
              We spend more time with our partners personally than professionally. That is not a policy. It is how we operate.
            </p>
            <footer className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-rtm-stone">
              Benjamin Roberts, President, RTM Imports
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-rtm-cream-warm border-t border-rtm-stone-light">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-cobalt block mb-4">FAQ</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-[0.02em] text-rtm-ink leading-tight">
              Frequently asked <em className="font-display font-normal normal-case italic text-rtm-cobalt">questions</em>
            </h2>
          </motion.div>
          <div className="border-t border-rtm-stone-light">
            {FAQS.map((item, idx) => (
              <FAQItem key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32 text-center relative"
        style={{ backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/4af9a8ea6_generated_image.png)', backgroundRepeat: 'repeat', backgroundSize: '500px' }}
      >
        <div className="absolute inset-0 bg-rtm-ink/85" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-[0.02em] text-rtm-white mb-6">
              Let's find your{' '}
              <span className="font-display font-normal normal-case italic text-rtm-yellow">
                <GoldUnderline>route.</GoldUnderline>
              </span>
            </h2>
            <p className="font-body text-base text-rtm-stone-light leading-relaxed mb-8">
              Whether you're an Asian producer evaluating U.S. market entry, or a wholesaler looking to strengthen your portfolio in the fastest-growing beverage category, we'd like to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-rtm-cobalt text-white font-heading text-xs font-semibold uppercase tracking-[0.08em] hover:bg-rtm-cobalt-deep transition-all duration-200 hover:-translate-y-px group"
              style={{ borderRadius: '2px' }}
            >
              Start the Conversation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}