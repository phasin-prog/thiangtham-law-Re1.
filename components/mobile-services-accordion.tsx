'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import type {
  NavigationMenuGroup,
  ServiceMenuGroup,
} from '@/lib/data/navigation'
import { useTranslation, getLocalePath } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function MobileNavigationAccordion({
  id,
  label,
  href,
  groups,
  active,
  onNavigate,
}: {
  id: string
  label: string
  href: string
  groups: Array<ServiceMenuGroup | NavigationMenuGroup>
  active: boolean
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)
  const { locale, t } = useTranslation()

  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex w-full items-center justify-between px-3 py-3 text-left text-sm font-semibold transition hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
          active ? 'bg-secondary/40 text-primary font-bold' : 'text-foreground/90',
        )}
        aria-expanded={open}
        aria-controls={id}
      >
        {label}
        <ChevronDown
          className={cn('size-4 text-gold transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={id} className="space-y-5 bg-ivory/50 px-3 pb-5 pt-2">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="px-2 text-[10px] font-bold uppercase tracking-widest text-gold-ink/80">
                {t(group.title, group.titleEn)}
              </h2>
              <ul className="mt-2 grid gap-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={getLocalePath(link.href, locale)}
                      onClick={onNavigate}
                      className="block rounded-md px-3 py-2 text-sm leading-tight text-foreground/80 transition hover:bg-gold/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {t(link.label, link.labelEn)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <div className="pt-1">
            <Link
              href={getLocalePath(href, locale)}
              onClick={onNavigate}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary/5 px-3 py-2 text-xs font-bold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {t('ดูภาพรวมทั้งหมด', 'View Overview')}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
  )
}
