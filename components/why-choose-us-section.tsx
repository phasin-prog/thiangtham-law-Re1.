'use client'

import { ClipboardCheck, FileSearch, Gavel, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/container'
import { SectionHeading } from '@/components/section-heading'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const reasons = [
  {
    icon: Gavel,
    title: {
      th: 'ประสบการณ์ว่าความกว่า 19 ปี',
      en: '19+ Years of Litigation Experience',
    },
    description: {
      th: 'ทนายความมีความเชี่ยวชาญในกระบวนพิจารณาคดีของศาล เข้าใจเทคนิคการสืบพยานและการต่อสู้คดีในทุกรูปแบบ',
      en: 'Our lawyers are experts in court procedures, with deep understanding of witness examination and litigation techniques.',
    },
  },
  {
    icon: FileSearch,
    title: {
      th: 'วิเคราะห์คดีตามข้อเท็จจริง',
      en: 'Fact-Based Case Analysis',
    },
    description: {
      th: 'เราประเมินโอกาสชนะคดีและความเสี่ยงตามพยานหลักฐานที่มีอยู่จริง ไม่มีการรับรองผลคดีที่เกินจริงหรือขายฝัน',
      en: 'We evaluate case outcomes and risks based on actual evidence, providing realistic expectations without false promises.',
    },
  },
  {
    icon: ClipboardCheck,
    title: {
      th: 'การวางกลยุทธ์ที่รัดกุม',
      en: 'Strategic Case Planning',
    },
    description: {
      th: 'จัดเตรียมพยานเอกสารและพยานบุคคลอย่างละเอียดทุกขั้นตอน เพื่อให้การนำเสนอข้อเท็จจริงต่อศาลมีน้ำหนักและน่าเชื่อถือ',
      en: 'We meticulously prepare documents and witnesses to ensure that facts presented to the court are compelling and credible.',
    },
  },
  {
    icon: ShieldCheck,
    title: {
      th: 'รักษาความลับและผลประโยชน์',
      en: 'Confidentiality & Client Interest',
    },
    description: {
      th: 'ปกป้องข้อมูลของลูกความเป็นความลับสูงสุด และมุ่งรักษาผลประโยชน์ที่ดีที่สุดของลูกความตามขอบเขตของกฎหมาย',
      en: 'We protect client information with the utmost confidentiality and strive for the best possible outcome within the law.',
    },
  },
]

export function WhyChooseUsSection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -left-24 size-96 rounded-full bg-gold/10 blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-navy-dark blur-[100px]" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div className="animate-fade-up">
            <SectionHeading
              light
              hideDivider
              eyebrow={t('ทำไมต้องเลือกเรา', 'Why Choose Us')}
              title={t(
                'เหตุผลที่ลูกความไว้วางใจให้เราเป็นที่ปรึกษา',
                'Why Clients Trust Us for Court Representation',
              )}
              description={t(
                'เพราะการว่าความในศาลต้องอาศัยทั้งความรู้ทางกฎหมาย ประสบการณ์ และความละเอียดรอบคอบในการเตรียมคดี เพื่อรักษาสิทธิและผลประโยชน์สูงสุดของคุณ',
                'Litigation requires legal knowledge, extensive experience, and meticulous preparation to protect your rights and best interests.',
              )}
            />
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold">
                <span className="flex size-2 rounded-full bg-gold animate-pulse" />
                {t('ว่าความทั่วประเทศ', 'National Coverage')}
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold">
                <span className="flex size-2 rounded-full bg-gold animate-pulse" />
                {t('ทีมทนายมืออาชีพ', 'Professional Team')}
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8 animate-fade-up stagger-1">
            {reasons.map((reason, index) => (
              <article 
                key={reason.title.en} 
                className={cn(
                  "group relative rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-[transform,background-color,border-color] duration-200 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/10",
                  index % 2 === 1 && "lg:translate-y-8"
                )}
              >
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gold text-navy shadow-lg transition-transform duration-200 group-hover:rotate-3 group-hover:scale-105">
                  <reason.icon className="size-8" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                  {t(reason.title.th, reason.title.en)}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
                  {t(reason.description.th, reason.description.en)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
