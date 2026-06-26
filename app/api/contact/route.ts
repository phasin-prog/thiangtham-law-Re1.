import { NextResponse } from 'next/server'
import {
  isHoneypotSubmission,
  validateContactSubmission,
} from '@/lib/contact-submission'
import {
  getClientIdentifier,
  isSameOriginRequest,
  readJsonBody,
  withTimeout,
} from '@/lib/security/request'
import { consumeRateLimit } from '@/lib/security/rate-limit'
import { getSupabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const maxRequestBytes = 25_000
const requestLimit = 8
const requestWindowMs = 10 * 60 * 1000
const phoneLimit = 3
const phoneWindowMs = 60 * 60 * 1000
const noStoreHeaders = {
  'Cache-Control': 'no-store, max-age=0',
}
const upstreamTimeoutMs = 8_000

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

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ ok: false, code: 'FORBIDDEN' }, 403)
  }

  const rateLimit = consumeRateLimit(
    `contact:${getClientIdentifier(request)}`,
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

  // Return success for bots so the honeypot field is not disclosed.
  if (isHoneypotSubmission(bodyResult.value)) {
    return jsonResponse({ ok: true }, 201)
  }

  const result = validateContactSubmission(bodyResult.value)

  if (!result.success) {
    return jsonResponse({ ok: false, code: 'INVALID_SUBMISSION' }, 400)
  }

  try {
    const db = getSupabaseAdmin()
    const phoneWindowStart = new Date(Date.now() - phoneWindowMs).toISOString()
    const { count, error: countError } = await withTimeout(
      db
        .from('consultations')
        .select('id', { count: 'exact', head: true })
        .eq('phone', result.data.phone)
        .gte('created_at', phoneWindowStart),
      upstreamTimeoutMs,
    )

    if (countError) {
      console.error('Supabase consultation rate-limit query failed', {
        code: countError.code,
        message: countError.message,
      })
      return jsonResponse({ ok: false, code: 'SUBMISSION_UNAVAILABLE' }, 503)
    }

    if ((count ?? 0) >= phoneLimit) {
      return jsonResponse(
        { ok: false, code: 'RATE_LIMITED' },
        429,
        { 'Retry-After': String(Math.ceil(phoneWindowMs / 1000)) },
      )
    }

    const { error } = await withTimeout(
      db.from('consultations').insert({
        name: result.data.name,
        phone: result.data.phone,
        message: result.data.message,
        service: result.data.service,
        locale: result.data.locale,
        source_path: result.data.sourcePath,
      }),
      upstreamTimeoutMs,
    )

    if (error) {
      console.error('Supabase consultation insert failed', {
        code: error.code,
        message: error.message,
      })

      return jsonResponse({ ok: false, code: 'SUBMISSION_UNAVAILABLE' }, 503)
    }

    return jsonResponse({ ok: true }, 201)
  } catch (error) {
    console.error(
      'Consultation submission failed',
      error instanceof Error ? error.message : error,
    )

    return jsonResponse({ ok: false, code: 'SUBMISSION_UNAVAILABLE' }, 503)
  }
}
