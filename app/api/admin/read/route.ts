import { NextResponse } from 'next/server'
import { lawyers, advisors, team } from '@/lib/site-data'

export async function GET() {
  return NextResponse.json({ lawyers, advisors, team })
}
