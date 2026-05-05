import React from 'react';
import { WBox, WText, WHeading, WLabel, WBtn, WDivider } from './WireframeShell';

const SERVICES = [
  { title: 'Asian Beverages', page: 'services-asian' },
  { title: 'Custom Labels', page: null },
  { title: 'Compliance & Licensing', page: null },
];

export default function WireframeServices({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div className="relative">
        <WBox className="w-full h-48" img label="Services Hero Image" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/30 flex items-end pb-10 px-12">
          <div>
            <WLabel className="mb-3" />
            <WHeading size="xl" width="220px" className="mb-1 bg-white/80" />
            <WHeading size="xl" width="180px" className="bg-yellow-300/80" />
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="px-12 py-10 bg-white text-center">
        <WText lines={2} className="max-w-lg mx-auto" />
      </div>

      {/* Services — alternating */}
      <div className="px-12 pb-16 bg-white space-y-16">
        {SERVICES.map((s, idx) => (
          <div key={s.title} className={`grid grid-cols-2 gap-10 items-center`}>
            <div className={idx % 2 === 1 ? 'order-2' : ''}>
              <WBox className="w-full h-48" img label={`${s.title} Image`} />
            </div>
            <div className={idx % 2 === 1 ? 'order-1' : ''}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 bg-yellow-400 rounded-sm" />
                <WLabel />
              </div>
              <WHeading size="lg" width="80%" className="mb-4" />
              <WText lines={4} className="mb-6" />
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 bg-yellow-400/60 rounded" />
                <div className="w-3 h-3 border border-yellow-400 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gray-50 border-t border-gray-200 px-12 py-12 text-center">
        <WHeading size="lg" width="30%" className="mx-auto mb-3" />
        <WText lines={2} className="max-w-md mx-auto mb-6" />
        <WBtn primary label="Get in Touch" onClick={() => onNavigate('contact')} />
      </div>
    </div>
  );
}