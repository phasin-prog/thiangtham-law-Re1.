import {
  adminJson,
  requireAdminRequest,
} from '@/lib/admin-auth'
import { withTimeout } from '@/lib/security/request'
import { getSupabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'
const upstreamTimeoutMs = 8_000

export async function GET(request: Request) {
  const denied = requireAdminRequest(request)
  if (denied) return denied

  try {
    const supabase = getSupabaseAdmin()
    const results = await withTimeout(
      Promise.all([
        supabase.from('lawyers').select('*').order('id'),
        supabase.from('advisors').select('*').order('id'),
        supabase.from('staff').select('*').order('id'),
        supabase.from('services').select('*').order('id'),
        supabase.from('articles').select('*').order('id'),
      ]),
      upstreamTimeoutMs,
    )
    const failed = results.find((result) => result.error)

    if (failed?.error) {
      console.error('Admin read failed', {
        code: failed.error.code,
        message: failed.error.message,
      })
      return adminJson({ error: 'Unable to load admin data' }, { status: 503 })
    }

    return adminJson({
      lawyers: results[0].data,
      advisors: results[1].data,
      staff: results[2].data,
      services: results[3].data,
      articles: results[4].data,
    })
  } catch (error) {
    console.error(
      'Admin read failed',
      error instanceof Error ? error.message : error,
    )
    return adminJson({ error: 'Unable to load admin data' }, { status: 503 })
  }
}
