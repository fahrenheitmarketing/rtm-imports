import React, { useState } from 'react';
import WireframeShell from '../components/wireframe/WireframeShell';
import WireframeHome from '../components/wireframe/WireframeHome';
import WireframeAbout from '../components/wireframe/WireframeAbout';
import WireframeServices from '../components/wireframe/WireframeServices';
import WireframePortfolio from '../components/wireframe/WireframePortfolio';
import WireframeContact from '../components/wireframe/WireframeContact';
import WireframeNews from '../components/wireframe/WireframeNews';

const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'news', label: 'News' },
  { id: 'contact', label: 'Contact' },
];

const PAGE_COMPONENTS = {
  home: WireframeHome,
  about: WireframeAbout,
  services: WireframeServices,
  portfolio: WireframePortfolio,
  news: WireframeNews,
  contact: WireframeContact,
};

export default function Wireframe() {
  const [activePage, setActivePage] = useState('home');

  const PageComponent = PAGE_COMPONENTS[activePage];

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* Presenter toolbar */}
      <div className="sticky top-0 z-50 bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="text-xs tracking-widest uppercase font-semibold text-gray-300">RTM Imports — Interactive Wireframe</span>
        </div>
        <div className="flex items-center gap-1">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePage(p.id)}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-150 rounded ${
                activePage === p.id
                  ? 'bg-yellow-400 text-gray-900 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wireframe Canvas */}
      <div className="max-w-5xl mx-auto my-8 px-4">
        <WireframeShell activePage={activePage} onNavigate={setActivePage}>
          <PageComponent onNavigate={setActivePage} />
        </WireframeShell>
      </div>

      {/* Legend */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="bg-white border border-gray-200 rounded px-6 py-4 flex flex-wrap gap-6 text-xs text-gray-500">
          <span className="font-semibold text-gray-700 uppercase tracking-widest">Legend:</span>
          <span className="flex items-center gap-2"><span className="w-8 h-4 bg-gray-200 rounded inline-block border border-gray-300" /> Image placeholder</span>
          <span className="flex items-center gap-2"><span className="w-8 h-4 bg-gray-300 rounded inline-block border border-gray-400" /> Content block</span>
          <span className="flex items-center gap-2"><span className="w-8 h-4 bg-yellow-200 rounded inline-block border border-yellow-400" /> Primary CTA</span>
          <span className="flex items-center gap-2"><span className="w-8 h-4 border-2 border-gray-400 rounded inline-block" /> Secondary action</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 inline-block" /> Clickable / navigates</span>
        </div>
      </div>
    </div>
  );
}