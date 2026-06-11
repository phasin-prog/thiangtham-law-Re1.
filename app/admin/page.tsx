'use client'

import { useEffect, useState } from 'react'

type Collections = 'lawyers' | 'advisors' | 'staff' | 'services' | 'articles'
type AdminData = Partial<Record<Collections, unknown[]>>

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null)
  const [editing, setEditing] = useState<Collections>('lawyers')
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch('/api/admin/read')
      .then((r) => r.json())
      .then((result: AdminData) => {
        setData(result)
        setText(JSON.stringify(result.lawyers ?? [], null, 2))
      })
  }, [])

  function selectCollection(collection: Collections) {
    setEditing(collection)
    setText(JSON.stringify(data?.[collection] ?? [], null, 2))
  }

  async function save() {
    try {
      const parsed = JSON.parse(text)
      setStatus('Saving...')
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: editing, data: parsed }),
      })
      const j = await res.json()
      if (j.ok) setStatus('Saved')
      else setStatus('Error: ' + (j.error || 'unknown'))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      setStatus('JSON parse error: ' + message)
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const content = reader.result as string
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      setStatus('Uploading...')
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, content }),
      })
      const j = await res.json()
      if (j.ok) {
        setStatus('Uploaded: ' + j.url)
        // insert into JSON at first image field found
        try {
          const obj = JSON.parse(text)
          if (Array.isArray(obj)) {
            // set first item's image if exists
            if (obj[0] && typeof obj[0] === 'object') {
              obj[0].image = j.url
              setText(JSON.stringify(obj, null, 2))
            }
          }
        } catch {}
      } else setStatus('Upload error: ' + (j.error || 'unknown'))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Admin — Edit Data</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={() => selectCollection('lawyers')} className={`px-3 py-1 ${editing === 'lawyers' ? 'bg-primary text-white' : 'border'}`}>Lawyers</button>
        <button onClick={() => selectCollection('advisors')} className={`px-3 py-1 ${editing === 'advisors' ? 'bg-primary text-white' : 'border'}`}>Advisors</button>
        <button onClick={() => selectCollection('staff')} className={`px-3 py-1 ${editing === 'staff' ? 'bg-primary text-white' : 'border'}`}>Staff</button>
        <button onClick={() => selectCollection('services')} className={`px-3 py-1 ${editing === 'services' ? 'bg-primary text-white' : 'border'}`}>Services</button>
        <button onClick={() => selectCollection('articles')} className={`px-3 py-1 ${editing === 'articles' ? 'bg-primary text-white' : 'border'}`}>Articles</button>
      </div>

      <div className="mb-4 flex gap-2">
        <input type="file" onChange={handleFile} />
        <button onClick={save} className="rounded bg-primary px-3 py-1 text-white">Save to file</button>
        <div className="ml-2 text-sm">{status}</div>
      </div>

      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={20} className="w-full rounded border p-2 font-mono text-sm" />
    </div>
  )
}
