import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const PRESETS = [
  { label: '7 Days', days: 7 },
  { label: '30 Days', days: 30 },
];

const fmtDate = (d) => d.toISOString().split('T')[0];

export default function DateRangeSelector({ startDate, endDate, onApply, loading }) {
  const [mode, setMode] = useState('preset');
  const [activePreset, setActivePreset] = useState(30);
  const [customStart, setCustomStart] = useState(startDate || '');
  const [customEnd, setCustomEnd] = useState(endDate || '');

  const applyPreset = (days) => {
    setActivePreset(days);
    setMode('preset');
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - (days - 1));
    onApply(fmtDate(start), fmtDate(end));
  };

  const applyCustom = (e) => {
    e.preventDefault();
    if (customStart && customEnd) {
      setMode('custom');
      onApply(customStart, customEnd);
    }
  };

  const inputStyle = {
    background: 'rgba(10,36,84,0.8)',
    border: '1px solid rgba(244,196,48,0.3)',
    color: '#F8F3E8',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-body)',
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {PRESETS.map((p) => (
        <button
          key={p.days}
          onClick={() => applyPreset(p.days)}
          disabled={loading}
          className="px-3 py-2 rounded-lg font-body text-sm transition-all disabled:opacity-50"
          style={{
            border: '1px solid rgba(244,196,48,0.3)',
            background: mode === 'preset' && activePreset === p.days ? 'rgba(244,196,48,0.15)' : 'transparent',
            color: mode === 'preset' && activePreset === p.days ? '#F4C430' : 'rgba(248,243,232,0.7)',
          }}
        >
          {p.label}
        </button>
      ))}

      <span className="font-body text-xs px-1" style={{ color: 'rgba(248,243,232,0.3)' }}>|</span>

      <form onSubmit={applyCustom} className="flex items-center gap-2">
        <Calendar className="w-4 h-4" style={{ color: 'rgba(248,243,232,0.5)' }} />
        <input
          type="date"
          value={customStart}
          onChange={(e) => setCustomStart(e.target.value)}
          max={customEnd || fmtDate(new Date())}
          style={inputStyle}
          className="w-36"
        />
        <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.4)' }}>—</span>
        <input
          type="date"
          value={customEnd}
          onChange={(e) => setCustomEnd(e.target.value)}
          min={customStart}
          max={fmtDate(new Date())}
          style={inputStyle}
          className="w-36"
        />
        <button
          type="submit"
          disabled={loading || !customStart || !customEnd}
          className="px-3 py-2 rounded-lg font-body text-sm transition-opacity disabled:opacity-50"
          style={{ border: '1px solid rgba(244,196,48,0.3)', color: '#F4C430' }}
        >
          Apply
        </button>
      </form>
    </div>
  );
}