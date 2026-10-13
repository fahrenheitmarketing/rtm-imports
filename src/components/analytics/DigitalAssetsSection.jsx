import React from 'react';
import { FolderLock, Eye, Users, Clock, KeyRound, Download, Percent } from 'lucide-react';
import KpiCard from './KpiCard';
import SortableTable from './SortableTable';
import ChangeBadge from './ChangeBadge';
import DownloadsTrendChart from './DownloadsTrendChart';
import { fmtNum, fmtPct, fmtDuration } from './format';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ScrollDepth({ scroll }) {
  if (scroll?.byPercent && scroll.byPercent.length > 0) {
    const data = scroll.byPercent.map((d) => ({ percent: `${d.percent}%`, users: d.users }));
    return (
      <div className="rounded-xl p-5 border" style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}>
        <h3 className="font-display text-base mb-4" style={{ color: '#F8F3E8' }}>Scroll Depth</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(244,196,48,0.1)" />
            <XAxis dataKey="percent" tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={{ stroke: 'rgba(244,196,48,0.2)' }} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(248,243,232,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0A2454', border: '1px solid rgba(244,196,48,0.4)', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="users" fill="#F4C430" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  const pct = scroll?.bottomPct || 0;
  return (
    <div className="rounded-xl p-5 border" style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}>
      <h3 className="font-display text-base mb-2" style={{ color: '#F8F3E8' }}>Scroll Depth</h3>
      <p className="font-body text-sm" style={{ color: 'rgba(248,243,232,0.75)' }}>
        <span className="font-display text-2xl" style={{ color: '#F4C430' }}>{fmtPct(pct)}</span> of visitors reached the bottom of the page.
      </p>
    </div>
  );
}

export default function DigitalAssetsSection({ digitalAssets, settings, compareMode }) {
  const hasComp = compareMode !== 'none';
  const cur = digitalAssets?.kpis?.current;
  const cmp = hasComp ? digitalAssets?.kpis?.comparison : null;

  const rows = (digitalAssets?.resources || []).map((r, i) => ({
    _id: r.fileName + i,
    fileName: r.fileName, fileType: r.fileType, linkUrl: r.linkUrl,
    downloads: r.downloads, users: r.users,
    compDownloads: hasComp ? r.comparison?.downloads : null,
  }));
  const cols = [
    { label: 'File Name', primary: true, render: (r) => r.linkUrl ? <a href={r.linkUrl} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: '#F4C430' }}>{r.fileName}</a> : r.fileName, sortValue: (r) => r.downloads },
    { label: 'Type', render: (r) => r.fileType || '—', sortValue: (r) => r.downloads },
    { label: 'Downloads', align: 'right', render: (r) => fmtNum(r.downloads), sortValue: (r) => r.downloads },
    { label: 'Unique Users', align: 'right', render: (r) => fmtNum(r.users), sortValue: (r) => r.users },
    { label: 'Change', align: 'right', render: (r) => <ChangeBadge current={r.downloads} comparison={r.compDownloads} /> },
  ];

  return (
    <section id="sec-digital-assets" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <FolderLock className="w-5 h-5" style={{ color: '#F4C430' }} />
        <h2 className="font-display text-lg" style={{ color: '#F8F3E8' }}>Digital Assets</h2>
        <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.5)' }}>— {settings?.digital_assets_path || '/digital-assets/'}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard label="Page Views" current={cur?.pageViews} comparison={cmp?.pageViews} format={fmtNum} icon={Eye} />
        <KpiCard label="Users" current={cur?.users} comparison={null} format={fmtNum} icon={Users} />
        <KpiCard label="Avg. Engagement" current={cur?.avgEngagement} comparison={null} format={fmtDuration} icon={Clock} />
        <KpiCard label="Password Unlocks" current={cur?.passwordUnlocks} comparison={cmp?.passwordUnlocks} format={fmtNum} icon={KeyRound} />
        <KpiCard label="Total Downloads" current={cur?.downloads} comparison={cmp?.downloads} format={fmtNum} icon={Download} />
        <KpiCard label="Download Rate" current={cur?.downloadRate} comparison={null} format={fmtPct} icon={Percent} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ScrollDepth scroll={digitalAssets?.scroll} />
        <div className="rounded-xl p-5 border" style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}>
          <h3 className="font-display text-base mb-4" style={{ color: '#F8F3E8' }}>Downloads Trend</h3>
          <DownloadsTrendChart data={digitalAssets?.downloadsTrend} />
        </div>
      </div>

      <SortableTable title="Most Downloaded Resources" columns={cols} data={rows} searchable searchFn={(r) => r.fileName} emptyMessage="No file-level download data for this period" />

      {settings?.tracking_start_date && (
        <p className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.4)' }}>File-level download and unlock data is available from {settings.tracking_start_date}.</p>
      )}
    </section>
  );
}