import { NextResponse } from 'next/server'
import { authenticate, createTokenForUser } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) return NextResponse.json({ error: 'missing_fields' }, { status: 400 })

    const user = authenticate(username, password)
    if (!user) return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 })

    const token = createTokenForUser(user)
    const res = NextResponse.json({ ok: true, user: { id: user.id, username: user.username, name: user.name, role: user.role } })
    res.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return res
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'server_error' }, { status: 500 })
  }
}
