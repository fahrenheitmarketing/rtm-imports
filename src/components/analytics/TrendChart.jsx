import React from 'react';
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

// Sessions trend: current (solid) + comparison (dotted), aligned by day index.
export default function TrendChart({ data }) {
  const cur = data?.current || [];
  const comp = data?.comparison || [];
  const chartData = cur.map((c, i) => ({
    date: c.date,
    Sessions: c.sessions,
    Comparison: comp[i] ? comp[i].sessions : null,
  }));
  if (!chartData.length) return <p className="font-body text-sm py-8 text-center" style={{ color: 'rgba(248,243,232,0.5)' }}>No data for this period</p>;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(244,196,48,0.1)" />
        <XAxis dataKey="date" tickFormatter={fmtGaDate} tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={{ stroke: 'rgba(244,196,48,0.2)' }} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="Sessions" stroke="#F4C430" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="Comparison" stroke="rgba(248,243,232,0.4)" strokeWidth={2} strokeDasharray="5 4" dot={false} connectNulls />
      </LineChart>
    </ResponsiveContainer>
  );
}