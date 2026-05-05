import React from 'react';
import { WBox, WText, WHeading, WLabel, WBtn, WDivider, WCard } from './WireframeShell';

export default function WireframeHome({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div className="relative">
        <WBox className="w-full h-80" img label="Hero Image — Premium Spirits" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/20 flex items-end pb-10 px-12">
          <div className="max-w-xs">
            <WLabel className="mb-3" />
            <WHeading size="xl" width="100%" className="mb-2 bg-white/80" />
            <WHeading size="xl" width="85%" className="mb-2 bg-yellow-300/80" />
            <WHeading size="xl" width="65%" className="mb-4 bg-white/80" />
            <WText lines={3} className="mb-6 opacity-60" />
            <div className="flex gap-3">
              <WBtn primary label="Our Services" onClick={() => onNavigate('services')} />
              <WBtn label="Get in Touch" onClick={() => onNavigate('contact')} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-900 px-12 py-8">
        <div className="grid grid-cols-4 gap-6">
          {[['30+', 'Years in Category'], ['25+', 'Wholesale Partners'], ['5', 'Source Countries'], ['Asian', 'Beverage Focus']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{val}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expertise */}
      <div className="px-12 py-14 bg-white">
        <div className="mb-8">
          <WLabel className="mb-2" />
          <WHeading size="lg" width="45%" className="mb-3" />
          <WText lines={2} className="max-w-lg" />
        </div>
        <div className="grid grid-cols-3 gap-5">
          {['Asian Beverages', 'Custom Labels', 'Compliance & Licensing'].map((title, i) => (
            <div key={title} className="group">
              <WBox className="w-full h-36 mb-3" img label={`Image ${i + 1}`} />
              <div className="p-1">
                <div className="h-2 w-16 bg-yellow-400 rounded mb-2" />
                <div className="h-4 w-40 bg-gray-400 rounded mb-2" />
                <WText lines={3} />
                <div className="mt-3 flex items-center gap-1">
                  <div className="h-2 w-24 bg-yellow-400/60 rounded" />
                  <div className="w-3 h-3 border border-yellow-400 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="px-12 py-12 bg-gray-50 text-center border-y border-gray-200">
        <div className="w-8 h-px bg-yellow-400 mx-auto mb-6" />
        <WHeading size="md" width="80%" className="mx-auto mb-3 bg-gray-400" />
        <WHeading size="md" width="60%" className="mx-auto mb-6 bg-gray-400" />
        <div className="h-2 w-28 bg-gray-300 mx-auto" />
        <div className="w-8 h-px bg-yellow-400 mx-auto mt-6" />
      </div>

      {/* News teaser */}
      <div className="px-12 py-14 bg-white border-t border-gray-200">
        <div className="flex items-end justify-between mb-8">
          <div>
            <WLabel className="mb-2" />
            <WHeading size="lg" width="220px" />
          </div>
          <WBtn label="All Articles →" onClick={() => onNavigate('news')} />
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded overflow-hidden">
              <WBox className="w-full h-24" img label="" />
              <div className="p-4">
                <div className="h-2 w-20 bg-yellow-400 rounded mb-2" />
                <div className="h-4 w-full bg-gray-400 rounded mb-1" />
                <div className="h-4 w-3/4 bg-gray-400 rounded mb-3" />
                <WText lines={2} />
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="h-2 w-16 bg-gray-300 rounded" />
                  <div className="h-2 w-10 bg-yellow-400/60 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 px-12 py-16 text-center">
        <WHeading size="lg" width="50%" className="mx-auto mb-4 bg-white/70" />
        <WHeading size="lg" width="35%" className="mx-auto mb-6 bg-yellow-400/60" />
        <WText lines={2} className="max-w-md mx-auto mb-8 opacity-40" />
        <WBtn primary label="Contact Us" onClick={() => onNavigate('contact')} />
      </div>
    </div>
  );
}