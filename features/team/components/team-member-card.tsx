'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BriefcaseBusiness, GraduationCap, Scale } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Member } from '@/types/team'
import {
  getCardRoleSummary,
  getEducationSummary,
  getLocalizedText,
  getTeamProfileHref,
} from '../lib/team-display'

type TeamMemberCardProps = {
  member: Member
  featured?: boolean
  priority?: boolean
  className?: string
}

export function TeamMemberCard({
  member,
  featured = false,
  priority = false,
  className,
}: TeamMemberCardProps) {
  const { locale, t } = useTranslation()
  const name = getLocalizedText(member.name, locale)
  const alternateName = getLocalizedText(member.name, locale === 'en' ? 'th' : 'en')
  const role = getLocalizedText(member.role, locale)
  const educationText = getEducationSummary(member, locale)
  const roleSummary = getCardRoleSummary(member, locale)

  return (
    <Link
      href={getTeamProfileHref(member.slug, locale)}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ivory',
        featured && 'md:grid md:grid-cols-[0.9fr_1.1fr]',
        className,
      )}
    >
      <div
        className={cn(
          'relative aspect-[4/5] w-full overflow-hidden bg-secondary',
          featured && 'md:aspect-auto md:min-h-[420px]',
        )}
      >
        <Image
          src={member.avatar}
          alt={name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className={cn('flex flex-1 flex-col p-6', featured && 'md:justify-center md:p-10')}>
        <div>
          <h3
            className={cn(
              'font-serif text-xl font-bold text-primary transition-colors group-hover:text-gold-ink',
              featured && 'md:text-3xl',
            )}
          >
            {name}
          </h3>
          {alternateName && alternateName !== name && (
            <p className="mt-1 text-sm font-semibold text-primary/60">
              {alternateName}
            </p>
          )}
          <p className="mt-1 text-sm font-bold uppercase tracking-wide text-gold-ink">
            {role}
          </p>
        </div>

        {member.licenseNumber && (
          <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-bold text-primary">
            <Scale className="size-3.5 text-gold-ink" aria-hidden="true" />
            {t('ใบอนุญาตทนายความ', 'Lawyer License')} {member.licenseNumber}
          </div>
        )}

        <div className="mt-6 space-y-4 border-t border-border pt-6">
          <div className="flex items-start gap-2.5">
            <GraduationCap className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/60">
                {t('ประวัติการศึกษา', 'Education')}
              </p>
              <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                {educationText}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <BriefcaseBusiness className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/60">
                {t('บทบาทในสำนักงาน', 'Office Role')}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {roleSummary}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-8 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          <Scale className="size-3.5 text-gold-ink" aria-hidden="true" />
          <span>{t('ดูบทบาทและประวัติ', 'View role and profile')}</span>
          <div className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-12" />
        </div>
      </div>
    </Link>
  )
}
