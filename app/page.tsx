import Link from 'next/link'
import {
  ArrowRight,
  ScrollText,
  Search,
  ClipboardCheck,
  Handshake,
  BookOpen,
} from 'lucide-react'
import { HeroSection } from '@/components/hero-section'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { ContactCTA } from '@/components/contact-cta'
import { services, articles, lawyers, advisors, team } from '@/lib/site-data'
import AuthPanel from '@/components/auth-panel'

export default function HomePage() {
  const approach = [
    {
      icon: ScrollText,
      title: 'รับฟังและประเมินข้อเท็จจริง',
      desc: 'รับฟังเรื่องราว ตรวจสอบเอกสาร และประเมินข้อเท็จจริงเบื้องต้นอย่างรอบคอบ',
    },
    {
      icon: Search,
      title: 'วางแนวทางคดี',
      desc: 'วิเคราะห์พยานหลักฐานและกฎหมายที่เกี่ยวข้อง เพื่อวางแนวทางที่เหมาะสม',
    },
    {
      icon: ClipboardCheck,
      title: 'จัดเตรียมเอกสาร',
      desc: 'จัดทำและตรวจสอบเอกสารคดีให้ครบถ้วนตามขั้นตอนของกฎหมาย',
    },
    {
      icon: Handshake,
      title: 'ดูแลคดีและประสานงาน',
      desc: 'ว่าความ ดำเนินคดี และประสานงานกับลูกความตลอดกระบวนการ',
    },
  ]

  const caseServices = services.filter((service) =>
    ['civil-case', 'criminal-case', 'family-law', 'inheritance-law', 'debt-case', 'enforcement'].includes(service.slug)
  )

  return (
    <main>
      <HeroSection />

      <AuthPanel />

      {/* About preview */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="เกี่ยวกับเรา"
              title="เกี่ยวกับสำนักกฎหมายเที่ยงธรรมทนายความ"
              description="สำนักงานกฎหมายในอำเภอเดชอุดม จังหวัดอุบลราชธานี ให้บริการด้านการปรึกษา ว่าความ และดำเนินคดี โดยยึดความรอบคอบ ความเป็นธรรม และประโยชน์ของลูกความเป็นสำคัญ"
            />
            <p className="mt-4 leading-relaxed text-muted-foreground">
              เราให้ความสำคัญกับการอธิบายสิทธิ หน้าที่ และความเสี่ยงทางกฎหมายอย่างตรงไปตรงมา เพื่อให้ลูกความเข้าใจสถานการณ์และตัดสินใจได้อย่างมั่นใจ การทำงานทุกขั้นตอนดำเนินการตามข้อเท็จจริง พยานหลักฐาน และกฎหมายที่เกี่ยวข้อง
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-burgundy px-5 py-3 text-sm font-semibold text-burgundy-foreground transition-colors hover:bg-burgundy-dark"
            >
              อ่านประวัติสำนักงาน
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { num: 'แพ่ง · อาญา', label: 'ดูแลคดีหลากหลายประเภท' },
              { num: 'ครอบครัว · มรดก', label: 'ให้คำปรึกษาด้วยความเข้าใจ' },
              { num: 'หนี้ · สัญญา', label: 'ตรวจเอกสารอย่างรอบคอบ' },
              { num: 'ท้องถิ่น', label: 'ติดต่อสำนักงานได้จริง' },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-lg border border-border bg-card p-5"
              >
                <p className="font-serif text-lg font-bold text-burgundy">
                  {item.num}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case information */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            align="center"
            eyebrow="ข้อมูลเกี่ยวกับคดี"
            title="คดีที่สำนักงานให้คำปรึกษาและดูแล"
            description="แนะนำประเภทคดีสำคัญ พร้อมแนวทางและสิ่งที่ควรรู้ก่อนเข้าพบทนาย ความเข้าใจในเบื้องต้นช่วยให้คุณเตรียมตัวได้ดียิ่งขึ้น"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {caseServices.map((service) => (
              <div key={service.slug} className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-bold text-burgundy">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.intro}
                </p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {service.commonProblems.slice(0, 3).map((item) => (
                    <p key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-burgundy" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            align="center"
            eyebrow="บริการกฎหมาย"
            title="บริการทางกฎหมายที่ครอบคลุม"
            description="เราดูแลคดีและให้คำปรึกษาหลากหลายประเภท ตามข้อเท็จจริงและกฎหมายที่เกี่ยวข้อง"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-md border border-burgundy px-5 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-burgundy-foreground"
            >
              ดูบริการทั้งหมด
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* People preview */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            align="center"
            eyebrow="ทีมกฎหมายของเรา"
            title="ทีมกฎหมายของเรา"
            description="สำนักกฎหมายเที่ยงธรรมทนายความให้ความสำคัญกับการทำงานเป็นทีม ตั้งแต่การให้คำปรึกษา การตรวจเอกสาร การวางแนวทางคดี ไปจนถึงการประสานงานกับลูกความ"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                href: '/lawyers',
                label: 'ทนายความ',
                count: `${lawyers.length} ท่าน`,
                desc: 'ทนายความผู้ดูแลและว่าความในคดีประเภทต่าง ๆ',
              },
              {
                href: '/advisors',
                label: 'ที่ปรึกษา',
                count: `${advisors.length} ท่าน`,
                desc: 'ที่ปรึกษาที่ให้ความเห็นในประเด็นทางกฎหมาย',
              },
              {
                href: '/team',
                label: 'ทีมงาน',
                count: `${team.length} กลุ่มงาน`,
                desc: 'ทีมประสานงาน เอกสาร และนัดหมายของสำนักงาน',
              },
            ].map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-gold hover:shadow-md"
              >
                <p className="text-sm font-semibold text-gold-soft">
                  <span className="text-[oklch(0.55_0.1_60)]">{g.count}</span>
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-burgundy">
                  {g.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {g.desc}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-burgundy">
                  ดูรายละเอียด
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience / approach */}
      <section className="bg-burgundy text-burgundy-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            align="center"
            light
            eyebrow="แนวทางการทำงาน"
            title="ประสบการณ์และแนวทางการทำงาน"
            description="เราดำเนินงานอย่างเป็นระบบในทุกขั้นตอน เพื่อให้ลูกความได้รับการดูแลอย่างรอบคอบ"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-lg border border-gold/30 bg-burgundy-dark/50 p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="absolute right-5 top-5 font-serif text-2xl font-bold text-gold/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-gold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-burgundy-foreground/80">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles preview */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="บทความ"
              title="บทความกฎหมายและสาระน่ารู้"
              description="ความรู้ทางกฎหมายเบื้องต้นที่อาจเป็นประโยชน์ต่อการเริ่มต้น"
            />
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy transition-colors hover:text-burgundy-dark"
            >
              ดูบทความทั้งหมด
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/articles`}
                className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-gold hover:shadow-md"
              >
                <span className="flex items-center gap-2 text-xs font-medium text-burgundy">
                  <BookOpen className="size-3.5" aria-hidden="true" />
                  {a.category} · {a.readTime}
                </span>
                <h3 className="mt-3 font-serif text-lg font-bold text-burgundy">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {a.excerpt}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-burgundy">
                  อ่านต่อ
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  )
}
