'use client'

import Link from 'next/link'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { Container } from '@/components/container'
import { getLocalePath, useTranslation } from '@/lib/i18n'

export function ProfileCTA() {
  const { locale, t } = useTranslation()
  const teamHref = getLocalePath('/team', locale)
  const contactHref = getLocalePath('/contact', locale)

  return (
    <section className="mt-24 py-16 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[3rem] bg-primary p-10 md:p-20 text-white shadow-2xl">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 size-[400px] translate-x-1/4 -translate-y-1/4 rounded-full bg-gold/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 size-[300px] -translate-x-1/4 translate-y-1/4 rounded-full bg-white/5 blur-[80px]" />
          
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                {t('ติดต่อสำนักงาน', 'Contact thiangtham')}
              </span>
              <h2 className="mt-6 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {t('ต้องการให้สำนักงานช่วยประเมินข้อมูลเบื้องต้น?', 'Need the office to review initial information?')}
              </h2>
              <p className="mt-8 text-xl leading-relaxed text-white/70">
                {t(
                  'ติดต่อสำนักงานเพื่อส่งข้อเท็จจริงและเอกสารให้ทีมงานประสานทนายความหรือเจ้าหน้าที่ที่เกี่ยวข้อง เพื่อรับฟังแนวทางการดำเนินการเบื้องต้น',
                  'Contact the office to share facts and documents so the team can coordinate with the appropriate lawyer or staff member for initial guidance.',
                )}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href={contactHref}
                className="inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-gold px-10 text-base font-black uppercase tracking-widest text-primary-dark shadow-xl transition-all hover:-translate-y-1 hover:bg-gold-soft hover:shadow-gold/20 active:scale-95"
              >
                {t('ติดต่อสำนักงาน', 'Contact Office')}
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href={teamHref}
                className="inline-flex h-16 items-center justify-center gap-3 rounded-2xl border-2 border-white/20 px-10 text-base font-bold text-white transition-all hover:-translate-y-1 hover:border-white/40 hover:bg-white/5 active:scale-95"
              >
                {t('ดูรายชื่อทีมงาน', 'View All Team')}
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-6 border-t border-white/10 pt-16 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/5 text-gold">
                <Phone className="size-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Hotline</p>
                <p className="font-serif text-lg font-bold">082-377-2404</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/5 text-gold">
                <MessageCircle className="size-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">LINE ID</p>
                <p className="font-serif text-lg font-bold">@Kasemchimphlee</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
