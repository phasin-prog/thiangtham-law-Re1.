import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { consumeRateLimit } from '@/lib/security/rate-limit'
import {
  getClientIdentifier,
  isSameOriginRequest,
  readJsonBody,
  withTimeout,
} from '@/lib/security/request'

export const runtime = 'nodejs'

const maxRequestBytes = 2_000
const requestLimit = 120
const requestWindowMs = 60 * 1000
const upstreamTimeoutMs = 5_000
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const noStoreHeaders = {
  'Cache-Control': 'no-store, max-age=0',
}

function jsonResponse(
  body: unknown,
  status: number,
  headers: Record<string, string> = {},
) {
  return NextResponse.json(body, {
    status,
    headers: {
      ...noStoreHeaders,
      ...headers,
    },
  })
}

function isAllowedPath(path: string) {
  return (
    path.startsWith('/') &&
    path.length <= 500 &&
    !path.startsWith('/admin') &&
    !path.startsWith('/api') &&
    !path.startsWith('/_next') &&
    !/\.[a-z0-9]{2,8}$/i.test(path)
  )
}

function getLocale(path: string) {
  if (path === '/en' || path.startsWith('/en/')) return 'en'
  if (path === '/th' || path.startsWith('/th/')) return 'th'
  return 'unknown'
}

function hashUserAgent(request: Request) {
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const salt =
    process.env.ANALYTICS_HASH_SALT ||
    process.env.SUPABASE_SERVICE_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'analytics'

  return createHash('sha256')
    .update(salt)
    .update(':')
    .update(userAgent)
    .digest('hex')
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ ok: false, code: 'FORBIDDEN' }, 403)
  }

  const rateLimit = consumeRateLimit(
    `analytics:${getClientIdentifier(request)}`,
    requestLimit,
    requestWindowMs,
  )
  if (!rateLimit.allowed) {
    return jsonResponse(
      { ok: false, code: 'RATE_LIMITED' },
      429,
      { 'Retry-After': String(rateLimit.retryAfterSeconds) },
    )
  }

  const bodyResult = await readJsonBody(request, maxRequestBytes)
  if (!bodyResult.ok) {
    return jsonResponse(
      { ok: false, code: bodyResult.code },
      bodyResult.status,
    )
  }

  if (
    !bodyResult.value ||
    typeof bodyResult.value !== 'object' ||
    Array.isArray(bodyResult.value)
  ) {
    return jsonResponse({ ok: false, code: 'INVALID_PAYLOAD' }, 400)
  }

  const { event, path, sessionId } = bodyResult.value as {
    event?: unknown
    path?: unknown
    sessionId?: unknown
  }

  if (event !== 'pageview' && event !== 'heartbeat') {
    return jsonResponse({ ok: false, code: 'INVALID_EVENT' }, 400)
  }

  if (typeof path !== 'string' || !isAllowedPath(path)) {
    return jsonResponse({ ok: false, code: 'INVALID_PATH' }, 400)
  }

  if (typeof sessionId !== 'string' || !uuidPattern.test(sessionId)) {
    return jsonResponse({ ok: false, code: 'INVALID_SESSION_ID' }, 400)
  }

  try {
    const supabase = getSupabaseAdmin()
    const { error } = await withTimeout(
      supabase.rpc('record_analytics_event', {
        input_event: event,
        input_locale: getLocale(path),
        input_path: path,
        input_session_id: sessionId,
        input_user_agent_hash: hashUserAgent(request),
      }),
      upstreamTimeoutMs,
    )

    if (error) {
      console.error('Analytics tracking failed', {
        code: error.code,
        message: error.message,
      })
      return jsonResponse({ ok: false, code: 'TRACKING_UNAVAILABLE' }, 503)
    }

    return jsonResponse({ ok: true }, 202)
  } catch (error) {
    console.error(
      'Analytics tracking failed',
      error instanceof Error ? error.message : error,
    )
    return jsonResponse({ ok: false, code: 'TRACKING_UNAVAILABLE' }, 503)
  }
}
