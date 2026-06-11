import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function unauthorized() {
  const response = new NextResponse('Authentication required', { status: 401 })
  response.headers.set('WWW-Authenticate', 'Basic realm="Admin"')
  return response
}

export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USER
  const password = process.env.ADMIN_PASS
  const authorization = request.headers.get('authorization')

  if (!username || !password || !authorization?.startsWith('Basic ')) {
    return unauthorized()
  }

  try {
    const decoded = atob(authorization.slice(6))
    const separator = decoded.indexOf(':')
    const providedUsername = separator >= 0 ? decoded.slice(0, separator) : ''
    const providedPassword = separator >= 0 ? decoded.slice(separator + 1) : ''

    if (providedUsername === username && providedPassword === password) {
      return NextResponse.next()
    }
  } catch {
    // Invalid authorization headers are denied below.
  }

  return unauthorized()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
