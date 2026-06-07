import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

function unauthorized() {
  const res = new NextResponse('Authentication required', { status: 401 })
  res.headers.set('WWW-Authenticate', 'Basic realm="Admin"')
  return res
}

export function middleware(req: NextRequest) {
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
        const decoded = (typeof atob === 'function')
          ? atob(b64)
          : Buffer.from(b64, 'base64').toString('utf8')
        const [user, pass] = decoded.split(':')
        if (user === envUser && pass === envPass) return NextResponse.next()
      } catch (e) {
        // fallthrough to token check
      }
    }

    // Next try token cookie (allow staff role)
    const cookieHeader = req.headers.get('cookie') || ''
    const tokenCookie = cookieHeader.split(';').map((c) => c.trim()).find((c) => c.startsWith('token='))
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1]
      try {
        const payload: any = verifyToken(token)
        if (payload && payload.role === 'staff') return NextResponse.next()
      } catch (e) {
        // invalid token, fallthrough to deny
      }
    }

    return unauthorized()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
