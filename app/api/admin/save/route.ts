import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json()
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { collection, data } = body as {
      collection?: unknown
      data?: unknown
    }

    if (
      typeof collection !== 'string' ||
      !['lawyers', 'advisors', 'team'].includes(collection) ||
      !Array.isArray(data)
    ) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 })
    }

    const fileName = collection === 'team' ? 'staff' : collection
    const filePath = path.join(process.cwd(), 'lib', 'data', `${fileName}.ts`)

    const fileContent = `export const ${collection} = ${JSON.stringify(data, null, 2)}\n\nexport default ${collection}\n`

    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
