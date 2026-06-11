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
    <section className="bg-primary py-14 text-primary-foreground md:py-18">
      <Container>
        <div className="grid items-center gap-8 rounded-3xl border border-gold/30 bg-primary-dark/60 p-7 md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
              <ShieldCheck className="size-4" aria-hidden="true" />
              {t('รักษาความลับและประเมินจากข้อมูลจริง', 'Confidential and fact-based assessment')}
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-white md:text-3xl">{resolvedTitle}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-primary-foreground/80">{resolvedDescription}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={`https://line.me/R/ti/p/~${officeContact.line}`}
              target="_blank"
              rel="noreferrer"
              className="motion-action inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-primary-dark hover:bg-gold-soft"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {t('ปรึกษาผ่าน Line', 'Consult via Line')}
            </a>
            <a
              href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
              className="motion-action inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 px-6 py-3 text-sm font-bold text-white hover:border-gold hover:text-gold"
            >
              <Phone className="size-4" aria-hidden="true" />
              {t('โทรหาเรา', 'Call Us')}
            </a>
            <Link
              href={getLocalePath('/consultation', locale)}
              className="inline-flex items-center justify-center gap-2 text-sm font-bold text-gold transition hover:text-white"
            >
              {t('ติดต่อสำนักงาน', 'Contact the Office')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
