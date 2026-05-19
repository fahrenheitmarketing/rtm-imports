import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, CheckCircle, Layers, Brush, Package, ShieldCheck } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import GoldUnderline from '../../components/GoldUnderline';

const HERO_IMAGE = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/e0f7395d8_generated_bf53f207.png';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Strategic Brief',
    description: 'We begin with a deep discovery session — understanding your customer, your competitive set, your price point, and the story you want to tell. A clear brief is the foundation of a compelling brand.',
  },
  {
    step: '02',
    title: 'Producer Matching',
    description: 'Using our curated network of European and Asian producers, we identify the right production partner based on quality benchmarks, capacity, certifications, and stylistic fit with your vision.',
  },
  {
    step: '03',
    title: 'Product Development',
    description: 'We manage the full development cycle: liquid selection, sample review, sensory benchmarking, and iterative refinement until the product meets your specifications and our quality standards.',
  },
  {
    step: '04',
    title: 'Brand & Design',
    description: 'Label design, bottle selection, closure, and packaging are developed with retail shelf impact in mind. Every visual element is built to communicate quality and drive purchase intent.',
  },
  {
    step: '05',
    title: 'Compliance Clearance',
    description: 'Label approval, import permits, and state-specific compliance are handled end-to-end. Your brand arrives market-ready with no regulatory surprises.',
  },
  {
    step: '06',
    title: 'Launch & Activation',
    description: 'We coordinate the commercial launch with our wholesaler network, providing brand materials, sell sheets, and in-market support to accelerate velocity from day one.',
  },
];

const WHY_CUSTOM = [
  {
    icon: Layers,
    title: 'Differentiation at Shelf',
    description: 'In a crowded retail environment, a proprietary brand cuts through the noise. Customers who buy your label are buying your story — not a commodity.',
  },
  {
    icon: Brush,
    title: 'Margin Control',
    description: 'Custom labels eliminate the margin compression of branded resale. You set the price architecture and retain the value you create.',
  },
  {
    icon: Package,
    title: 'Portfolio Flexibility',
    description: 'A private label program gives you agility — seasonal expressions, limited releases, and category extensions without the long lead times of branded products.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Without Volume',
    description: 'Our producer relationships are built on quality first, not minimum order volumes. We find the right fit for your program, not the most convenient one.',
  },
];

export default function CustomLabels() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[60vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Custom label wine bottles" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link to="/services" className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-4 block">
              ← Services
            </Link>
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">Custom Labels</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl">
              Your brand. <GoldUnderline className="italic">Our expertise. Their shelf.</GoldUnderline>
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
                label="Private Label Programs"
                title="Built on relationships, not catalogs"
              />
              <div className="space-y-5 font-body text-base text-foreground/80 leading-relaxed">
                <p>
                  As competition intensifies across every beverage category, the brands that win are the ones that own the relationship with the consumer. <strong className="text-foreground">A private label is not a shortcut — it's a strategic asset.</strong>
                </p>
                <p>
                  RTM's custom label program is built on years of curated producer relationships across Europe and Asia. We don't work from a catalog. We match producers to programs based on liquid quality, production reliability, and the authentic story that will resonate in the American market.
                </p>
                <p>
                  From a single SKU to a full multi-tier portfolio, we manage every element of the process — so you can focus on selling, not sourcing.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border p-10">
              <h3 className="font-display text-xl text-foreground mb-6">What's included in every program</h3>
              <div className="space-y-4">
                {[
                  'Producer identification and vetting',
                  'Liquid development and sensory review',
                  'Label design and packaging development',
                  'TTB label approval and import compliance',
                  'State-by-state market registration support',
                  'Wholesaler onboarding and brand materials',
                  'Ongoing supply chain and quality management',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-secondary-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Custom */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="The Case for Private Label"
            title="Why leading retailers choose custom"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_CUSTOM.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-6 p-8 bg-background border border-border hover:border-primary/40 transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Our Process"
            title="From concept to shelf"
            description="A structured, end-to-end process that eliminates guesswork and accelerates time to market."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative p-8 border border-border"
              >
                <span className="font-display text-5xl text-primary/50 block mb-4">{item.step}</span>
                <h3 className="font-display text-lg text-foreground mb-3 -mt-6">{item.title}</h3>
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
            <Palette className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Ready to build a brand <GoldUnderline className="italic">worth owning?</GoldUnderline>
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed mb-10">
              Whether you're a retailer exploring your first private label or a hospitality group building a proprietary portfolio, let's talk about what's possible. We'll start with a no-obligation discovery call to assess fit and scope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
              >
                Request a Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/services/asian-beverage"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border text-muted-foreground font-body text-sm tracking-widest uppercase hover:border-foreground hover:text-foreground transition-all duration-300"
              >
                Explore Asian Beverages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}