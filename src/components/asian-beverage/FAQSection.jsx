import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'What Asian beverage categories does RTM currently represent?',
    answer: 'RTM\'s active portfolio is focused on soju — specifically wine-based soju, which currently comprises the majority of our SKU count — wine-based RTDs, and craft and specialty beer. These are the categories where we have active brands, national distribution, and chain-level retail authorizations. We are continuously evaluating adjacent categories as the market evolves.',
  },
  {
    question: 'What is wine-based soju, and why does it matter for US distribution?',
    answer: 'Wine-based soju is a Korean-origin spirit produced from a wine base rather than a distilled-grain base. In the US regulatory framework, this classification means it can be sold through all licensed channels, including grocery, convenience, and general off-premise — rather than being restricted to spirits-licensed accounts only. This gives wine-based soju a significant distribution advantage over spirit-based alternatives and is one of the primary reasons RTM has prioritized this category.',
  },
  {
    question: 'How does RTM identify which Asian brands to represent?',
    answer: 'RTM uses a data-driven approach: we review distributor depletion reports and margin data to identify underpenetrated categories with strong velocity, then validate with sales team interviews across key markets. We look for brands with low cost-to-serve, strong shelf presence, minimal domestic competition, and an authentic story that resonates with the US consumer. This methodology has consistently led us to categories before they peak — it is how we identified the Asian beverage opportunity, and it is how we will find the next one.',
  },
  {
    question: 'Can RTM represent a brand that already has some US distribution?',
    answer: 'Yes. In many cases, brands that have achieved regional success in the US are seeking a partner to take them national. RTM\'s network of 25+ active wholesale partners and nationwide reach means we can expand a brand\'s footprint without requiring it to start from scratch. We have done this successfully — taking regionally proven brands to national distribution within twelve months of taking on representation.',
  },
  {
    question: 'Does RTM work directly with producers, or only through intermediaries?',
    answer: 'RTM works directly with producers. We make annual trips to Asia to visit production facilities, vet product quality, and build direct relationships with brand owners and their export teams. These direct relationships are central to how we operate; they allow us to move quickly when a brand is ready to scale, and to manage quality and supply chain issues without layers of intermediaries.',
  },
  {
    question: 'What is the process for a Korean or Japanese producer to begin working with RTM?',
    answer: 'The first step is a conversation — typically initiated through our contact form or an existing relationship. RTM will evaluate the brand against our current portfolio, category fit, and market opportunity. If there is a fit, we move to a formal market positioning process: defining the right consumer, channel, and price architecture before any compliance or import work begins. Full import timelines for a new brand range from 3 to 9 months, depending on category and compliance complexity.',
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
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-card/80 transition-colors"
      >
        <span className="font-body text-sm font-medium text-foreground pr-8">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
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
            <div className="px-6 pb-5 pt-2">
              <p className="font-body text-sm text-foreground/80 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-12">
          <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">
            Frequently Asked Questions
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            Common questions about <span className="italic text-primary">Asian beverages</span>
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