import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const token = (req as any).headers.get('cookie')?.split(';').map((c: string) => c.trim()).find((c: string) => c.startsWith('token=')) || ''
    const value = token ? token.split('=')[1] : null
    if (!value) return NextResponse.json({ user: null })
    const payload = verifyToken(value)
    if (!payload) return NextResponse.json({ user: null })
    return NextResponse.json({ user: payload })
  } catch (e: any) {
    return NextResponse.json({ user: null })
  }
}
