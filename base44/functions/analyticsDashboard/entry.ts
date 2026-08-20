import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Validate password
    const body = await req.json().catch(() => ({}));
    const password = body.password || '';
    const expectedPassword = secrets.get("ANALYTICS_DASHBOARD_PASSWORD");

    if (!expectedPassword || password !== expectedPassword) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Date range: last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    const fmt = (d) => d.toISOString().split('T')[0];
    const startDateStr = fmt(startDate);
    const endDateStr = fmt(endDate);

    const result = {
      dateRange: { start: startDateStr, end: endDateStr },
      ga: null,
      gsc: null,
      errors: []
    };

    // === Google Analytics (GA4) ===
    try {
      const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_analytics");

      // List account summaries to find first GA4 property
      const adminRes = await fetch('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      if (!adminRes.ok) {
        result.errors.push(`GA Admin API: ${adminRes.status}`);
      } else {
        const adminData = await adminRes.json();
        const accounts = adminData.accountSummaries || [];
        let propertyId = null;
        let propertyName = null;

        // Look for RTM Imports property by name
        for (const acct of accounts) {
          for (const prop of (acct.propertySummaries || [])) {
            const name = (prop.displayName || '').toLowerCase();
            const acctName = (acct.displayName || '').toLowerCase();
            if (name.includes('rtm') || acctName.includes('rtm')) {
              propertyId = prop.property.replace('properties/', '');
              propertyName = prop.displayName;
              break;
            }
          }
          if (propertyId) break;
        }

        if (!propertyId) {
          result.errors.push('No GA4 property for rtm-imports.com found. Create a GA4 property for rtm-imports.com and share access with the connected Google account.');
        } else {
          const gaUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
          const headers = { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

          // Overview metrics
          const overviewRes = await fetch(gaUrl, {
            method: 'POST', headers,
            body: JSON.stringify({
              dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
              metrics: [
                { name: 'sessions' },
                { name: 'totalUsers' },
                { name: 'screenPageViews' },
                { name: 'bounceRate' },
                { name: 'averageSessionDuration' }
              ]
            })
          });

          let overview = { sessions: 0, users: 0, pageViews: 0, bounceRate: 0, avgSessionDuration: 0 };
          if (overviewRes.ok) {
            const ovData = await overviewRes.json();
            const rows = ovData.rows || [];
            if (rows.length > 0) {
              const v = rows[0].metricValues;
              overview = {
                sessions: parseInt(v[0].value) || 0,
                users: parseInt(v[1].value) || 0,
                pageViews: parseInt(v[2].value) || 0,
                bounceRate: parseFloat(v[3].value) || 0,
                avgSessionDuration: parseFloat(v[4].value) || 0
              };
            }
          }

          // Daily sessions trend
          const dailyRes = await fetch(gaUrl, {
            method: 'POST', headers,
            body: JSON.stringify({
              dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
              dimensions: [{ name: 'date' }],
              metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
              orderBys: [{ dimension: { dimensionName: 'date' } }],
              limit: 30
            })
          });

          let daily = [];
          if (dailyRes.ok) {
            const dData = await dailyRes.json();
            daily = (dData.rows || []).map(r => ({
              date: r.dimensionValues[0].value,
              sessions: parseInt(r.metricValues[0].value) || 0,
              users: parseInt(r.metricValues[1].value) || 0
            }));
          }

          // Top pages
          const pagesRes = await fetch(gaUrl, {
            method: 'POST', headers,
            body: JSON.stringify({
              dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
              dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
              metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
              orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
              limit: 10
            })
          });

          let topPages = [];
          if (pagesRes.ok) {
            const pData = await pagesRes.json();
            topPages = (pData.rows || []).map(r => ({
              title: r.dimensionValues[0].value,
              path: r.dimensionValues[1].value,
              pageViews: parseInt(r.metricValues[0].value) || 0,
              sessions: parseInt(r.metricValues[1].value) || 0
            }));
          }

          // Top traffic sources
          const srcRes = await fetch(gaUrl, {
            method: 'POST', headers,
            body: JSON.stringify({
              dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
              dimensions: [{ name: 'sessionDefaultChannelGroup' }],
              metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
              orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
              limit: 10
            })
          });

          let topSources = [];
          if (srcRes.ok) {
            const sData = await srcRes.json();
            topSources = (sData.rows || []).map(r => ({
              channel: r.dimensionValues[0].value,
              sessions: parseInt(r.metricValues[0].value) || 0,
              users: parseInt(r.metricValues[1].value) || 0
            }));
          }

          result.ga = { propertyName, propertyId, overview, daily, topPages, topSources };
        }
      }
    } catch (e) {
      result.errors.push(`GA: ${e.message}`);
    }

    // === Google Search Console ===
    try {
      const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_search_console");

      // List sites
      const sitesRes = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      if (!sitesRes.ok) {
        result.errors.push(`GSC sites: ${sitesRes.status}`);
      } else {
        const sitesData = await sitesRes.json();
        const sites = sitesData.siteEntry || [];

        if (sites.length === 0) {
          result.errors.push('No Search Console sites found');
        } else {
          const rtmSite = sites.find(s => s.siteUrl.toLowerCase().includes('rtm-imports'));
          const siteUrl = rtmSite ? rtmSite.siteUrl : sites[0].siteUrl;
          const encodedSite = encodeURIComponent(siteUrl);
          const scUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`;
          const headers = { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

          // Overview
          const ovRes = await fetch(scUrl, {
            method: 'POST', headers,
            body: JSON.stringify({
              startDate: startDateStr,
              endDate: endDateStr,
              rowLimit: 1
            })
          });

          let scOverview = { clicks: 0, impressions: 0, ctr: 0, position: 0 };
          if (ovRes.ok) {
            const ovData = await ovRes.json();
            const rows = ovData.rows || [];
            if (rows.length > 0) {
              scOverview = {
                clicks: rows[0].clicks || 0,
                impressions: rows[0].impressions || 0,
                ctr: rows[0].ctr || 0,
                position: rows[0].position || 0
              };
            }
          }

          // Top queries
          const qRes = await fetch(scUrl, {
            method: 'POST', headers,
            body: JSON.stringify({
              startDate: startDateStr,
              endDate: endDateStr,
              dimensions: ['query'],
              rowLimit: 10
            })
          });

          let topQueries = [];
          if (qRes.ok) {
            const qData = await qRes.json();
            topQueries = (qData.rows || []).map(r => ({
              query: r.keys[0],
              clicks: r.clicks,
              impressions: r.impressions,
              ctr: r.ctr,
              position: r.position
            }));
          }

          // Top pages
          const pRes = await fetch(scUrl, {
            method: 'POST', headers,
            body: JSON.stringify({
              startDate: startDateStr,
              endDate: endDateStr,
              dimensions: ['page'],
              rowLimit: 10
            })
          });

          let topScPages = [];
          if (pRes.ok) {
            const pData = await pRes.json();
            topScPages = (pData.rows || []).map(r => ({
              page: r.keys[0],
              clicks: r.clicks,
              impressions: r.impressions,
              ctr: r.ctr,
              position: r.position
            }));
          }

          result.gsc = { siteUrl, overview: scOverview, topQueries, topPages: topScPages };
        }
      }
    } catch (e) {
      result.errors.push(`GSC: ${e.message}`);
    }

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}