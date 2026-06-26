import { createClient } from '@supabase/supabase-js'

function requireEnvironmentVariable(name: string, fallbackName?: string) {
  const value = process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined)
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getSupabaseAdmin() {
  const supabaseUrl = requireEnvironmentVariable('SUPABASE_URL')
  const secretKey =
    process.env.SUPABASE_SERVICE_SECRET ??
    process.env.SUPABASE_SECRET_KEY ??
    requireEnvironmentVariable('SUPABASE_SERVICE_ROLE_KEY')

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
