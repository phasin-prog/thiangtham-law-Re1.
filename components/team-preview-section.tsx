'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  ClipboardCheck,
  MessageSquareText,
  Scale,
} from 'lucide-react'
import { Container } from '@/components/container'
import { SectionHeading } from '@/components/section-heading'
import { officeInfo } from '@/lib/data/office'
import { useTranslation, getLocalePath } from '@/lib/i18n'

export function TeamPreviewSection() {
  const { locale, t } = useTranslation()

  const teamPreviewCards = [
    {
      icon: BriefcaseBusiness,
      title: t('หัวหน้าสำนักงาน', 'Head of Office'),
      description: t(
        `${officeInfo.headLawyer} ประสบการณ์เป็นทนายความมากกว่า 19 ปี`,
        `Mr. Kasem Chimphlee, over 19 years of legal experience.`,
      ),
    },
    {
      icon: Scale,
      title: t('ทีมทนายความ', 'Legal Team'),
      description: t(
        'ทีมงานทนายความมากกว่า 9 คน พร้อมให้คำปรึกษาและดำเนินคดี',
        'A team of more than 9 lawyers ready for consultation and litigation.',
      ),
    },
    {
      icon: MessageSquareText,
      title: t('ที่ปรึกษากฎหมาย', 'Legal Advisors'),
      description: t(
        'ให้คำปรึกษาด้านข้อกฎหมาย เอกสาร สัญญา และแนวทางดำเนินคดี',
        'Providing legal advice on documents, contracts, and case strategy.',
      ),
    },
    {
      icon: ClipboardCheck,
      title: t('ทีมประสานงานคดี', 'Case Coordination Team'),
      description: t(
        'ดูแลนัดหมาย เอกสาร การติดตามขั้นตอน และการประสานงานกับลูกความ',
        'Managing appointments, documents, process tracking, and client coordination.',
      ),
    },
  ] as const

  return (
    <section className="py-16 md:py-22">
      <Container>
        <SectionHeading
          align="center"
          eyebrow={t('Lawyers, Advisors & Legal Team', 'Lawyers, Advisors & Legal Team')}
          title={t('ทนายความ ที่ปรึกษา และทีมงาน', 'Lawyers, Advisors & Team')}
          description={t(
            `นำโดยนายเกษม ฉิมพลี หัวหน้าสำนักงาน ผู้มีประสบการณ์เป็นทนายความมากกว่า 19 ปี พร้อมทีมงานทนายความมากกว่า 9 คน ที่พร้อมให้คำปรึกษาและดำเนินคดีอย่างเป็นระบบ`,
            `Led by Mr. Kasem Chimphlee, Head of Office with over 19 years of experience, and a team of more than 9 lawyers ready for systematic legal action.`,
          )}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamPreviewCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-burgundy text-gold">
                <card.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-bold text-burgundy">{card.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{card.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={getLocalePath('/team', locale)}
            className="inline-flex items-center gap-2 rounded-lg border border-burgundy px-5 py-3 text-sm font-bold text-burgundy transition hover:bg-burgundy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t('ดูทีมงานของเรา', 'View Our Team')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
