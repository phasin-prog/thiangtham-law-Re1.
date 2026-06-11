'use client'

import { useState, useEffect } from 'react'

type Props = {
  storageKey: string
  defaultSrc?: string
  alt?: string
  className?: string
}

export default function ImageEditable({ storageKey, defaultSrc, alt, className }: Props) {
  const [src, setSrc] = useState<string | undefined>(defaultSrc)
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setSrc(saved)
    } catch (e) {
      // ignore
    }
  }, [storageKey])

  function save() {
    try {
      localStorage.setItem(storageKey, input)
      setSrc(input)
      setEditing(false)
    } catch (e) {}
  }

  function reset() {
    try {
      localStorage.removeItem(storageKey)
      setSrc(defaultSrc)
      setEditing(false)
    } catch (e) {}
  }

  return (
    <div className={`relative ${className ?? ''}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />

      <button
        onClick={() => { setEditing((v) => !v); setInput(src ?? '') }}
        className="absolute top-2 right-2 z-10 rounded bg-white/80 px-2 py-1 text-xs"
        type="button"
      >
        ✎
      </button>

      {editing && (
        <div className="absolute inset-0 z-20 flex items-start justify-center p-4">
          <div className="w-full max-w-md rounded bg-white/95 p-3 shadow">
            <label className="block text-xs font-medium text-muted-foreground">Image URL</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-1"
            />
            <div className="mt-2 flex gap-2">
              <button onClick={save} className="rounded bg-primary px-3 py-1 text-white text-sm">Save</button>
              <button onClick={() => setEditing(false)} className="rounded border px-3 py-1 text-sm">Cancel</button>
              <button onClick={reset} className="ml-auto rounded border px-3 py-1 text-sm">Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
