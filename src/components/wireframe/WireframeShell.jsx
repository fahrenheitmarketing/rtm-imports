import React from 'react';

// Reusable wireframe primitives
export const WBox = ({ className = '', children, label, img, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 text-xs select-none ${onClick ? 'cursor-pointer hover:bg-gray-300 transition-colors' : ''} ${className}`}
  >
    {img ? (
      <div className="flex flex-col items-center gap-1 opacity-60">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 9 4-4 4 4 4-6 4 4"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>
        {label && <span className="tracking-wide">{label}</span>}
      </div>
    ) : label ? (
      <span className="tracking-wide text-center px-2">{label}</span>
    ) : children}
  </div>
);

export const WText = ({ lines = 3, className = '', short }) => (
  <div className={`space-y-1.5 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-2 bg-gray-300 rounded"
        style={{ width: i === lines - 1 && !short ? '65%' : short && i % 2 === 0 ? '80%' : '100%' }}
      />
    ))}
  </div>
);

export const WHeading = ({ size = 'lg', className = '', width = '80%' }) => {
  const heights = { xl: 'h-8', lg: 'h-6', md: 'h-5', sm: 'h-4' };
  return <div className={`bg-gray-400 rounded ${heights[size]} ${className}`} style={{ width }} />;
};

export const WLabel = ({ className = '' }) => (
  <div className={`h-2 w-20 bg-yellow-400 rounded ${className}`} />
);

export const WBtn = ({ primary, label = 'Button', onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 text-xs tracking-widest uppercase font-semibold rounded transition-all duration-150 ${
      primary
        ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 border border-yellow-500'
        : 'border-2 border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-800'
    } ${className}`}
  >
    {label}
  </button>
);

export const WDivider = ({ className = '' }) => (
  <div className={`h-px bg-gray-300 w-full ${className}`} />
);

export const WCard = ({ className = '', children }) => (
  <div className={`bg-white border border-gray-300 rounded p-4 ${className}`}>{children}</div>
);

export const WTag = ({ label }) => (
  <span className="px-2 py-0.5 border border-gray-400 text-gray-500 text-xs rounded">{label}</span>
);

export default function WireframeShell({ children, activePage, onNavigate }) {
  const NAV_LINKS = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'news', label: 'News' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-xl">
      {/* Browser chrome */}
      <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="flex-1 mx-4 bg-gray-700 rounded h-5 flex items-center px-3">
          <span className="text-gray-400 text-xs">rtm-imports.com/{activePage === 'home' ? '' : activePage}</span>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-gray-900 border-b border-gray-700 px-10 py-4 flex items-center justify-between">
        <div className="w-12 h-12 bg-yellow-400/20 border border-yellow-400/40 rounded flex items-center justify-center">
          <span className="text-yellow-400 text-xs font-bold">RTM</span>
        </div>
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id)}
              className={`text-xs tracking-widest uppercase transition-colors ${
                activePage === l.id ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Page content */}
      <div className="bg-gray-50">{children}</div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-700 px-10 py-10">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div className="w-12 h-12 bg-yellow-400/20 border border-yellow-400/40 rounded flex items-center justify-center mb-4">
              <span className="text-yellow-400 text-xs font-bold">RTM</span>
            </div>
            <WText lines={3} className="opacity-30" />
          </div>
          <div>
            <div className="h-2 w-16 bg-yellow-400 rounded mb-4" />
            <div className="space-y-2">
              {['About', 'Services', 'Portfolio', 'Contact'].map((l) => (
                <div key={l} className="h-2 w-20 bg-gray-600 rounded" />
              ))}
            </div>
          </div>
          <div>
            <div className="h-2 w-16 bg-yellow-400 rounded mb-4" />
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1"><div className="h-2 w-32 bg-gray-600 rounded"/><div className="h-2 w-24 bg-gray-600 rounded"/></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-600 flex-shrink-0" />
                <div className="h-2 w-36 bg-gray-600 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 flex justify-between">
          <div className="h-2 w-48 bg-gray-700 rounded" />
          <div className="h-2 w-32 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}