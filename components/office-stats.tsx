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
    <div className="grid gap-3 sm:grid-cols-2">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-gold">
              <stat.icon className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-serif text-lg font-bold text-primary">{stat.value}</p>
              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
