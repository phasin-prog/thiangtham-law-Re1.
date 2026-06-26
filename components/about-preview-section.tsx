'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/container'
import { officeInfo } from '@/lib/data/office'
import { useTranslation, getLocalePath } from '@/lib/i18n'

export function AboutPreviewSection() {
  const { locale, t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-ivory py-24 md:py-32">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 hidden size-80 rounded-full bg-gold/5 blur-2xl lg:block" />
      <div className="absolute -bottom-24 -left-24 hidden size-80 rounded-full bg-navy-soft blur-2xl lg:block" />

      <Container>
        <div className="grid items-start gap-16 lg:grid-cols-12">
          <div data-motion-reveal="" className="lg:col-span-7">
            <div className="relative">
              <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-ink">
                {t('ก่อตั้งเมื่อปี พ.ศ. 2550', 'Established in 2007')}
              </span>
              <h2 className="mt-6 font-serif text-4xl font-bold leading-[1.1] text-primary md:text-5xl lg:text-6xl">
                {t(
                  'ดูแลปัญหากฎหมายด้วยข้อเท็จจริง และแนวทางที่ชัดเจน',
                  'Handling legal issues with facts and clear pathways',
                )}
              </h2>
              <div className="mt-10 h-1.5 w-20 rounded-full bg-gold" />
            </div>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div className="space-y-4">
                <p className="text-lg font-bold text-primary">
                  {t('ประสบการณ์ที่เชื่อถือได้', 'Reliable Experience')}
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {t(
                    `${officeInfo.headLawyer} มีประสบการณ์เป็นทนายความมากกว่า 19 ปี พร้อมให้คำแนะนำอย่างตรงไปตรงมา`,
                    `Mr. Kasem Chimphlee has over 19 years of legal experience, providing straightforward and honest advice.`,
                  )}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg font-bold text-primary">
                  {t('ทีมงานมืออาชีพ', 'Professional Team')}
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {t(
                    `ทีมงานทนายความมากกว่า 9 คน ที่พร้อมดูแลลูกความในกระบวนการทางกฎหมายอย่างรอบคอบและเป็นระบบ`,
                    `A team of more than 9 lawyers dedicated to managing legal processes meticulously and systematically.`,
                  )}
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link
                href={getLocalePath('/about', locale)}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-md transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                {t('รู้จักสำนักงานของเรา', 'Explore Our Office')}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={getLocalePath('/contact', locale)}
                className="text-sm font-bold text-primary hover:text-gold transition-colors"
              >
                {t('ติดต่อนัดหมายปรึกษา', 'Schedule a Consultation')}
              </Link>
            </div>
          </div>

          <div data-motion-portrait="" className="lg:col-span-5">
            <div className="relative">
              {/* Image Frame */}
              <div className="relative z-10 overflow-hidden rounded-[2rem] border-8 border-white bg-primary shadow-xl">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/law-office-hero.webp"
                    alt={t('บรรยากาศสำนักงานกฎหมาย', 'Law Office Atmosphere')}
                    fill
                    quality={72}
                    className="object-cover opacity-60 mix-blend-overlay transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -left-8 z-20 w-48 rounded-2xl bg-gold p-6 text-navy shadow-lg animate-fade-up stagger-2">
                <p className="text-4xl font-black">19+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest opacity-80">{t('ปีที่ให้บริการ', 'Years of Service')}</p>
              </div>

              {/* Decorative Frame Element */}
              <div className="absolute -top-6 -right-6 -z-10 size-full rounded-[2rem] border-2 border-gold/20" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
