import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAdminAuthorized } from '@/lib/admin-auth'
import { getClientIdentifier } from '@/lib/security/request'
import {
  clearRateLimit,
  consumeRateLimit,
} from '@/lib/security/rate-limit'

const adminAttemptLimit = 10
const adminAttemptWindowMs = 15 * 60 * 1000

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'WWW-Authenticate': 'Basic realm="Admin"',
    },
  })
}

export function proxy(request: NextRequest) {
  const rateLimitKey = `admin-auth:${getClientIdentifier(request)}`

  if (isAdminAuthorized(request)) {
    clearRateLimit(rateLimitKey)
    return NextResponse.next()
  }

  const rateLimit = consumeRateLimit(
    rateLimitKey,
    adminAttemptLimit,
    adminAttemptWindowMs,
  )
  if (!rateLimit.allowed) {
    return new NextResponse('Too many authentication attempts', {
      status: 429,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Retry-After': String(rateLimit.retryAfterSeconds),
      },
    })
  }

  return unauthorized()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
