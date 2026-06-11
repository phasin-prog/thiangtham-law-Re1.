import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SECRET = process.env.AUTH_SECRET || 'dev_secret_change_me'

async function verifyToken(token: string) {
  try {
    const separator = token.lastIndexOf('.')
    if (separator === -1) return null

    const data = token.slice(0, separator)
    const signature = token.slice(separator + 1)
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    )
    const signatureBytes = Uint8Array.from(atob(signature), (char) => char.charCodeAt(0))
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      new TextEncoder().encode(data),
    )
    if (!valid) return null

    return JSON.parse(atob(data))
  } catch {
    return null
  }
}

function unauthorized() {
  const res = new NextResponse('Authentication required', { status: 401 })
  res.headers.set('WWW-Authenticate', 'Basic realm="Admin"')
  return res
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // protect /admin and /api/admin
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const auth = req.headers.get('authorization') || ''
    const envUser = process.env.ADMIN_USER || ''
    const envPass = process.env.ADMIN_PASS || ''

    // First try Basic Auth if configured
    if (envUser && envPass && auth.startsWith('Basic ')) {
      const b64 = auth.split(' ')[1]
      try {
        const decoded = atob(b64)
        const [user, pass] = decoded.split(':')
        if (user === envUser && pass === envPass) return NextResponse.next()
      } catch {
        // fallthrough to token check
      }
    }

    // Next try token cookie (allow staff role)
    const token = req.cookies.get('token')?.value
    if (token) {
      const payload = await verifyToken(token)
      if (payload?.role === 'staff') return NextResponse.next()
    }

    return unauthorized()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
