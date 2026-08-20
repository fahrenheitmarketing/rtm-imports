import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, LogOut, TrendingUp, Users, Eye, Activity, Clock, MousePointerClick, BarChart3, Percent, Target, Search, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import PasswordGate from '@/components/analytics/PasswordGate';
import StatCard from '@/components/analytics/StatCard';
import SessionsChart from '@/components/analytics/SessionsChart';
import DataTable from '@/components/analytics/DataTable';
import DateRangeSelector from '@/components/analytics/DateRangeSelector';

const SESSION_KEY = 'rtm_analytics_pw';

const fmtNum = (n) => new Intl.NumberFormat('en-US').format(n || 0);
const fmtPct = (n) => `${(n || 0).toFixed(1)}%`;
const fmtDuration = (s) => {
  const m = Math.floor((s || 0) / 60);
  const sec = Math.round((s || 0) % 60);
  return `${m}m ${sec}s`;
};

export default function AnalyticsDashboard() {
  const [password, setPassword] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRange, setSelectedRange] = useState({ startDate: null, endDate: null });

  const fetchData = useCallback(async (pw, range) => {
    setLoading(true);
    setError(null);
    try {
      const payload = { password: pw };
      if (range?.startDate && range?.endDate) {
        payload.startDate = range.startDate;
        payload.endDate = range.endDate;
      }
      const res = await base44.functions.invoke('analyticsDashboard', payload);
      setData(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Incorrect password. Please try again.');
        sessionStorage.removeItem(SESSION_KEY);
        setPassword(null);
      } else {
        setError(err.response?.data?.error || 'Failed to load analytics data.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDateChange = (startDate, endDate) => {
    setSelectedRange({ startDate, endDate });
    fetchData(password, { startDate, endDate });
  };

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setPassword(stored);
      fetchData(stored, selectedRange);
    }
  }, [fetchData]);

  const handleAuth = (pw) => {
    sessionStorage.setItem(SESSION_KEY, pw);
    setPassword(pw);
    fetchData(pw, selectedRange);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setPassword(null);
    setData(null);
    setError(null);
    setSelectedRange({ startDate: null, endDate: null });
  };

  if (!password) {
    return <PasswordGate onAuth={handleAuth} loading={loading} error={error} />;
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A2454' }}>
        <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: 'rgba(244,196,48,0.3)', borderTopColor: '#F4C430' }}></div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#0A2454' }}>
        <AlertCircle className="w-10 h-10 mb-4" style={{ color: '#ef4444' }} />
        <p className="font-body text-sm mb-6" style={{ color: 'rgba(248,243,232,0.7)' }}>{error}</p>
        <button onClick={handleLogout} className="px-5 py-2.5 rounded-lg font-body text-sm" style={{ background: '#F4C430', color: '#0A2454' }}>Back to Login</button>
      </div>
    );
  }

  const ga = data?.ga;
  const gsc = data?.gsc;
  const dateRange = data?.dateRange;

  return (
    <div className="min-h-screen" style={{ background: '#0A2454' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 border-b" style={{ background: 'rgba(10,36,84,0.95)', borderColor: 'rgba(244,196,48,0.2)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl md:text-2xl" style={{ color: '#F8F3E8' }}>Performance Dashboard</h1>
            {dateRange && (
              <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(248,243,232,0.5)' }}>
                {dateRange.start} — {dateRange.end}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <DateRangeSelector
              startDate={selectedRange.startDate}
              endDate={selectedRange.endDate}
              onApply={handleDateChange}
              loading={loading}
            />
            <button
              onClick={() => fetchData(password, selectedRange)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-opacity disabled:opacity-50"
              style={{ border: '1px solid rgba(244,196,48,0.3)', color: '#F4C430' }}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm"
              style={{ border: '1px solid rgba(248,243,232,0.2)', color: 'rgba(248,243,232,0.7)' }}
            >
              <LogOut className="w-4 h-4" /> Exit
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* Errors banner */}
        {data?.errors?.length > 0 && (
          <div className="rounded-lg p-4 border" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.3)' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4" style={{ color: '#ef4444' }} />
              <span className="font-body text-sm" style={{ color: '#F8F3E8' }}>Some data sources had issues:</span>
            </div>
            <ul className="ml-6 list-disc">
              {data.errors.map((err, i) => (
                <li key={i} className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.6)' }}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Google Analytics Section */}
        {ga && (
          <section>
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-5 h-5" style={{ color: '#F4C430' }} />
              <h2 className="font-display text-lg" style={{ color: '#F8F3E8' }}>Google Analytics</h2>
              {ga.propertyName && <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.5)' }}>— {ga.propertyName}</span>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              <StatCard label="Sessions" value={fmtNum(ga.overview.sessions)} icon={TrendingUp} delay={0} />
              <StatCard label="Users" value={fmtNum(ga.overview.users)} icon={Users} delay={0.05} />
              <StatCard label="Page Views" value={fmtNum(ga.overview.pageViews)} icon={Eye} delay={0.1} />
              <StatCard label="Bounce Rate" value={fmtPct(ga.overview.bounceRate)} icon={Activity} delay={0.15} />
              <StatCard label="Avg. Session" value={fmtDuration(ga.overview.avgSessionDuration)} icon={Clock} delay={0.2} />
            </div>

            {ga.daily?.length > 0 && (
              <div className="rounded-xl p-5 border mb-6" style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}>
                <h3 className="font-display text-base mb-4" style={{ color: '#F8F3E8' }}>Sessions Trend</h3>
                <SessionsChart data={ga.daily} />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <DataTable
                title="Top Traffic Sources"
                data={ga.topSources}
                columns={[
                  { label: 'Channel', key: 'channel', primary: true },
                  { label: 'Sessions', key: 'sessions', format: fmtNum },
                  { label: 'Users', key: 'users', format: fmtNum }
                ]}
              />
              <DataTable
                title="Top Pages"
                data={ga.topPages?.filter((p) => !p.path?.includes('/news/'))}
                columns={[
                  { label: 'Page', key: 'title', primary: true },
                  { label: 'Views', key: 'pageViews', format: fmtNum },
                  { label: 'Sessions', key: 'sessions', format: fmtNum }
                ]}
              />
            </div>

            {ga.topPages?.some((p) => p.path?.includes('/news/')) && (
              <DataTable
                title="Blog Pages"
                data={ga.topPages?.filter((p) => p.path?.includes('/news/'))}
                columns={[
                  { label: 'Article', key: 'title', primary: true },
                  { label: 'Path', key: 'path' },
                  { label: 'Views', key: 'pageViews', format: fmtNum },
                  { label: 'Sessions', key: 'sessions', format: fmtNum }
                ]}
              />
            )}
          </section>
        )}

        {/* Google Search Console Section */}
        {gsc && (
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Search className="w-5 h-5" style={{ color: '#F4C430' }} />
              <h2 className="font-display text-lg" style={{ color: '#F8F3E8' }}>Google Search Console</h2>
              {gsc.siteUrl && <span className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.5)' }}>— {gsc.siteUrl}</span>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard label="Clicks" value={fmtNum(gsc.overview.clicks)} icon={MousePointerClick} delay={0} />
              <StatCard label="Impressions" value={fmtNum(gsc.overview.impressions)} icon={Eye} delay={0.05} />
              <StatCard label="CTR" value={fmtPct(gsc.overview.ctr * 100)} icon={Percent} delay={0.1} />
              <StatCard label="Avg. Position" value={(gsc.overview.position || 0).toFixed(1)} icon={Target} delay={0.15} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <DataTable
                title="Top Queries"
                data={gsc.topQueries}
                columns={[
                  { label: 'Query', key: 'query', primary: true },
                  { label: 'Clicks', key: 'clicks', format: fmtNum },
                  { label: 'Impr.', key: 'impressions', format: fmtNum },
                  { label: 'CTR', key: 'ctr', format: (v) => fmtPct(v * 100) },
                  { label: 'Pos.', key: 'position', format: (v) => (v || 0).toFixed(1) }
                ]}
              />
              <DataTable
                title="Top Pages"
                data={gsc.topPages?.filter((p) => !p.page?.includes('/news/'))}
                columns={[
                  { label: 'Page', key: 'page', primary: true },
                  { label: 'Clicks', key: 'clicks', format: fmtNum },
                  { label: 'Impr.', key: 'impressions', format: fmtNum },
                  { label: 'CTR', key: 'ctr', format: (v) => fmtPct(v * 100) }
                ]}
              />
            </div>

            {gsc.topPages?.some((p) => p.page?.includes('/news/')) && (
              <DataTable
                title="Blog Pages (Search)"
                data={gsc.topPages?.filter((p) => p.page?.includes('/news/'))}
                columns={[
                  { label: 'Article', key: 'page', primary: true },
                  { label: 'Clicks', key: 'clicks', format: fmtNum },
                  { label: 'Impr.', key: 'impressions', format: fmtNum },
                  { label: 'CTR', key: 'ctr', format: (v) => fmtPct(v * 100) },
                  { label: 'Pos.', key: 'position', format: (v) => (v || 0).toFixed(1) }
                ]}
              />
            )}
          </section>
        )}

        {!ga && !gsc && (
          <div className="text-center py-20">
            <p className="font-body text-sm" style={{ color: 'rgba(248,243,232,0.5)' }}>No analytics data available. Check your Google Analytics and Search Console connections.</p>
          </div>
        )}
      </main>
    </div>
  );
}