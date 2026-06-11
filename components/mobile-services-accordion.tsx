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
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-semibold transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
          active ? 'text-gold' : 'text-foreground/90',
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
        <div id={id} className="space-y-4 px-3 pb-4">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="px-2 text-xs font-bold uppercase tracking-wider text-gold">
                {t(group.title, group.titleEn)}
              </h2>
              <ul className="mt-1 grid gap-0.5 sm:grid-cols-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={getLocalePath(link.href, locale)}
                      onClick={onNavigate}
                      className="block rounded-md px-2 py-2 text-sm leading-6 text-foreground/75 transition hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {t(link.label, link.labelEn)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <Link
            href={getLocalePath(href, locale)}
            onClick={onNavigate}
            className="inline-flex rounded px-2 py-2 text-sm font-bold text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t('ดูภาพรวมทั้งหมด', 'View Overview')}
          </Link>
        </div>
      )}
    </div>
  )
}
