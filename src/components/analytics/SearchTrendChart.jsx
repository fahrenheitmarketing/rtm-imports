import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fmtGaDate, fmtNum } from './format';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0A2454', border: '1px solid rgba(244,196,48,0.4)', borderRadius: '8px', padding: '8px 12px' }}>
      <p style={{ color: '#F8F3E8', margin: 0, fontSize: 12, marginBottom: 4 }}>{fmtGaDate(label)}</p>
      {payload.map((e, i) => (
        <p key={i} style={{ color: e.color, margin: 0, fontSize: 12 }}>{e.name}: {fmtNum(e.value)}</p>
      ))}
    </div>
  );
}

// Clicks/Impressions trend with a metric toggle. Brand & Non-brand lines for
// current (solid) and comparison (dotted).
export default function SearchTrendChart({ data }) {
  const [metric, setMetric] = useState('clicks');
  const curBrand = data?.current?.brand || [];
  const curNon = data?.current?.nonBrand || [];
  const compBrand = data?.comparison?.brand || [];
  const compNon = data?.comparison?.nonBrand || [];
  const chartData = curBrand.map((c, i) => ({
    date: c.date,
    'Brand': c[metric],
    'Non-brand': curNon[i] ? curNon[i][metric] : null,
    'Brand (prev)': compBrand[i] ? compBrand[i][metric] : null,
    'Non-brand (prev)': compNon[i] ? compNon[i][metric] : null,
  }));
  if (!chartData.length) return <p className="font-body text-sm py-8 text-center" style={{ color: 'rgba(248,243,232,0.5)' }}>No data for this period</p>;
  return (
    <div>
      <div className="flex gap-2 mb-3">
        {['clicks', 'impressions'].map((m) => (
          <button key={m} onClick={() => setMetric(m)} className="px-3 py-1.5 rounded-lg font-body text-xs capitalize transition-all" style={{ border: '1px solid rgba(244,196,48,0.3)', background: metric === m ? 'rgba(244,196,48,0.15)' : 'transparent', color: metric === m ? '#F4C430' : 'rgba(248,243,232,0.7)' }}>{m}</button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(244,196,48,0.1)" />
          <XAxis dataKey="date" tickFormatter={fmtGaDate} tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={{ stroke: 'rgba(244,196,48,0.2)' }} tickLine={false} />
          <YAxis tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="Brand" stroke="#F4C430" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Non-brand" stroke="#60a5fa" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Brand (prev)" stroke="rgba(244,196,48,0.4)" strokeWidth={2} strokeDasharray="5 4" dot={false} connectNulls />
          <Line type="monotone" dataKey="Non-brand (prev)" stroke="rgba(96,165,250,0.4)" strokeWidth={2} strokeDasharray="5 4" dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}