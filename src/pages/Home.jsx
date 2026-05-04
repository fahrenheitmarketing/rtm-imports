import React, { useState, useEffect } from 'react';
import AgeGate from '../components/AgeGate';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import ExpertiseSection from '../components/home/ExpertiseSection';
import StatsSection from '../components/home/StatsSection';
import QuoteSection from '../components/home/QuoteSection';
import CTASection from '../components/home/CTASection';
import NewsSection from '../components/home/NewsSection';

export default function Home() {
  // Age gate temporarily disabled
  // const [ageVerified, setAgeVerified] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ExpertiseSection />
        <QuoteSection />
        <NewsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}