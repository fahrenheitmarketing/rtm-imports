import React from 'react';
import { WBox, WText, WHeading, WLabel, WBtn, WDivider, WCard } from './WireframeShell';

export default function WireframeAbout({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div className="relative">
        <WBox className="w-full h-56" img label="About Hero Image" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/30 flex items-end pb-10 px-12">
          <div className="max-w-xs">
            <WLabel className="mb-3" />
            <WHeading size="xl" width="100%" className="mb-2 bg-white/80" />
            <WHeading size="xl" width="70%" className="mb-1 bg-yellow-300/80" />
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="px-12 py-14 bg-white">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <WLabel className="mb-3" />
            <WHeading size="lg" width="60%" className="mb-4" />
            <WText lines={5} className="mb-4" />
            <WText lines={4} className="mb-4" />
            <WText lines={4} />
          </div>
          <div className="space-y-5">
            <WCard>
              <div className="h-6 w-4 bg-yellow-400/40 rounded mb-3" />
              <WText lines={3} />
            </WCard>
            <div className="grid grid-cols-2 gap-4">
              {[['30+', 'Years in Category'], ['25+', 'Wholesale Partners']].map(([n, l]) => (
                <WCard key={l} className="text-center">
                  <div className="text-2xl font-bold text-yellow-500 mb-1">{n}</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">{l}</div>
                </WCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="px-12 py-14 bg-gray-50 border-y border-gray-200">
        <div className="text-center mb-8">
          <WLabel className="mb-2 mx-auto" />
          <WHeading size="lg" width="30%" className="mx-auto mb-3" />
          <WText lines={2} className="max-w-md mx-auto" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {['Fearless Creativity', 'Aggressive Adaptability', 'Relationship-First'].map((v) => (
            <div key={v} className="text-center p-6">
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 mx-auto mb-4 flex items-center justify-center">
                <div className="w-5 h-5 bg-gray-400 rounded" />
              </div>
              <div className="h-4 w-36 bg-gray-400 rounded mx-auto mb-3" />
              <WText lines={3} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-12 py-14 bg-white text-center">
        <WHeading size="lg" width="35%" className="mx-auto mb-4" />
        <WText lines={2} className="max-w-md mx-auto mb-8" />
        <WBtn primary label="Start the Conversation" onClick={() => onNavigate('contact')} />
      </div>
    </div>
  );
}