'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/container'
import { OfficeStats } from '@/components/office-stats'
import { SectionHeading } from '@/components/section-heading'
import { officeInfo } from '@/lib/data/office'
import { useTranslation, getLocalePath } from '@/lib/i18n'

export function AboutPreviewSection() {
  const { locale, t } = useTranslation()

  return (
    <section className="bg-secondary/60 py-16 md:py-22">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[390px] overflow-hidden rounded-3xl border border-gold/25 bg-primary shadow-xl">
          <Image
            src="/law-office-hero.png"
            alt={t('บรรยากาศสำนักงานกฎหมาย', 'Law Office Atmosphere')}
            fill
            className="object-cover opacity-65"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            <p className="text-sm font-semibold text-gold">
              {t('ก่อตั้งเมื่อปี พ.ศ. 2550', 'Established in 2007')}
            </p>
            <p className="mt-2 font-serif text-2xl font-bold">
              {t(officeInfo.name, officeInfo.englishName)}
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow={t('เกี่ยวกับสำนักงาน', 'About Our Office')}
            title={t(
              'ดูแลปัญหากฎหมายด้วยข้อเท็จจริง พยานหลักฐาน และแนวทางที่ชัดเจน',
              'Handling legal issues with facts, evidence, and clear pathways',
            )}
          />
          <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
            <p>
              {t(
                `${officeInfo.name} ก่อตั้งขึ้นเมื่อปี พ.ศ. ${officeInfo.establishedYear} โดยมี ${officeInfo.headLawyer} เป็นหัวหน้าสำนักงาน`,
                `${officeInfo.englishName} was established in 2007, led by Mr. Kasem Chimphlee as the Head of Office.`,
              )}
            </p>
            <p>
              {t(
                `${officeInfo.headLawyer} มีประสบการณ์เป็นทนายความมากกว่า 19 ปี พร้อมด้วยทีมงานทนายความมากกว่า 9 คน ที่พร้อมให้คำปรึกษา รับว่าความ ดำเนินคดี และดูแลลูกความในกระบวนการทางกฎหมายอย่างรอบคอบ`,
                `Mr. Kasem Chimphlee has over 19 years of legal experience, supported by a team of more than 9 lawyers ready to provide consultation, litigation, and meticulous legal care.`,
              )}
            </p>
          </div>
          <div className="mt-7">
            <OfficeStats />
          </div>
          <Link
            href={getLocalePath('/about', locale)}
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t('อ่านเพิ่มเติมเกี่ยวกับเรา', 'Read More About Us')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
