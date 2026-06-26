import {
  adminJson,
  requireAdminRequest,
} from '@/lib/admin-auth'
import { withTimeout } from '@/lib/security/request'
import { getSupabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const activeWindowMs = 5 * 60 * 1000
const upstreamTimeoutMs = 8_000

type TopPageRow = {
  path: string
  views: number | string
  last_viewed_at: string
}

type RecentVisitRow = {
  path: string
  locale: string
  viewed_at: string
  session_id: string
}

function numberFromCount(value: number | string | null | undefined) {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return Number(value)
  return 0
}

export async function GET(request: Request) {
  const denied = requireAdminRequest(request)
  if (denied) return denied

  try {
    const supabase = getSupabaseAdmin()
    const activeSince = new Date(Date.now() - activeWindowMs).toISOString()

    const [
      activeUsers,
      totalVisitors,
      totalPageViews,
      topPages,
      recentVisits,
    ] = await withTimeout(
      Promise.all([
        supabase
          .from('analytics_sessions')
          .select('session_id', { count: 'exact', head: true })
          .gte('last_seen_at', activeSince),
        supabase
          .from('analytics_sessions')
          .select('session_id', { count: 'exact', head: true }),
        supabase
          .from('analytics_page_views')
          .select('id', { count: 'exact', head: true }),
        supabase.rpc('analytics_top_pages', { row_limit: 10 }),
        supabase
          .from('analytics_page_views')
          .select('path, locale, viewed_at, session_id')
          .order('viewed_at', { ascending: false })
          .limit(20),
      ]),
      upstreamTimeoutMs,
    )

    const failed = [
      activeUsers,
      totalVisitors,
      totalPageViews,
      topPages,
      recentVisits,
    ].find((result) => result.error)

    if (failed?.error) {
      console.error('Admin analytics read failed', {
        code: failed.error.code,
        message: failed.error.message,
      })
      return adminJson(
        { error: 'Unable to load analytics data' },
        { status: 503 },
      )
    }

    return adminJson({
      activeUsers: activeUsers.count ?? 0,
      totalVisitors: totalVisitors.count ?? 0,
      totalPageViews: totalPageViews.count ?? 0,
      activeWindowMinutes: Math.round(activeWindowMs / 60_000),
      topPages: ((topPages.data ?? []) as TopPageRow[]).map((row) => ({
        path: row.path,
        views: numberFromCount(row.views),
        lastViewedAt: row.last_viewed_at,
      })),
      recentVisits: ((recentVisits.data ?? []) as RecentVisitRow[]).map((row) => ({
        path: row.path,
        locale: row.locale,
        viewedAt: row.viewed_at,
        session: row.session_id.slice(0, 8),
      })),
    })
  } catch (error) {
    console.error(
      'Admin analytics read failed',
      error instanceof Error ? error.message : error,
    )
    return adminJson(
      { error: 'Unable to load analytics data' },
      { status: 503 },
    )
  }
}
