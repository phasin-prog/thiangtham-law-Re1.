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

const noStoreHeaders = {
  'Cache-Control': 'no-store, max-age=0',
}
const maxRequestBytes = 1_000
const requestLimit = 30
const requestWindowMs = 60 * 1000
const upstreamTimeoutMs = 6_000
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function jsonResponse(
  body: unknown,
  status = 200,
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

function consumeVisitorRateLimit(request: Request) {
  return consumeRateLimit(
    `visitor-counter:${getClientIdentifier(request)}`,
    requestLimit,
    requestWindowMs,
  )
}

async function readCurrentCount() {
  const db = getSupabaseAdmin()
  const { data, error } = await withTimeout(
    db
      .from('site_stats')
      .select('count')
      .eq('id', 'total_visitors')
      .single(),
    upstreamTimeoutMs,
  )

  if (error || !data || typeof data.count !== 'number') {
    throw new Error('VISITOR_COUNT_UNAVAILABLE')
  }

  return data.count
}

export async function GET(request: Request) {
  const rateLimit = consumeVisitorRateLimit(request)
  if (!rateLimit.allowed) {
    return jsonResponse(
      { ok: false, code: 'RATE_LIMITED' },
      429,
      { 'Retry-After': String(rateLimit.retryAfterSeconds) },
    )
  }

  try {
    return jsonResponse({ ok: true, count: await readCurrentCount() })
  } catch {
    return jsonResponse({ ok: false, code: 'COUNTER_UNAVAILABLE' }, 503)
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ ok: false, code: 'FORBIDDEN' }, 403)
  }

  const rateLimit = consumeVisitorRateLimit(request)
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

  const { visitorId } = bodyResult.value as { visitorId?: unknown }
  if (typeof visitorId !== 'string' || !uuidPattern.test(visitorId)) {
    return jsonResponse({ ok: false, code: 'INVALID_VISITOR_ID' }, 400)
  }

  try {
    const db = getSupabaseAdmin()
    const { error } = await withTimeout(
      db.rpc('increment_visitor_count', { vid: visitorId }),
      upstreamTimeoutMs,
    )

    if (error) {
      throw new Error('VISITOR_INCREMENT_FAILED')
    }

    return jsonResponse({ ok: true, count: await readCurrentCount() })
  } catch {
    return jsonResponse({ ok: false, code: 'COUNTER_UNAVAILABLE' }, 503)
  }
}
