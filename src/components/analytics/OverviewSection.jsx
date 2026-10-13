import React from 'react';
import { TrendingUp, Users, UserPlus, Eye, Activity, Clock, Target, BarChart3 } from 'lucide-react';
import KpiCard from './KpiCard';
import TrendChart from './TrendChart';
import { fmtNum, fmtPct, fmtDuration } from './format';

export default function OverviewSection({ overview, daily, compareMode }) {
  const cur = overview?.current;
  const cmp = overview?.comparison;
  const hasComp = compareMode !== 'none' && cmp;
  const get = (k) => (cur ? cur[k] : 0);
  const getC = (k) => (hasComp ? cmp[k] : null);

  return (
    <section id="sec-overview" className="scroll-mt-32">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 className="w-5 h-5" style={{ color: '#F4C430' }} />
        <h2 className="font-display text-lg" style={{ color: '#F8F3E8' }}>Overview</h2>
        <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.5)' }}>— Google Analytics 4</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <KpiCard label="Sessions" current={get('sessions')} comparison={getC('sessions')} format={fmtNum} icon={TrendingUp} delay={0} />
        <KpiCard label="Users" current={get('users')} comparison={getC('users')} format={fmtNum} icon={Users} delay={0.05} />
        <KpiCard label="New Users" current={get('newUsers')} comparison={getC('newUsers')} format={fmtNum} icon={UserPlus} delay={0.1} />
        <KpiCard label="Page Views" current={get('pageViews')} comparison={getC('pageViews')} format={fmtNum} icon={Eye} delay={0.15} />
        <KpiCard label="Engaged Sessions" current={get('engagedSessions')} comparison={getC('engagedSessions')} format={fmtNum} icon={Activity} delay={0.2} />
        <KpiCard label="Engagement Rate" current={get('engagementRate')} comparison={getC('engagementRate')} format={fmtPct} icon={Activity} delay={0.25} />
        <KpiCard label="Bounce Rate" current={get('bounceRate')} comparison={getC('bounceRate')} format={fmtPct} icon={Activity} invert delay={0.3} />
        <KpiCard label="Avg. Session Duration" current={get('avgSessionDuration')} comparison={getC('avgSessionDuration')} format={fmtDuration} icon={Clock} delay={0.35} />
        <KpiCard label="Key Events" current={get('keyEvents')} comparison={getC('keyEvents')} format={fmtNum} icon={Target} delay={0.4} />
      </div>

      <div className="rounded-xl p-5 border mb-6" style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}>
        <h3 className="font-display text-base mb-4" style={{ color: '#F8F3E8' }}>Sessions Trend</h3>
        <TrendChart data={daily} />
      </div>
    </section>
  );
}