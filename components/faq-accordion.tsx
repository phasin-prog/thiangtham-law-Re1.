'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FAQAccordion({
  items,
}: {
  items: { q: string; a: string }[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-border rounded-lg border border-border bg-card">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
            >
              <span className="font-medium text-card-foreground">{item.q}</span>
              <ChevronDown
                className={cn(
                  'size-5 shrink-0 text-primary transition-transform',
                  open && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
            {open && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
