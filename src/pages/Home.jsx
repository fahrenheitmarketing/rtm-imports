import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import ExpertiseSection from '../components/home/ExpertiseSection';
import StatsSection from '../components/home/StatsSection';
import ProofBlock from '../components/home/ProofBlock';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';
import NewsSection from '../components/home/NewsSection';

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does RTM Imports do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RTM Imports is a specialist beverage importer operating exclusively in the B2B wholesale channel. We represent and develop brands across emerging and established categories — from fine wine and spirits to the fastest-growing segments in the US market today. We also develop custom labels for retailers and operators, and provide compliance and licensing infrastructure for producers entering the US market."
      }
    },
    {
      "@type": "Question",
      "name": "Is RTM Imports a distributor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. RTM is an importer and supplier; we work with distributors, not as one. We provide brands, compliance infrastructure, and producer relationships to the wholesale channel. RTM warehouses product and ships to wholesalers but does not deliver directly to retail or on-premise accounts."
      }
    },
    {
      "@type": "Question",
      "name": "What types of businesses does RTM work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RTM works with three main groups: producers seeking US market entry, US retailers and hospitality operators building private-label programs, and US wholesale distributors looking to strengthen or diversify their beverage portfolio."
      }
    }
  ]
};

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(FAQ_SCHEMA);
    script.id = 'faq-schema';
    if (!document.getElementById('faq-schema')) {
      document.head.appendChild(script);
    }
    return () => {
      const el = document.getElementById('faq-schema');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ExpertiseSection />
        <ProofBlock />
        <NewsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}