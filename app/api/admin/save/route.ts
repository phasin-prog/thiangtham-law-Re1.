import {
  adminJson,
  requireAdminRequest,
} from '@/lib/admin-auth'
import { readJsonBody, withTimeout } from '@/lib/security/request'
import { getSupabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const maxRequestBytes = 2 * 1024 * 1024
const maxCollectionEntries = 500
const upstreamTimeoutMs = 8_000

const allowedFields = {
  lawyers: new Set([
    'id',
    'name',
    'role',
    'licenseNumber',
    'license_number',
    'expertise',
    'experience',
    'bio',
    'image',
  ]),
  advisors: new Set([
    'id',
    'name',
    'role',
    'workHistory',
    'work_history',
    'image',
  ]),
  staff: new Set(['id', 'name', 'role', 'duty', 'image']),
  services: new Set([
    'id',
    'slug',
    'title',
    'description',
    'overview',
    'icon',
    'topics',
    'help',
    'documentsToPrepare',
    'documents_to_prepare',
    'noteTitle',
    'note_title',
    'note',
  ]),
  articles: new Set([
    'id',
    'slug',
    'title',
    'excerpt',
    'category',
    'categoryKey',
    'category_key',
    'author',
    'date',
    'readTime',
    'read_time',
    'sections',
  ]),
} as const

type Collection = keyof typeof allowedFields

export async function POST(request: Request) {
  const denied = requireAdminRequest(request, { sameOrigin: true })
  if (denied) return denied

  const bodyResult = await readJsonBody(request, maxRequestBytes)
  if (!bodyResult.ok) {
    return adminJson({ error: bodyResult.code }, { status: bodyResult.status })
  }

  if (
    !bodyResult.value ||
    typeof bodyResult.value !== 'object' ||
    Array.isArray(bodyResult.value)
  ) {
    return adminJson({ error: 'Invalid payload' }, { status: 400 })
  }

  const { collection, data } = bodyResult.value as {
    collection?: unknown
    data?: unknown
  }
  if (
    typeof collection !== 'string' ||
    !(collection in allowedFields) ||
    !Array.isArray(data) ||
    data.length > maxCollectionEntries
  ) {
    return adminJson({ error: 'Invalid payload' }, { status: 400 })
  }

  try {
    const typedCollection = collection as Collection
    const fields = allowedFields[typedCollection] as ReadonlySet<string>
    const mappedData = data.map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        throw new Error('Collection entries must be objects')
      }

      const entries = Object.entries(item)
      if (entries.some(([key]) => !fields.has(key))) {
        throw new Error('Collection entry contains an unsupported field')
      }

      const newItem: Record<string, unknown> = Object.fromEntries(entries)
      if (!newItem.id) delete newItem.id

      if (newItem.licenseNumber) {
        newItem.license_number = newItem.licenseNumber
        delete newItem.licenseNumber
      }
      if (newItem.workHistory) {
        newItem.work_history = newItem.workHistory
        delete newItem.workHistory
      }
      if (newItem.documentsToPrepare) {
        newItem.documents_to_prepare = newItem.documentsToPrepare
        delete newItem.documentsToPrepare
      }
      if (newItem.noteTitle) {
        newItem.note_title = newItem.noteTitle
        delete newItem.noteTitle
      }
      if (newItem.readTime) {
        newItem.read_time = newItem.readTime
        delete newItem.readTime
      }
      if (newItem.categoryKey) {
        newItem.category_key = newItem.categoryKey
        delete newItem.categoryKey
      }

      return newItem
    })

    const supabase = getSupabaseAdmin()
    const { error: deleteError } = await withTimeout(
      supabase
        .from(typedCollection)
        .delete()
        .not('id', 'is', null),
      upstreamTimeoutMs,
    )
    if (deleteError) throw deleteError

    if (mappedData.length > 0) {
      const { error: insertError } = await withTimeout(
        supabase
          .from(typedCollection)
          .insert(mappedData),
        upstreamTimeoutMs,
      )
      if (insertError) throw insertError
    }

    return adminJson({ ok: true })
  } catch (error) {
    console.error(
      'Admin save failed',
      error instanceof Error ? error.message : error,
    )
    return adminJson({ error: 'Unable to save admin data' }, { status: 400 })
  }
}
