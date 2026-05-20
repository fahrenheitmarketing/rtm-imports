import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, MapPin, Network, BookOpen, ClipboardList, ShieldCheck } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import GoldUnderline from '../../components/GoldUnderline';

const HERO_IMAGE = 'https://media.base44.com/images/public/69dd75d09559acb6fb908761/bf0be4185_generated_ed6f371b.png';

const SERVICES_LIST = [
  {
    icon: MapPin,
    title: 'State License Network',
    description: 'RTM maintains an active importer and wholesaler license network across all 50 states and the District of Columbia. This infrastructure, built over years of careful cultivation, means your brand can go national without waiting months for regulatory setup.',
  },
  {
    icon: Network,
    title: 'Wholesaler Relationship Management',
    description: 'Having a license isn\'t enough — you need advocacy. Our wholesale relationships are built on trust, track record, and mutual benefit. We don\'t cold-call distributors; we leverage long-standing partnerships to get your brand in front of the right buyer.',
  },
  {
    icon: BookOpen,
    title: 'TTB Registration & Label Approval',
    description: 'The Alcohol and Tobacco Tax and Trade Bureau (TTB) requires meticulous documentation. We manage label submissions, formula approvals, and import certificates to ensure your product clears every federal hurdle before it reaches state borders.',
  },
  {
    icon: ClipboardList,
    title: 'State Registration & COLAs',
    description: 'Each state has its own registration requirements, pricing rules, and approval processes. We navigate this patchwork efficiently, using our experience to anticipate delays and resolve issues before they affect your launch timeline.',
  },
  {
    icon: ShieldCheck,
    title: 'Ongoing Compliance Monitoring',
    description: 'Regulatory requirements evolve. We provide proactive monitoring of licensing renewals, reporting obligations, and regulatory changes that could affect your brand, so you stay compliant without dedicating internal resources.',
  },
  {
    icon: FileCheck,
    title: 'Market Entry Consulting',
    description: 'For foreign producers evaluating the U.S. market, we offer strategic consulting on the most efficient path to entry — advising on entity structure, importer-of-record setup, and multi-state rollout sequencing.',
  },
];

const FAQS = [
  {
    q: 'How long does it typically take to get a brand into a new state?',
    a: 'Timelines vary by state — from a few weeks in cooperative states to several months in control states. Our experience and existing relationships help us anticipate bottlenecks and minimize delays.',
  },
  {
    q: 'What is a COLA, and does every brand need one?',
    a: 'A Certificate of Label Approval (COLA) is required by the TTB for any alcoholic beverage sold in the US with an ABV above 7%. Most states also require their own state-level COLA in addition to the federal approval. Spirit brands additionally require a formula approval from the TTB before a COLA can be issued. RTM manages the full COLA process for every brand we represent.',
  },
  {
    q: 'What is the difference between a three-tier importer and a broker?',
    a: 'An importer holds a federal TTB Basic Importer\'s Permit and acquires legal title to the product upon entry into the country. A broker facilitates transactions without taking title. RTM is a licensed importer — we are on the label, we manage compliance, and we are the legal entity responsible for the product from the port of entry through to the wholesale channel. This distinction matters for liability, compliance, and the quality of advocacy your brand receives.',
  },
  {
    q: 'Do you handle compliance for brands you don\'t import?',
    a: 'In select cases, yes. We offer compliance consulting and license-sharing arrangements for established brands that need network infrastructure without a full import relationship.',
  },
  {
    q: 'What is the benefit of your existing license network versus setting one up independently?',
    a: 'Years and significant cost. Building a compliant 50-state license infrastructure from scratch typically takes 12 to 24 months and substantial legal fees. Leveraging RTM\'s existing network accelerates market entry dramatically and eliminates the ongoing administrative burden of managing renewals and regulatory changes across 50 jurisdictions.',
  },
  {
    q: 'Can you help with e-commerce or DTC compliance?',
    a: 'DTC compliance is not a current service area for RTM. We focus exclusively on the B2B wholesale channel. For DTC-specific regulatory needs, we are happy to refer you to specialized legal counsel.',
  },
];

export default function Compliance() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[60vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Compliance and licensing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link to="/services" className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-4 block">
              ← Services
            </Link>
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">Compliance & Licensing</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl">
              The infrastructure that <GoldUnderline className="italic">enables national distribution.</GoldUnderline>
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
                label="The Regulatory Reality"
                title="Why compliance is a strategic asset"
              />
              <div className="space-y-5 font-body text-base text-foreground/80 leading-relaxed">
                <p>
                  The U.S. beverage alcohol market is governed by a <strong className="text-foreground">three-tier system</strong> with federal oversight from the TTB and individual regulatory frameworks in all 50 states. For a foreign producer or a new domestic brand, navigating this landscape is one of the single greatest barriers to market entry.
                </p>
                <p>
                  Most brands don't fail because their liquid isn't good enough. They fail because they underestimate the complexity of legally obtaining that liquid from a production facility to a consumer's glass. <strong className="text-foreground">Compliance is not a formality — it's the foundation.</strong>
                </p>
                <p>
                  RTM has built this foundation deliberately over years of operating in the market. Our license network, our wholesale relationships, and our working knowledge of state-by-state regulatory nuance represent infrastructure that cannot be replicated quickly, and we make it available to our partners.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'All 50', label: 'All 50 States Served' },
                { value: '25+', label: '25+ Active Wholesale Partners' },
                { value: 'Federal', label: 'TTB importer registration' },
                { value: '30+', label: 'Years of regulatory experience' },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border p-8 text-center">
                  <div className="font-display text-3xl text-primary mb-2">{stat.value}</div>
                  <p className="font-body text-xs tracking-widest uppercase text-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-24 md:py-32 bg-card border-y border-border overflow-hidden" style={{ backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/a850dab8d_ChatGPTImageMay20202607_38_54PM.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="What We Provide"
            title="Compliance services in full"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-background border border-border p-8 hover:border-primary/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center mb-5">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Common Questions"
            title="What producers ask us"
            align="center"
          />
          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="border border-border p-8"
              >
                <h4 className="font-display text-lg text-foreground mb-3">{faq.q}</h4>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary/5 border-y border-primary/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <FileCheck className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Don't let compliance <GoldUnderline className="italic">slow you down.</GoldUnderline>
            </h2>
            <p className="font-body text-base text-foreground/80 leading-relaxed mb-10">
              We have built the infrastructure. We have cultivated the relationships. We know the rules in every state. Let us put that to work for your brand, so you can focus on what you do best: making great beverages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 group"
              >
                Talk to Our Team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border text-muted-foreground font-body text-sm tracking-widest uppercase hover:border-foreground hover:text-foreground transition-all duration-300"
              >
                Learn About RTM
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}