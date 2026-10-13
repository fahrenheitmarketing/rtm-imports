import React from 'react';
import { Newspaper, Eye, Share2, Clock, Search, TrendingUp } from 'lucide-react';
import KpiCard from './KpiCard';
import SortableTable from './SortableTable';
import ChangeBadge from './ChangeBadge';
import { fmtNum, fmtPct, fmtDuration, fmtPos } from './format';

function BlogDetail({ post }) {
  return (
    <div className="ml-4 pl-3 border-l space-y-4" style={{ borderColor: 'rgba(244,196,48,0.2)' }}>
      <div>
        <p className="font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(248,243,232,0.5)' }}>Top Search Console Queries</p>
        {(!post.queries || post.queries.length === 0) ? (
          <p className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.45)' }}>No search data for this post</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(244,196,48,0.1)' }}>
                {['Query', 'Clicks', 'Impressions', 'CTR', 'Position'].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-body text-xs uppercase tracking-wider" style={{ color: 'rgba(248,243,232,0.45)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {post.queries.slice(0, 10).map((q, i) => (
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
        )}
      </div>
      <div>
        <p className="font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(248,243,232,0.5)' }}>Sessions by Channel</p>
        {(!post.channels || post.channels.length === 0) ? (
          <p className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.45)' }}>No channel data</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {post.channels.map((c) => (
              <span key={c.channel} className="px-2.5 py-1 rounded-lg font-body text-xs" style={{ background: 'rgba(244,196,48,0.08)', color: 'rgba(248,243,232,0.8)' }}>{c.channel}: {fmtNum(c.sessions)}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogSection({ blog, compareMode }) {
  const hasComp = compareMode !== 'none';
  const k = blog?.kpis;
  const cur = k?.current;
  const cmp = hasComp ? k?.comparison : null;

  const rows = (blog?.posts || []).map((p) => ({
    _id: p.path,
    title: p.title, path: p.path,
    views: p.current.views, sessions: p.current.sessions, avgEngagement: p.current.avgEngagement, keyEvents: p.current.keyEvents,
    topSource: p.topSource,
    searchClicks: p.search.clicks, searchImpressions: p.search.impressions, searchPosition: p.search.position,
    compViews: hasComp ? p.comparison?.views : null,
    isNew: p.isNew,
    _post: p,
  }));

  const cols = [
    { label: 'Post', primary: true, render: (r) => <span className="inline-flex items-center gap-2">{r.title}{r.isNew && <span className="px-1.5 py-0.5 rounded text-[10px] font-body" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>New</span>}</span>, titleFn: (r) => r.title, sortValue: (r) => r.views },
    { label: 'Views', align: 'right', render: (r) => fmtNum(r.views), sortValue: (r) => r.views },
    { label: 'Sessions', align: 'right', render: (r) => fmtNum(r.sessions), sortValue: (r) => r.sessions },
    { label: 'Avg. Engagement', align: 'right', render: (r) => fmtDuration(r.avgEngagement), sortValue: (r) => r.avgEngagement },
    { label: 'Top Source', render: (r) => r.topSource, sortValue: (r) => r.sessions },
    { label: 'Key Events', align: 'right', render: (r) => fmtNum(r.keyEvents), sortValue: (r) => r.keyEvents },
    { label: 'Search Clicks', align: 'right', render: (r) => fmtNum(r.searchClicks), sortValue: (r) => r.searchClicks },
    { label: 'Search Impr.', align: 'right', render: (r) => fmtNum(r.searchImpressions), sortValue: (r) => r.searchImpressions },
    { label: 'Avg. Position', align: 'right', render: (r) => r.searchClicks > 0 || r.searchImpressions > 0 ? fmtPos(r.searchPosition) : '—', sortValue: (r) => r.searchPosition },
    { label: 'Change', align: 'right', render: (r) => <ChangeBadge current={r.views} comparison={r.compViews} /> },
  ];

  return (
    <section id="sec-blog" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <Newspaper className="w-5 h-5" style={{ color: '#F4C430' }} />
        <h2 className="font-display text-lg" style={{ color: '#F8F3E8' }}>Blog</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KpiCard label="Blog Views" current={cur?.views} comparison={cmp?.views} format={fmtNum} icon={Eye} />
        <KpiCard label="Blog Sessions" current={cur?.sessions} comparison={null} format={fmtNum} icon={Share2} />
        <KpiCard label="Avg. Engagement Time" current={cur?.avgEngagement} comparison={null} format={fmtDuration} icon={Clock} />
        <KpiCard label="Blog Search Clicks" current={cur?.searchClicks} comparison={null} format={fmtNum} icon={Search} />
        <KpiCard label="Blog Search Impr." current={cur?.searchImpressions} comparison={null} format={fmtNum} icon={TrendingUp} />
      </div>

      <SortableTable title="Blog Performance" columns={cols} data={rows} searchable searchFn={(r) => `${r.title} ${r.path}`}
        expandable={{ canExpand: () => true, render: (r) => <BlogDetail post={r._post} /> }}
        emptyMessage="No blog posts with data in this period" />
    </section>
  );
}