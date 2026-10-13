import { createClientFromRequest } from 'npm:@base44/sdk@0.8.53';
import { secrets } from 'base44:runtime';

const GA_PROPERTY_ID = '538463420';
const GA_URL = `https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport`;
const GSC_SITE = 'sc-domain:rtm-imports.com';
const GSC_URL = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`;

const CACHE = new Map();
const CACHE_TTL = 60 * 60 * 1000;

const AI_SOURCES = ['chatgpt.com', 'perplexity.ai', 'gemini.google.com', 'copilot.microsoft.com', 'you.com', 'claude.ai', 'anthropic.com', 'poe.com', 'phind.com', 'kagi.com', 'leo.brave.com', 'openai.com'];

const num = (v) => parseInt(v) || 0;
const fl = (v) => parseFloat(v) || 0;
const fmt = (d) => d.toISOString().split('T')[0];
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

function resolveRanges(preset, customStart, customEnd, compareMode) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let start, end;
  if (preset === 'custom') {
    start = new Date(customStart + 'T00:00:00Z');
    end = new Date(customEnd + 'T00:00:00Z');
  } else if (preset === '7d') { end = new Date(today); start = addDays(today, -6); }
  else if (preset === '30d') { end = new Date(today); start = addDays(today, -29); }
  else if (preset === '90d') { end = new Date(today); start = addDays(today, -89); }
  else { // last_month (default)
    end = new Date(today.getFullYear(), today.getMonth(), 0);
    start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  }
  const current = { start: fmt(start), end: fmt(end) };
  let comparison = null;
  if (compareMode === 'previous') {
    const len = Math.round((end - start) / 86400000) + 1;
    const compEnd = addDays(start, -1);
    const compStart = addDays(compEnd, -(len - 1));
    comparison = { start: fmt(compStart), end: fmt(compEnd) };
  } else if (compareMode === 'last_year') {
    const compStart = new Date(start); compStart.setFullYear(compStart.getFullYear() - 1);
    const compEnd = new Date(end); compEnd.setFullYear(compEnd.getFullYear() - 1);
    comparison = { start: fmt(compStart), end: fmt(compEnd) };
  }
  return { current, comparison };
}

async function gaQuery(headers, range, dimensions, metrics, opts = {}) {
  const body = {
    dateRanges: [{ startDate: range.start, endDate: range.end }],
    dimensions: dimensions.map((name) => ({ name })),
    metrics: metrics.map((name) => ({ name })),
  };
  if (opts.filter) body.dimensionFilter = opts.filter;
  if (opts.orderBy) body.orderBys = opts.orderBy;
  if (opts.limit) body.limit = opts.limit;
  const res = await fetch(GA_URL, {
    method: 'POST', headers, body: JSON.stringify(body),
    signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(45000) : undefined,
  });
  if (!res.ok) { const t = await res.text().catch(() => ''); throw new Error(`GA ${res.status}: ${t.slice(0, 300)}`); }
  const data = await res.json();
  if (!data.rows) return [];
  return data.rows.map((r) => ({
    dims: (r.dimensionValues || []).map((d) => d.value),
    m: (r.metricValues || []).map((mv) => mv.value),
  }));
}

async function gscQuery(headers, range, dimensions, opts = {}) {
  const body = { startDate: range.start, endDate: range.end, dimensions, rowLimit: opts.rowLimit || 1000 };
  if (opts.filter) body.dimensionFilterGroups = [{ groupType: 'and', filters: opts.filter }];
  const res = await fetch(GSC_URL, {
    method: 'POST', headers, body: JSON.stringify(body),
    signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(45000) : undefined,
  });
  if (!res.ok) { const t = await res.text().catch(() => ''); throw new Error(`GSC ${res.status}: ${t.slice(0, 200)}`); }
  const data = await res.json();
  return (data.rows || []).map((r) => ({ keys: r.keys, clicks: r.clicks || 0, impressions: r.impressions || 0, ctr: r.ctr || 0, position: r.position || 0 }));
}

const fExact = (field, value) => ({ filter: { fieldName: field, stringFilter: { matchType: 'EXACT', value } } });
const fBegins = (field, value) => ({ filter: { fieldName: field, stringFilter: { matchType: 'BEGINS_WITH', value } } });
const fContains = (field, value) => ({ filter: { fieldName: field, stringFilter: { matchType: 'CONTAINS', value } } });
const andGroup = (filters) => ({ andGroup: { expressions: filters } });

async function safe(promise, fallback, errors, label) {
  try { return await promise; } catch (e) {
    if (errors && label) errors.push(`${label}: ${e.message}`);
    return fallback;
  }
}

function isBrandQuery(query, brandTerms) {
  const q = (query || '').toLowerCase();
  return (brandTerms || []).some((t) => q.includes(String(t).toLowerCase()));
}

function aggQueries(rows) {
  // sum clicks/impressions, weighted position, ctr
  let clicks = 0, impressions = 0, posSum = 0, posW = 0;
  for (const r of rows) {
    clicks += r.clicks; impressions += r.impressions;
    posSum += r.position * r.impressions; posW += r.impressions;
  }
  return { clicks, impressions, ctr: impressions ? clicks / impressions : 0, position: posW ? posSum / posW : 0 };
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const password = body.password || '';
    const expected = secrets.get('ANALYTICS_DASHBOARD_PASSWORD');
    if (!expected || password !== expected) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const action = body.action || 'fetch';

    // ---- Settings CRUD ----
    if (action === 'getSettings') {
      const [settingsList, keywords] = await Promise.all([
        safe(base44.asServiceRole.entities.DashboardSettings.list(), []),
        safe(base44.asServiceRole.entities.PriorityKeyword.list(), []),
      ]);
      const s = settingsList[0] || {};
      return Response.json({
        settings: {
          brand_terms: s.brand_terms || ['rtm'],
          blog_path_prefix: s.blog_path_prefix || '/news/',
          digital_assets_path: s.digital_assets_path || '/digital-assets/',
          tracking_start_date: s.tracking_start_date || '',
          _id: s.id || null,
        },
        keywords: (keywords || []).map((k) => ({ id: k.id, keyword: k.keyword, notes: k.notes || '' })),
      });
    }
    if (action === 'saveSettings') {
      const existing = await safe(base44.asServiceRole.entities.DashboardSettings.list(), []);
      const data = {
        brand_terms: body.brand_terms || ['rtm'],
        blog_path_prefix: body.blog_path_prefix || '/news/',
        digital_assets_path: body.digital_assets_path || '/digital-assets/',
        tracking_start_date: body.tracking_start_date || '',
      };
      if (existing[0]) {
        await base44.asServiceRole.entities.DashboardSettings.update(existing[0].id, data);
      } else {
        await base44.asServiceRole.entities.DashboardSettings.create(data);
      }
      CACHE.clear();
      return Response.json({ success: true });
    }
    if (action === 'addKeyword') {
      await base44.asServiceRole.entities.PriorityKeyword.create({ keyword: body.keyword, notes: body.notes || '' });
      return Response.json({ success: true });
    }
    if (action === 'updateKeyword') {
      await base44.asServiceRole.entities.PriorityKeyword.update(body.id, { keyword: body.keyword, notes: body.notes || '' });
      return Response.json({ success: true });
    }
    if (action === 'deleteKeyword') {
      await base44.asServiceRole.entities.PriorityKeyword.delete(body.id);
      return Response.json({ success: true });
    }

    // ---- Fetch dashboard data ----
    const compareMode = body.compareMode || 'previous';
    const { current, comparison } = resolveRanges(body.preset || 'last_month', body.customStart, body.customEnd, compareMode);
    const cacheKey = `${current.start}|${current.end}|${comparison ? comparison.start + '|' + comparison.end : 'none'}`;
    if (!body.refresh && CACHE.has(cacheKey)) {
      const cached = CACHE.get(cacheKey);
      if (Date.now() - cached.at < CACHE_TTL) {
        return Response.json({ ...cached.data, cachedAt: cached.at, cached: true });
      }
      CACHE.delete(cacheKey);
    }

    // Load settings + keywords
    const [settingsList, keywordsList] = await Promise.all([
      safe(base44.asServiceRole.entities.DashboardSettings.list(), []),
      safe(base44.asServiceRole.entities.PriorityKeyword.list(), []),
    ]);
    const sCfg = settingsList[0] || {};
    const brandTerms = sCfg.brand_terms || ['rtm'];
    const blogPrefix = sCfg.blog_path_prefix || '/news/';
    const daPath = sCfg.digital_assets_path || '/digital-assets/';
    const trackingStart = sCfg.tracking_start_date || '';
    const priorityKeywords = (keywordsList || []).map((k) => ({ id: k.id, keyword: k.keyword, notes: k.notes || '' }));

    const brandRegex = brandTerms.map((t) => String(t).toLowerCase()).join('|');

    // Get tokens
    const [gaConn, gscConn] = await Promise.all([
      base44.asServiceRole.connectors.getConnection('google_analytics'),
      base44.asServiceRole.connectors.getConnection('google_search_console'),
    ]);
    const gaHeaders = { Authorization: `Bearer ${gaConn.accessToken}`, 'Content-Type': 'application/json' };
    const gscHeaders = { Authorization: `Bearer ${gscConn.accessToken}`, 'Content-Type': 'application/json' };

    const errors = [];
    const comp = comparison; // alias

    // ===== GA4 QUERIES (current) =====
    const gaMetricsOverview = ['sessions', 'totalUsers', 'newUsers', 'screenPageViews', 'engagedSessions', 'engagementRate', 'bounceRate', 'averageSessionDuration', 'keyEvents'];
    const gaBatch1 = [
      safe(gaQuery(gaHeaders, current, [], gaMetricsOverview), [], errors, 'GA Overview (current)').then((r) => ({ k: 'overviewCur', r })),
      comp ? safe(gaQuery(gaHeaders, comp, [], gaMetricsOverview), [], errors, 'GA Overview (comparison)').then((r) => ({ k: 'overviewComp', r })) : Promise.resolve({ k: 'overviewComp', r: [] }),
      safe(gaQuery(gaHeaders, current, ['date'], ['sessions'], { orderBy: [{ dimension: { dimensionName: 'date' } }], limit: 400 }), []).then((r) => ({ k: 'dailyCur', r })),
      comp ? safe(gaQuery(gaHeaders, comp, ['date'], ['sessions'], { orderBy: [{ dimension: { dimensionName: 'date' } }], limit: 400 }), []).then((r) => ({ k: 'dailyComp', r })) : Promise.resolve({ k: 'dailyComp', r: [] }),
      safe(gaQuery(gaHeaders, current, ['sessionDefaultChannelGroup', 'sessionSource'], ['sessions', 'totalUsers', 'engagementRate', 'keyEvents'], { orderBy: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 500 }), []).then((r) => ({ k: 'channelsCur', r })),
      comp ? safe(gaQuery(gaHeaders, comp, ['sessionDefaultChannelGroup', 'sessionSource'], ['sessions', 'totalUsers', 'engagementRate', 'keyEvents'], { orderBy: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 500 }), []).then((r) => ({ k: 'channelsComp', r })) : Promise.resolve({ k: 'channelsComp', r: [] }),
    ];
    const gaBatch2 = [
      safe(gaQuery(gaHeaders, current, ['pageTitle', 'pagePath'], ['screenPageViews', 'sessions', 'userEngagementDuration', 'totalUsers'], { orderBy: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 25 }), []).then((r) => ({ k: 'topPagesCur', r })),
      comp ? safe(gaQuery(gaHeaders, comp, ['pageTitle', 'pagePath'], ['screenPageViews', 'sessions', 'userEngagementDuration', 'totalUsers'], { orderBy: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 25 }), []).then((r) => ({ k: 'topPagesComp', r })) : Promise.resolve({ k: 'topPagesComp', r: [] }),
      safe(gaQuery(gaHeaders, current, ['landingPage'], ['sessions', 'engagementRate', 'keyEvents'], { filter: fExact('sessionDefaultChannelGroup', 'Organic Search'), orderBy: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 20 }), []).then((r) => ({ k: 'organicLandingCur', r })),
      comp ? safe(gaQuery(gaHeaders, comp, ['landingPage'], ['sessions', 'engagementRate', 'keyEvents'], { filter: fExact('sessionDefaultChannelGroup', 'Organic Search'), orderBy: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 20 }), []).then((r) => ({ k: 'organicLandingComp', r })) : Promise.resolve({ k: 'organicLandingComp', r: [] }),
      safe(gaQuery(gaHeaders, current, ['eventName'], ['keyEvents'], { orderBy: [{ metric: { metricName: 'keyEvents' }, desc: true }], limit: 50 }), []).then((r) => ({ k: 'keyEventsCur', r })),
      comp ? safe(gaQuery(gaHeaders, comp, ['eventName'], ['keyEvents'], { orderBy: [{ metric: { metricName: 'keyEvents' }, desc: true }], limit: 50 }), []).then((r) => ({ k: 'keyEventsComp', r })) : Promise.resolve({ k: 'keyEventsComp', r: [] }),
    ];
    const blogFilter = fBegins('pagePath', blogPrefix);
    const gaBatch3 = [
      safe(gaQuery(gaHeaders, current, ['pageTitle', 'pagePath'], ['screenPageViews', 'sessions', 'userEngagementDuration', 'totalUsers', 'keyEvents'], { filter: blogFilter, orderBy: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 100 }), []).then((r) => ({ k: 'blogCur', r })),
      comp ? safe(gaQuery(gaHeaders, comp, ['pageTitle', 'pagePath'], ['screenPageViews', 'sessions', 'userEngagementDuration', 'totalUsers', 'keyEvents'], { filter: blogFilter, orderBy: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 100 }), []).then((r) => ({ k: 'blogComp', r })) : Promise.resolve({ k: 'blogComp', r: [] }),
      safe(gaQuery(gaHeaders, current, ['pagePath', 'sessionDefaultChannelGroup'], ['sessions'], { filter: blogFilter, orderBy: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 500 }), []).then((r) => ({ k: 'blogChannels', r })),
    ];
    const daFilter = fBegins('pagePath', daPath);
    const daPageFilter = andGroup([daFilter]);
    const dlFilter = andGroup([fExact('eventName', 'file_download'), daFilter]);
    const pwFilter = andGroup([fExact('eventName', 'form_submit'), fContains('customEvent:form_destination', 'postpass')]);
    const scrollFilter = andGroup([fExact('eventName', 'scroll'), daFilter]);
    const scrollDepthFilter = andGroup([fExact('eventName', 'scroll_depth'), daFilter]);
    const gaBatch4 = [
      safe(gaQuery(gaHeaders, current, ['pagePath'], ['screenPageViews', 'totalUsers', 'userEngagementDuration'], { filter: daPageFilter, limit: 10 }), []).then((r) => ({ k: 'daPageCur', r })),
      comp ? safe(gaQuery(gaHeaders, comp, ['pagePath'], ['screenPageViews', 'totalUsers', 'userEngagementDuration'], { filter: daPageFilter, limit: 10 }), []).then((r) => ({ k: 'daPageComp', r })) : Promise.resolve({ k: 'daPageComp', r: [] }),
      safe(gaQuery(gaHeaders, current, ['customEvent:file_name', 'customEvent:file_extension', 'customEvent:link_url'], ['eventCount', 'totalUsers'], { filter: dlFilter, orderBy: [{ metric: { metricName: 'eventCount' }, desc: true }], limit: 100 }), []).then((r) => ({ k: 'daDownloadsCur', r })),
      comp ? safe(gaQuery(gaHeaders, comp, ['customEvent:file_name', 'customEvent:file_extension', 'customEvent:link_url'], ['eventCount', 'totalUsers'], { filter: dlFilter, limit: 100 }), []).then((r) => ({ k: 'daDownloadsComp', r })) : Promise.resolve({ k: 'daDownloadsComp', r: [] }),
      safe(gaQuery(gaHeaders, current, [], ['eventCount'], { filter: dlFilter, limit: 1 }), []).then((r) => ({ k: 'daDownloadsTotalCur', r })),
      safe(gaQuery(gaHeaders, current, [], ['eventCount', 'totalUsers'], { filter: pwFilter, limit: 1 }), []).then((r) => ({ k: 'daUnlocksCur', r })),
    ];
    const gaBatch5 = [
      comp ? safe(gaQuery(gaHeaders, comp, [], ['eventCount'], { filter: dlFilter, limit: 1 }), []).then((r) => ({ k: 'daDownloadsTotalComp', r })) : Promise.resolve({ k: 'daDownloadsTotalComp', r: [] }),
      safe(gaQuery(gaHeaders, current, ['date'], ['eventCount'], { filter: dlFilter, orderBy: [{ dimension: { dimensionName: 'date' } }], limit: 400 }), []).then((r) => ({ k: 'daDownloadsTrend', r })),
      comp ? safe(gaQuery(gaHeaders, comp, [], ['eventCount', 'totalUsers'], { filter: pwFilter, limit: 1 }), []).then((r) => ({ k: 'daUnlocksComp', r })) : Promise.resolve({ k: 'daUnlocksComp', r: [] }),
      safe(gaQuery(gaHeaders, current, [], ['totalUsers'], { filter: scrollFilter, limit: 1 }), []).then((r) => ({ k: 'daScrollUsers', r })),
      safe(gaQuery(gaHeaders, current, ['customEvent:percent_scrolled'], ['totalUsers'], { filter: scrollDepthFilter, limit: 50 }), []).then((r) => ({ k: 'daScrollDepth', r })),
    ];

    const gaResults = {};
    for (const batch of [gaBatch1, gaBatch2, gaBatch3, gaBatch4, gaBatch5]) {
      const settled = await Promise.allSettled(batch);
      for (const res of settled) {
        if (res.status === 'fulfilled' && res.value) gaResults[res.value.k] = res.value.r;
        else if (res.status === 'rejected') errors.push(`GA batch rejected: ${res.reason?.message || res.reason}`);
      }
    }
    if (!gaResults.overviewCur || gaResults.overviewCur.length === 0) {
      if (!errors.some((e) => e.includes('GA Overview'))) errors.push('GA Overview: query returned no rows');
    }

    // ===== GSC QUERIES =====
    const brandFilter = [{ dimension: 'query', operator: 'includingRegex', expression: brandRegex }];
    const nonBrandFilter = [{ dimension: 'query', operator: 'excludingRegex', expression: brandRegex }];
    const gscBatch1 = [
      safe(gscQuery(gscHeaders, current, ['query'], { rowLimit: 5000 }), []).then((r) => ({ k: 'qCur', r })),
      comp ? safe(gscQuery(gscHeaders, comp, ['query'], { rowLimit: 5000 }), []).then((r) => ({ k: 'qComp', r })) : Promise.resolve({ k: 'qComp', r: [] }),
      safe(gscQuery(gscHeaders, current, ['page'], { rowLimit: 25 }), []).then((r) => ({ k: 'pCur', r })),
      comp ? safe(gscQuery(gscHeaders, comp, ['page'], { rowLimit: 25 }), []).then((r) => ({ k: 'pComp', r })) : Promise.resolve({ k: 'pComp', r: [] }),
      safe(gscQuery(gscHeaders, current, ['page', 'query'], { rowLimit: 5000 }), []).then((r) => ({ k: 'pqCur', r })),
      safe(gscQuery(gscHeaders, current, ['date'], { filter: brandFilter, rowLimit: 400 }), []).then((r) => ({ k: 'dBrandCur', r })),
    ];
    const gscBatch2 = [
      comp ? safe(gscQuery(gscHeaders, comp, ['date'], { filter: brandFilter, rowLimit: 400 }), []).then((r) => ({ k: 'dBrandComp', r })) : Promise.resolve({ k: 'dBrandComp', r: [] }),
      safe(gscQuery(gscHeaders, current, ['date'], { filter: nonBrandFilter, rowLimit: 400 }), []).then((r) => ({ k: 'dNonBrandCur', r })),
      comp ? safe(gscQuery(gscHeaders, comp, ['date'], { filter: nonBrandFilter, rowLimit: 400 }), []).then((r) => ({ k: 'dNonBrandComp', r })) : Promise.resolve({ k: 'dNonBrandComp', r: [] }),
    ];
    const gscResults = {};
    for (const batch of [gscBatch1, gscBatch2]) {
      const settled = await Promise.allSettled(batch);
      for (const res of settled) {
        if (res.status === 'fulfilled' && res.value) gscResults[res.value.k] = res.value.r;
      }
    }

    // ===== BUILD RESULT =====
    const result = {
      dateRange: { start: current.start, end: current.end, compareStart: comp ? comp.start : null, compareEnd: comp ? comp.end : null, compareMode },
      settings: { brand_terms: brandTerms, blog_path_prefix: blogPrefix, digital_assets_path: daPath, tracking_start_date: trackingStart },
      priorityKeywords,
      overview: null,
      daily: null,
      traffic: null,
      topPages: [],
      organicLanding: [],
      keyEvents: [],
      search: null,
      blog: null,
      digitalAssets: null,
      errors,
    };

    // --- Overview ---
    try {
      const cur = gaResults.overviewCur?.[0];
      const cmp = gaResults.overviewComp?.[0];
      const parseOverview = (row) => {
        if (!row) return null;
        const m = row.m;
        return {
          sessions: num(m[0]), users: num(m[1]), newUsers: num(m[2]), pageViews: num(m[3]),
          engagedSessions: num(m[4]), engagementRate: fl(m[5]), bounceRate: fl(m[6]),
          avgSessionDuration: fl(m[7]), keyEvents: num(m[8]),
        };
      };
      result.overview = { current: parseOverview(cur), comparison: parseOverview(cmp) };
    } catch (e) { errors.push(`Overview: ${e.message}`); }

    // --- Daily trend ---
    try {
      const parseDaily = (rows) => (rows || []).map((r) => ({ date: r.dims[0], sessions: num(r.m[0]) }));
      result.daily = { current: parseDaily(gaResults.dailyCur), comparison: gaResults.dailyComp ? parseDaily(gaResults.dailyComp) : null };
    } catch (e) { errors.push(`Daily: ${e.message}`); }

    // --- Traffic channels + sources ---
    try {
      const buildChannels = (rows) => {
        const map = {};
        for (const r of rows || []) {
          const channel = r.dims[0] || '(none)';
          const source = r.dims[1] || '(none)';
          if (!map[channel]) map[channel] = { channel, sessions: 0, users: 0, engSum: 0, engW: 0, keyEvents: 0, sources: {} };
          const c = map[channel];
          c.sessions += num(r.m[0]); c.users += num(r.m[1]);
          c.engSum += fl(r.m[2]) * num(r.m[0]); c.engW += num(r.m[0]); c.keyEvents += num(r.m[3]);
          if (!c.sources[source]) c.sources[source] = { source, sessions: 0, users: 0, engSum: 0, engW: 0, keyEvents: 0 };
          const sc = c.sources[source];
          sc.sessions += num(r.m[0]); sc.users += num(r.m[1]); sc.engSum += fl(r.m[2]) * num(r.m[0]); sc.engW += num(r.m[0]); sc.keyEvents += num(r.m[3]);
        }
        return map;
      };
      const curMap = buildChannels(gaResults.channelsCur);
      const compMap = buildChannels(gaResults.channelsComp);
      const channels = [];
      const sourcesByChannel = {};
      const allChannels = new Set([...Object.keys(curMap), ...Object.keys(compMap)]);
      // Synthesize AI Assistant from sessionSource if not present as a channel
      const aiCur = { sessions: 0, users: 0, engSum: 0, engW: 0, keyEvents: 0, sources: {} };
      const aiComp = { sessions: 0, users: 0, engSum: 0, engW: 0, keyEvents: 0, sources: {} };
      const isAi = (src) => AI_SOURCES.some((a) => (src || '').toLowerCase().includes(a));
      for (const [channel, c] of Object.entries(curMap)) {
        for (const [src, sc] of Object.entries(c.sources)) {
          if (isAi(src)) {
            aiCur.sessions += sc.sessions; aiCur.users += sc.users; aiCur.engSum += sc.engSum; aiCur.engW += sc.engW; aiCur.keyEvents += sc.keyEvents;
            aiCur.sources[src] = { source: src, sessions: sc.sessions, users: sc.users, engSum: sc.engSum, engW: sc.engW, keyEvents: sc.keyEvents };
          }
        }
      }
      for (const [channel, c] of Object.entries(compMap)) {
        for (const [src, sc] of Object.entries(c.sources)) {
          if (isAi(src)) {
            aiComp.sessions += sc.sessions; aiComp.users += sc.users; aiComp.engSum += sc.engSum; aiComp.engW += sc.engW; aiComp.keyEvents += sc.keyEvents;
            if (!aiComp.sources[src]) aiComp.sources[src] = { source: src, sessions: 0, users: 0, engSum: 0, engW: 0, keyEvents: 0 };
            aiComp.sources[src].sessions += sc.sessions; aiComp.sources[src].users += sc.users; aiComp.sources[src].engSum += sc.engSum; aiComp.sources[src].engW += sc.engW; aiComp.sources[src].keyEvents += sc.keyEvents;
          }
        }
      }
      const finalize = (c) => ({ sessions: c.sessions, users: c.users, engagementRate: c.engW ? c.engSum / c.engW : 0, keyEvents: c.keyEvents });
      const finalizeSources = (c) => Object.values(c.sources).map((sc) => ({ source: sc.source, sessions: sc.sessions, users: sc.users, engagementRate: sc.engW ? sc.engSum / sc.engW : 0, keyEvents: sc.keyEvents })).sort((a, b) => b.sessions - a.sessions);
      for (const ch of allChannels) {
        const cur = curMap[ch] || { channel: ch, sessions: 0, users: 0, engSum: 0, engW: 0, keyEvents: 0, sources: {} };
        const cmp = compMap[ch] || { channel: ch, sessions: 0, users: 0, engSum: 0, engW: 0, keyEvents: 0, sources: {} };
        channels.push({ channel: ch, current: finalize(cur), comparison: finalize(cmp) });
        sourcesByChannel[ch] = { current: finalizeSources(cur), comparison: finalizeSources(cmp) };
      }
      channels.sort((a, b) => b.current.sessions - a.current.sessions);
      if (!allChannels.has('AI Assistant') && aiCur.sessions > 0) {
        channels.push({ channel: 'AI Assistant', current: finalize(aiCur), comparison: finalize(aiComp) });
        sourcesByChannel['AI Assistant'] = { current: finalizeSources(aiCur), comparison: finalizeSources(aiComp) };
      }
      result.traffic = { channels, sourcesByChannel };
    } catch (e) { errors.push(`Traffic: ${e.message}`); }

    // --- Top pages ---
    try {
      const buildPages = (rows) => {
        const map = {};
        for (const r of rows || []) {
          const path = r.dims[1];
          const title = r.dims[0];
          if (!map[path]) map[path] = { title, path, views: 0, sessions: 0, engDur: 0, users: 0 };
          map[path].views += num(r.m[0]); map[path].sessions += num(r.m[1]); map[path].engDur += fl(r.m[2]); map[path].users += num(r.m[3]);
        }
        return Object.values(map).map((p) => ({ ...p, avgEngagement: p.users ? p.engDur / p.users : 0 }));
      };
      const cur = buildPages(gaResults.topPagesCur);
      const compMap = {};
      for (const p of buildPages(gaResults.topPagesComp)) compMap[p.path] = p;
      result.topPages = cur.map((p) => ({ title: p.title, path: p.path, current: { views: p.views, sessions: p.sessions, avgEngagement: p.avgEngagement }, comparison: { views: compMap[p.path]?.views || 0 } }));
    } catch (e) { errors.push(`Top pages: ${e.message}`); }

    // --- Organic landing pages ---
    try {
      const buildLanding = (rows) => (rows || []).map((r) => ({ landingPage: r.dims[0], sessions: num(r.m[0]), engagementRate: fl(r.m[1]), keyEvents: num(r.m[2]) }));
      const cur = buildLanding(gaResults.organicLandingCur);
      const compMap = {};
      for (const l of buildLanding(gaResults.organicLandingComp)) compMap[l.landingPage] = l;
      result.organicLanding = cur.map((l) => ({ landingPage: l.landingPage, current: { sessions: l.sessions, engagementRate: l.engagementRate, keyEvents: l.keyEvents }, comparison: { sessions: compMap[l.landingPage]?.sessions || 0 } }));
    } catch (e) { errors.push(`Organic landing: ${e.message}`); }

    // --- Key events ---
    try {
      const cur = (gaResults.keyEventsCur || []).map((r) => ({ event: r.dims[0], count: num(r.m[0]) }));
      const compMap = {};
      for (const e of (gaResults.keyEventsComp || []).map((r) => ({ event: r.dims[0], count: num(r.m[0]) }))) compMap[e.event] = e.count;
      result.keyEvents = cur.map((e) => ({ event: e.event, current: { count: e.count }, comparison: { count: compMap[e.event] || 0 } }));
    } catch (e) { errors.push(`Key events: ${e.message}`); }

    // --- Search Console ---
    try {
      const qCur = gscResults.qCur || [];
      const qComp = gscResults.qComp || [];
      const pCur = gscResults.pCur || [];
      const pComp = gscResults.pComp || [];
      const pqCur = gscResults.pqCur || [];

      // page -> queries, query -> pages maps
      const pageToQueries = {};
      const queryToPages = {};
      for (const r of pqCur) {
        const page = r.keys[0]; const query = r.keys[1];
        if (!pageToQueries[page]) pageToQueries[page] = [];
        pageToQueries[page].push({ query, clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position });
        if (!queryToPages[query]) queryToPages[query] = [];
        queryToPages[query].push({ page, clicks: r.clicks, impressions: r.impressions });
      }
      const topPageForQuery = (q) => {
        const pages = queryToPages[q] || [];
        if (!pages.length) return null;
        return pages.sort((a, b) => b.clicks - a.clicks)[0].page;
      };
      const topQueriesForPage = (page) => (pageToQueries[page] || []).sort((a, b) => b.clicks - a.clicks).slice(0, 10);

      // brand / non-brand aggregates
      const splitAgg = (rows) => {
        const brand = [], nonBrand = [];
        for (const r of rows) { (isBrandQuery(r.keys[0], brandTerms) ? brand : nonBrand).push(r); }
        return { brand: aggQueries(brand), nonBrand: aggQueries(nonBrand) };
      };
      const curSplit = splitAgg(qCur);
      const compSplit = splitAgg(qComp);

      // daily trend
      const parseDailySc = (rows) => (rows || []).map((r) => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions }));
      const daily = {
        current: { brand: parseDailySc(gscResults.dBrandCur), nonBrand: parseDailySc(gscResults.dNonBrandCur) },
        comparison: { brand: parseDailySc(gscResults.dBrandComp), nonBrand: parseDailySc(gscResults.dNonBrandComp) },
      };

      // top queries (top 100 by impressions)
      const compQueryMap = {};
      for (const r of qComp) compQueryMap[r.keys[0]] = r;
      const topQueries = qCur.map((r) => {
        const q = r.keys[0];
        const c = compQueryMap[q];
        return {
          query: q, brand: isBrandQuery(q, brandTerms),
          current: { clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position },
          comparison: c ? { clicks: c.clicks, impressions: c.impressions, ctr: c.ctr, position: c.position } : null,
          rankingPage: topPageForQuery(q),
        };
      }).sort((a, b) => b.current.impressions - a.current.impressions).slice(0, 100);

      // opportunity queries: non-brand, position 4-20 OR (impressions>=50 and ctr<0.02)
      const opportunity = topQueries
        .filter((q) => !q.brand && (q.current.position >= 4 && q.current.position <= 20) || (!q.brand && q.current.impressions >= 50 && q.current.ctr < 0.02))
        .map((q) => ({ query: q.query, impressions: q.current.impressions, clicks: q.current.clicks, ctr: q.current.ctr, position: q.current.position, rankingPage: q.rankingPage }))
        .sort((a, b) => b.impressions - a.impressions);

      // priority keywords
      const priority = priorityKeywords.map((pk) => {
        const matches = qCur.filter((r) => (r.keys[0] || '').toLowerCase().includes(String(pk.keyword).toLowerCase()));
        const compMatches = qComp.filter((r) => (r.keys[0] || '').toLowerCase().includes(String(pk.keyword).toLowerCase()));
        const curAgg = aggQueries(matches);
        const compAgg = aggQueries(compMatches);
        let rankingPage = null;
        for (const r of matches) { const p = topPageForQuery(r.keys[0]); if (p) { rankingPage = p; break; } }
        return {
          keyword: pk.keyword,
          current: matches.length ? { clicks: curAgg.clicks, impressions: curAgg.impressions, ctr: curAgg.ctr, position: curAgg.position } : null,
          comparison: compMatches.length ? { position: compAgg.position } : null,
          rankingPage,
          notRanking: matches.length === 0,
        };
      });

      // top pages
      const compPageMap = {};
      for (const r of pComp) compPageMap[r.keys[0]] = r;
      const topPages = pCur.map((r) => {
        const page = r.keys[0];
        const c = compPageMap[page];
        return {
          page,
          current: { clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position },
          comparison: c ? { clicks: c.clicks, impressions: c.impressions, ctr: c.ctr, position: c.position } : null,
          queries: topQueriesForPage(page),
        };
      });

      result.search = {
        nonBrand: { current: curSplit.nonBrand, comparison: compSplit.nonBrand },
        brand: { current: curSplit.brand, comparison: compSplit.brand },
        daily,
        priorityKeywords: priority,
        topQueries,
        opportunityQueries: opportunity,
        topPages,
        pageQueries: pageToQueries, // full map for blog drilldown
      };
    } catch (e) { errors.push(`Search: ${e.message}`); }

    // --- Blog ---
    try {
      const buildBlog = (rows) => {
        const map = {};
        for (const r of rows || []) {
          const path = r.dims[1]; const title = r.dims[0];
          if (path === blogPrefix || path === blogPrefix.replace(/\/$/, '')) continue;
          if (!map[path]) map[path] = { title, path, views: 0, sessions: 0, engDur: 0, users: 0, keyEvents: 0 };
          map[path].views += num(r.m[0]); map[path].sessions += num(r.m[1]); map[path].engDur += fl(r.m[2]); map[path].users += num(r.m[3]); map[path].keyEvents += num(r.m[4]);
        }
        return map;
      };
      const curMap = buildBlog(gaResults.blogCur);
      const compMap = buildBlog(gaResults.blogComp);
      // per-post top channel
      const blogChannels = {};
      for (const r of gaResults.blogChannels || []) {
        const path = r.dims[0]; const channel = r.dims[1]; const sessions = num(r.m[0]);
        if (!blogChannels[path]) blogChannels[path] = [];
        blogChannels[path].push({ channel, sessions });
      }
      // search console per post
      const scForBlog = {};
      if (result.search?.pageQueries) {
        for (const [page, queries] of Object.entries(result.search.pageQueries)) {
          if (!page.startsWith(blogPrefix)) continue;
          const agg = aggQueries(queries);
          scForBlog[page] = { clicks: agg.clicks, impressions: agg.impressions, position: agg.position, queries: queries.sort((a, b) => b.clicks - a.clicks).slice(0, 10) };
        }
      }
      const posts = Object.values(curMap).map((p) => {
        const comp = compMap[p.path];
        const topSource = (blogChannels[p.path] || []).sort((a, b) => b.sessions - a.sessions)[0]?.channel || '—';
        const sc = scForBlog[p.path] || { clicks: 0, impressions: 0, position: 0, queries: [] };
        return {
          title: p.title, path: p.path,
          current: { views: p.views, sessions: p.sessions, avgEngagement: p.users ? p.engDur / p.users : 0, keyEvents: p.keyEvents },
          comparison: { views: comp ? comp.views : 0 },
          topSource,
          search: { clicks: sc.clicks, impressions: sc.impressions, position: sc.position },
          queries: sc.queries,
          channels: (blogChannels[p.path] || []).sort((a, b) => b.sessions - a.sessions),
          isNew: !comp || comp.views === 0,
        };
      }).sort((a, b) => b.current.views - a.current.views);
      // blog KPIs
      let bViews = 0, bSessions = 0, bEngDur = 0, bUsers = 0, bSearchClicks = 0, bSearchImp = 0;
      for (const p of posts) { bViews += p.current.views; bSessions += p.current.sessions; bEngDur += p.current.avgEngagement * p.current.sessions; bUsers += 1; bSearchClicks += p.search.clicks; bSearchImp += p.search.impressions; }
      let cViews = 0;
      for (const p of Object.values(compMap)) cViews += p.views;
      result.blog = {
        kpis: {
          current: { views: bViews, sessions: bSessions, avgEngagement: bSessions ? bEngDur / bSessions : 0, searchClicks: bSearchClicks, searchImpressions: bSearchImp },
          comparison: { views: cViews },
        },
        posts,
      };
    } catch (e) { errors.push(`Blog: ${e.message}`); }

    // --- Digital Assets ---
    try {
      const daPageCur = gaResults.daPageCur?.[0];
      const daPageComp = gaResults.daPageComp?.[0];
      const parseDaPage = (row) => {
        if (!row) return null;
        return { pageViews: num(row.m[0]), users: num(row.m[1]), engDur: fl(row.m[2]) };
      };
      const cur = parseDaPage(daPageCur);
      const cmp = parseDaPage(daPageComp);
      const unlocksCur = gaResults.daUnlocksCur?.[0];
      const unlocksComp = gaResults.daUnlocksComp?.[0];
      const passwordUnlocks = unlocksCur ? num(unlocksCur.m[0]) : 0;
      const passwordUnlocksComp = unlocksComp ? num(unlocksComp.m[0]) : 0;

      // downloads resources
      const buildResources = (rows) => {
        const map = {};
        for (const r of rows || []) {
          const name = r.dims[0] || '(unknown)';
          if (!map[name]) map[name] = { fileName: name, fileType: r.dims[1] || '', linkUrl: r.dims[2] || '', downloads: 0, users: 0 };
          map[name].downloads += num(r.m[0]); map[name].users += num(r.m[1]);
        }
        return Object.values(map);
      };
      const resCur = buildResources(gaResults.daDownloadsCur);
      const resCompMap = {};
      for (const r of buildResources(gaResults.daDownloadsComp)) resCompMap[r.fileName] = r.downloads;
      const resources = resCur.map((r) => ({ ...r, comparison: { downloads: resCompMap[r.fileName] || 0 } })).sort((a, b) => b.downloads - a.downloads);
      const totalDownloads = gaResults.daDownloadsTotalCur?.[0] ? num(gaResults.daDownloadsTotalCur[0].m[0]) : resources.reduce((s, r) => s + r.downloads, 0);
      const totalDownloadsComp = gaResults.daDownloadsTotalComp?.[0] ? num(gaResults.daDownloadsTotalComp[0].m[0]) : Object.values(resCompMap).reduce((s, v) => s + v, 0);

      const pageViews = cur?.pageViews || 0;
      const users = cur?.users || 0;
      const avgEngagement = cur && cur.users ? cur.engDur / cur.users : 0;
      const downloadRate = users ? (resources.reduce((s, r) => s + r.users, 0) > 0 ? new Set(resources.map((r) => r.fileName)).size : 0) / users : 0;
      // download rate = unique downloaders / page viewers; approximate with sum of resource users capped
      const uniqueDownloaders = resources.reduce((s, r) => s + r.users, 0);
      const dlRate = users ? Math.min(1, uniqueDownloaders / users) : 0;

      // scroll
      const scrollUsers = gaResults.daScrollUsers?.[0] ? num(gaResults.daScrollUsers[0].m[0]) : 0;
      const scrollDepthRows = gaResults.daScrollDepth || [];
      let scroll = { bottomPct: users ? scrollUsers / users : 0, byPercent: null };
      if (scrollDepthRows.length > 0) {
        const byPercent = scrollDepthRows.map((r) => ({ percent: parseInt(r.dims[0]) || 0, users: num(r.m[0]) })).sort((a, b) => a.percent - b.percent);
        scroll = { bottomPct: null, byPercent };
      }

      const downloadsTrend = (gaResults.daDownloadsTrend || []).map((r) => ({ date: r.dims[0], downloads: num(r.m[0]) }));

      result.digitalAssets = {
        kpis: {
          current: { pageViews, users, avgEngagement, passwordUnlocks, downloads: totalDownloads, downloadRate: dlRate },
          comparison: { pageViews: cmp?.pageViews || 0, passwordUnlocks: passwordUnlocksComp, downloads: totalDownloadsComp },
        },
        scroll,
        resources,
        downloadsTrend,
      };
    } catch (e) { errors.push(`Digital Assets: ${e.message}`); }

    const finalResult = { ...result, cachedAt: Date.now(), cached: false };
    CACHE.set(cacheKey, { at: Date.now(), data: result });
    return Response.json(finalResult);
  } catch (error) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}