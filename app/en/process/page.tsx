'use client'

import { CalendarCheck2, ClipboardCheck, FileSearch, Gavel, Send } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { useTranslation } from '@/lib/i18n'

export default function EnglishProcessPage() {
  const { t } = useTranslation()

  const steps = [
    {
      icon: Send,
      title: t('ติดต่อสำนักงาน', 'Contact the Office'),
      description: t('ช่องทางการสื่อสารหลากหลาย ทั้งโทรศัพท์ Line Facebook WhatsApp อีเมล หรือแบบฟอร์มปรึกษา', 'Reach us by phone, Line, Facebook, WhatsApp, email, or the consultation form.'),
    },
    {
      icon: CalendarCheck2,
      title: t('แจ้งข้อเท็จจริงเบื้องต้น', 'Provide the Initial Facts'),
      description: t('ลำดับเหตุการณ์ คู่กรณี วันเวลาที่เกิดเรื่อง และความต้องการเบื้องต้น โดยไม่ต้องกังวลเรื่องศัพท์กฎหมาย', 'Describe the events in order, the parties involved, important dates, and the outcome you need.'),
    },
    {
      icon: FileSearch,
      title: t('ตรวจสอบเอกสารและประเมินคดี', 'Document Review and Initial Assessment'),
      description: t('ทีมงานพิจารณาพยานหลักฐาน ข้อกฎหมายที่เกี่ยวข้อง และประเมินแนวทางเบื้องต้น', 'Our team reviews the available records, evidence, and any missing information that may be required.'),
    },
    {
      icon: ClipboardCheck,
      title: t('เสนอแนวทางและขอบเขตงาน', 'Legal Strategy and Scope'),
      description: t('อธิบายสิทธิ หน้าที่ ทางเลือก ความเสี่ยง ค่าใช้จ่าย และขั้นตอนอย่างชัดเจนก่อนตัดสินใจ', 'We explain rights, options, procedures, costs, risks, and the proposed scope before you decide.'),
    },
    {
      icon: Gavel,
      title: t('ดำเนินการตามกฎหมาย', 'Legal Action'),
      description: t('เริ่มการเจรจา ยื่นฟ้อง ต่อสู้คดี หรือจัดทำเอกสารตามแนวทางที่ตกลงกัน', 'We proceed with negotiation, notices, filings, defense, litigation, or other agreed legal work.'),
    },
  ] as const

  return (
    <main>
      <PageHero
        title={t('ขั้นตอนการให้บริการ', 'Our Service Process')}
        description={t('เริ่มต้นง่ายๆ เพียงแจ้งข้อเท็จจริงและส่งเอกสารที่มี ทีมงานจะช่วยสรุปประเด็นและวางแนวทางที่เหมาะสม', 'Start by describing the facts in order and sending the documents you have. You do not need to use legal terminology.')}
        crumbs={[{ href: '/en', label: t('หน้าแรก', 'Home') }, { label: t('ขั้นตอนการทำงาน', 'Service Process') }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-5">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-[80px_1fr] sm:items-center"
              >
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-gold">
                  <step.icon className="size-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold">{t(`ขั้นตอนที่ ${index + 1}`, `Step ${index + 1}`)}</p>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-primary">{step.title}</h2>
                  <p className="mt-2 leading-7 text-muted-foreground">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title={t('พร้อมแจ้งรายละเอียดเพื่อขอรับการประเมินแล้วใช่ไหม?', 'Ready to Share the Initial Details?')}
        description={t('ส่งข้อเท็จจริงและรูปเอกสารที่มี ทีมงานจะติดต่อกลับเพื่อแจ้งขั้นตอนถัดไปที่เหมาะสม', 'Send the facts and available documents. Our team will contact you to explain the appropriate next step.')}
      />
    </main>
  )
}
