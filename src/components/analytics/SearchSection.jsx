import React, { useState } from 'react';
import { Search as SearchIcon, MousePointerClick, Eye, Percent, Target } from 'lucide-react';
import KpiCard from './KpiCard';
import SortableTable from './SortableTable';
import ChangeBadge from './ChangeBadge';
import SearchTrendChart from './SearchTrendChart';
import { fmtNum, fmtPct, fmtPos } from './format';

function QueriesList({ queries }) {
  if (!queries?.length) return <p className="font-body text-xs py-3" style={{ color: 'rgba(248,243,232,0.5)' }}>No data for this period</p>;
  return (
    <div className="ml-4 pl-3 border-l" style={{ borderColor: 'rgba(244,196,48,0.2)' }}>
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(244,196,48,0.1)' }}>
            {['Query', 'Clicks', 'Impressions', 'CTR', 'Position'].map((h) => (
              <th key={h} className="px-3 py-2 text-left font-body text-xs uppercase tracking-wider" style={{ color: 'rgba(248,243,232,0.45)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {queries.map((q, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(244,196,48,0.06)' }}>
              <td className="px-3 py-2 font-body text-sm" style={{ color: '#F8F3E8' }}>{q.query}</td>
              <td className="px-3 py-2 font-body text-sm" style={{ color: 'rgba(248,243,232,0.75)' }}>{fmtNum(q.clicks)}</td>
              <td className="px-3 py-2 font-body text-sm" style={{ color: 'rgba(248,243,232,0.75)' }}>{fmtNum(q.impressions)}</td>
              <td className="px-3 py-2 font-body text-sm" style={{ color: 'rgba(248,243,232,0.75)' }}>{fmtPct(q.ctr)}</td>
              <td className="px-3 py-2 font-body text-sm" style={{ color: 'rgba(248,243,232,0.75)' }}>{fmtPos(q.position)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KpiRow({ data, label, hasComp }) {
  const cur = data?.current;
  const cmp = hasComp ? data?.comparison : null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <KpiCard label={`${label} · Clicks`} current={cur?.clicks} comparison={cmp?.clicks} format={fmtNum} icon={MousePointerClick} />
      <KpiCard label={`${label} · Impressions`} current={cur?.impressions} comparison={cmp?.impressions} format={fmtNum} icon={Eye} />
      <KpiCard label={`${label} · CTR`} current={cur?.ctr} comparison={cmp?.ctr} format={fmtPct} icon={Percent} />
      <KpiCard label={`${label} · Avg. Position`} current={cur?.position} comparison={cmp?.position} format={fmtPos} icon={Target} isPosition />
    </div>
  );
}

export default function SearchSection({ search, compareMode }) {
  const [qFilter, setQFilter] = useState('all');
  const hasComp = compareMode !== 'none';

  const priorityRows = (search?.priorityKeywords || []).map((p, i) => ({
    _id: p.keyword + i,
    keyword: p.keyword,
    clicks: p.current?.clicks || 0,
    impressions: p.current?.impressions || 0,
    ctr: p.current?.ctr || 0,
    position: p.current?.position || 0,
    compPosition: hasComp ? p.comparison?.position : null,
    rankingPage: p.rankingPage,
    notRanking: p.notRanking,
  }));
  const priorityCols = [
    { label: 'Keyword', primary: true, render: (r) => r.keyword, sortValue: (r) => r.impressions },
    { label: 'Clicks', align: 'right', render: (r) => r.notRanking ? '—' : fmtNum(r.clicks), sortValue: (r) => r.clicks },
    { label: 'Impressions', align: 'right', render: (r) => r.notRanking ? '—' : fmtNum(r.impressions), sortValue: (r) => r.impressions },
    { label: 'CTR', align: 'right', render: (r) => r.notRanking ? '—' : fmtPct(r.ctr), sortValue: (r) => r.ctr },
    { label: 'Avg. Position', align: 'right', render: (r) => r.notRanking ? 'Not ranking' : fmtPos(r.position), sortValue: (r) => r.position },
    { label: 'Prev. Position', align: 'right', render: (r) => r.compPosition != null ? fmtPos(r.compPosition) : '—' },
    { label: 'Position Change', align: 'right', render: (r) => r.notRanking ? '—' : <ChangeBadge current={r.position} comparison={r.compPosition} isPosition /> },
    { label: 'Ranking Page', primary: true, render: (r) => r.rankingPage ? <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.6)' }}>{r.rankingPage}</span> : '—' },
  ];

  const allQueries = (search?.topQueries || []).filter((q) => qFilter === 'all' || (qFilter === 'brand' ? q.brand : !q.brand));
  const queryRows = allQueries.map((q, i) => ({
    _id: q.query + i,
    query: q.query, brand: q.brand,
    clicks: q.current.clicks, impressions: q.current.impressions, ctr: q.current.ctr, position: q.current.position,
    compPosition: hasComp ? q.comparison?.position : null,
  }));
  const queryCols = [
    { label: 'Query', primary: true, render: (r) => <span className="inline-flex items-center gap-2">{r.query}<span className="px-1.5 py-0.5 rounded text-[10px] font-body" style={{ background: r.brand ? 'rgba(244,196,48,0.15)' : 'rgba(96,165,250,0.15)', color: r.brand ? '#F4C430' : '#60a5fa' }}>{r.brand ? 'Brand' : 'Non-brand'}</span></span>, sortValue: (r) => r.impressions },
    { label: 'Clicks', align: 'right', render: (r) => fmtNum(r.clicks), sortValue: (r) => r.clicks },
    { label: 'Impressions', align: 'right', render: (r) => fmtNum(r.impressions), sortValue: (r) => r.impressions },
    { label: 'CTR', align: 'right', render: (r) => fmtPct(r.ctr), sortValue: (r) => r.ctr },
    { label: 'Avg. Position', align: 'right', render: (r) => fmtPos(r.position), sortValue: (r) => r.position },
    { label: 'Position Change', align: 'right', render: (r) => <ChangeBadge current={r.position} comparison={r.compPosition} isPosition /> },
  ];

  const oppRows = (search?.opportunityQueries || []).map((q, i) => ({ _id: q.query + i, ...q }));
  const oppCols = [
    { label: 'Query', primary: true, render: (r) => r.query, sortValue: (r) => r.impressions },
    { label: 'Impressions', align: 'right', render: (r) => fmtNum(r.impressions), sortValue: (r) => r.impressions },
    { label: 'Clicks', align: 'right', render: (r) => fmtNum(r.clicks), sortValue: (r) => r.clicks },
    { label: 'CTR', align: 'right', render: (r) => fmtPct(r.ctr), sortValue: (r) => r.ctr },
    { label: 'Avg. Position', align: 'right', render: (r) => fmtPos(r.position), sortValue: (r) => r.position },
    { label: 'Ranking Page', primary: true, render: (r) => r.rankingPage ? <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.6)' }}>{r.rankingPage}</span> : '—' },
  ];

  const pageRows = (search?.topPages || []).map((p) => ({
    _id: p.page,
    page: p.page,
    clicks: p.current.clicks, impressions: p.current.impressions, ctr: p.current.ctr, position: p.current.position,
    compClicks: hasComp ? p.comparison?.clicks : null,
    queries: p.queries,
  }));
  const pageCols = [
    { label: 'Page', primary: true, render: (r) => r.page, sortValue: (r) => r.clicks },
    { label: 'Clicks', align: 'right', render: (r) => fmtNum(r.clicks), sortValue: (r) => r.clicks },
    { label: 'Impressions', align: 'right', render: (r) => fmtNum(r.impressions), sortValue: (r) => r.impressions },
    { label: 'CTR', align: 'right', render: (r) => fmtPct(r.ctr), sortValue: (r) => r.ctr },
    { label: 'Avg. Position', align: 'right', render: (r) => fmtPos(r.position), sortValue: (r) => r.position },
    { label: 'Change', align: 'right', render: (r) => <ChangeBadge current={r.clicks} comparison={r.compClicks} /> },
  ];

  const filterSlot = (
    <div className="flex gap-1">
      {['all', 'non-brand', 'brand'].map((f) => (
        <button key={f} onClick={() => setQFilter(f === 'non-brand' ? false : f === 'brand' ? true : 'all')}
          className="px-2.5 py-1 rounded-lg font-body text-xs capitalize transition-all"
          style={{ border: '1px solid rgba(244,196,48,0.3)', background: (qFilter === f || (qFilter === true && f === 'brand') || (qFilter === false && f === 'non-brand')) ? 'rgba(244,196,48,0.15)' : 'transparent', color: (qFilter === f || (qFilter === true && f === 'brand') || (qFilter === false && f === 'non-brand')) ? '#F4C430' : 'rgba(248,243,232,0.7)' }}>
          {f === 'all' ? 'All' : f}
        </button>
      ))}
    </div>
  );

  return (
    <section id="sec-search" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <SearchIcon className="w-5 h-5" style={{ color: '#F4C430' }} />
        <h2 className="font-display text-lg" style={{ color: '#F8F3E8' }}>Search</h2>
        <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.5)' }}>— Search Console</span>
      </div>

      <div>
        <p className="font-body text-xs mb-2 uppercase tracking-wider" style={{ color: '#F4C430' }}>Non-brand — Main measure of SEO progress</p>
        <KpiRow data={search?.nonBrand} label="Non-brand" hasComp={hasComp} />
      </div>
      <div>
        <p className="font-body text-xs mb-2 uppercase tracking-wider" style={{ color: 'rgba(248,243,232,0.6)' }}>Brand</p>
        <KpiRow data={search?.brand} label="Brand" hasComp={hasComp} />
      </div>

      <div className="rounded-xl p-5 border" style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}>
        <h3 className="font-display text-base mb-4" style={{ color: '#F8F3E8' }}>Clicks & Impressions Trend</h3>
        <SearchTrendChart data={search?.daily} />
      </div>

      <SortableTable title="Priority Keywords" columns={priorityCols} data={priorityRows} searchable searchFn={(r) => r.keyword} emptyMessage="No priority keywords configured or no data" />
      <SortableTable title="Top Queries" columns={queryCols} data={queryRows} searchable searchFn={(r) => r.query} rightSlot={filterSlot} emptyMessage="No data for this period" />
      <SortableTable title="Opportunity Queries" columns={oppCols} data={oppRows} searchable searchFn={(r) => r.query} emptyMessage="No opportunity queries in this period" />
      <SortableTable title="Top Pages" columns={pageCols} data={pageRows} searchable searchFn={(r) => r.page} expandable={{ canExpand: (r) => (r.queries || []).length > 0, render: (r) => <QueriesList queries={r.queries} /> }} emptyMessage="No data for this period" />

      <p className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.4)' }}>Search Console data is typically delayed by 2–3 days.</p>
    </section>
  );
}