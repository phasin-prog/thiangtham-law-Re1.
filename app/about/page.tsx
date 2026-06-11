import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  LockKeyhole,
  MessageSquareText,
  Scale,
} from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { OfficeStats } from '@/components/office-stats'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { WhyChooseUsSection } from '@/components/why-choose-us-section'
import { officeInfo } from '@/lib/data/office'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา',
  description:
    'สำนักกฎหมายเที่ยงธรรมทนายความ ก่อตั้งเมื่อปี พ.ศ. 2550 นำโดยนายเกษม ฉิมพลี พร้อมทีมทนายความมากกว่า 9 คน',
}

const principles = [
  {
    icon: FileSearch,
    title: 'วิเคราะห์ข้อเท็จจริงอย่างรอบคอบ',
    description: 'รับฟัง ลำดับเหตุการณ์ ตรวจเอกสาร และแยกประเด็นก่อนเสนอแนวทาง',
  },
  {
    icon: Scale,
    title: 'เตรียมพยานหลักฐานและกลยุทธ์',
    description: 'พิจารณาสิทธิ หน้าที่ อายุความ ข้อกฎหมาย และทางเลือกที่เหมาะกับเป้าหมาย',
  },
  {
    icon: MessageSquareText,
    title: 'สื่อสารกับลูกความอย่างชัดเจน',
    description: 'อธิบายโอกาส ความเสี่ยง ขั้นตอน ค่าใช้จ่าย และข้อจำกัดก่อนตัดสินใจ',
  },
  {
    icon: LockKeyhole,
    title: 'รักษาความลับ',
    description: 'ดูแลข้อมูลและเอกสารของลูกความอย่างระมัดระวังตามวัตถุประสงค์ของงาน',
  },
] as const

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="เกี่ยวกับสำนักกฎหมายเที่ยงธรรมทนายความ"
        description="สำนักงานกฎหมายที่ให้ความสำคัญกับการวิเคราะห์ข้อเท็จจริง การเตรียมพยานหลักฐาน และการอธิบายทางเลือกให้ลูกความเข้าใจก่อนตัดสินใจ"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'เกี่ยวกับเรา' }]}
      />

      <section className="py-14 md:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[440px] overflow-hidden rounded-3xl border border-gold/25 bg-primary">
            <Image
              src="/law-office-hero.png"
              alt="สำนักกฎหมายเที่ยงธรรมทนายความ"
              fill
              className="object-cover opacity-70"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <p className="text-sm font-semibold text-gold">ประวัติสำนักงาน</p>
              <p className="mt-2 font-serif text-3xl font-bold">
                ก่อตั้งเมื่อปี พ.ศ. {officeInfo.establishedYear}
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Office History"
              title="ให้บริการด้านกฎหมายแก่บุคคลทั่วไปและนิติบุคคล"
            />
            <div className="mt-6 space-y-4 leading-8 text-muted-foreground">
              <p>
                {officeInfo.name} ก่อตั้งขึ้นเมื่อปี พ.ศ. {officeInfo.establishedYear} โดยมี
                {officeInfo.headLawyer} เป็นหัวหน้าสำนักงาน
              </p>
              <p>
                ตลอดระยะเวลาการทำงานที่ผ่านมา สำนักงานมุ่งให้บริการด้านกฎหมายแก่บุคคลทั่วไปและ
                นิติบุคคล โดยให้ความสำคัญกับการวิเคราะห์ข้อเท็จจริง การเตรียมพยานหลักฐาน
                และการวางแนวทางคดีอย่างเป็นระบบ
              </p>
              <p>
                นายเกษม ฉิมพลี มีประสบการณ์เป็นทนายความมากกว่า 19 ปี
                พร้อมด้วยทีมงานทนายความมากกว่า 9 คน ที่พร้อมให้คำปรึกษา รับว่าความ
                ดำเนินคดี และดูแลลูกความในกระบวนการทางกฎหมายอย่างรอบคอบ
              </p>
              <p>
                สำนักงานให้ความสำคัญกับการอธิบายทางเลือกทางกฎหมายแก่ลูกความ
                เพื่อให้เข้าใจทั้งโอกาส ความเสี่ยง ขั้นตอน และแนวทางดำเนินการก่อนตัดสินใจ
              </p>
            </div>

            <section className="mt-10 rounded-3xl border border-border bg-secondary/70 p-8 shadow-sm">
              <div className="max-w-3xl">
                <h2 className="font-serif text-2xl font-bold text-primary">
                  สำนักงานทนายความและกฎหมาย คืออะไร?
                </h2>
                <div className="mt-5 space-y-4 text-muted-foreground leading-8">
                  <p>
                    สำนักงานทนายความและกฎหมายเป็นองค์กรที่ให้บริการทางกฎหมายแก่ลูกความทั้งบุคคลทั่วไป
                    และนิติบุคคล โดยรับฟังข้อเท็จจริง ตรวจสอบเอกสาร พิจารณากฎหมายที่เกี่ยวข้อง และวางแนวทาง
                    เพื่อแก้ไขข้อพิพาทหรือป้องกันเหตุการณ์ที่อาจเกิดขึ้นในอนาคต
                  </p>
                  <p>
                    หน้าที่หลักของสำนักงานคือการให้คำปรึกษา เตรียมสัญญา เอกสารทางกฎหมาย
                    ให้บริการด้านการเจรจา รับฟ้องและว่าความในศาล รวมถึงปฏิบัติตามกฎหมายและจริยธรรมวิชาชีพ
                    เพื่อให้ลูกความได้รับการปกป้องอย่างเหมาะสม
                  </p>
                  <p>
                    สำนักงาน เช่น {officeInfo.name} จะทำงานร่วมกับลูกความอย่างใกล้ชิด
                    ตั้งแต่การสำรวจข้อเท็จจริง การแบ่งปันตัวเลือกทางกฎหมาย และการอธิบาย
                    ความเสี่ยง-ผลประโยชน์ เพื่อให้ลูกความตัดสินใจได้อย่างมั่นใจ
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-7">
              <OfficeStats />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary/60 py-14 md:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="หัวหน้าสำนักงาน"
            title="นายเกษม ฉิมพลี"
            description="ประสบการณ์เป็นทนายความมากกว่า 19 ปี ให้คำปรึกษา รับว่าความ และวางแนวทางคดี โดยยึดข้อเท็จจริง พยานหลักฐาน และข้อกฎหมายเป็นสำคัญ"
          />
          <div className="mx-auto mt-9 max-w-3xl rounded-2xl border border-gold/30 bg-card p-7 text-center shadow-sm">
            <p className="font-serif text-xl font-bold text-primary">ทีมงานทนายความมากกว่า 9 คน</p>
            <p className="mt-3 leading-7 text-muted-foreground">
              พร้อมให้คำปรึกษา รับว่าความ ดำเนินคดี และดูแลการประสานงานในกระบวนการทางกฎหมาย
            </p>
            <Link
              href="/team"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold"
            >
              ดูทีมทนายและที่ปรึกษา
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Office Philosophy"
            title="หลักการทำงานของสำนักงาน"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <principle.icon className="size-7 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-bold text-primary">{principle.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.description}</p>
                <CheckCircle2 className="mt-5 size-5 text-primary" aria-hidden="true" />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseUsSection />

      <CTASection title="ต้องการปรึกษาปัญหากฎหมาย?" />
    </main>
  )
}
