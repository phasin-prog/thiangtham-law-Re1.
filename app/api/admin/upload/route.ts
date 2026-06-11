import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json()
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Missing filename or content' }, { status: 400 })
    }

    const { filename, content } = body as { filename?: unknown; content?: unknown }
    if (typeof filename !== 'string' || typeof content !== 'string') {
      return NextResponse.json({ error: 'Missing filename or content' }, { status: 400 })
    }

    const dataUrlMatch = content.match(/^data:(image\/(?:png|jpeg|webp|gif));base64,(.+)$/)
    if (!dataUrlMatch) {
      return NextResponse.json({ error: 'Unsupported image format' }, { status: 400 })
    }

    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    const [, contentType, base64] = dataUrlMatch
    const buffer = Buffer.from(base64, 'base64')
    if (buffer.byteLength > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image exceeds 5 MB' }, { status: 413 })
    }

    const supabase = getSupabaseAdmin()

    const { error } = await supabase.storage
      .from('uploads')
      .upload(safeFilename, buffer, {
        contentType,
        upsert: true,
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(safeFilename)

    return NextResponse.json({ ok: true, url: publicUrl })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
