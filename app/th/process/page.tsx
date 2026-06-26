import type { Metadata } from 'next'
import {
  CalendarCheck2,
  ClipboardCheck,
  FileSearch,
  Gavel,
  Send,
} from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'ขั้นตอนการใช้บริการ',
  description:
    'ขั้นตอนการติดต่อ แจ้งข้อเท็จจริง ตรวจเอกสาร วางแนวทาง และดำเนินการทางกฎหมายกับสำนักกฎหมายเที่ยงธรรมทนายความ',
}

const steps = [
  {
    icon: Send,
    title: 'ติดต่อสำนักงาน',
    description: 'ติดต่อผ่านโทรศัพท์ Line Facebook WhatsApp อีเมล หรือแบบฟอร์มปรึกษาคดี',
  },
  {
    icon: CalendarCheck2,
    title: 'แจ้งข้อเท็จจริงเบื้องต้น',
    description: 'เล่าเหตุการณ์ตามลำดับ ระบุคู่กรณี กำหนดเวลาที่เกี่ยวข้อง และเป้าหมายที่ต้องการ',
  },
  {
    icon: FileSearch,
    title: 'ตรวจเอกสารและประเมินแนวทาง',
    description: 'ทีมงานตรวจข้อมูล เอกสาร พยานหลักฐาน และสอบถามประเด็นที่จำเป็นเพิ่มเติม',
  },
  {
    icon: ClipboardCheck,
    title: 'วางกลยุทธ์ทางคดี',
    description: 'อธิบายสิทธิ ทางเลือก ขั้นตอน ค่าใช้จ่าย ความเสี่ยง และขอบเขตงานก่อนตัดสินใจ',
  },
  {
    icon: Gavel,
    title: 'ดำเนินการตามขั้นตอนทางกฎหมาย',
    description: 'เจรจา จัดทำหนังสือ ยื่นคำร้อง ฟ้องคดี ต่อสู้คดี หรือดำเนินงานตามขอบเขตที่ตกลง',
  },
] as const

export default function ProcessPage() {
  return (
    <main>
      <PageHero
        title="ขั้นตอนการใช้บริการ"
        description="เริ่มต้นได้โดยเล่าข้อเท็จจริงตามลำดับและส่งเอกสารที่มี โดยไม่จำเป็นต้องรู้ศัพท์กฎหมาย"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ขั้นตอนการใช้บริการ' }]}
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
                  <p className="text-xs font-bold uppercase tracking-wider text-gold">
                    ขั้นตอนที่ {index + 1}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-primary">{step.title}</h2>
                  <p className="mt-2 leading-7 text-muted-foreground">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title="พร้อมแจ้งข้อมูลเบื้องต้น?"
        description="ส่งข้อเท็จจริงและเอกสารที่มี ทีมงานจะติดต่อกลับเพื่อแจ้งขั้นตอนที่เหมาะสม"
      />
    </main>
  )
}
