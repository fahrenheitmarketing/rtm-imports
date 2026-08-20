import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatGaDate = (dateStr) => {
  if (!dateStr || dateStr.length !== 8) return dateStr;
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${month}/${day}`;
};

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0A2454', border: '1px solid rgba(244,196,48,0.4)', borderRadius: '8px', padding: '8px 12px' }}>
        <p style={{ color: '#F8F3E8', margin: 0, fontSize: '12px', marginBottom: '4px' }}>{formatGaDate(label)}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: '#F4C430', margin: 0, fontSize: '13px', textTransform: 'capitalize' }}>
            {entry.name}: {new Intl.NumberFormat('en-US').format(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function SessionsChart({ data }) {
  const chartData = (data || []).map(d => ({ date: d.date, sessions: d.sessions, users: d.users }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4C430" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#F4C430" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(244,196,48,0.1)" />
        <XAxis dataKey="date" tickFormatter={formatGaDate} tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={{ stroke: 'rgba(244,196,48,0.2)' }} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="sessions" stroke="#F4C430" strokeWidth={2} fill="url(#sessionsGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}