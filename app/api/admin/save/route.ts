import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

const allowedCollections = new Set(['lawyers', 'advisors', 'staff', 'services', 'articles'])

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json()
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const { collection, data } = body as { collection?: unknown; data?: unknown }
    if (
      typeof collection !== 'string' ||
      !allowedCollections.has(collection) ||
      !Array.isArray(data)
    ) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    const mappedData = data.map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        throw new Error('Collection entries must be objects')
      }

      const newItem: Record<string, unknown> = { ...item }
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

      return newItem
    })

    const { error: deleteError } = await supabase
      .from(collection)
      .delete()
      .not('id', 'is', null)
    if (deleteError) throw deleteError

    if (mappedData.length > 0) {
      const { error: insertError } = await supabase.from(collection).insert(mappedData)
      if (insertError) throw insertError
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
