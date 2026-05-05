import React, { useState } from 'react';
import { WBox, WText, WHeading, WLabel, WBtn, WTag } from './WireframeShell';

const CATS = ['All', 'Industry Trend', 'Partnership', 'Press Release', 'Market Data', 'Company Update'];

export default function WireframeNews({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div>
      {/* Hero */}
      <div className="px-12 pt-10 pb-8 bg-white border-b border-gray-100">
        <WLabel className="mb-3" />
        <WHeading size="xl" width="55%" className="mb-2" />
        <WHeading size="xl" width="40%" className="mb-4 bg-yellow-300/60" />
        <WText lines={2} className="max-w-sm" />
      </div>

      {/* Featured Post */}
      <div className="px-12 py-8 bg-white">
        <div className="grid grid-cols-2 border-2 border-yellow-400/40 rounded overflow-hidden">
          <WBox className="h-52" img label="Featured Image" />
          <div className="bg-gray-50 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-5 w-24 bg-yellow-400/60 rounded px-2" />
                <div className="h-3 w-20 bg-gray-300 rounded" />
              </div>
              <WHeading size="lg" width="90%" className="mb-2" />
              <WHeading size="lg" width="70%" className="mb-4" />
              <WText lines={3} />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-4 h-4 bg-yellow-400/50 rounded" />
              <div className="h-2 w-24 bg-yellow-400/60 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-12 py-4 bg-gray-50 border-y border-gray-200">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest border rounded transition-all ${
                activeFilter === c
                  ? 'bg-yellow-400 border-yellow-400 text-gray-900 font-semibold'
                  : 'border-gray-300 text-gray-500 hover:border-gray-500'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="px-12 py-10 bg-white">
        <div className="grid grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 rounded overflow-hidden">
              <WBox className="w-full h-28" img label="" />
              <div className="p-5">
                <div className="h-5 w-24 bg-yellow-400/50 rounded mb-3" />
                <div className="h-4 w-full bg-gray-400 rounded mb-1" />
                <div className="h-4 w-2/3 bg-gray-400 rounded mb-3" />
                <WText lines={2} />
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="h-2 w-16 bg-gray-300 rounded" />
                  <div className="h-2 w-10 bg-yellow-400/50 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}