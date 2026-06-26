'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Member } from '@/types/team'
import { getLocalizedText, getTeamProfileHref } from '../lib/team-display'

type CompactMemberCardProps = {
  member: Member
  className?: string
}

export function CompactMemberCard({ member, className }: CompactMemberCardProps) {
  const { locale } = useTranslation()
  const name = getLocalizedText(member.name, locale)
  const role = getLocalizedText(member.role, locale)

  return (
    <Link
      href={getTeamProfileHref(member.slug, locale)}
      className={cn(
        'group flex h-full items-start justify-between gap-5 rounded-xl border border-white/10 bg-white/8 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-primary',
        className,
      )}
    >
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gold">
          {role}
        </p>
        <h3 className="mt-3 font-serif text-xl font-bold text-white">
          {name}
        </h3>
      </div>
      <ArrowUpRight
        className="mt-1 size-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden="true"
      />
    </Link>
  )
}
