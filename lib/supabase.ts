import { createClient } from '@supabase/supabase-js'

function requireEnvironmentVariable(name: string, fallbackName?: string) {
  const value = process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined)
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getSupabaseAdmin() {
  const supabaseUrl = requireEnvironmentVariable('SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = requireEnvironmentVariable('SUPABASE_SERVICE_ROLE_KEY')

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
