'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpenText, Scale } from 'lucide-react'
import type {
  NavigationMenuGroup,
  ServiceMenuGroup,
} from '@/lib/data/navigation'
import { useTranslation, getLocalePath } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type SharedMenuProps = {
  id: string
  open: boolean
  onNavigate: () => void
}

export function ServicesMegaMenu({
  id,
  groups,
  open,
  onNavigate,
}: SharedMenuProps & { groups: ServiceMenuGroup[] }) {
  const { locale, t } = useTranslation()

  return (
    <div
      id={id}
      aria-hidden={!open}
      className={cn(
        'absolute inset-x-0 top-full z-50 pt-2 transition duration-200',
        open
          ? 'visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible -translate-y-1 opacity-0',
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-gold/25 bg-card text-card-foreground shadow-2xl shadow-burgundy-dark/25">
        <div className="grid divide-y divide-border xl:grid-cols-4 xl:divide-x xl:divide-y-0">
          {groups.map((group) => (
            <section key={group.title} className="p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-burgundy text-gold">
                  <Scale className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-serif text-base font-bold leading-6 text-burgundy">
                    {t(group.title, group.titleEn)}
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {t(group.description, group.descriptionEn)}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={getLocalePath(link.href, locale)}
                      onClick={onNavigate}
                      className="group/link flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-burgundy focus-visible:bg-secondary focus-visible:text-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {t(link.label, link.labelEn)}
                      <ArrowRight
                        className="size-3.5 shrink-0 text-gold opacity-0 transition group-hover/link:translate-x-0.5 group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-border bg-secondary/70 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-base font-bold text-burgundy">
            {t('ปรึกษาปัญหากฎหมายกับทีมทนายมืออาชีพ', 'Consult with a professional legal team')}
          </p>
          <Link
            href={getLocalePath('/services', locale)}
            onClick={onNavigate}
            className="inline-flex items-center gap-2 text-sm font-bold text-burgundy transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t('ดูบริการทั้งหมด', 'View All Services')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function LegalKnowledgeDropdown({
  id,
  groups,
  open,
  onNavigate,
}: SharedMenuProps & { groups: NavigationMenuGroup[] }) {
  const { locale, t } = useTranslation()

  return (
    <div
      id={id}
      aria-hidden={!open}
      className={cn(
        'absolute right-0 top-full z-50 w-[min(620px,calc(100vw-2rem))] pt-2 transition duration-200',
        open
          ? 'visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible -translate-y-1 opacity-0',
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-gold/25 bg-card text-card-foreground shadow-2xl shadow-burgundy-dark/25">
        <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-border">
          {groups.map((group) => (
            <section key={group.title} className="p-5">
              <div className="flex items-center gap-2">
                <BookOpenText className="size-5 text-gold" aria-hidden="true" />
                <h2 className="font-serif text-lg font-bold text-burgundy">
                  {t(group.title, group.titleEn)}
                </h2>
              </div>
              <ul className="mt-3 space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={getLocalePath(link.href, locale)}
                      onClick={onNavigate}
                      className="flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-burgundy focus-visible:bg-secondary focus-visible:text-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {t(link.label, link.labelEn)}
                      <ArrowRight className="size-3.5 text-gold" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="flex justify-end border-t border-border bg-secondary/70 px-5 py-3">
          <Link
            href={getLocalePath('/legal-knowledge', locale)}
            onClick={onNavigate}
            className="inline-flex items-center gap-2 text-sm font-bold text-burgundy transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t('ดูบทความทั้งหมด', 'View All Articles')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

