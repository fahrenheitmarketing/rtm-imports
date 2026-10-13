import React from 'react';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'traffic', label: 'Traffic' },
  { id: 'search', label: 'Search' },
  { id: 'blog', label: 'Blog' },
  { id: 'digital-assets', label: 'Digital Assets' },
];

export default function SectionNav() {
  const go = (id) => {
    const el = document.getElementById(`sec-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className="sticky top-[73px] z-20 border-b" style={{ background: 'rgba(10,36,84,0.92)', borderColor: 'rgba(244,196,48,0.15)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-7xl mx-auto px-6 py-2 flex gap-1 overflow-x-auto">
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => go(s.id)} className="px-3 py-1.5 rounded-lg font-body text-sm whitespace-nowrap transition-colors hover:bg-white/5" style={{ color: 'rgba(248,243,232,0.75)' }}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}