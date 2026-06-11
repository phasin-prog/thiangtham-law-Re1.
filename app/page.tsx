import Link from 'next/link'
import {
  ArrowRight,
  BookOpenText,
  Building2,
  CalendarCheck2,
  ClipboardCheck,
  FileSearch,
  Gavel,
  Images,
  Scale,
  Send,
  UsersRound,
} from 'lucide-react'
import { AboutPreviewSection } from '@/components/about-preview-section'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { FreeConsultationSection } from '@/components/free-consultation-section'
import { HeroSection } from '@/components/hero-section'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { TeamPreviewSection } from '@/components/team-preview-section'
import { WhyChooseUsSection } from '@/components/why-choose-us-section'
import { legalArticles } from '@/lib/data/articles'
import { featuredLegalServices } from '@/lib/data/services'

const trustCards = [
  {
    href: '/about',
    icon: Building2,
    title: 'เกี่ยวกับเรา',
    description: 'ประวัติ แนวคิด และหลักการทำงานของสำนักงาน',
  },
  {
    href: '/services',
    icon: Scale,
    title: 'บริการของเรา',
    description: 'ค้นหาบริการด้านคดี สัญญา และงานกฎหมาย',
  },
  {
    href: '/legal-knowledge',
    icon: BookOpenText,
    title: 'กฎหมายน่ารู้',
    description: 'อ่านบทความและคู่มือกฎหมายสำหรับประชาชน',
  },
  {
    href: '/team',
    icon: UsersRound,
    title: 'ทีมทนายและที่ปรึกษา',
    description: 'รู้จักหัวหน้าสำนักงานและทีมกฎหมายของเรา',
  },
] as const

const processSteps = [
  { icon: Send, title: 'ติดต่อสำนักงาน', description: 'โทร แอดไลน์ หรือส่งแบบฟอร์มเพื่อแจ้งเรื่องเบื้องต้น' },
  { icon: CalendarCheck2, title: 'แจ้งข้อเท็จจริงเบื้องต้น', description: 'เล่าเหตุการณ์ คู่กรณี กำหนดเวลา และสิ่งที่ต้องการความช่วยเหลือ' },
  { icon: FileSearch, title: 'ตรวจเอกสารและประเมินแนวทาง', description: 'ตรวจข้อมูล พยานหลักฐาน และประเด็นที่ต้องสอบถามเพิ่มเติม' },
  { icon: ClipboardCheck, title: 'วางกลยุทธ์ทางคดี', description: 'อธิบายทางเลือก ขั้นตอน ค่าใช้จ่าย และความเสี่ยงก่อนตัดสินใจ' },
  { icon: Gavel, title: 'ดำเนินการตามขั้นตอนกฎหมาย', description: 'เจรจา จัดทำเอกสาร ยื่นคำร้อง ฟ้องคดี หรือว่าความตามขอบเขตงาน' },
] as const

const caseStudyCards = [
  {
    icon: Building2,
    title: 'กิจกรรมสำนักงาน',
    description: 'บรรยากาศการทำงาน การประชุม และการเตรียมข้อมูลคดี',
  },
  {
    icon: Gavel,
    title: 'งานด้านคดีและศาล',
    description: 'นำเสนอภาพรวมกระบวนการทำงานโดยไม่เปิดเผยข้อมูลลูกความ',
  },
  {
    icon: Images,
    title: 'เผยแพร่ความรู้กฎหมาย',
    description: 'กิจกรรมให้ความรู้และสื่อกฎหมายสำหรับประชาชน',
  },
] as const

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <section className="relative z-10 -mt-5 pb-12 md:-mt-8">
        <Container>
          <div className="grid overflow-hidden rounded-2xl border border-gold/25 bg-card shadow-xl sm:grid-cols-2 lg:grid-cols-4">
            {trustCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group border-b border-border p-5 transition hover:bg-secondary/70 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <card.icon className="size-6 text-gold" aria-hidden="true" />
                <h2 className="mt-3 font-serif text-lg font-bold text-primary">{card.title}</h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{card.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                  ดูข้อมูล
                  <ArrowRight className="size-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FreeConsultationSection />

      <section className="pb-16 md:pb-22">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="บริการกฎหมาย"
            title="บริการหลักของสำนักงาน"
            description="ให้คำปรึกษา รับว่าความ จัดทำเอกสาร และดำเนินคดี โดยพิจารณาจากข้อเท็จจริงและพยานหลักฐานของแต่ละกรณี"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredLegalServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              ดูบริการทั้งหมด
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <AboutPreviewSection />
      <TeamPreviewSection />
      <WhyChooseUsSection />

      <section className="bg-secondary/60 py-16 md:py-22">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="ขั้นตอนการใช้บริการ"
            title="เริ่มต้นปรึกษาได้โดยไม่ต้องรู้ศัพท์กฎหมาย"
            description="เพียงเล่าข้อเท็จจริงตามลำดับและส่งเอกสารที่มี ทีมงานจะช่วยจัดประเด็นและอธิบายขั้นตอนถัดไป"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <article key={step.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="absolute right-5 top-4 font-serif text-4xl font-bold text-gold/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-gold">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-lg font-bold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-gold"
            >
              ดูขั้นตอนโดยละเอียด <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-primary py-16 text-primary-foreground md:py-22">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              light
              eyebrow="กฎหมายน่ารู้"
              title="ความรู้เบื้องต้นก่อนตัดสินใจ"
              description="อ่านแนวทางเตรียมตัว เอกสาร และขั้นตอนสำคัญ โดยเนื้อหาเป็นข้อมูลทั่วไปและไม่แทนคำปรึกษาเฉพาะกรณี"
            />
            <Link href="/legal-knowledge" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
              ดูบทความทั้งหมด <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {legalArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-22">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="กิจกรรมและแนวทางการทำงาน"
            title="ภาพรวมสำนักงานและตัวอย่างผลงาน"
            description="นำเสนอการทำงานและกิจกรรมโดยรักษาความลับ ไม่เปิดเผยข้อมูลที่ระบุตัวลูกความ และไม่รับรองผลคดีจากตัวอย่าง"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {caseStudyCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <card.icon className="size-7 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-xl font-bold text-primary">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{card.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-gold"
            >
              ดูตัวอย่างแนวทางการทำงาน <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <CTASection
        title="มีปัญหากฎหมาย ต้องการปรึกษาทนาย?"
        description="ให้ทีมงานของเราช่วยตรวจข้อมูลและประเมินแนวทางเบื้องต้นผ่านช่องทางที่คุณสะดวก"
      />
    </main>
  )
}
