import React from 'react';

export default function DataTable({ title, columns, data, emptyMessage = 'No data available' }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(244,196,48,0.2)' }}>
        <h3 className="font-display text-base" style={{ color: '#F8F3E8' }}>{title}</h3>
      </div>
      {(!data || data.length === 0) ? (
        <div className="px-5 py-8 text-center">
          <p className="font-body text-sm" style={{ color: 'rgba(248,243,232,0.5)' }}>{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(244,196,48,0.15)' }}>
                {columns.map(col => (
                  <th key={col.key} className="px-5 py-3 text-left font-body text-xs uppercase tracking-wider whitespace-nowrap" style={{ color: 'rgba(248,243,232,0.5)' }}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(244,196,48,0.08)' }}>
                  {columns.map(col => (
                    <td key={col.key} className={`px-5 py-3 font-body text-sm whitespace-nowrap ${col.primary ? 'max-w-[200px] truncate' : ''}`} style={{ color: col.primary ? '#F8F3E8' : 'rgba(248,243,232,0.75)' }} title={col.primary ? row[col.key] : undefined}>
                      {col.format ? col.format(row[col.key]) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}