import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function DocumentItem({ title, fileUrl }) {
  return (
    <div
      className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-[18px] border p-6 transition-all duration-300"
      style={{
        background: '#FFFCF5',
        borderColor: 'rgba(244,196,48,0.45)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,36,84,0.10)';
        e.currentTarget.style.borderColor = 'rgba(244,196,48,0.75)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(244,196,48,0.45)';
      }}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div
          className="flex items-center justify-center rounded-lg w-12 h-12 flex-shrink-0"
          style={{ background: 'rgba(10,36,84,0.08)' }}
        >
          <FileText className="w-6 h-6 text-rtm-cobalt" />
        </div>
        <p className="font-display text-lg text-rtm-ink font-semibold truncate">{title}</p>
      </div>

      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 font-body text-xs tracking-widest uppercase rounded-lg transition-all duration-300 flex-shrink-0"
        style={{ background: '#0A2454', color: '#F4C430', border: '1px solid rgba(244,196,48,0.45)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#F4C430';
          e.currentTarget.style.color = '#0A2454';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0A2454';
          e.currentTarget.style.color = '#F4C430';
        }}
      >
        Download
        <Download className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}