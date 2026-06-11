'use client'

import Image from 'next/image'
import { MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/container'
import { ConsultationForm } from '@/components/consultation-form'
import { officeContact, officeInfo } from '@/lib/data/office'
import { useTranslation } from '@/lib/i18n'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <Image
        src="/law-office-hero.png"
        alt=""
        fill
        priority
        className="motion-hero-media object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="motion-hero-wash absolute inset-0 bg-gradient-to-r from-primary-dark via-primary/95 to-primary/75" />
      <Container className="relative grid min-h-[600px] items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <p className="motion-hero-badge animate-fade-up inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1.5 text-sm font-medium text-gold">
            <ShieldCheck className="size-4" aria-hidden="true" />
            {t('สำนักงานกฎหมายไทย · เดชอุดม อุบลราชธานี', 'Thai Law Office · Det Udom, Ubon Ratchathani')}
          </p>
          <h1 className="motion-hero-title animate-fade-up stagger-1 mt-6 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {t('สำนักงานกฎหมายและทนายความ', 'Law Office and Legal Counsel')}
            <span className="mt-2 block text-2xl text-gold sm:text-3xl lg:text-4xl">
              {t(
                'ให้คำปรึกษา รับว่าความ และดำเนินคดีทั่วราชอาณาจักร',
                'Legal consultation, representation, and litigation across Thailand',
              )}
            </span>
          </h1>
          <p className="motion-hero-body animate-fade-up stagger-2 mt-6 max-w-3xl text-base leading-8 text-primary-foreground/85 sm:text-lg">
            {t(
              'คดีแพ่ง | คดีอาญา | คดีครอบครัว | คดีมรดก | คดีที่ดิน',
              'Civil | Criminal | Family | Inheritance | Land Disputes',
            )}
          </p>
          <div className="motion-hero-actions animate-fade-up stagger-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`https://line.me/R/ti/p/~${officeContact.line}`}
              target="_blank"
              rel="noreferrer"
              className="motion-action inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-bold text-primary-dark hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              {t('ปรึกษาทนายผ่าน Line', 'Consult via Line')}
            </a>
            <a
              href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
              className="motion-action inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 text-sm font-bold text-white hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Phone className="size-5" aria-hidden="true" />
              {t('โทรหาเรา', 'Call Us')}
            </a>
          </div>
          <p className="motion-hero-proof animate-fade-up stagger-4 mt-6 max-w-2xl rounded-lg border border-gold/25 bg-primary-dark/45 px-4 py-3 text-sm font-semibold leading-6 text-primary-foreground/85">
            {t(
              `ก่อตั้งเมื่อปี ${officeInfo.establishedYear} | ประสบการณ์มากกว่า 19 ปี | ทีมทนายมากกว่า 9 คน`,
              'Established in 2007 | Over 19 years of experience | More than 9 lawyers',
            )}
          </p>
        </div>

        <div className="motion-hero-panel animate-fade-up stagger-2 rounded-2xl border border-white/10 bg-primary-dark/40 p-6 shadow-xl backdrop-blur-md sm:p-8">
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold/90">
              {t('ปรึกษาและประเมินคดีเบื้องต้น', 'Initial Consultation & Evaluation')}
            </h2>
            <p className="mt-1 text-sm text-primary-foreground/60">
              {t('ส่งเรื่องเพื่อให้ทีมทนายตรวจสอบข้อมูล', 'Send your case details for our legal team to review.')}
            </p>
          </div>
          <ConsultationForm />
        </div>
      </Container>
    </section>
  )
}
