import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Search, ArrowUpDown } from 'lucide-react';

// columns: [{ label, render: (row)=>node, sortValue: (row)=>number, align, primary, width }]
// expandable: { canExpand: (row)=>bool, render: (row)=>node }
export default function SortableTable({ title, columns, data, searchable = false, searchFn, expandable, emptyMessage = 'No data for this period', rightSlot }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('desc');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(new Set());

  const toggleSort = (i) => {
    if (sortKey === i) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    else { setSortKey(i); setSortDir('desc'); }
  };

  const rows = useMemo(() => {
    let r = data || [];
    if (searchable && query && searchFn) r = r.filter((row) => searchFn(row).toLowerCase().includes(query.toLowerCase()));
    if (sortKey != null && columns[sortKey]?.sortValue) {
      const sv = columns[sortKey].sortValue;
      r = [...r].sort((a, b) => {
        const av = sv(a) || 0; const bv = sv(b) || 0;
        return sortDir === 'desc' ? bv - av : av - bv;
      });
    }
    return r;
  }, [data, query, sortKey, sortDir, columns, searchable, searchFn]);

  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const showExpand = !!expandable;
  const colCount = columns.length + (showExpand ? 1 : 0);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}>
      <div className="px-5 py-4 border-b flex items-center justify-between gap-3 flex-wrap" style={{ borderColor: 'rgba(244,196,48,0.2)' }}>
        <h3 className="font-display text-base" style={{ color: '#F8F3E8' }}>{title}</h3>
        <div className="flex items-center gap-2">
          {searchable && (data?.length > 10) && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(248,243,232,0.4)' }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="pl-7 pr-3 py-1.5 rounded-lg font-body text-sm outline-none w-40"
                style={{ background: 'rgba(10,36,84,0.8)', border: '1px solid rgba(244,196,48,0.3)', color: '#F8F3E8' }}
              />
            </div>
          )}
          {rightSlot}
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="font-body text-sm" style={{ color: 'rgba(248,243,232,0.5)' }}>{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(244,196,48,0.15)' }}>
                {showExpand && <th className="px-3 py-3 w-8" />}
                {columns.map((col, i) => (
                  <th
                    key={i}
                    onClick={() => col.sortValue && toggleSort(i)}
                    className={`px-5 py-3 text-left font-body text-xs uppercase tracking-wider whitespace-nowrap ${col.sortValue ? 'cursor-pointer select-none' : ''} ${col.align === 'right' ? 'text-right' : ''}`}
                    style={{ color: 'rgba(248,243,232,0.5)' }}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {col.sortValue && <ArrowUpDown className="w-3 h-3" style={{ opacity: sortKey === i ? 1 : 0.4 }} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const id = row._id || i;
                const canExp = showExpand && expandable.canExpand(row);
                const isOpen = expanded.has(id);
                return (
                  <React.Fragment key={id}>
                    <tr style={{ borderBottom: '1px solid rgba(244,196,48,0.08)' }}>
                      {showExpand && (
                        <td className="px-3 py-3">
                          {canExp ? (
                            <button onClick={() => toggleExpand(id)} className="p-0.5" style={{ color: 'rgba(244,196,48,0.7)' }}>
                              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                          ) : null}
                        </td>
                      )}
                      {columns.map((col, ci) => (
                        <td key={ci} className={`px-5 py-3 font-body text-sm whitespace-nowrap ${col.primary ? 'max-w-[260px] truncate' : ''} ${col.align === 'right' ? 'text-right' : ''}`} style={{ color: col.primary ? '#F8F3E8' : 'rgba(248,243,232,0.75)' }} title={col.primary ? (col.titleFn ? col.titleFn(row) : undefined) : undefined}>
                          {col.render(row)}
                        </td>
                      ))}
                    </tr>
                    {canExp && isOpen && (
                      <tr style={{ background: 'rgba(244,196,48,0.04)' }}>
                        <td colSpan={colCount} className="px-5 py-4">
                          {expandable.render(row)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}