import React from 'react';
import { motion } from 'framer-motion';
import ChangeBadge from './ChangeBadge';

// KPI card with current value, muted comparison value, and a change badge.
// `format` converts a raw number to a display string.
export default function KpiCard({ label, current, comparison, format, icon: Icon, invert = false, isPosition = false, delay = 0, sublabel }) {
  const hasComp = comparison != null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl p-5 border"
      style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-body text-xs uppercase tracking-widest" style={{ color: 'rgba(248,243,232,0.6)' }}>{label}</span>
        {Icon && <Icon className="w-4 h-4" style={{ color: 'rgba(244,196,48,0.7)' }} />}
      </div>
      <p className="font-display text-2xl md:text-3xl" style={{ color: '#F4C430' }}>{format(current)}</p>
      <div className="flex items-center justify-between mt-2">
        {hasComp ? (
          <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.45)' }}>
            vs {format(comparison)}
          </span>
        ) : <span />}
        {hasComp && <ChangeBadge current={current} comparison={comparison} invert={invert} isPosition={isPosition} />}
      </div>
      {sublabel && <p className="font-body text-xs mt-1" style={{ color: 'rgba(248,243,232,0.5)' }}>{sublabel}</p>}
    </motion.div>
  );
}