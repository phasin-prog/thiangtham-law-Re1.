import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  History,
  Handshake,
  Target,
} from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { OfficeStats } from '@/components/office-stats'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { officeContact, officeInfo } from '@/lib/data/office'
import { lawyers } from '@/lib/data/lawyers'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | สำนักกฎหมายเที่ยงธรรมทนายความ',
  description:
    'สำนักกฎหมายเที่ยงธรรมทนายความ ก่อตั้งเมื่อปี พ.ศ. 2550 นำโดยนายเกษม ฉิมพลี พร้อมทีมทนายความและที่ปรึกษาผู้เชี่ยวชาญ ให้คำปรึกษาและรับว่าความทั่วราชอาณาจักร',
}

const headLawyer = lawyers.find((l) => l.slug === 'kasem-chimphlee') || lawyers[0]

const values = [
  {
    icon: Target,
    title: 'วิสัยทัศน์ (Vision)',
    description: 'มุ่งสู่การเป็นสำนักงานกฎหมายที่ได้รับความไว้วางใจสูงสุด โดยยึดมั่นในความถูกต้องตามข้อเท็จจริงและพยานหลักฐานเป็นสำคัญ',
  },
  {
    icon: Handshake,
    title: 'พันธกิจ (Mission)',
    description: 'ให้บริการปรึกษากฎหมายและรับว่าความอย่างมืออาชีพ ตรงไปตรงมา เพื่อปกป้องผลประโยชน์ของลูกความภายใต้กรอบแห่งกฎหมายและความเที่ยงธรรม',
  },
  {
    icon: ShieldCheck,
    title: 'ค่านิยม (Values)',
    description: 'ยึดถือความซื่อสัตย์ โปร่งใส ทุ่มเทในการทำงาน และรักษาความลับของลูกความอย่างเคร่งครัดเป็นหัวใจสำคัญ',
  },
] as const

const contactItems = [
  { 
    icon: Phone, 
    label: 'โทรศัพท์', 
    value: officeContact.phones[0], 
    href: `tel:${officeContact.phones[0].replace(/-/g, '')}`,
    subValue: officeContact.phones[1]
  },
  { icon: MessageCircle, label: 'LINE Official', value: `@${officeContact.line}`, href: `https://line.me/R/ti/p/~${officeContact.line}`, subValue: undefined },
  { icon: Mail, label: 'อีเมลสำนักงาน', value: officeContact.email, href: `mailto:${officeContact.email}`, subValue: undefined },
  { icon: Clock3, label: 'เวลาทำการ', value: officeContact.hours, href: undefined, subValue: undefined },
] as const

export default function AboutPage() {
  return (
    <main>
      {/* 1. About Hero */}
      <PageHero
        title="เกี่ยวกับเรา"
        description="กว่า 19 ปีแห่งความมุ่งมั่นในการมอบความยุติธรรมและการดูแลผลประโยชน์ของลูกความด้วยความเป็นมืออาชีพ"
        crumbs={[{ href: '/th', label: 'หน้าแรก' }, { label: 'เกี่ยวกับเรา' }]}
      />

      {/* 2. Office History */}
      <section className="py-20 md:py-32">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div data-motion-portrait="" className="relative">
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] border-8 border-white bg-primary shadow-2xl">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/law-office-hero.webp"
                  alt="สำนักกฎหมายเที่ยงธรรมทนายความ"
                  fill
                  quality={90}
                  className="object-cover opacity-70 mix-blend-overlay"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-10 text-white">
                  <div className="inline-block rounded-full bg-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold mb-4">
                    Established 2007
                  </div>
                  <h3 className="font-serif text-3xl font-bold leading-tight">
                    พ.ศ. {officeInfo.establishedYear}
                  </h3>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 -z-10 size-72 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 -z-10 size-72 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div data-motion-reveal="">
            <div className="flex items-center gap-3 mb-6">
              <History className="size-5 text-gold" />
              <span className="text-sm font-bold uppercase tracking-widest text-gold">ประวัติความเป็นมา</span>
            </div>
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl leading-tight">
              ให้บริการด้านกฎหมายด้วยความเที่ยงธรรมและเป็นระบบ
            </h2>
            <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground text-lg">
              <p>
                <strong>{officeInfo.name}</strong> ก่อตั้งขึ้นเมื่อปี พ.ศ. {officeInfo.establishedYear} โดยมี 
                <strong> {officeInfo.headLawyer}</strong> เป็นหัวหน้าสำนักงาน ด้วยเจตนารมณ์ที่ต้องการสร้างบรรทัดฐานการให้บริการด้านกฎหมายที่โปร่งใสและตรวจสอบได้
              </p>
              <p>
                ตลอดระยะเวลากว่า {officeInfo.headLawyerExperience} ที่ผ่านมา เรามุ่งเน้นการวิเคราะห์ข้อเท็จจริงในทุกมิติ การเตรียมพยานหลักฐานที่รัดกุม และการวางแนวทางคดีอย่างเป็นระบบ เพื่อให้ลูกความได้รับความเข้าใจที่ชัดเจนในสถานะของคดีและผลลัพธ์ที่เป็นไปได้
              </p>
              <p>
                เราเชื่อมั่นว่าการทำงานที่ละเอียดรอบคอบและการรักษาความลับของลูกความ คือหัวใจสำคัญที่ทำให้สำนักงานได้รับความไว้วางใจมาอย่างยาวนาน
              </p>
            </div>
            <div className="mt-12">
              <OfficeStats />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Head Lawyer Feature */}
      <section className="bg-primary py-24 md:py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 size-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 size-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5 blur-[100px]" />
        
        <Container className="relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
            <div data-motion-reveal="">
              <div className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold mb-6">
                {officeInfo.headLawyerTitle}
              </div>
              <h2 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
                {headLawyer.name}
              </h2>
              <p className="mt-6 text-xl text-white/70 leading-relaxed font-serif">
                ทนายความผู้เชี่ยวชาญด้วยประสบการณ์กว่า 19 ปี
              </p>
              
              <div className="mt-12 space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="size-6 text-gold" />
                    <h3 className="font-serif text-2xl font-bold text-gold">ความเชี่ยวชาญพิเศษ</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {headLawyer.expertise?.map((exp) => (
                      <span key={exp} className="rounded-xl bg-white/5 px-5 py-3 text-sm border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="size-6 text-gold" />
                    <h3 className="font-serif text-2xl font-bold text-gold">ประวัติการศึกษา</h3>
                  </div>
                  <ul className="space-y-4">
                    {headLawyer.education?.map((edu, idx) => (
                      <li key={idx} className="flex gap-4 text-white/80 leading-relaxed text-lg">
                        <div className="size-2 rounded-full bg-gold mt-2.5 shrink-0" />
                        {edu.degree}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div data-motion-portrait="" className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-2xl">
                <Image
                  src={headLawyer.image || '/staff/kasem-chimphli.svg'}
                  alt={headLawyer.name}
                  fill
                  className="object-contain p-8 md:p-12"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 md:-left-12 rounded-3xl bg-gold p-8 md:p-10 text-primary shadow-2xl max-w-xs">
                <Scale className="size-12 mb-6" />
                <p className="font-serif text-2xl font-bold leading-tight italic">
                  &quot;ยึดมั่นความเที่ยงธรรม รักษาความลับลูกความ&quot;
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Office Contact Block */}
      <section className="py-24 md:py-32 bg-secondary/10">
        <Container>
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-sm font-bold uppercase tracking-widest text-gold mb-4">Communication</span>
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">ติดต่อสำนักงาน</h2>
            <div className="mt-8 h-1 w-20 bg-gold" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {contactItems.map((item) => {
              const content = (
                <>
                  <div className="mb-8 flex size-20 items-center justify-center rounded-3xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-gold group-hover:scale-110">
                    <item.icon className="size-10" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{item.label}</p>
                  <p className="font-serif text-xl font-bold text-primary group-hover:text-gold transition-colors">{item.value}</p>
                  {item.subValue && <p className="font-serif text-lg font-bold text-primary/60 mt-1">{item.subValue}</p>}
                </>
              )

              return item.href ? (
                <a 
                  key={item.label} 
                  href={item.href} 
                  target={item.href.startsWith('http') ? '_blank' : undefined} 
                  rel="noreferrer"
                  className="group relative flex flex-col items-center rounded-[2.5rem] border border-border bg-white p-10 text-center transition-all hover:-translate-y-2 hover:border-gold hover:shadow-2xl"
                >
                  {content}
                </a>
              ) : (
                <div 
                  key={item.label}
                  className="group relative flex flex-col items-center rounded-[2.5rem] border border-border bg-white p-10 text-center shadow-sm"
                >
                  {content}
                </div>
              )
            })}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col justify-center rounded-[3rem] bg-white border border-border p-10 md:p-16 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <MapPin className="size-48" />
              </div>
              <div className="relative z-10">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-gold mb-8">
                  <MapPin className="size-8" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-primary mb-6">ที่อยู่สำนักงาน</h3>
                <p className="text-xl leading-relaxed text-muted-foreground mb-12 max-w-xl">
                  {officeContact.address}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={officeContact.mapUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-2xl bg-primary px-10 py-5 text-sm font-bold text-white transition-all hover:bg-primary-dark hover:shadow-lg active:scale-95"
                  >
                    เปิดใน Google Maps
                    <ArrowRight className="size-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-[3rem] bg-primary p-10 md:p-16 text-white shadow-xl flex flex-col justify-center">
              <h3 className="font-serif text-3xl font-bold text-gold mb-8">การนัดหมาย</h3>
              <p className="leading-relaxed text-lg text-white/80 mb-10">
                เพื่อให้การวิเคราะห์คดีมีความละเอียดรอบคอบ กรุณานัดหมายล่วงหน้าก่อนเข้าพบ
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="size-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="size-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-white/90">ปรึกษาปัญหาเบื้องต้นผ่านโทรศัพท์หรือ LINE</span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="size-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="size-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-white/90">เตรียมเอกสารที่เกี่ยวข้องให้ครบถ้วน</span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="size-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="size-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-white/90">รับฟังการวิเคราะห์อย่างตรงไปตรงมา</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Vision / Mission / Values */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-white">
        <Container>
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-sm font-bold uppercase tracking-widest text-gold mb-4">Our Principles</span>
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">วิสัยทัศน์และพันธกิจ</h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center text-center rounded-[2.5rem] bg-ivory/30 p-12 border border-border/50 transition-all hover:bg-white hover:shadow-2xl hover:border-gold/20">
                <div className="mb-10 flex size-24 items-center justify-center rounded-full bg-gold/10 text-gold-ink">
                  <value.icon className="size-12" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-6">{value.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Team Summary */}
      <section className="py-24 md:py-32 bg-secondary/5">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div data-motion-reveal="">
              <SectionHeading
                eyebrow="Our Team"
                title="ความร่วมมือของทีมผู้เชี่ยวชาญ"
                description={`สำนักงานมีทีมทนายความและที่ปรึกษา${officeInfo.teamSize} ที่พร้อมทุ่มเททำงานเพื่อรักษาผลประโยชน์ของลูกความ เราทำงานร่วมกันเป็นทีมเพื่อให้ครอบคลุมทุกแง่มุมของกฎหมายอย่างละเอียดรอบคอบ`}
              />
              <div className="mt-12 flex flex-col gap-8">
                <div className="flex gap-6 items-start">
                  <div className="size-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0">
                    <Briefcase className="size-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-xl">เชี่ยวชาญเฉพาะทาง</h4>
                    <p className="text-muted-foreground mt-2 leading-relaxed">ทีมทนายความที่มีประสบการณ์ในคดีหลากหลายประเภท ทั้งแพ่ง อาญา และคดีพิเศษ</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="size-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0">
                    <ShieldCheck className="size-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-xl">มาตรฐานวิชาชีพ</h4>
                    <p className="text-muted-foreground mt-2 leading-relaxed">ยึดถือมรรยาททนายความและความเป็นส่วนตัวของลูกความเป็นอันดับหนึ่ง</p>
                  </div>
                </div>
              </div>
              <div className="mt-14">
                <Link
                  href="/th/team"
                  className="inline-flex items-center gap-3 rounded-2xl bg-primary px-10 py-5 text-sm font-bold text-white shadow-xl transition-all hover:bg-primary-dark hover:scale-105"
                >
                  ทำความรู้จักทีมงานทั้งหมด
                  <ArrowRight className="size-5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {lawyers.slice(1, 5).map((lawyer, idx) => (
                <div key={idx} className={`relative overflow-hidden rounded-[2.5rem] shadow-lg ${idx % 2 === 1 ? 'translate-y-12' : ''}`}>
                  <div className="aspect-[3/4] relative bg-white">
                    <Image
                      src={lawyer.image || '/person-placeholder.svg'}
                      alt={lawyer.name}
                      fill
                      className="object-contain p-6 opacity-90 transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                    <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">{lawyer.role}</p>
                    <p className="font-serif text-xl font-bold leading-tight">{lawyer.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Final CTA */}
      <CTASection title="พร้อมยืนหยัดเพื่อความยุติธรรมและผลประโยชน์ของท่าน" />
    </main>
  )
}
