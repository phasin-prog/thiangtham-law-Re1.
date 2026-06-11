import { NextResponse } from 'next/server'
import { createUser, createTokenForUser } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { password, name, phone, email } = body
    const username = String(body.username || email || '').trim().toLowerCase()

    if (!username || !password || !name) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }

    const user = createUser({ username, password, name, phone, email, role: 'customer' })
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
    if (e.message === 'username_taken') return NextResponse.json({ error: 'username_taken' }, { status: 409 })
    return NextResponse.json({ error: e.message || 'server_error' }, { status: 500 })
  }
}
