'use client'

import { ClipboardCheck, FileSearch, Gavel, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/container'
import { SectionHeading } from '@/components/section-heading'
import { useTranslation } from '@/lib/i18n'

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
    <section className="py-16 md:py-22">
      <Container>
        <SectionHeading
          align="center"
          eyebrow={t('ทำไมต้องเลือกเรา', 'Why Choose Us')}
          title={t(
            'เหตุผลที่ลูกความเลือกเราให้เป็นทนายว่าความให้ในศาล',
            'Why Clients Trust Us for Court Representation',
          )}
          description={t(
            'เพราะการว่าความในศาลต้องอาศัยทั้งความรู้ทางกฎหมาย ประสบการณ์ และความละเอียดรอบคอบในการเตรียมคดี',
            'Litigation requires legal knowledge, extensive experience, and meticulous preparation.',
          )}
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <article key={reason.title.en} className="group flex flex-col items-center text-center">
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-secondary text-gold ring-1 ring-gold/20 transition-all duration-300 group-hover:bg-primary group-hover:text-gold group-hover:ring-primary">
                <reason.icon className="size-7" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">
                {t(reason.title.th, reason.title.en)}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {t(reason.description.th, reason.description.en)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
