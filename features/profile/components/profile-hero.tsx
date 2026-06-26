'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BadgeCheck, Scale } from 'lucide-react'
import { Container } from '@/components/container'
import { getLocalePath, useTranslation } from '@/lib/i18n'
import type { Member } from '@/types/team'
import { getLocalizedText } from '@/features/team'

type ProfileHeroProps = {
  member: Member
}

export function ProfileHero({ member }: ProfileHeroProps) {
  const { locale, t } = useTranslation()
  const name = getLocalizedText(member.name, locale)
  const role = getLocalizedText(member.role, locale)
  const backHref = getLocalePath('/team', locale)

  return (
    <section className="relative overflow-hidden bg-primary pb-16 pt-8 md:pb-24 md:pt-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 size-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 size-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-white/5 blur-[100px]" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:40px_40px]" />

      <Container className="relative z-10">
        <nav className="mb-12">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2.5 text-sm font-bold text-white/60 transition-colors hover:text-gold"
          >
            <div className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-gold/30 group-hover:bg-gold/10 group-hover:text-gold">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </div>
            {t('ย้อนกลับหน้าทีมงาน', 'Back to Team')}
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:items-center lg:gap-24">
          <div data-motion-portrait="" className="relative mx-auto w-full max-w-[360px] lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-8 border-white/10 bg-secondary shadow-2xl">
              <Image
                src={member.avatar}
                alt={name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge for Leaders/Lawyers */}
            {(member.category === 'leader' || member.category === 'lawyer') && (
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-gold p-5 text-primary shadow-xl md:block">
                <Scale className="size-8" />
              </div>
            )}
          </div>

          <header data-motion-reveal="" className="text-center lg:text-left">
            <div className="mb-6 inline-flex rounded-full bg-gold/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-gold border border-gold/20 backdrop-blur-sm">
              {role}
            </div>
            <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
              {name}
            </h1>
            <p className="mt-6 font-serif text-2xl text-white/40 md:text-3xl">
              {getLocalizedText(member.name, locale === 'en' ? 'th' : 'en')}
            </p>

            {member.licenseNumber && (
              <div className="mt-12 flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:justify-start lg:max-w-md">
                <div className="flex size-14 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <BadgeCheck className="size-8" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gold/60">
                    {t('ใบอนุญาตทนายความเลขที่', 'Lawyer License No.')}
                  </p>
                  <p className="font-serif text-2xl font-bold text-white">{member.licenseNumber}</p>
                </div>
              </div>
            )}
          </header>
        </div>
      </Container>
    </section>
  )
}
