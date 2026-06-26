'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/container'
import { officeContact } from '@/lib/data/office'
import { getLocalePath, useTranslation } from '@/lib/i18n'

export function CTASection({
  title,
  description,
}: {
  title?: string
  description?: string
}) {
  const { locale, t } = useTranslation()
  const resolvedTitle = title ?? t('ยังไม่แน่ใจว่าควรเริ่มต้นอย่างไร?', 'Not Sure Where to Start?')
  const resolvedDescription = description ?? t(
    'ส่งรายละเอียดเบื้องต้นให้ทีมงานตรวจสอบก่อน แล้วเราจะติดต่อกลับตามช่องทางที่คุณสะดวก',
    'Send us the initial details. Our team will review them and contact you through your preferred channel.',
  )

  return (
    <section className="bg-primary py-16 md:py-24 text-primary-foreground">
      <Container>
        <div className="grid items-center gap-10 rounded-xl border border-white/10 bg-primary-dark/56 p-8 shadow-xl md:grid-cols-[1.1fr_0.9fr] md:p-14 lg:p-16">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
              <ShieldCheck className="size-4" aria-hidden="true" />
              {t('รักษาความลับและประเมินจากข้อมูลจริง', 'Confidential and fact-based assessment')}
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">{resolvedTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">{resolvedDescription}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row md:flex-col lg:flex-row lg:items-center lg:justify-end">
            <div className="flex flex-col gap-3 sm:flex-1 md:flex-none">
              <a
                href={`https://line.me/R/ti/p/~${officeContact.line}`}
                target="_blank"
                rel="noreferrer"
                className="motion-action inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3 text-sm font-bold text-primary-dark shadow-md shadow-gold/10 transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {t('ปรึกษาผ่าน Line', 'Consult via Line')}
              </a>
              <a
                href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
                className="motion-action inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 py-3 text-sm font-bold text-white transition-[transform,border-color,color,background-color] duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-white/8 hover:text-gold"
              >
                <Phone className="size-5" aria-hidden="true" />
                {t('โทรหาเรา', 'Call Us')}
              </a>
            </div>
            <div className="flex flex-col items-center justify-center pt-2 sm:flex-none lg:pt-0">
              <Link
                href={getLocalePath('/consultation', locale)}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-gold transition-colors hover:text-white"
              >
                {t('ติดต่อสำนักงาน', 'Contact the Office')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
