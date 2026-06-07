import { NextResponse } from 'next/server'
import { createUser, createTokenForUser } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password, name, phone, email, role } = body
    if (!username || !password || !name || !role) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }

    if (!['customer', 'staff'].includes(role)) {
      return NextResponse.json({ error: 'invalid_role' }, { status: 400 })
    }

    const user = createUser({ username, password, name, phone, email, role })
    const token = createTokenForUser(user)

    const res = NextResponse.json({ ok: true, user: { id: user.id, username: user.username, name: user.name, role: user.role } })
    res.headers.append('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`)
    return res
  } catch (e: any) {
    if (e.message === 'username_taken') return NextResponse.json({ error: 'username_taken' }, { status: 409 })
    return NextResponse.json({ error: e.message || 'server_error' }, { status: 500 })
  }
}
