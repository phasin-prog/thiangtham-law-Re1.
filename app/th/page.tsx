import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  FileText,
  Gavel,
  Landmark,
  MessageCircle,
  Scale,
  ShieldCheck,
  UsersRound,
  MapPin,
} from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { CTASection } from '@/components/cta-section'
import { Container } from '@/components/container'
import { FAQAccordion } from '@/components/faq-accordion'
import { HeroSection } from '@/components/hero-section'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { legalArticles } from '@/lib/data/articles'
import { homeFaqs } from '@/lib/data/faqs'
import { legalServices } from '@/lib/data/services'
import { officeInfo } from '@/lib/data/office'

const servicePreviewSlugs = ['contracts', 'business', 'tax', 'visa-foreign-documents', 'labor'] as const
const casePreviewItems = [
  {
    icon: Scale,
    title: 'คดีแพ่ง',
    description: 'ข้อพิพาทสัญญา หนี้สิน ค่าเสียหาย และสิทธิเรียกร้องทางแพ่ง',
  },
  {
    icon: ShieldCheck,
    title: 'คดีอาญา',
    description: 'การสอบสวน การแจ้งความ การแก้ข้อกล่าวหา และการต่อสู้คดี',
  },
  {
    icon: UsersRound,
    title: 'คดีครอบครัว',
    description: 'หย่า อำนาจปกครองบุตร ค่าอุปการะเลี้ยงดู และทรัพย์สินร่วม',
  },
  {
    icon: Landmark,
    title: 'คดีมรดก',
    description: 'ผู้จัดการมรดก พินัยกรรม การแบ่งทรัพย์ และสิทธิทายาท',
  },
  {
    icon: MapPin,
    title: 'คดีที่ดิน',
    description: 'เขตที่ดิน สิทธิครอบครอง การรุกล้ำ และข้อพิพาทเกี่ยวกับกรรมสิทธิ์',
  },
  {
    icon: FileText,
    title: 'คดีเช็ค',
    description: 'เช็คเด้ง การเรียกชำระหนี้ และเอกสารประกอบการดำเนินคดี',
  },
] as const

const trustIndicators = [
  {
    icon: Building2,
    title: 'ก่อตั้งเมื่อปี พ.ศ. 2550',
    description: 'สำนักงานที่ดำเนินงานต่อเนื่องและมีแนวทางทำงานชัดเจน',
  },
  {
    icon: CalendarCheck2,
    title: 'ประสบการณ์มากกว่า 19 ปี',
    description: 'ประสบการณ์ทำงานทางกฎหมายที่ใช้ประเมินเรื่องได้รอบด้าน',
  },
  {
    icon: BriefcaseBusiness,
    title: 'ทีมทนายความและที่ปรึกษา',
    description: 'ทำงานร่วมกันตามบทบาท เพื่อดูแลข้อเท็จจริงและเอกสารของแต่ละเรื่อง',
  },
  {
    icon: Gavel,
    title: 'รับว่าความทั่วราชอาณาจักร',
    description: 'รองรับงานคดีและงานให้คำปรึกษาตามลักษณะของเรื่องและพื้นที่ที่เกี่ยวข้อง',
  },
  {
    icon: ShieldCheck,
    title: 'รักษาความลับของลูกความ',
    description: 'ดูแลข้อมูลและเอกสารด้วยความระมัดระวังตามมาตรฐานวิชาชีพ',
  },
] as const

const processSteps = [
  {
    icon: MessageCircle,
    title: 'ติดต่อสำนักงาน',
    description: 'แจ้งช่องทางที่สะดวก โทรศัพท์ Line หรือแบบฟอร์มติดต่อ',
  },
  {
    icon: FileText,
    title: 'แจ้งข้อเท็จจริงเบื้องต้น',
    description: 'สรุปเหตุการณ์ คู่กรณี และเอกสารที่มีอยู่ในตอนนี้',
  },
  {
    icon: Scale,
    title: 'ตรวจเอกสารและประเมินแนวทาง',
    description: 'พิจารณาข้อเท็จจริง เอกสาร และประเด็นทางกฎหมายที่เกี่ยวข้อง',
  },
  {
    icon: BriefcaseBusiness,
    title: 'วางแผนการดำเนินงาน',
    description: 'กำหนดขอบเขตงาน ขั้นตอน และเอกสารที่ต้องเตรียมต่อ',
  },
  {
    icon: Gavel,
    title: 'ดำเนินการตามขั้นตอนกฎหมาย',
    description: 'ทำงานตามแนวทางที่ตกลงไว้และติดตามความคืบหน้าอย่างเป็นระบบ',
  },
] as const

const whyPoints = [
  'วิเคราะห์ข้อเท็จจริงและพยานหลักฐาน',
  'ตรวจสอบเอกสารอย่างรอบคอบ',
  'สื่อสารขั้นตอนอย่างชัดเจน',
  'รักษาความลับของลูกความ',
  'ไม่รับประกันผลคดีเกินจริง',
] as const

const servicePreviewItems = legalServices.filter((service) =>
  servicePreviewSlugs.includes(service.slug as (typeof servicePreviewSlugs)[number]),
)

export default function HomePage() {
  return (
    <main className="overflow-x-hidden selection:bg-gold/30">
      <HeroSection />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            align="center"
            title="สิ่งที่ลูกความเห็นได้ทันทีจากสำนักงานนี้"
            description="ข้อมูลสำคัญที่ช่วยให้ผู้มาติดต่อเข้าใจตัวตนของสำนักงานและรูปแบบการทำงานก่อนเริ่มปรึกษา"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {trustIndicators.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <item.icon className="size-6 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-lg font-bold text-primary">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-secondary/25 py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                title="บริการหลักด้านงานเอกสารและที่ปรึกษา"
                description="งานที่ไม่ใช่การฟ้องคดีโดยตรง แต่มีผลต่อความพร้อมของข้อเท็จจริง สัญญา และเอกสารที่ใช้ในทางกฎหมาย"
              />
              <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-semibold text-primary">
                  เหมาะสำหรับผู้ที่ต้องการ:
                </p>
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                    ตรวจร่างและตรวจเอกสารก่อนลงนาม
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                    จัดเตรียมเอกสารธุรกิจ ภาษี และเอกสารต่างประเทศ
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                    ได้แนวทางเบื้องต้นก่อนเริ่มดำเนินงานหรือเจรจา
                  </li>
                </ul>
                <div className="pt-2">
                  <Link
                    href="/th/services"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold-ink"
                  >
                    ดูบริการทั้งหมด
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {servicePreviewItems.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <SectionHeading
                title="หมวดคดีที่สำนักงานรับดำเนินการ"
                description="ภาพรวมหมวดคดีที่พบบ่อย เพื่อให้ผู้ติดต่อเลือกเส้นทางการปรึกษาได้ง่ายขึ้น"
              />
              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  หากเรื่องของท่านเกี่ยวข้องกับข้อพิพาทหรือการดำเนินคดี กรุณาเตรียมข้อเท็จจริง เอกสาร
                  และลำดับเหตุการณ์ให้พร้อม เพื่อให้การประเมินแนวทางเป็นไปอย่างถูกต้อง
                </p>
                <Link
                  href="/th/case-studies"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold-ink"
                >
                  ดูแนวทางงานคดี
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {casePreviewItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-border bg-white p-5 shadow-sm"
                >
                  <item.icon className="size-6 text-gold" aria-hidden="true" />
                  <h2 className="mt-4 font-serif text-xl font-bold text-primary">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <Container>
          <SectionHeading
            light
            hideDivider
            title="เหตุผลที่ลูกความเลือกสำนักงานนี้"
            description="ใช้แนวทางที่เน้นข้อเท็จจริง เอกสาร และความชัดเจนของขั้นตอน มากกว่าคำโฆษณา"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {whyPoints.map((point) => (
              <div key={point} className="rounded-xl border border-white/10 bg-white/6 p-5">
                <CheckCircle2 className="size-5 text-gold" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium leading-7 text-primary-foreground/85">{point}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                title={officeInfo.headLawyer}
                description="หัวหน้าสำนักงานที่ดูแลทิศทางการทำงานของสำนักงาน และประเมินแนวทางของแต่ละเรื่องด้วยข้อเท็จจริงและเอกสารที่เกี่ยวข้อง"
              />
              <div className="mt-8 rounded-2xl border border-gold/25 bg-card p-6">
                <p className="text-sm font-semibold text-gold-ink">หัวหน้าสำนักงาน</p>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {officeInfo.headLawyer} มีประสบการณ์ด้านงานกฎหมายมากกว่า 19 ปี
                  และมีบทบาทในการกำหนดแนวทางการทำงานร่วมกับทีมทนายความและฝ่ายสำนักงาน
                  โดยเน้นการตรวจข้อเท็จจริง การเตรียมเอกสาร และการสื่อสารขั้นตอนให้ชัดเจน
                </p>
                <Link
                  href="/th/team/kasem-chimphlee"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold-ink"
                >
                  ดูบทบาทและประวัติ
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/law-office-hero.webp"
                    alt={officeInfo.headLawyer}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                      Head Lawyer
                    </p>
                    <h2 className="mt-2 font-serif text-2xl font-bold">{officeInfo.headLawyer}</h2>
                    <p className="mt-2 text-sm leading-7 text-white/80">
                      กำกับแนวทางงานคดีและการให้คำปรึกษาอย่างเป็นระบบ
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs font-bold text-muted-foreground">ประสบการณ์</p>
                  <p className="mt-1 font-serif text-lg font-bold text-primary">มากกว่า 19 ปี</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs font-bold text-muted-foreground">ใบอนุญาต</p>
                  <p className="mt-1 font-serif text-lg font-bold text-primary">ตามข้อมูลที่มีอยู่</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary/25 py-16 md:py-20">
        <Container>
          <SectionHeading
            align="center"
            title="ขั้นตอนการทำงาน"
            description="ลำดับการทำงานที่ทำให้ลูกความเห็นภาพตั้งแต่การติดต่อครั้งแรกจนถึงการดำเนินงานต่อเนื่อง"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <article key={step.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <step.icon className="size-6 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-bold text-primary">{step.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title="บทความล่าสุด"
              description="บทความและคู่มือสั้น ๆ ที่ช่วยให้ผู้ติดต่อเตรียมตัวก่อนปรึกษาสำนักงาน"
            />
            <Link href="/th/articles" className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold-ink">
              ดูบทความทั้งหมด
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {legalArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                light
                hideDivider
                title="คำถามที่พบบ่อย"
                description="คำถามพื้นฐานที่ช่วยให้ผู้ติดต่อเตรียมข้อมูลให้พร้อมก่อนพูดคุยกับสำนักงาน"
              />
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/6 p-6">
                <p className="text-sm leading-7 text-primary-foreground/80">
                  หากยังไม่แน่ใจว่าควรเริ่มจากตรงไหน สามารถโทรหรือส่ง Line มาสอบถามเบื้องต้นได้ก่อน
                </p>
                <Link
                  href="/th/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold transition hover:text-white"
                >
                  ติดต่อสำนักงาน
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div>
              <FAQAccordion items={homeFaqs} />
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="ต้องการให้ทีมงานช่วยประเมินเรื่องของคุณ?"
        description="โทร Line หรือส่งรายละเอียดเบื้องต้นมาให้สำนักงานตรวจสอบก่อนนัดหมายได้"
      />
    </main>
  )
}
