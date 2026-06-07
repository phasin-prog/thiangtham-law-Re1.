import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { collection, data } = body as { collection: string; data: any }

    if (!['lawyers', 'advisors', 'team'].includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'lib', 'data', `${collection}.ts`)

    const fileContent = `export const ${collection} = ${JSON.stringify(data, null, 2)}\n\nexport default ${collection}\n`

    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
