'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/container'
import { officeContact, officeInfo } from '@/lib/data/office'
import { getLocalePath, useTranslation } from '@/lib/i18n'

const heroHighlights = [
  { th: 'ก่อตั้ง พ.ศ. 2550', en: 'Established in 2007' },
  { th: 'ประสบการณ์มากกว่า 19 ปี', en: 'Over 19 years of experience' },
  { th: 'รับว่าความทั่วราชอาณาจักร', en: 'Nationwide legal representation' },
] as const

export function HeroSection() {
  const { locale, t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0">
        <Image
          src="/law-office-hero.webp"
          alt=""
          fill
          priority
          quality={74}
          sizes="100vw"
          className="object-cover opacity-20 mix-blend-overlay"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/96 via-primary/92 to-primary/84 lg:bg-gradient-to-r lg:from-primary/97 lg:via-primary/90 lg:to-transparent" />

      <Container className="relative py-20 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/6 px-4 py-2 text-xs font-bold text-gold">
              <ShieldCheck className="size-4" aria-hidden="true" />
              {t('สำนักงานกฎหมายเที่ยงธรรมทนายความ', officeInfo.englishName)}
            </div>

            <h1 className="mt-8 text-balance font-serif text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {t('สำนักงานกฎหมายที่พิจารณาข้อเท็จจริง เอกสาร และแนวทางคดีอย่างรอบคอบ', 'Legal counsel built on facts, documents, and careful case analysis')}
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-primary-foreground/80 sm:text-xl">
              {t(
                'ให้คำปรึกษา ร่างและตรวจเอกสาร ประเมินประเด็นกฎหมาย และดำเนินงานคดีด้วยกระบวนการที่ชัดเจน รักษาความลับของลูกความ และไม่รับประกันผลคดีเกินจริง',
                'We provide consultation, document review, legal analysis, and case handling with a clear process, confidentiality, and no unrealistic promises.',
              )}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-primary-dark transition hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="size-5" aria-hidden="true" />
                {t('โทรหาเรา', 'Call Us')}
              </a>
              <a
                href={`https://line.me/R/ti/p/~${officeContact.line}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/8 px-6 py-3 text-sm font-bold text-white transition hover:border-gold hover:bg-white/12 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {t('ติดต่อผ่าน Line', 'Contact via Line')}
              </a>
              <Link
                href={getLocalePath('/services', locale)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {t('ดูบริการ', 'View Services')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroHighlights.map((item) => (
                <span
                  key={item.en}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-primary-foreground/85"
                >
                  {t(item.th, item.en)}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-6 lg:block">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-primary-dark">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/law-office-hero.webp"
                  alt={officeInfo.name}
                  fill
                  priority
                  quality={74}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                    {t('หัวหน้าสำนักงาน', 'Head Lawyer')}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-white">
                    {officeInfo.headLawyer}
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-primary-foreground/78">
                    {t(
                      'ประเมินข้อเท็จจริง วางแนวทางคดี และกำกับการทำงานของทีมอย่างเป็นระบบ',
                      'Reviews facts, frames the strategy, and coordinates the team\'s work with discipline.',
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold/80">
                  {t('ประสบการณ์', 'Experience')}
                </p>
                <p className="mt-2 text-lg font-bold text-white">{t('มากกว่า 19 ปี', '19+ years')}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold/80">
                  {t('ความลับ', 'Confidentiality')}
                </p>
                <p className="mt-2 text-lg font-bold text-white">
                  {t('รักษาความลับของลูกความ', 'Client confidentiality')}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold/80">
                  {t('ปีที่ก่อตั้ง', 'Founded')}
                </p>
                <p className="mt-2 text-lg font-bold text-white">{t('พ.ศ. 2550', '2007')}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold/80">
                  {t('พื้นที่ให้บริการ', 'Coverage')}
                </p>
                <p className="mt-2 text-lg font-bold text-white">
                  {t('ทั่วราชอาณาจักร', 'Nationwide')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
