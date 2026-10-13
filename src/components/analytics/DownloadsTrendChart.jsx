import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fmtGaDate, fmtNum } from './format';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0A2454', border: '1px solid rgba(244,196,48,0.4)', borderRadius: '8px', padding: '8px 12px' }}>
      <p style={{ color: '#F8F3E8', margin: 0, fontSize: 12, marginBottom: 4 }}>{fmtGaDate(label)}</p>
      <p style={{ color: '#F4C430', margin: 0, fontSize: 12 }}>Downloads: {fmtNum(payload[0].value)}</p>
    </div>
  );
}

export default function DownloadsTrendChart({ data }) {
  const chartData = (data || []).map((d) => ({ date: d.date, downloads: d.downloads }));
  if (!chartData.length) return <p className="font-body text-sm py-8 text-center" style={{ color: 'rgba(248,243,232,0.5)' }}>No data for this period</p>;
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4C430" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#F4C430" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(244,196,48,0.1)" />
        <XAxis dataKey="date" tickFormatter={fmtGaDate} tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={{ stroke: 'rgba(244,196,48,0.2)' }} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="downloads" stroke="#F4C430" strokeWidth={2} fill="url(#dlGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}