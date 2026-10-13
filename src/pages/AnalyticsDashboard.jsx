import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import PasswordGate from '@/components/analytics/PasswordGate';
import GlobalControls from '@/components/analytics/GlobalControls';
import SectionNav from '@/components/analytics/SectionNav';
import SettingsPanel from '@/components/analytics/SettingsPanel';
import OverviewSection from '@/components/analytics/OverviewSection';
import TrafficSection from '@/components/analytics/TrafficSection';
import SearchSection from '@/components/analytics/SearchSection';
import BlogSection from '@/components/analytics/BlogSection';
import DigitalAssetsSection from '@/components/analytics/DigitalAssetsSection';
import { fmtDate } from '@/components/analytics/format';

const SESSION_KEY = 'rtm_analytics_pw';

export default function AnalyticsDashboard() {
  const [password, setPassword] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preset, setPreset] = useState('last_month');
  const [customStart, setCustomStart] = useState(null);
  const [customEnd, setCustomEnd] = useState(null);
  const [compareMode, setCompareMode] = useState('previous');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const fetchData = useCallback(async (pw, opts = {}) => {
    setLoading(true);
    setError(null);
    try {
      const payload = { password: pw, preset: opts.preset, customStart: opts.customStart, customEnd: opts.customEnd, compareMode: opts.compareMode, refresh: opts.refresh };
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

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setPassword(stored);
      fetchData(stored, { preset: 'last_month', compareMode: 'previous' });
    }
  }, [fetchData]);

  const handleAuth = (pw) => {
    sessionStorage.setItem(SESSION_KEY, pw);
    setPassword(pw);
    fetchData(pw, { preset: 'last_month', compareMode: 'previous' });
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setPassword(null);
    setData(null);
    setError(null);
  };

  const handleApply = ({ preset: p, customStart: cs, customEnd: ce }) => {
    setPreset(p); setCustomStart(cs); setCustomEnd(ce);
    fetchData(password, { preset: p, customStart: cs, customEnd: ce, compareMode });
  };
  const handleCompare = (m) => { setCompareMode(m); fetchData(password, { preset, customStart, customEnd, compareMode: m }); };
  const handleRefresh = () => fetchData(password, { preset, customStart, customEnd, compareMode, refresh: true });
  const handleExport = () => window.print();

  if (!password) {
    return <PasswordGate onAuth={handleAuth} loading={loading} error={error} />;
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A2454' }}>
        <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: 'rgba(244,196,48,0.3)', borderTopColor: '#F4C430' }} />
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

  const dr = data?.dateRange;
  const compareLabel = compareMode === 'previous' ? 'vs previous period' : compareMode === 'last_year' ? 'vs same period last year' : '';
  const updated = data?.cachedAt ? new Date(data.cachedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className="min-h-screen" style={{ background: '#0A2454' }}>
      <header className="sticky top-0 z-30 border-b" style={{ background: 'rgba(10,36,84,0.95)', borderColor: 'rgba(244,196,48,0.2)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
            <div>
              <h1 className="font-display text-xl md:text-2xl" style={{ color: '#F8F3E8' }}>Performance Dashboard <span style={{ color: '#F4C430' }}>– RTM Imports</span></h1>
              {dr && (
                <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(248,243,232,0.55)' }}>
                  {fmtDate(dr.start)} — {fmtDate(dr.end)}
                  {dr.compareStart && <> &nbsp;·&nbsp; {compareLabel}: {fmtDate(dr.compareStart)} — {fmtDate(dr.compareEnd)}</>}
                </p>
              )}
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg font-body text-sm" style={{ border: '1px solid rgba(248,243,232,0.2)', color: 'rgba(248,243,232,0.7)' }}>
              <LogOut className="w-4 h-4" /> Exit
            </button>
          </div>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <GlobalControls
              preset={preset} customStart={customStart} customEnd={customEnd} compareMode={compareMode}
              onApply={handleApply} onCompare={handleCompare} onRefresh={handleRefresh} onExport={handleExport}
              onSettings={() => setSettingsOpen(true)} loading={loading} cachedAt={data?.cachedAt}
            />
            {updated && <p className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.4)' }}>Data last updated: {updated}{data?.cached ? ' (cached)' : ''}</p>}
          </div>
        </div>
      </header>

      <SectionNav />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {data?.errors?.length > 0 && (
          <div className="rounded-lg p-4 border" style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.25)' }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4" style={{ color: '#ef4444' }} />
              <span className="font-body text-sm" style={{ color: '#F8F3E8' }}>Some data sources had issues:</span>
            </div>
            <ul className="ml-6 list-disc">
              {data.errors.map((err, i) => <li key={i} className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.6)' }}>{err}</li>)}
            </ul>
          </div>
        )}

        {data?.overview && <OverviewSection overview={data.overview} daily={data.daily} compareMode={compareMode} />}
        {data?.traffic && <TrafficSection traffic={data.traffic} topPages={data.topPages} organicLanding={data.organicLanding} keyEvents={data.keyEvents} compareMode={compareMode} />}
        {data?.search && <SearchSection search={data.search} compareMode={compareMode} />}
        {data?.blog && <BlogSection blog={data.blog} compareMode={compareMode} />}
        {data?.digitalAssets && <DigitalAssetsSection digitalAssets={data.digitalAssets} settings={data.settings} compareMode={compareMode} />}

        {!data?.overview && !data?.traffic && !data?.search && !data?.blog && !data?.digitalAssets && (
          <div className="text-center py-20">
            <p className="font-body text-sm" style={{ color: 'rgba(248,243,232,0.5)' }}>No data for this period.</p>
          </div>
        )}
      </main>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} password={password} onSaved={handleRefresh} />
    </div>
  );
}