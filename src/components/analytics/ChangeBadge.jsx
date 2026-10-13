import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

// Change badge: % change vs comparison. invert=true when a decrease is an improvement
// (bounce rate, avg position). isPosition shows the position difference instead of %.
export default function ChangeBadge({ current, comparison, invert = false, isPosition = false }) {
  if (current == null || comparison == null) {
    return <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.35)' }}>—</span>;
  }

  if (isPosition) {
    const diff = (comparison || 0) - (current || 0); // positive = improved (lower rank number)
    if (diff === 0) {
      return <span className="inline-flex items-center font-body text-xs" style={{ color: 'rgba(248,243,232,0.45)' }}><Minus className="w-3 h-3" /> 0.0</span>;
    }
    const improved = diff > 0;
    return (
      <span className="inline-flex items-center gap-0.5 font-body text-xs font-medium" style={{ color: improved ? '#4ade80' : '#f87171' }}>
        {improved ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
        {diff > 0 ? '+' : ''}{diff.toFixed(1)}
      </span>
    );
  }

  if (comparison === 0) {
    if (current > 0) return <span className="font-body text-xs font-medium" style={{ color: '#4ade80' }}>New</span>;
    return <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.35)' }}>—</span>;
  }
  const pct = ((current - comparison) / comparison) * 100;
  const improved = invert ? pct < 0 : pct > 0;
  if (pct === 0) {
    return <span className="inline-flex items-center font-body text-xs" style={{ color: 'rgba(248,243,232,0.45)' }}><Minus className="w-3 h-3" /></span>;
  }
  return (
    <span className="inline-flex items-center gap-0.5 font-body text-xs font-medium" style={{ color: improved ? '#4ade80' : '#f87171' }}>
      {improved ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
      {pct > 0 ? '+' : ''}{pct.toFixed(1)}%
    </span>
  );
}