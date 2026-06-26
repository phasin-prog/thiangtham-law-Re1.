'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Activity,
  BarChart3,
  Clock,
  Eye,
  RefreshCw,
  Users,
} from 'lucide-react'

type AnalyticsSummary = {
  activeUsers: number
  totalVisitors: number
  totalPageViews: number
  activeWindowMinutes: number
  topPages: Array<{
    path: string
    views: number
    lastViewedAt: string
  }>
  recentVisits: Array<{
    path: string
    locale: string
    viewedAt: string
    session: string
  }>
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

async function fetchAnalyticsSummary(signal?: AbortSignal) {
  const response = await fetch('/api/admin/analytics', {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error('Unable to load analytics data.')
  }

  return (await response.json()) as AnalyticsSummary
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Activity
  label: string
  value: string
  detail: string
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-bold tabular-nums text-primary">
            {value}
          </p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{detail}</p>
    </section>
  )
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)

  const maxPageViews = useMemo(
    () => Math.max(...(data?.topPages.map((page) => page.views) ?? [0]), 1),
    [data],
  )

  const loadAnalytics = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true)
      setError('')
    }

    try {
      setData(await fetchAnalyticsSummary())
      setLastUpdatedAt(new Date())
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Unable to load analytics data.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false

    fetchAnalyticsSummary(controller.signal)
      .then((summary) => {
        if (cancelled) return
        setData(summary)
        setLastUpdatedAt(new Date())
      })
      .catch((loadError) => {
        if (cancelled || controller.signal.aborted) return
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load analytics data.',
        )
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Private admin
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-primary">
              Website analytics
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Analytics starts from deployment of this system. It uses anonymous
              session IDs and does not store real IP addresses.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {lastUpdatedAt ? (
              <p className="text-sm text-muted-foreground">
                Updated {lastUpdatedAt.toLocaleTimeString()}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => {
                void loadAnalytics()
              }}
              disabled={loading}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`size-4 ${loading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              Refresh data
            </button>
          </div>
        </header>

        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive">
            {error}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={Activity}
            label="Active users now"
            value={data ? formatNumber(data.activeUsers) : '...'}
            detail={`Sessions seen in the last ${
              data?.activeWindowMinutes ?? 5
            } minutes.`}
          />
          <StatCard
            icon={Users}
            label="Total visitors"
            value={data ? formatNumber(data.totalVisitors) : '...'}
            detail="Unique anonymous session IDs recorded."
          />
          <StatCard
            icon={Eye}
            label="Total page views"
            value={data ? formatNumber(data.totalPageViews) : '...'}
            detail="All tracked public-route page views."
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <BarChart3 className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-primary">Top pages</h2>
            </div>
            <div className="divide-y divide-border">
              {data?.topPages.length ? (
                data.topPages.map((page) => (
                  <div key={page.path} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {page.path}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Last viewed {formatDate(page.lastViewedAt)}
                        </p>
                      </div>
                      <p className="text-sm font-bold tabular-nums text-primary">
                        {formatNumber(page.views)}
                      </p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gold"
                        style={{
                          width: `${Math.max(
                            (page.views / maxPageViews) * 100,
                            3,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="px-5 py-8 text-sm text-muted-foreground">
                  No page views recorded yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Clock className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-primary">
                Recent visits
              </h2>
            </div>
            <div className="divide-y divide-border">
              {data?.recentVisits.length ? (
                data.recentVisits.map((visit) => (
                  <div
                    key={`${visit.viewedAt}-${visit.session}-${visit.path}`}
                    className="grid gap-2 px-5 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 truncate text-sm font-semibold text-foreground">
                        {visit.path}
                      </p>
                      <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                        {visit.locale}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>{formatDate(visit.viewedAt)}</span>
                      <span>Session {visit.session}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="px-5 py-8 text-sm text-muted-foreground">
                  No recent visits recorded yet.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
