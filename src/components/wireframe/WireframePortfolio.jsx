import React from 'react';
import { WBox, WText, WHeading, WLabel, WBtn, WTag } from './WireframeShell';

const CATEGORIES = [
  { title: 'Asian Spirits', tags: ['Sake', 'Soju', 'Shochu', 'Japanese Whisky'] },
  { title: 'European Wines', tags: ['French', 'Italian', 'Spanish', 'Portuguese'] },
  { title: 'Craft & RTD', tags: ['Ready-to-Drink', 'Craft Beer', 'Wine-Based'] },
];

const REGIONS = ['South Korea', 'Japan', 'China', 'Thailand', 'Taiwan', 'France', 'Italy', 'Spain & Portugal'];

export default function WireframePortfolio({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div className="relative">
        <WBox className="w-full h-48" img label="Portfolio Hero — Wine Cellar" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/30 flex items-end pb-10 px-12">
          <div>
            <WLabel className="mb-3" />
            <WHeading size="xl" width="200px" className="mb-1 bg-white/80" />
            <WHeading size="xl" width="160px" className="bg-yellow-300/80" />
          </div>
        </div>
      </div>

      {/* Philosophy quote */}
      <div className="px-12 py-10 bg-white text-center border-b border-gray-100">
        <WLabel className="mb-3 mx-auto" />
        <WHeading size="md" width="75%" className="mx-auto mb-2" />
        <WHeading size="md" width="55%" className="mx-auto mb-4" />
        <WText lines={1} className="max-w-xs mx-auto" />
      </div>

      {/* Categories — alternating */}
      <div className="px-12 py-10 bg-white space-y-12">
        <div className="mb-4">
          <WLabel className="mb-2" />
          <WHeading size="lg" width="220px" />
        </div>
        {CATEGORIES.map((cat, idx) => (
          <div key={cat.title} className={`grid grid-cols-5 gap-6 items-center`}>
            <div className={`col-span-2 ${idx % 2 === 1 ? 'order-2' : ''}`}>
              <WBox className="w-full h-36" img label={cat.title} />
            </div>
            <div className={`col-span-3 ${idx % 2 === 1 ? 'order-1' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-sm" />
                <div className="h-4 w-28 bg-gray-400 rounded" />
              </div>
              <WText lines={3} className="mb-4" />
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((t) => <WTag key={t} label={t} />)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regions grid */}
      <div className="px-12 py-12 bg-gray-50 border-y border-gray-200">
        <div className="text-center mb-8">
          <WLabel className="mb-2 mx-auto" />
          <WHeading size="lg" width="35%" className="mx-auto" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {REGIONS.map((r) => (
            <div key={r} className="border border-gray-200 bg-white p-4 rounded">
              <div className="h-4 w-28 bg-gray-400 rounded mb-2" />
              <div className="h-2 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-12 py-12 bg-white text-center">
        <WHeading size="lg" width="32%" className="mx-auto mb-3" />
        <WText lines={2} className="max-w-md mx-auto mb-6" />
        <WBtn primary label="Request Portfolio Details" onClick={() => onNavigate('contact')} />
      </div>
    </div>
  );
}