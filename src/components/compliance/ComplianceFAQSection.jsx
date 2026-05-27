import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'How long does it typically take to get a brand into a new state?',
    answer: 'Timelines vary by state — from a few weeks in cooperative states to several months in control states. Our experience and existing relationships help us anticipate bottlenecks and minimize delays.',
  },
  {
    question: 'What is a COLA, and does every brand need one?',
    answer: 'A Certificate of Label Approval (COLA) is required by the TTB for any alcoholic beverage sold in the US with an ABV above 7%. Most states also require their own state-level COLA in addition to the federal approval. Spirit brands additionally require a formula approval from the TTB before a COLA can be issued. RTM manages the full COLA process for every brand we represent.',
  },
  {
    question: 'What is the difference between a three-tier importer and a broker?',
    answer: 'An importer holds a federal TTB Basic Importer\'s Permit and acquires legal title to the product upon entry into the country. A broker facilitates transactions without taking title. RTM is a licensed importer — we are on the label, we manage compliance, and we are the legal entity responsible for the product from the port of entry through to the wholesale channel. This distinction matters for liability, compliance, and the quality of advocacy your brand receives.',
  },
  {
    question: 'Do you handle compliance for brands we don\'t import?',
    answer: 'In select cases, yes. We offer compliance consulting and license-sharing arrangements for established brands that need network infrastructure without a full import relationship.',
  },
  {
    question: 'What is the benefit of your existing license network versus setting one up independently?',
    answer: 'Years and significant cost. Building a compliant 50-state license infrastructure from scratch typically takes 12 to 24 months and substantial legal fees. Leveraging RTM\'s existing network accelerates market entry dramatically and eliminates the ongoing administrative burden of managing renewals and regulatory changes across 50 jurisdictions.',
  },
  {
    question: 'Can you help with e-commerce or DTC compliance?',
    answer: 'DTC compliance is not a current service area for RTM. We focus exclusively on the B2B wholesale channel. For DTC-specific regulatory needs, we are happy to refer you to specialized legal counsel.',
  },
];

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-[18px] overflow-hidden"
      style={{ background: '#FFFCF5', border: '1px solid rgba(244,196,48,0.45)' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
      >
        <span className="font-body text-sm font-medium pr-8" style={{ color: '#0A2454' }}>{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-rtm-cobalt transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 pt-2" style={{ borderTop: '1px solid rgba(244,196,48,0.2)' }}>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#0A2454' }}>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ComplianceFAQSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-12">
          <span className="font-eyebrow text-xs tracking-widest uppercase block mb-4" style={{ color: 'hsl(var(--primary))' }}>
            Frequently Asked Questions
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            Common questions about <em>compliance & licensing</em>
          </h2>
        </div>
        <div className="max-w-4xl space-y-4">
          {FAQS.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}