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
      title: t('ที่ปรึกษา', 'Advisors'),
      description: t(
        'ให้คำปรึกษาด้านเอกสาร สัญญา และแนวทางดำเนินคดี',
        'Providing guidance on documents, contracts, and case strategy.',
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
    <section className="py-24 md:py-32 bg-white">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div data-motion-reveal="">
            <SectionHeading
              title={t('ทนายความ ที่ปรึกษา และทีมงาน', 'Lawyers, Advisors & Team')}
              description={t(
                `นำโดยนายเกษม ฉิมพลี หัวหน้าสำนักงาน ผู้มีประสบการณ์เป็นทนายความมากกว่า 19 ปี พร้อมทีมงานทนายความมากกว่า 9 คน ที่พร้อมให้คำปรึกษาและดำเนินคดีอย่างเป็นระบบ`,
                `Led by Mr. Kasem Chimphlee, Head of Office with over 19 years of experience, and a team of more than 9 lawyers ready for systematic legal action.`,
              )}
            />

            <div className="mt-12 flex flex-col gap-6">
              {teamPreviewCards.slice(1).map((card) => (
                <div key={card.title} className="group flex items-center gap-6 rounded-2xl border border-transparent p-4 transition-all hover:bg-navy-soft hover:border-gold/20">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-gold shadow-lg transition-transform group-hover:-rotate-3">
                    <card.icon className="size-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-primary">{card.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href={getLocalePath('/team', locale)}
                className="group inline-flex items-center gap-2 text-sm font-bold text-primary"
              >
                <span className="border-b-2 border-gold pb-1 transition-colors group-hover:text-gold">{t('ดูทีมงานของเราทั้งหมด', 'View Full Team')}</span>
                <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div data-motion-reveal="">
            <div
              data-motion-depth=""
              className="relative overflow-hidden rounded-3xl bg-primary p-12 text-white shadow-2xl"
            >
              <div className="absolute top-0 right-0 size-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative">
                <div className="flex size-20 items-center justify-center rounded-2xl bg-gold text-navy shadow-xl">
                  <BriefcaseBusiness className="size-10" />
                </div>
                <h3 className="mt-8 font-serif text-3xl font-bold leading-tight">
                  {teamPreviewCards[0].title}
                </h3>
                <div className="mt-6 h-1 w-12 bg-gold" />
                <p className="mt-8 text-xl leading-relaxed text-white/80">
                  {teamPreviewCards[0].description}
                </p>
                <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                  <div>
                    <p className="text-3xl font-black text-gold">19+</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">{t('ปีที่ว่าความ', 'Years Exp')}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gold">9+</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">{t('ทนายความในทีม', 'Team Size')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
