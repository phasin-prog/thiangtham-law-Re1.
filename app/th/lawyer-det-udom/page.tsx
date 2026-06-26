import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Gavel,
  MapPin,
  MessageCircle,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'

import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { CTASection } from '@/components/cta-section'

const baseUrl = 'https://www.thiangthamlaw.com'

const title = 'ทนายความเดชอุดม | สำนักกฎหมายเที่ยงธรรมทนายความ'

const description =
  'สำนักกฎหมายเที่ยงธรรมทนายความ ให้บริการปรึกษากฎหมายและรับว่าความในพื้นที่อำเภอเดชอุดม จังหวัดอุบลราชธานี และใกล้เคียง พร้อมรับว่าความอรรถคดีทั่วราชอาณาจักร'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${baseUrl}/th/lawyer-det-udom`,
  },
  openGraph: {
    title,
    description,
    url: `${baseUrl}/th/lawyer-det-udom`,
    siteName: 'สำนักกฎหมายเที่ยงธรรมทนายความ',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/law-office-hero.png',
        width: 1200,
        height: 630,
        alt: 'ทนายความเดชอุดม สำนักกฎหมายเที่ยงธรรมทนายความ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/law-office-hero.png'],
  },
}

const services = [
  {
    icon: Gavel,
    title: 'คดีแพ่ง',
    description: 'ข้อพิพาทสัญญา หนี้สิน ค่าเสียหาย สิทธิเรียกร้อง และข้อพิพาททางแพ่ง',
  },
  {
    icon: ShieldCheck,
    title: 'คดีอาญา',
    description: 'ให้คำปรึกษาเกี่ยวกับการแจ้งความ การสอบสวน การแก้ข้อกล่าวหา และการต่อสู้คดี',
  },
  {
    icon: UsersRound,
    title: 'คดีครอบครัว',
    description: 'หย่า อำนาจปกครองบุตร ค่าอุปการะเลี้ยงดู และทรัพย์สินระหว่างคู่สมรส',
  },
  {
    icon: FileText,
    title: 'คดีมรดกและเอกสาร',
    description: 'ผู้จัดการมรดก พินัยกรรม การแบ่งทรัพย์มรดก และเอกสารทางกฎหมาย',
  },
  {
    icon: MapPin,
    title: 'คดีที่ดิน',
    description: 'ข้อพิพาทกรรมสิทธิ์ เขตที่ดิน การครอบครอง การรุกล้ำ และเอกสารสิทธิ',
  },
  {
    icon: Gavel,
    title: 'รับว่าความและดำเนินคดี',
    description: 'ประเมินแนวทาง เตรียมเอกสาร และดำเนินการตามขั้นตอนกฎหมาย',
  },
] as const

const preparationItems = [
  'สรุปข้อเท็จจริงและลำดับเหตุการณ์ของเรื่องที่เกิดขึ้น',
  'เตรียมเอกสารหลักฐาน เช่น สัญญา ใบเสร็จ แชทพูดคุย หรือภาพถ่าย',
  'ข้อมูลคู่กรณีและพยานบุคคลที่เกี่ยวข้อง (ถ้ามี)',
  'จัดเตรียมคำถามหรือประเด็นหลักที่ต้องการคำแนะนำ',
] as const

export default function LawyerDetUdomPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'สำนักกฎหมายเที่ยงธรรมทนายความ',
    alternateName: 'Thiangtham Law Office',
    description,
    url: `${baseUrl}/th/lawyer-det-udom`,
    areaServed: [
      {
        '@type': 'City',
        name: 'เดชอุดม',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'อุบลราชธานี',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'เดชอุดม',
      addressRegion: 'อุบลราชธานี',
      postalCode: '34160',
      addressCountry: 'TH',
    },
    knowsAbout: [
      'ทนายความเดชอุดม',
      'ทนายเดชอุดม',
      'สำนักงานกฎหมายเดชอุดม',
      'ปรึกษากฎหมายเดชอุดม',
      'ทนายอุบลราชธานี',
      'คดีแพ่ง',
      'คดีอาญา',
      'คดีครอบครัว',
      'คดีมรดก',
      'คดีที่ดิน',
    ],
  }

  return (
    <main id="main-content" className="overflow-x-hidden selection:bg-gold/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title="ทนายความเดชอุดม"
        description="สำนักกฎหมายเที่ยงธรรมทนายความ ตั้งอยู่ในอำเภอเดชอุดม จังหวัดอุบลราชธานี ให้บริการปรึกษากฎหมาย ตรวจข้อเท็จจริง และประเมินแนวทางคดี รวมถึงรับว่าความทั่วราชอาณาจักร"
        crumbs={[{ href: '/th', label: 'หน้าแรก' }, { label: 'ทนายความเดชอุดม' }]}
      />

      <section className="py-12 md:py-16 bg-secondary/10 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-muted-foreground md:text-lg">
              สำนักกฎหมายเที่ยงธรรมทนายความ ให้บริการปรึกษากฎหมายและรับว่าความในพื้นที่อำเภอเดชอุดม จังหวัดอุบลราชธานี โดยทีมงานจะร่วมวิเคราะห์ข้อเท็จจริงและตรวจพยานหลักฐานอย่างละเอียด พร้อมรักษาความลับของลูกความตามมาตรฐานจรรยาบรรณวิชาชีพทนายความ และยังคงรับว่าความอรรถคดีทั่วราชอาณาจักรตามความพร้อมและลักษณะของเรื่อง
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/th/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-2.5 text-sm font-bold text-primary transition hover:bg-gold-soft"
              >
                ติดต่อสำนักงาน
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href="/th/consultation"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-bold text-primary transition hover:border-gold hover:text-gold"
              >
                นัดปรึกษากฎหมาย
                <MessageCircle className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold-ink">
                Local Legal Support
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-primary">
                ปรึกษากฎหมายในพื้นที่เดชอุดมและอุบลราชธานี
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                หากคุณอยู่ในอำเภอเดชอุดมหรือพื้นที่ใกล้เคียงในจังหวัดอุบลราชธานี
                และต้องการปรึกษาทนายความเกี่ยวกับคดีแพ่ง คดีอาญา คดีครอบครัว
                คดีมรดก คดีที่ดิน หรือเอกสารทางกฎหมาย สามารถติดต่อสำนักงานเพื่อแจ้งข้อเท็จจริงเบื้องต้น
                และเตรียมเอกสารให้ทีมงานช่วยประเมินแนวทางได้
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                การปรึกษากฎหมายที่ดีควรเริ่มจากข้อเท็จจริง เอกสาร และลำดับเหตุการณ์ที่ชัดเจน
                เพื่อให้การประเมินทางเลือกทางกฎหมายเป็นไปอย่างรอบคอบและไม่สร้างความคาดหวังเกินจริง
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-primary">
                ก่อนติดต่อทนาย ควรเตรียมอะไรบ้าง
              </h2>

              <ul className="mt-6 space-y-4">
                {preparationItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/th/process"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold-ink"
              >
                ดูขั้นตอนการทำงานของสำนักงาน
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary/25 py-16 md:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold-ink">
              Practice Areas
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary">
              งานกฎหมายที่ปรึกษาและรับดำเนินการ
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              ภาพรวมหมวดงานที่ผู้ติดต่อในพื้นที่เดชอุดมและอุบลราชธานีมักสอบถามสำนักงาน
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-border bg-white p-6 shadow-sm"
              >
                <service.icon className="size-6 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-bold text-primary">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="rounded-3xl border border-gold/25 bg-card p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold-ink">
                  Det Udom / Ubon Ratchathani
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-primary">
                  ต้องการหาทนายใกล้ฉันในเดชอุดมหรืออุบลราชธานี?
                </h2>
                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  สามารถเริ่มจากการติดต่อสำนักงาน แจ้งพื้นที่ เหตุการณ์ และเอกสารที่มีอยู่
                  เพื่อให้ทีมงานช่วยประเมินว่าควรเริ่มจากการเจรจา การทำหนังสือ
                  การรวบรวมหลักฐาน หรือการดำเนินคดีตามขั้นตอนกฎหมาย
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6">
                <p className="text-sm font-bold text-primary">
                  พื้นที่ให้บริการหลัก
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li>อำเภอเดชอุดม จังหวัดอุบลราชธานี</li>
                  <li>พื้นที่ใกล้เคียงในจังหวัดอุบลราชธานี</li>
                  <li>งานคดีและงานเอกสารตามขอบเขตที่สำนักงานรับดำเนินการ</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="ต้องการปรึกษาทนายความในพื้นที่เดชอุดม?"
        description="โทร Line หรือส่งรายละเอียดเบื้องต้นมาให้สำนักงานตรวจสอบก่อนนัดหมายได้"
      />
    </main>
  )
}
