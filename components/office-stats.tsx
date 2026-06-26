'use client'

import { BriefcaseBusiness, CalendarDays, Scale, UsersRound } from 'lucide-react'
import { officeInfo } from '@/lib/data/office'
import { useTranslation } from '@/lib/i18n'

export function OfficeStats() {
  const { t } = useTranslation()
  const stats = [
    {
      icon: CalendarDays,
      value: t(officeInfo.establishedYear, '2007'),
      label: t('ก่อตั้งเมื่อปี พ.ศ.', 'Established'),
    },
    {
      icon: BriefcaseBusiness,
      value: t(officeInfo.headLawyerExperience, 'Over 19 years'),
      label: t('ประสบการณ์ทนายความ', 'Legal experience'),
    },
    {
      icon: UsersRound,
      value: t(officeInfo.teamSize, 'More than 9'),
      label: t('ทีมทนายพร้อมทำงาน', 'Lawyers on the team'),
    },
    {
      icon: Scale,
      value: t('หลากหลายประเภท', 'Broad coverage'),
      label: t('ให้คำปรึกษาและดำเนินคดี', 'Consultation and litigation'),
    },
  ] as const

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((stat) => (
        <article key={stat.label} className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-md">
          <div className="flex items-center gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-soft text-navy transition-colors group-hover:bg-primary group-hover:text-gold">
              <stat.icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-serif text-xl font-bold text-primary tracking-tight">{stat.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground/80">{stat.label}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
