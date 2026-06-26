'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLocalePath, useTranslation } from '@/lib/i18n'

type Education = {
  degree: string
  degreeEn: string
}

type Person = {
  slug: string
  name: string
  nameEn: string
  role: string
  roleEn: string
  education?: Education[]
  image?: string
}

type PersonCardProps = {
  person: Person
  featured?: boolean
  variant?: 'lawyer' | 'advisor' | 'staff'
  index?: number
}

export function PersonCard({
  person,
  featured = false,
}: PersonCardProps) {
  const { t, locale } = useTranslation()

  const name = t(person.name, person.nameEn)
  const role = t(person.role, person.roleEn)
  const highestEdu = person.education?.[person.education.length - 1]
  const eduText = highestEdu ? t(highestEdu.degree, highestEdu.degreeEn) : null

  return (
    <Link
      href={getLocalePath(`/team/${person.slug}`, locale)}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/5',
        featured && 'md:grid md:grid-cols-[0.9fr_1.1fr]'
      )}
    >
      <div
        className={cn(
          'relative aspect-[4/5] w-full overflow-hidden bg-secondary',
          featured && 'md:aspect-auto md:min-h-[400px]'
        )}
      >
        <Image
          src={person.image || '/person-placeholder.svg'}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className={cn('flex flex-col p-6', featured && 'md:justify-center md:p-10')}>
        <h3 className={cn('font-serif text-xl font-bold text-primary transition-colors group-hover:text-gold-ink', featured && 'md:text-3xl')}>
          {name}
        </h3>
        <p className="mt-1 text-sm font-bold tracking-wide text-gold-ink uppercase">
          {role}
        </p>

        {eduText && (
          <div className="mt-6 flex items-start gap-2.5 border-t border-border pt-6">
            <GraduationCap className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {eduText}
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          <span>{t('ดูบทบาทและประวัติ', 'View role and profile')}</span>
          <div className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-12" />
        </div>
      </div>
    </Link>
  )
}
