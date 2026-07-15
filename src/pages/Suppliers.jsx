import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import GoldUnderline from '../components/GoldUnderline';
import DocumentItem from '../components/suppliers/DocumentItem';

// Prototype seed data — titles and URLs will come from uploaded files (managed in WordPress).
const DOCUMENTS = [
  { title: 'RTM Imports — 2026 Brand Portfolio Presentation', fileUrl: '#' },
  { title: 'Good Friends Soju — Brand Sell Sheet (PDF)', fileUrl: '#' },
  { title: 'KTOWN Yuzu — Retail Marketing Deck', fileUrl: '#' },
  { title: 'Hokkaido Brewing — Product Line Overview', fileUrl: '#' },
  { title: 'Wine-Based RTD Category — Market Brief', fileUrl: '#' },
  { title: 'RTM Compliance & Licensing Capabilities', fileUrl: '#' },
  { title: 'Custom Label Program — Development Guide', fileUrl: '#' },
  { title: 'Wholesale Pricing & Distribution Map', fileUrl: '#' },
];

export default function Suppliers() {
  const hasDocuments = DOCUMENTS.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-20 min-h-[40vh] flex items-end" style={{ background: '#0A2454' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="font-eyebrow text-xs tracking-widest uppercase block mb-8" style={{ color: 'rgba(244,196,48,0.9)' }}>
              RTM Wholesaler Portal
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl" style={{ color: '#F8F3E8' }}>
              Supplier <GoldUnderline>Resources</GoldUnderline>
            </h1>
            <p className="font-body text-base leading-relaxed max-w-2xl mt-6" style={{ color: 'rgba(248,243,232,0.85)' }}>
              Browse and download the latest documents and presentations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Document list */}
      <section className="py-24 md:py-32" style={{ background: '#FFFCF5' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {hasDocuments ? (
            <div className="space-y-5">
              {DOCUMENTS.map((doc, idx) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <DocumentItem title={doc.title} fileUrl={doc.fileUrl} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20" style={{ color: '#0A2454' }}>
              <FolderOpen className="w-10 h-10 mx-auto mb-4 text-rtm-cobalt/60" data-no-bounce />
              <p className="font-body text-base">No documents available yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}