import React, { useState, useEffect } from 'react';
import AgeGate from '../components/AgeGate';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import ExpertiseSection from '../components/home/ExpertiseSection';
import StatsSection from '../components/home/StatsSection';
import QuoteSection from '../components/home/QuoteSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem('rtm_age_verified');
    if (verified === 'true') setAgeVerified(true);
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem('rtm_age_verified', 'true');
    setAgeVerified(true);
  };

  if (!ageVerified) {
    return <AgeGate onConfirm={handleConfirm} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ExpertiseSection />
        <QuoteSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}