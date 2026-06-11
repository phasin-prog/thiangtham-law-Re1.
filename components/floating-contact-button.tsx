'use client'

import {
  Mail,
  MessageCircle,
  Phone,
  Share2,
} from 'lucide-react'
import { officeContact } from '@/lib/data/office'
import { useTranslation } from '@/lib/i18n'

export function FloatingContactButton() {
  const { t } = useTranslation()

  const desktopContacts = [
    {
      label: t('โทร', 'Call'),
      href: `tel:${officeContact.phones[0].replace(/-/g, '')}`,
      icon: Phone,
    },
    {
      label: 'Line',
      href: `https://line.me/R/ti/p/~${officeContact.line}`,
      icon: MessageCircle,
      external: true,
    },
    {
      label: 'Facebook',
      href: officeContact.facebookUrl,
      icon: Share2,
      external: true,
    },
    {
      label: t('อีเมล', 'Email'),
      href: `mailto:${officeContact.email}`,
      icon: Mail,
    },
  ]

  return (
    <>
      <aside
        className="fixed bottom-6 right-4 z-40 hidden flex-col items-end gap-2 lg:flex"
        aria-label={t('ช่องทางติดต่อด่วน', 'Quick Contact')}
      >
        {desktopContacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target={contact.external ? '_blank' : undefined}
            rel={contact.external ? 'noreferrer' : undefined}
            className="group flex min-h-11 items-center gap-2 rounded-full border border-gold/45 bg-primary px-3.5 py-2 text-xs font-bold text-gold shadow-lg shadow-primary-dark/20 transition hover:-translate-y-0.5 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            <contact.icon className="size-4" aria-hidden="true" />
            <span>{contact.label}</span>
          </a>
        ))}
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-4 border-t border-gold/30 bg-primary-dark px-1 pb-[env(safe-area-inset-bottom)] text-primary-foreground shadow-[0_-8px_30px_rgba(15,23,42,0.2)] lg:hidden"
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
        <a
          href={officeContact.facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-14 flex-col items-center justify-center gap-1 border-x border-white/10 text-xs font-semibold transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
        >
          <Share2 className="size-5 text-gold" aria-hidden="true" />
          Facebook
        </a>
        <a
          href={`mailto:${officeContact.email}`}
          className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-semibold transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
        >
          <Mail className="size-5 text-gold" aria-hidden="true" />
          {t('อีเมล', 'Email')}
        </a>
      </nav>
    </>
  )
}

