'use client'

import {
  MessageCircle,
  Phone,
} from 'lucide-react'
import { officeContact } from '@/lib/data/office'
import { useTranslation } from '@/lib/i18n'

export function FloatingContactButton() {
  const { t } = useTranslation()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-2 border-t border-gold/30 bg-primary-dark px-1 pb-[env(safe-area-inset-bottom)] text-primary-foreground shadow-[0_-8px_30px_rgba(15,23,42,0.2)] lg:hidden"
      aria-label={t('ติดต่อด่วนบนมือถือ', 'Mobile Quick Contact')}
    >
      <a
        href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
        className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-semibold transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
      >
        <Phone className="size-5 text-gold" aria-hidden="true" />
        {t('โทร', 'Call')}
      </a>
      <a
        href={`https://line.me/R/ti/p/~${officeContact.line}`}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-14 flex-col items-center justify-center gap-1 border-l border-white/10 text-xs font-semibold transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
      >
        <MessageCircle className="size-5 text-gold" aria-hidden="true" />
        Line
      </a>
    </nav>
  )
}
