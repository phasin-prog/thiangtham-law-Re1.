import type { Metadata } from 'next'
import { 
  Clock3, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Phone, 
  ClipboardCheck, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react'
import { Container } from '@/components/container'
import { ContactForm } from '@/components/contact-form'
import { MapSection } from '@/components/map-section'
import { PageHero } from '@/components/page-hero'
import { officeContact } from '@/lib/data/office'

export const metadata: Metadata = {
  title: 'ติดต่อและปรึกษาคดี | สำนักกฎหมายเที่ยงธรรมทนายความ',
  description: 'ติดต่อสำนักงานกฎหมายเที่ยงธรรมทนายความ เพื่อรับคำปรึกษาเบื้องต้นทางโทรศัพท์ LINE หรือนัดหมายเข้าพบเพื่อตรวจสอบเอกสารคดี',
}

export default function ContactPage() {
  const mainContacts = [
    { 
      icon: Phone, 
      label: 'สายด่วนปรึกษา', 
      value: officeContact.phones[0], 
      href: `tel:${officeContact.phones[0].replace(/-/g, '')}`,
      description: 'คุยกับทนายโดยตรง',
      primary: true
    },
    { 
      icon: MessageCircle, 
      label: 'LINE Official', 
      value: `@${officeContact.line}`, 
      href: `https://line.me/R/ti/p/~${officeContact.line}`,
      description: 'ส่งเอกสารประเมินฟรี',
      primary: true
    },
    { 
      icon: Mail, 
      label: 'อีเมล', 
      value: officeContact.email, 
      href: `mailto:${officeContact.email}`,
      description: 'ส่งรายละเอียดทางการ'
    },
    { 
      icon: MapPin, 
      label: 'ที่ตั้งสำนักงาน', 
      value: 'เดชอุดม อุบลราชธานี', 
      href: officeContact.mapUrl,
      description: 'ดูแผนที่นำทาง'
    },
  ]

  return (
    <main className="bg-ivory/20">
      {/* 1. Contact Hero */}
      <PageHero
        title="ติดต่อและปรึกษาคดี"
        description="เริ่มจากการรับฟังข้อเท็จจริงและตรวจเอกสารเบื้องต้น เพื่อให้ท่านทราบแนวทางและสิทธิของท่านอย่างชัดเจน"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ติดต่อเรา' }]}
      />

      <section className="py-16 md:py-24">
        <Container>
          {/* 2. Quick Contact Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mainContacts.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                target={item.href.startsWith('http') ? '_blank' : undefined} 
                rel="noreferrer"
                className={`group relative flex flex-col items-center rounded-[2rem] border p-10 text-center transition-all hover:-translate-y-2 hover:shadow-2xl ${
                  item.primary 
                    ? 'border-gold bg-white shadow-xl shadow-gold/5' 
                    : 'border-border bg-white shadow-sm'
                }`}
              >
                <div className={`mb-6 flex size-20 items-center justify-center rounded-3xl transition-all duration-300 group-hover:scale-110 ${
                  item.primary ? 'bg-primary text-gold' : 'bg-secondary text-primary'
                }`}>
                  <item.icon className="size-10" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{item.label}</p>
                <p className="font-serif text-xl font-bold text-primary mb-2 group-hover:text-gold transition-colors">{item.value}</p>
                <p className="text-sm font-medium text-muted-foreground/70">{item.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-12">
              {/* 5. Consultation Form */}
              <div id="consultation-form">
                <div className="mb-10">
                  <span className="text-sm font-bold uppercase tracking-widest text-gold">Inquiry Form</span>
                  <h2 className="mt-4 font-serif text-4xl font-bold text-primary">ส่งรายละเอียดปรึกษาเบื้องต้น</h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    กรุณากรอกข้อมูลและข้อเท็จจริงโดยสังเขป เพื่อให้ทนายความเตรียมข้อมูลก่อนติดต่อกลับ
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

            <div className="space-y-8">
              {/* 3. Office Hours */}
              <div className="rounded-[2.5rem] bg-primary p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Clock3 className="size-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-gold">
                      <Clock3 className="size-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold">เวลาทำการ</h3>
                  </div>
                  <div className="space-y-4 text-lg">
                    <p className="font-bold text-gold">จันทร์ – อาทิตย์</p>
                    <p className="text-white/80">{officeContact.hours.split(' เวลา ')[1]}</p>
                    <p className="mt-6 text-sm text-white/50 border-t border-white/10 pt-6">
                      * กรุณานัดหมายล่วงหน้าเพื่อให้ทนายความประจำสำนักงานเตรียมรับเรื่องและตรวจสอบเอกสารได้อย่างครบถ้วน
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. What to prepare before contacting */}
              <div className="rounded-[2.5rem] border border-border bg-white p-10 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                    <ClipboardCheck className="size-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-primary">เตรียมความพร้อม</h3>
                </div>
                <ul className="space-y-5">
                  {[
                    'บัตรประชาชนหรือข้อมูลผู้ติดต่อ',
                    'สัญญาหรือเอกสารที่เป็นประเด็นปัญหา',
                    'หมายศาลหรือหนังสือบอกกล่าว (ถ้ามี)',
                    'ลำดับเหตุการณ์พร้อมวันที่โดยประมาณ'
                  ].map((text, idx) => (
                    <li key={idx} className="flex gap-4 items-start text-muted-foreground">
                      <div className="size-2 rounded-full bg-gold mt-2.5 shrink-0" />
                      <span className="text-base font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 7. Privacy and legal disclaimer */}
              <div className="rounded-[2.5rem] bg-secondary/30 p-8 border border-gold/10">
                <div className="flex gap-5 items-start">
                  <ShieldCheck className="size-8 text-gold shrink-0 mt-1" />
                  <div className="space-y-3">
                    <h4 className="font-bold text-primary">การรักษาความลับและข้อมูลส่วนบุคคล</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      สำนักงานยึดถือจรรยาบรรณวิชาชีพในการรักษาความลับของลูกความอย่างเคร่งครัด ข้อมูลที่ท่านส่งผ่านช่องทางนี้จะถูกใช้เพื่อการประเมินคดีและติดต่อกลับเท่านั้น โดยไม่มีการเปิดเผยต่อบุคคลภายนอก
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Google Maps Section */}
          <div className="mt-16 md:mt-24">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
              <div className="flex flex-col justify-center rounded-[3rem] bg-white border border-border p-10 md:p-16 shadow-lg">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-gold mb-8">
                  <MapPin className="size-8" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-primary mb-6">ที่อยู่สำนักงาน</h3>
                <p className="text-xl leading-relaxed text-muted-foreground mb-12">
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
              <div className="min-h-[450px] overflow-hidden rounded-[3rem] shadow-xl border-8 border-white">
                <MapSection />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-primary py-12 text-white/50 border-t border-white/5">
        <Container className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <Info className="size-5 text-gold" />
            <p className="text-sm">
              คำแนะนำ: การให้คำปรึกษาที่แม่นยำต้องพิจารณาจากพยานหลักฐานจริง
            </p>
          </div>
          <p className="text-xs">
            © {new Date().getFullYear()} สำนักกฎหมายเที่ยงธรรมทนายความ. All Rights Reserved.
          </p>
        </Container>
      </section>
    </main>
  )
}
