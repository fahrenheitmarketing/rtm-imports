// Shared formatting + change helpers for the Performance Dashboard

export const fmtNum = (n) => new Intl.NumberFormat('en-US').format(Math.round(n || 0));
export const fmtPct = (fraction) => `${((fraction || 0) * 100).toFixed(1)}%`;
export const fmtDuration = (s) => {
  const m = Math.floor((s || 0) / 60);
  const sec = Math.round((s || 0) % 60);
  return `${m}m ${sec}s`;
};
export const fmtPos = (n) => (n || 0).toFixed(1);

// % change vs comparison. Returns null when not computable.
export const changePct = (cur, comp) => {
  if (comp == null || comp === 0) return null;
  return ((cur - comp) / comp) * 100;
};

export const fmtDate = (d) => {
  if (!d) return '';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const fmtGaDate = (s) => {
  if (!s || s.length !== 8) return s;
  return `${s.substring(4, 6)}/${s.substring(6, 8)}`;
};