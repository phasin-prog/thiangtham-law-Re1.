import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const [
      { data: lawyers },
      { data: advisors },
      { data: staff },
      { data: services },
      { data: articles }
    ] = await Promise.all([
      supabase.from('lawyers').select('*').order('id'),
      supabase.from('advisors').select('*').order('id'),
      supabase.from('staff').select('*').order('id'),
      supabase.from('services').select('*').order('id'),
      supabase.from('articles').select('*').order('id')
    ])

    return NextResponse.json({
      lawyers,
      advisors,
      staff,
      services,
      articles
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
