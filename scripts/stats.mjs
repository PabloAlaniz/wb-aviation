#!/usr/bin/env node
/**
 * Weekly distribution report for CheckCG (last 7 days), as Markdown:
 *
 *   node scripts/stats.mjs >> "$GITHUB_STEP_SUMMARY"
 *
 * Sections (each one prints "n/d" when its credentials are missing or a call
 * fails; secrets are never printed):
 *   - GitHub: stars, forks, clones and views of the repo (traffic needs a
 *     token with push access: GITHUB_TOKEN).
 *   - Cloudflare Web Analytics: visits and page views of checkcg.com
 *     (GraphQL dataset rumPageloadEventsAdaptiveGroups; CLOUDFLARE_API_TOKEN
 *     with Account Analytics: Read, CLOUDFLARE_ACCOUNT_ID).
 *   - Product events: Workers Analytics Engine dataset `checkcg_events`
 *     (SQL API; same Cloudflare credentials), by event and top referrers.
 *
 * Optional: STATS_GITHUB_REPO (default PabloAlaniz/wb-aviation), STATS_SITE_HOST
 * (default checkcg.com), CLOUDFLARE_WEB_ANALYTICS_SITE_TAG (filter by site tag
 * instead of host). Node 22+, no dependencies (an adaptation of
 * google-suite/tools/agent-distribution/stats/stats.py).
 */
import process from "node:process"
import { pathToFileURL } from "node:url"

export const NA = "n/d"
const TIMEOUT_MS = 20_000
const DAY_MS = 24 * 60 * 60 * 1000
const AE_DATASET = "checkcg_events"

// ---------------------------------------------------------------------------
// Pure helpers (unit-tested in stats.test.js)
// ---------------------------------------------------------------------------

/**
 * The reporting window: the 7 days before `now`.
 * @param {Date} now
 * @param {number} [days]
 * @returns {{ start: Date, end: Date, label: string }}
 */
export function reportWindow(now, days = 7) {
  const start = new Date(now.getTime() - days * DAY_MS)
  const day = (/** @type {Date} */ d) => d.toISOString().slice(0, 10)
  return { start, end: now, label: `${day(start)} → ${day(now)}` }
}

/**
 * Sum the daily GitHub traffic entries (views or clones) inside the window.
 * Uniques are the sum of daily uniques (GitHub doesn't give weekly uniques
 * for an arbitrary window), so a visitor on two days counts twice.
 * @param {{ timestamp: string, count: number, uniques: number }[] | undefined} days
 * @param {Date} since
 * @returns {{ count: number, uniques: number } | null}
 */
export function sumTraffic(days, since) {
  if (!Array.isArray(days)) return null
  // GitHub buckets by UTC day: include the bucket that contains `since`
  const from = Date.UTC(since.getUTCFullYear(), since.getUTCMonth(), since.getUTCDate())
  return days
    .filter((d) => Date.parse(d.timestamp) >= from)
    .reduce(
      (acc, d) => ({ count: acc.count + (d.count || 0), uniques: acc.uniques + (d.uniques || 0) }),
      { count: 0, uniques: 0 }
    )
}

/**
 * Visits and page views from a rumPageloadEventsAdaptiveGroups response.
 * @param {any} body - GraphQL response
 * @returns {{ visits: number, pageviews: number } | null}
 */
export function rumTotals(body) {
  if (!body || (Array.isArray(body.errors) && body.errors.length > 0)) return null
  const groups = body.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups
  if (!Array.isArray(groups)) return null
  return groups.reduce(
    (acc, g) => ({
      visits: acc.visits + Number(g?.sum?.visits ?? 0),
      pageviews: acc.pageviews + Number(g?.count ?? 0),
    }),
    { visits: 0, pageviews: 0 }
  )
}

/**
 * Rows of an Analytics Engine SQL response (FORMAT JSON), as [label, count]
 * pairs. ClickHouse serializes 64-bit integers as strings, hence Number().
 * @param {any} body
 * @param {string} labelKey - column with the label
 * @param {string} [countKey]
 * @returns {[string, number][] | null}
 */
export function sqlRows(body, labelKey, countKey = "count") {
  if (!body || !Array.isArray(body.data)) return null
  return body.data.map((row) => [
    String(row[labelKey] ?? "") || "(none)",
    Math.round(Number(row[countKey] ?? 0)),
  ])
}

/**
 * SQL for the Analytics Engine queries (blob1 = event, blob5 = ref).
 * @param {"events" | "refs"} kind
 * @param {number} [days]
 */
export function eventsSql(kind, days = 7) {
  const where = `timestamp > NOW() - INTERVAL '${days}' DAY`
  if (kind === "events") {
    return `SELECT blob1 AS event, SUM(_sample_interval) AS count FROM ${AE_DATASET} WHERE ${where} GROUP BY event ORDER BY count DESC FORMAT JSON`
  }
  return `SELECT blob5 AS ref, SUM(_sample_interval) AS count FROM ${AE_DATASET} WHERE ${where} AND blob5 != '' GROUP BY ref ORDER BY count DESC LIMIT 10 FORMAT JSON`
}

/**
 * GraphQL request for the Web Analytics totals of one site in the window
 * (filtered by site tag when known, else by request host).
 * @param {{ accountId: string }} cf
 * @param {{ start: Date, end: Date }} window
 * @param {{ host: string, siteTag?: string }} site
 * @returns {{ query: string, variables: Record<string, string> }}
 */
export function rumRequest(cf, window, site) {
  const siteField = site.siteTag ? "siteTag" : "requestHost"
  const query = `query Rum($accountTag: string!, $start: Time!, $end: Time!, $site: string!) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      rumPageloadEventsAdaptiveGroups(
        limit: 1
        filter: { AND: [{ datetime_geq: $start, datetime_lt: $end }, { ${siteField}: $site }] }
      ) {
        count
        sum { visits }
      }
    }
  }
}`
  return {
    query,
    variables: {
      accountTag: cf.accountId,
      start: window.start.toISOString(),
      end: window.end.toISOString(),
      site: site.siteTag || site.host,
    },
  }
}

/**
 * Format a number for the report, or n/d.
 * @param {number | null | undefined} value
 */
export function fmt(value) {
  return typeof value === "number" && Number.isFinite(value) ? value.toLocaleString("en-US") : NA
}

/** Markdown-safe table cell. */
function cell(/** @type {unknown} */ value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ")
}

/**
 * @param {string[]} headers
 * @param {(string | number)[][]} rows
 */
export function markdownTable(headers, rows) {
  const line = (/** @type {unknown[]} */ cells) => `| ${cells.map(cell).join(" | ")} |`
  return [line(headers), line(headers.map(() => "---")), ...rows.map(line)].join("\n")
}

/**
 * @typedef {object} ReportData
 * @property {string} window - label of the reporting window
 * @property {{ stars: number, forks: number } | null} repo
 * @property {{ count: number, uniques: number } | null} views
 * @property {{ count: number, uniques: number } | null} clones
 * @property {{ visits: number, pageviews: number } | null} web
 * @property {[string, number][] | null} events
 * @property {[string, number][] | null} refs
 * @property {{ repo: string, host: string }} meta
 */

/**
 * The whole Markdown report.
 * @param {ReportData} d
 */
export function formatReport(d) {
  const out = [`# CheckCG weekly stats (${d.window})`, ""]

  out.push(`## GitHub (${d.meta.repo})`, "")
  out.push(
    markdownTable(
      ["Metric", "Total", "Uniques"],
      [
        ["Stars", fmt(d.repo?.stars), ""],
        ["Forks", fmt(d.repo?.forks), ""],
        ["Views (7 d)", fmt(d.views?.count), fmt(d.views?.uniques)],
        ["Clones (7 d)", fmt(d.clones?.count), fmt(d.clones?.uniques)],
      ]
    ),
    "",
    "_Uniques are summed per day._",
    ""
  )

  out.push(`## Web Analytics (${d.meta.host})`, "")
  out.push(
    markdownTable(
      ["Metric", "7 d"],
      [
        ["Visits", fmt(d.web?.visits)],
        ["Page views", fmt(d.web?.pageviews)],
      ]
    ),
    ""
  )

  out.push(`## Events (${AE_DATASET})`, "")
  if (!d.events) out.push(NA)
  else if (d.events.length === 0) out.push("_No events._")
  else
    out.push(
      markdownTable(
        ["Event", "Count"],
        d.events.map(([k, v]) => [k, fmt(v)])
      )
    )
  out.push("")

  out.push("### Top refs", "")
  if (!d.refs) out.push(NA)
  else if (d.refs.length === 0) out.push("_No refs._")
  else
    out.push(
      markdownTable(
        ["Ref", "Events"],
        d.refs.map(([k, v]) => [k, fmt(v)])
      )
    )
  out.push("")

  return out.join("\n")
}

// ---------------------------------------------------------------------------
// Fetchers (network; each resolves to null on any failure)
// ---------------------------------------------------------------------------

/**
 * @param {string} url
 * @param {RequestInit} [init]
 * @returns {Promise<any>} parsed JSON or null
 */
async function fetchJson(url, init = {}) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) })
      if (!response.ok) {
        // status only: never echo headers or bodies (they may reflect the token)
        warn(`${new URL(url).host}${new URL(url).pathname} -> HTTP ${response.status}`)
        if (response.status < 500) return null
        continue
      }
      return await response.json()
    } catch (error) {
      warn(`${new URL(url).host} -> ${error instanceof Error ? error.name : "error"}`)
    }
  }
  return null
}

/** Diagnostics go to stderr so they don't end up in the summary. */
function warn(/** @type {string} */ message) {
  process.stderr.write(`[stats] ${message}\n`)
}

/**
 * @param {string} repo
 * @param {string | undefined} token
 * @param {Date} since
 */
async function github(repo, token, since) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "checkcg-stats",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  const base = `https://api.github.com/repos/${repo}`
  const [info, views, clones] = await Promise.all([
    fetchJson(base, { headers }),
    token ? fetchJson(`${base}/traffic/views`, { headers }) : null,
    token ? fetchJson(`${base}/traffic/clones`, { headers }) : null,
  ])
  return {
    repo: info ? { stars: info.stargazers_count, forks: info.forks_count } : null,
    views: views ? sumTraffic(views.views, since) : null,
    clones: clones ? sumTraffic(clones.clones, since) : null,
  }
}

/**
 * @param {{ token?: string, accountId?: string }} cf
 * @param {{ start: Date, end: Date }} window
 * @param {{ host: string, siteTag?: string }} site
 */
async function webAnalytics(cf, window, site) {
  if (!cf.token || !cf.accountId) return null
  const body = await fetchJson("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${cf.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(rumRequest({ accountId: cf.accountId }, window, site)),
  })
  const totals = rumTotals(body)
  if (body && !totals) {
    const message = String(body.errors?.[0]?.message ?? "unexpected response").slice(0, 200)
    warn(`Web Analytics GraphQL: ${message}`)
  }
  return totals
}

/**
 * @param {{ token?: string, accountId?: string }} cf
 * @param {string} sql
 * @param {string} labelKey
 */
async function analyticsEngine(cf, sql, labelKey) {
  if (!cf.token || !cf.accountId) return null
  const body = await fetchJson(
    `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(cf.accountId)}/analytics_engine/sql`,
    { method: "POST", headers: { Authorization: `Bearer ${cf.token}` }, body: sql }
  )
  return sqlRows(body, labelKey)
}

export async function main(env = process.env, now = new Date()) {
  const window = reportWindow(now)
  const repo = env.STATS_GITHUB_REPO || "PabloAlaniz/wb-aviation"
  const host = env.STATS_SITE_HOST || "checkcg.com"
  const cf = { token: env.CLOUDFLARE_API_TOKEN, accountId: env.CLOUDFLARE_ACCOUNT_ID }
  const site = { host, siteTag: env.CLOUDFLARE_WEB_ANALYTICS_SITE_TAG || undefined }

  if (!env.GITHUB_TOKEN) warn("GITHUB_TOKEN not set: GitHub traffic will be n/d")
  if (!cf.token || !cf.accountId) warn("Cloudflare credentials not set: CF sections will be n/d")

  const [gh, web, events, refs] = await Promise.all([
    github(repo, env.GITHUB_TOKEN, window.start),
    webAnalytics(cf, window, site),
    analyticsEngine(cf, eventsSql("events"), "event"),
    analyticsEngine(cf, eventsSql("refs"), "ref"),
  ])

  return formatReport({ window: window.label, ...gh, web, events, refs, meta: { repo, host } })
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.stdout.write(`${await main()}\n`)
}
