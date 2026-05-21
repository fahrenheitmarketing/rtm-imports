import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, MapPin, Network, BookOpen, ClipboardList, ShieldCheck } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import GoldUnderline from '../../components/GoldUnderline';
import ComplianceFAQSection from '../../components/compliance/ComplianceFAQSection';

const SERVICES_LIST = [
  { icon: MapPin, title: 'State License Network', description: 'RTM maintains an active importer and wholesaler license network across all 50 states and the District of Columbia. This infrastructure, built over years of careful cultivation, means your brand can go national without waiting months for regulatory setup.' },
  { icon: Network, title: 'Wholesaler Relationship Management', description: 'Having a license isn\'t enough — you need advocacy. Our wholesale relationships are built on trust, track record, and mutual benefit. We don\'t cold-call distributors; we leverage long-standing partnerships to get your brand in front of the right buyer.' },
  { icon: BookOpen, title: 'TTB Registration & Label Approval', description: 'The Alcohol and Tobacco Tax and Trade Bureau (TTB) requires meticulous documentation. We manage label submissions, formula approvals, and import certificates to ensure your product clears every federal hurdle before it reaches state borders.' },
  { icon: ClipboardList, title: 'State Registration & COLAs', description: 'Each state has its own registration requirements, pricing rules, and approval processes. We navigate this patchwork efficiently, using our experience to anticipate delays and resolve issues before they affect your launch timeline.' },
  { icon: ShieldCheck, title: 'Ongoing Compliance Monitoring', description: 'Regulatory requirements evolve. We provide proactive monitoring of licensing renewals, reporting obligations, and regulatory changes that could affect your brand, so you stay compliant without dedicating internal resources.' },
  { icon: FileCheck, title: 'Market Entry Consulting', description: 'For foreign producers evaluating the U.S. market, we offer strategic consulting on the most efficient path to entry — advising on entity structure, importer-of-record setup, and multi-state rollout sequencing.' },
];

export default function Compliance() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-24 min-h-[50vh] flex items-end" style={{ background: '#0A2454' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link to="/services" className="font-eyebrow text-xs tracking-widest uppercase hover:text-rtm-yellow transition-colors mb-4 block" style={{ color: 'rgba(248,243,232,0.5)' }}>
              ← Services
            </Link>
            <span className="font-eyebrow text-xs tracking-widest uppercase block mb-4" style={{ color: 'rgba(244,196,48,0.9)' }}>Compliance & Licensing</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl" style={{ color: '#F8F3E8' }}>
              The infrastructure that <GoldUnderline>enables national distribution.</GoldUnderline>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading label="The Regulatory Reality" title="Why compliance is a strategic asset" variant="dark" />
              <div className="space-y-5 font-body text-base leading-relaxed" style={{ color: 'rgba(26,24,20,0.75)' }}>
                <p>The U.S. beverage alcohol market is governed by a <strong className="text-rtm-ink">three-tier system</strong> with federal oversight from the TTB and individual regulatory frameworks in all 50 states. For a foreign producer or a new domestic brand, navigating this landscape is one of the single greatest barriers to market entry.</p>
                <p>Most brands don't fail because their liquid isn't good enough. They fail because they underestimate the complexity of legally obtaining that liquid from a production facility to a consumer's glass. <strong className="text-rtm-ink">Compliance is not a formality — it's the foundation.</strong></p>
                <p>RTM has built this foundation deliberately over years of operating in the market. Our license network, our wholesale relationships, and our working knowledge of state-by-state regulatory nuance represent infrastructure that cannot be replicated quickly, and we make it available to our partners.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'All 50', label: 'All 50 States Served' },
                { value: '25+', label: '25+ Active Wholesale Partners' },
                { value: 'Federal', label: 'TTB importer registration' },
                { value: '30+', label: 'Years of regulatory experience' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[18px] border p-8 text-center" style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}>
                  <div className="font-display text-3xl text-rtm-cobalt mb-2">{stat.value}</div>
                  <p className="font-eyebrow text-xs tracking-widest uppercase" style={{ color: '#0A2454' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32" style={{ background: '#FFFCF5', borderTop: '1px solid rgba(244,196,48,0.45)', borderBottom: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="What We Provide" title="Compliance services in full" align="center" variant="light" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-[18px] border p-8 hover:shadow-md transition-all duration-300"
                style={{ background: '#F2EBDE', borderColor: 'rgba(244,196,48,0.45)' }}
              >
                <div className="w-10 h-10 border rounded-full flex items-center justify-center mb-5" style={{ borderColor: 'rgba(244,196,48,0.45)' }}>
                  <item.icon className="w-4 h-4 text-rtm-cobalt" />
                </div>
                <h3 className="font-display text-lg mb-3" style={{ color: '#0A2454' }}>{item.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#0A2454' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ComplianceFAQSection />

      {/* CTA */}
      <section className="py-24 md:py-32 text-center" style={{ background: '#0A2454', borderTop: '1px solid rgba(244,196,48,0.45)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <FileCheck className="w-10 h-10 text-rtm-yellow mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: '#F8F3E8' }}>
              Don't let compliance <GoldUnderline>slow you down.</GoldUnderline>
            </h2>
            <p className="font-body text-base leading-relaxed mb-10" style={{ color: 'rgba(248,243,232,0.85)' }}>
              We have built the infrastructure. We have cultivated the relationships. We know the rules in every state. Let us put that to work for your brand, so you can focus on what you do best: making great beverages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 group rounded-lg"
                style={{ background: '#F4C430', color: '#0A2454' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#D9A91A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F4C430'; }}
              >
                Talk to Our Team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 rounded-lg"
                style={{ color: 'rgba(248,243,232,0.85)', border: '1px solid rgba(248,243,232,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(244,196,48,0.45)'; e.currentTarget.style.color = '#F4C430'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,243,232,0.25)'; e.currentTarget.style.color = 'rgba(248,243,232,0.85)'; }}
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