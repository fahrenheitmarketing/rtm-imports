import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What does RTM Imports do?',
    a: 'RTM Imports is a specialist beverage importer operating exclusively in the B2B wholesale channel. We represent and develop brands across emerging and established categories — from fine wine and spirits to the fastest-growing segments in the US market today. We also develop custom labels for retailers and operators, and provide compliance and licensing infrastructure for producers entering the US market.',
  },
  {
    q: 'Is RTM Imports a distributor?',
    a: 'No. RTM is an importer and supplier; we work with distributors, not as one. We provide brands, compliance infrastructure, and producer relationships to the wholesale channel. RTM warehouses product and ships to wholesalers but does not deliver directly to retail or on-premise accounts.',
  },
  {
    q: 'What types of businesses does RTM work with?',
    a: 'RTM works with three main groups: producers seeking US market entry, US retailers and hospitality operators building private-label programs, and US wholesale distributors looking to strengthen or diversify their beverage portfolio.',
  },
];

function FAQItem({ item, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      style={{ borderBottom: '1px solid rgba(244,196,48,0.45)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
      >
        <span className="font-display text-lg md:text-xl text-foreground leading-snug group-hover:opacity-70 transition-opacity duration-200">
          {item.q}
        </span>
        <span className="mt-1 flex-shrink-0 text-rtm-yellow">
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-body text-base leading-relaxed pb-7 pr-10 text-foreground/80">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-eyebrow text-xs tracking-widest uppercase block mb-4" style={{ color: 'hsl(var(--primary))' }}>FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
            Frequently asked <em>questions</em>
          </h2>
        </motion.div>

        <div style={{ borderTop: '1px solid rgba(244,196,48,0.45)' }}>
          {FAQS.map((item, idx) => (
            <FAQItem key={idx} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}