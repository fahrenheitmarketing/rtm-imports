import React from 'react';
import { Share2, FileText, LogIn, Star } from 'lucide-react';
import SortableTable from './SortableTable';
import ChangeBadge from './ChangeBadge';
import { fmtNum, fmtPct, fmtDuration } from './format';

function SourcesBreakdown({ sources }) {
  // sources: { current: [...], comparison: [...] }
  const cur = sources.current || [];
  const compMap = {};
  (sources.comparison || []).forEach((s) => { compMap[s.source] = s; });
  const rows = cur.map((c) => ({
    source: c.source,
    sessions: c.sessions,
    users: c.users,
    engagementRate: c.engagementRate,
    keyEvents: c.keyEvents,
    compSessions: compMap[c.source]?.sessions || 0,
  }));
  if (!rows.length) return <p className="font-body text-xs py-3" style={{ color: 'rgba(248,243,232,0.5)' }}>No data for this period</p>;
  return (
    <div className="ml-4 pl-3 border-l" style={{ borderColor: 'rgba(244,196,48,0.2)' }}>
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(244,196,48,0.1)' }}>
            {['Source', 'Sessions', 'Users', 'Engagement', 'Key Events', 'Change'].map((h) => (
              <th key={h} className="px-3 py-2 text-left font-body text-xs uppercase tracking-wider" style={{ color: 'rgba(248,243,232,0.45)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.source} style={{ borderBottom: '1px solid rgba(244,196,48,0.06)' }}>
              <td className="px-3 py-2 font-body text-sm" style={{ color: '#F8F3E8' }}>{r.source}</td>
              <td className="px-3 py-2 font-body text-sm" style={{ color: 'rgba(248,243,232,0.75)' }}>{fmtNum(r.sessions)}</td>
              <td className="px-3 py-2 font-body text-sm" style={{ color: 'rgba(248,243,232,0.75)' }}>{fmtNum(r.users)}</td>
              <td className="px-3 py-2 font-body text-sm" style={{ color: 'rgba(248,243,232,0.75)' }}>{fmtPct(r.engagementRate)}</td>
              <td className="px-3 py-2 font-body text-sm" style={{ color: 'rgba(248,243,232,0.75)' }}>{fmtNum(r.keyEvents)}</td>
              <td className="px-3 py-2"><ChangeBadge current={r.sessions} comparison={r.compSessions} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TrafficSection({ traffic, topPages, organicLanding, keyEvents, compareMode }) {
  const hasComp = compareMode !== 'none';
  const channels = (traffic?.channels || []).map((c, i) => ({
    _id: c.channel,
    channel: c.channel,
    sessions: c.current.sessions,
    users: c.current.users,
    engagementRate: c.current.engagementRate,
    keyEvents: c.current.keyEvents,
    compSessions: hasComp ? c.comparison?.sessions : null,
    _sources: traffic?.sourcesByChannel?.[c.channel],
  }));

  const channelCols = [
    { label: 'Channel', primary: true, render: (r) => r.channel, sortValue: (r) => r.sessions },
    { label: 'Sessions', align: 'right', render: (r) => fmtNum(r.sessions), sortValue: (r) => r.sessions },
    { label: 'Users', align: 'right', render: (r) => fmtNum(r.users), sortValue: (r) => r.users },
    { label: 'Engagement', align: 'right', render: (r) => fmtPct(r.engagementRate), sortValue: (r) => r.engagementRate },
    { label: 'Key Events', align: 'right', render: (r) => fmtNum(r.keyEvents), sortValue: (r) => r.keyEvents },
    { label: 'Change', align: 'right', render: (r) => <ChangeBadge current={r.sessions} comparison={r.compSessions} /> },
  ];

  const pageRows = (topPages || []).map((p) => ({
    _id: p.path,
    title: p.title, path: p.path,
    views: p.current.views, sessions: p.current.sessions, avgEngagement: p.current.avgEngagement,
    compViews: hasComp ? p.comparison?.views : null,
  }));
  const pageCols = [
    { label: 'Page', primary: true, render: (r) => <span>{r.title} <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.4)' }}>{r.path}</span></span>, titleFn: (r) => `${r.title} ${r.path}`, sortValue: (r) => r.views },
    { label: 'Views', align: 'right', render: (r) => fmtNum(r.views), sortValue: (r) => r.views },
    { label: 'Sessions', align: 'right', render: (r) => fmtNum(r.sessions), sortValue: (r) => r.sessions },
    { label: 'Avg. Engagement', align: 'right', render: (r) => fmtDuration(r.avgEngagement), sortValue: (r) => r.avgEngagement },
    { label: 'Change', align: 'right', render: (r) => <ChangeBadge current={r.views} comparison={r.compViews} /> },
  ];

  const landingRows = (organicLanding || []).map((l) => ({
    _id: l.landingPage,
    landingPage: l.landingPage,
    sessions: l.current.sessions, engagementRate: l.current.engagementRate, keyEvents: l.current.keyEvents,
    compSessions: hasComp ? l.comparison?.sessions : null,
  }));
  const landingCols = [
    { label: 'Landing Page', primary: true, render: (r) => r.landingPage, sortValue: (r) => r.sessions },
    { label: 'Sessions', align: 'right', render: (r) => fmtNum(r.sessions), sortValue: (r) => r.sessions },
    { label: 'Engagement', align: 'right', render: (r) => fmtPct(r.engagementRate), sortValue: (r) => r.engagementRate },
    { label: 'Key Events', align: 'right', render: (r) => fmtNum(r.keyEvents), sortValue: (r) => r.keyEvents },
    { label: 'Change', align: 'right', render: (r) => <ChangeBadge current={r.sessions} comparison={r.compSessions} /> },
  ];

  const keRows = (keyEvents || []).map((e) => ({
    _id: e.event, event: e.event, count: e.current.count, compCount: hasComp ? e.comparison?.count : null,
  }));
  const keCols = [
    { label: 'Event', primary: true, render: (r) => r.event, sortValue: (r) => r.count },
    { label: 'Count', align: 'right', render: (r) => fmtNum(r.count), sortValue: (r) => r.count },
    { label: 'Change', align: 'right', render: (r) => <ChangeBadge current={r.count} comparison={r.compCount} /> },
  ];

  return (
    <section id="sec-traffic" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <Share2 className="w-5 h-5" style={{ color: '#F4C430' }} />
        <h2 className="font-display text-lg" style={{ color: '#F8F3E8' }}>Traffic</h2>
      </div>
      <SortableTable title="Traffic Channels" columns={channelCols} data={channels} searchable
        searchFn={(r) => r.channel}
        expandable={{ canExpand: (r) => r.channel === 'Organic Social' || r.channel === 'AI Assistant', render: (r) => <SourcesBreakdown sources={r._sources} /> }}
      />
      <SortableTable title="Top Pages" columns={pageCols} data={pageRows} searchable searchFn={(r) => `${r.title} ${r.path}`} emptyMessage="No data for this period" />
      <SortableTable title="Top Organic Landing Pages" columns={landingCols} data={landingRows} searchable searchFn={(r) => r.landingPage} emptyMessage="No data for this period" />
      <SortableTable title="Key Events" columns={keCols} data={keRows} searchable searchFn={(r) => r.event} emptyMessage="No data for this period" />
    </section>
  );
}