'use client'

import Image from 'next/image'
import { CheckCircle2, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/container'
import { officeContact, officeInfo } from '@/lib/data/office'
import { useTranslation } from '@/lib/i18n'

export function HeroSection() {
  const { t } = useTranslation()
  const trustIndicators = [
    t(
      'วิเคราะห์ข้อเท็จจริงและพยานหลักฐานก่อนเสนอแนวทาง',
      'We review facts and evidence before recommending a legal path.',
    ),
    t(
      'อธิบายโอกาส ความเสี่ยง ขั้นตอน และทางเลือกอย่างชัดเจน',
      'We explain options, risks, procedures, and likely next steps clearly.',
    ),
    t(
      'ดูแลโดยหัวหน้าสำนักงานและทีมทนายมากกว่า 9 คน',
      'Matters are supported by our Head of Office and a team of more than 9 lawyers.',
    ),
  ]

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <Image
        src="/law-office-hero.png"
        alt=""
        fill
        priority
        className="object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary/95 to-primary/75" />
      <Container className="relative grid min-h-[600px] items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1.5 text-sm font-medium text-gold">
            <ShieldCheck className="size-4" aria-hidden="true" />
            {t('สำนักงานกฎหมายไทย · เดชอุดม อุบลราชธานี', 'Thai Law Office · Det Udom, Ubon Ratchathani')}
          </p>
          <h1 className="mt-6 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {t('สำนักงานกฎหมายและทนายความ', 'Law Office and Legal Counsel')}
            <span className="mt-2 block text-2xl text-gold sm:text-3xl lg:text-4xl">
              {t(
                'ให้คำปรึกษา รับว่าความ และดำเนินคดีทั่วราชอาณาจักร',
                'Legal consultation, representation, and litigation across Thailand',
              )}
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-primary-foreground/85 sm:text-lg">
            {t(
              'คดีแพ่ง | คดีอาญา | คดีครอบครัว | คดีมรดก | คดีที่ดิน',
              'Civil | Criminal | Family | Inheritance | Land Disputes',
            )}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`https://line.me/R/ti/p/~${officeContact.line}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-bold text-primary-dark transition hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              {t('ปรึกษาทนายผ่าน Line', 'Consult via Line')}
            </a>
            <a
              href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 text-sm font-bold text-white transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Phone className="size-5" aria-hidden="true" />
              {t('โทรหาเรา', 'Call Us')}
            </a>
          </div>
          <p className="mt-6 border-l-2 border-gold pl-4 text-sm font-semibold leading-6 text-primary-foreground/80">
            {t(
              `ก่อตั้งเมื่อปี ${officeInfo.establishedYear} | ประสบการณ์มากกว่า 19 ปี | ทีมทนายมากกว่า 9 คน`,
              'Established in 2007 | Over 19 years of experience | More than 9 lawyers',
            )}
          </p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-primary-dark/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            {t('สิ่งที่ลูกความจะได้รับ', 'What Clients Can Expect')}
          </p>
          <div className="mt-3">
            {trustIndicators.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 border-b border-white/10 py-4 last:border-0"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                <p className="leading-7 text-primary-foreground/90">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-gold/20 bg-white/5 p-4">
            <p className="text-sm leading-6 text-primary-foreground/75">
              {t(
                'หากได้รับหมายศาล หมายเรียก หรือมีเรื่องที่อาจมีกำหนดเวลา ควรติดต่อพร้อมเอกสารโดยเร็วเพื่อประเมินสิทธิและขั้นตอนเบื้องต้น',
                'If you receive a court summons, official notice, or face a legal deadline, contact us promptly with the available documents so we can review your rights and next steps.',
              )}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
