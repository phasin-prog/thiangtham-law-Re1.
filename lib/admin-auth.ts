import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { consumeRateLimit } from '@/lib/security/rate-limit'
import {
  getClientIdentifier,
  isSameOriginRequest,
} from '@/lib/security/request'

const noStoreHeaders = {
  'Cache-Control': 'no-store, max-age=0',
}
const adminAuthLimit = 20
const adminAuthWindowMs = 10 * 60 * 1000

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  const compareLength = Math.max(leftBuffer.length, rightBuffer.length, 1)
  const paddedLeft = Buffer.alloc(compareLength)
  const paddedRight = Buffer.alloc(compareLength)

  leftBuffer.copy(paddedLeft)
  rightBuffer.copy(paddedRight)

  return timingSafeEqual(paddedLeft, paddedRight) &&
    leftBuffer.length === rightBuffer.length
}

export function isAdminAuthorized(request: Request) {
  const username = process.env.ADMIN_USER
  const password = process.env.ADMIN_PASS
  const authorization = request.headers.get('authorization')

  if (!username || !password || !authorization?.startsWith('Basic ')) {
    return false
  }

  try {
    const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8')
    const separator = decoded.indexOf(':')
    if (separator < 0) return false

    return (
      safeEqual(decoded.slice(0, separator), username) &&
      safeEqual(decoded.slice(separator + 1), password)
    )
  } catch {
    return false
  }
}

export function requireAdminRequest(
  request: Request,
  options: { sameOrigin?: boolean } = { sameOrigin: true },
) {
  const rateLimit = consumeRateLimit(
    `admin:${getClientIdentifier(request)}`,
    adminAuthLimit,
    adminAuthWindowMs,
  )
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          ...noStoreHeaders,
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      },
    )
  }

  if (options.sameOrigin !== false && !isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403, headers: noStoreHeaders },
    )
  }

  if (!isAdminAuthorized(request)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        ...noStoreHeaders,
        'WWW-Authenticate': 'Basic realm="Admin"',
      },
    })
  }

  return null
}

export function adminJson(
  body: unknown,
  init: { status?: number } = {},
) {
  return NextResponse.json(body, {
    status: init.status,
    headers: noStoreHeaders,
  })
}
