import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const value = req.cookies.get('token')?.value
    if (!value) return NextResponse.json({ user: null })
    const payload = verifyToken(value)
    if (!payload) return NextResponse.json({ user: null })
    return NextResponse.json({ user: payload })
  } catch (e: any) {
    return NextResponse.json({ user: null })
  }
}
