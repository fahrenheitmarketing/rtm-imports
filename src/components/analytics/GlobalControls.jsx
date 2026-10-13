import React, { useState } from 'react';
import { RefreshCw, LogOut, Printer, Settings, Calendar, GitCompare } from 'lucide-react';

const PRESETS = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: 'last_month', label: 'Last Month' },
  { id: '90d', label: '90 Days' },
];

const COMPARES = [
  { id: 'previous', label: 'Previous period' },
  { id: 'last_year', label: 'Same period last year' },
  { id: 'none', label: 'None' },
];

const inputStyle = {
  background: 'rgba(10,36,84,0.8)',
  border: '1px solid rgba(244,196,48,0.3)',
  color: '#F8F3E8',
  borderRadius: '0.5rem',
  padding: '0.45rem 0.6rem',
  fontSize: '0.8rem',
  fontFamily: 'var(--font-body)',
};

export default function GlobalControls({ preset, customStart, customEnd, compareMode, onApply, onCompare, onRefresh, onExport, onSettings, loading, cachedAt }) {
  const [showCustom, setShowCustom] = useState(preset === 'custom');
  const [cStart, setCStart] = useState(customStart || '');
  const [cEnd, setCEnd] = useState(customEnd || '');

  const pickPreset = (id) => { setShowCustom(false); onApply({ preset: id, customStart: null, customEnd: null }); };
  const applyCustom = (e) => { e.preventDefault(); if (cStart && cEnd) onApply({ preset: 'custom', customStart: cStart, customEnd: cEnd }); };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        {PRESETS.map((p) => (
          <button key={p.id} onClick={() => pickPreset(p.id)} disabled={loading}
            className="px-3 py-2 rounded-lg font-body text-sm transition-all disabled:opacity-50"
            style={{ border: '1px solid rgba(244,196,48,0.3)', background: preset === p.id && !showCustom ? 'rgba(244,196,48,0.15)' : 'transparent', color: preset === p.id && !showCustom ? '#F4C430' : 'rgba(248,243,232,0.7)' }}>
            {p.label}
          </button>
        ))}
        <button onClick={() => setShowCustom((s) => !s)} disabled={loading}
          className="px-3 py-2 rounded-lg font-body text-sm transition-all disabled:opacity-50"
          style={{ border: '1px solid rgba(244,196,48,0.3)', background: showCustom ? 'rgba(244,196,48,0.15)' : 'transparent', color: showCustom ? '#F4C430' : 'rgba(248,243,232,0.7)' }}>
          Custom
        </button>
      </div>

      {showCustom && (
        <form onSubmit={applyCustom} className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-4 h-4" style={{ color: 'rgba(248,243,232,0.5)' }} />
          <input type="date" value={cStart} onChange={(e) => setCStart(e.target.value)} max={cEnd || undefined} style={inputStyle} className="w-36" />
          <span style={{ color: 'rgba(248,243,232,0.4)' }}>—</span>
          <input type="date" value={cEnd} onChange={(e) => setCEnd(e.target.value)} min={cStart || undefined} style={inputStyle} className="w-36" />
          <button type="submit" disabled={loading || !cStart || !cEnd} className="px-3 py-2 rounded-lg font-body text-sm transition-opacity disabled:opacity-50" style={{ border: '1px solid rgba(244,196,48,0.3)', color: '#F4C430' }}>Apply</button>
        </form>
      )}

      <span className="font-body text-xs px-1" style={{ color: 'rgba(248,243,232,0.3)' }}>|</span>

      <div className="flex items-center gap-1.5">
        <GitCompare className="w-4 h-4" style={{ color: 'rgba(248,243,232,0.5)' }} />
        <select value={compareMode} onChange={(e) => onCompare(e.target.value)} style={inputStyle} className="cursor-pointer">
          {COMPARES.map((c) => <option key={c.id} value={c.id} style={{ color: '#0A2454' }}>{c.label}</option>)}
        </select>
      </div>

      <span className="font-body text-xs px-1" style={{ color: 'rgba(248,243,232,0.3)' }}>|</span>

      <button onClick={onRefresh} disabled={loading} className="flex items-center gap-2 px-3 py-2 rounded-lg font-body text-sm transition-opacity disabled:opacity-50" style={{ border: '1px solid rgba(244,196,48,0.3)', color: '#F4C430' }}>
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
      </button>
      <button onClick={onExport} className="flex items-center gap-2 px-3 py-2 rounded-lg font-body text-sm" style={{ border: '1px solid rgba(248,243,232,0.2)', color: 'rgba(248,243,232,0.7)' }}>
        <Printer className="w-4 h-4" /> Export PDF
      </button>
      <button onClick={onSettings} className="flex items-center gap-2 px-3 py-2 rounded-lg font-body text-sm" style={{ border: '1px solid rgba(248,243,232,0.2)', color: 'rgba(248,243,232,0.7)' }}>
        <Settings className="w-4 h-4" /> Settings
      </button>
    </div>
  );
}