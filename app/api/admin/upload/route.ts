import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { filename, content } = body as { filename: string; content: string }

    if (!filename || !content) {
      return NextResponse.json({ error: 'Missing filename or content' }, { status: 400 })
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

    // content may be a data URL or raw base64
    let base64 = content
    const match = content.match(/data:.*;base64,(.*)/)
    if (match) base64 = match[1]

    const filePath = path.join(uploadsDir, filename)
    fs.writeFileSync(filePath, Buffer.from(base64, 'base64'))

    const publicUrl = `/uploads/${filename}`
    return NextResponse.json({ ok: true, url: publicUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
