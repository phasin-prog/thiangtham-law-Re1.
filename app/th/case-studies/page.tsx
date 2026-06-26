import type { Metadata } from 'next'
import { Gavel, ClipboardCheck, Scale, ShieldAlert, ArrowRight } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { ServiceCard } from '@/components/service-card'
import { getLegalService } from '@/lib/data/services'

const litigationSlugs = [
  'civil',
  'criminal',
  'family',
  'inheritance',
  'land',
  'cheque',
  'appeal'
]

function resolveServices(slugs: string[]) {
  return slugs
    .map((slug) => getLegalService(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
}

const litigationServices = resolveServices(litigationSlugs)

const processSteps = [
  {
    title: 'รับข้อเท็จจริงและตรวจเอกสาร',
    description:
      'ทีมทนายความตรวจสอบลำดับเหตุการณ์ คู่กรณี และเอกสารสำคัญอย่างละเอียดเพื่อประเมินสถานะของคดี',
  },
  {
    title: 'วิเคราะห์ประเด็นและพยานหลักฐาน',
    description:
      'แยกประเด็นที่ต้องพิสูจน์ ตรวจสอบข้อกฎหมายที่เกี่ยวข้อง และระบุพยานหลักฐานเพิ่มเติมที่จำเป็น',
  },
  {
    title: 'วางกลยุทธ์และดำเนินคดี',
    description:
      'เสนอแนวทางการต่อสู้คดีหรือการเจรจาที่เหมาะสมที่สุด พร้อมจัดทำคำฟ้อง คำให้การ หรือเอกสารคดี',
  },
  {
    title: 'ติดตามผลและรายงานความคืบหน้า',
    description:
      'แจ้งสถานะการดำเนินงานในทุกขั้นตอนสำคัญของกระบวนการศาล และปรับแผนตามข้อเท็จจริงที่เกิดขึ้น',
  },
]

export const metadata: Metadata = {
  title: 'งานคดีที่รับดำเนินการ | สำนักกฎหมายเที่ยงธรรมทนายความ',
  description:
    'บริการว่าความและดำเนินคดีทุกประเภท ตั้งแต่คดีแพ่ง อาญา ครอบครัว มรดก ที่ดิน ไปจนถึงชั้นอุทธรณ์และฎีกา โดยทีมทนายความมืออาชีพ',
  alternates: {
    canonical: 'https://www.thiangthamlaw.com/th/case-studies',
  },
}

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHero
        title="งานคดีที่รับดำเนินการ"
        description="บริการว่าความ ฟ้องคดี และต่อสู้คดี โดยยึดถือพยานหลักฐานและข้อเท็จจริงเป็นสำคัญ เพื่อรักษาผลประโยชน์สูงสุดของลูกความตามกรอบกฎหมาย"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'งานคดี' }]}
      />

      {/* Case Categories Grid */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-gold mb-4">Litigation Categories</span>
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">หมวดหมู่คดีความ</h2>
            <div className="mt-8 h-1 w-20 bg-gold" />
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {litigationServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Professional Process Section */}
      <section className="bg-secondary/10 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-gold mb-8">
                <Gavel className="size-7" />
              </div>
              <h2 className="font-serif text-4xl font-bold text-primary mb-6">มาตรฐานการทำงานคดี</h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                เราให้ความสำคัญกับความลับของลูกความและความโปร่งใสในกระบวนการทำงาน 
                ทนายความจะอธิบายทางเลือก ความเสี่ยง และความเป็นไปได้ตามพยานหลักฐานที่มีอยู่จริง 
                โดยไม่ให้ความหวังที่เกินจริงหรือการันตีผลลัพธ์ของคดี
              </p>
              <ul className="space-y-4">
                {[
                  'รักษาความลับลูกความอย่างสูงสุด',
                  'วิเคราะห์คดีตามข้อเท็จจริงและข้อกฎหมาย',
                  'รายงานความคืบหน้าอย่างต่อเนื่อง',
                  'ยึดถือมรรยาททนายความอย่างเคร่งครัด'
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-primary font-bold">
                    <Scale className="size-5 text-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-6 rounded-3xl bg-white p-8 shadow-sm border border-border transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-gold font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Preparation Section */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="rounded-[3rem] bg-primary p-10 md:p-20 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-[0.05]">
              <ClipboardCheck className="size-64" />
            </div>
            
            <div className="relative z-10 grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-4xl font-bold text-gold mb-8">สิ่งที่ควรเตรียมก่อนปรึกษา</h2>
                <p className="text-xl leading-relaxed text-white/70 mb-10">
                  เพื่อให้การประเมินแนวทางคดีมีความรวดเร็วและแม่นยำ กรุณารวบรวมข้อมูลและเอกสารเบื้องต้น ดังนี้:
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="/th/contact"
                    className="inline-flex items-center gap-3 rounded-2xl bg-gold px-10 py-5 text-sm font-black uppercase tracking-widest text-primary shadow-xl transition-all hover:bg-gold-soft active:scale-95"
                  >
                    ติดต่อทนายความ
                    <ArrowRight className="size-5" />
                  </a>
                </div>
              </div>
              
              <ul className="space-y-6">
                {[
                  { title: 'เอกสารสำคัญ', desc: 'บัตรประชาชน สัญญา หนังสือบอกกล่าว หรือหมายศาล' },
                  { title: 'ลำดับเหตุการณ์', desc: 'สรุปเหตุการณ์ที่เกิดขึ้นพร้อมระบุวันเวลาโดยประมาณ' },
                  { title: 'พยานหลักฐาน', desc: 'หลักฐานการโอนเงิน ข้อความแชท หรือภาพถ่าย' },
                  { title: 'เป้าหมาย', desc: 'สิ่งที่ต้องการ เช่น การเจรจา การฟ้องร้อง หรือการตั้งรับ' }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-5 items-start">
                    <div className="size-2 rounded-full bg-gold mt-2.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-gold text-lg">{item.title}</h4>
                      <p className="text-white/60 text-base">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 flex gap-6 items-start rounded-3xl bg-secondary/20 p-8 border border-gold/20">
            <ShieldAlert className="size-8 text-gold shrink-0 mt-1" />
            <div className="space-y-2">
              <h4 className="font-bold text-primary">คำแนะนำเรื่องข้อมูลคดี</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                การวิเคราะห์คดีเบื้องต้นเป็นเพียงการประเมินจากข้อมูลที่มีอยู่ แนวทางจริงอาจเปลี่ยนแปลงได้ตามพยานหลักฐานของคู่กรณี 
                และดุลพินิจของศาลในแต่ละกระบวนพิจารณา
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection title="พร้อมยืนหยัดเพื่อความถูกต้องและผลประโยชน์สูงสุดของท่าน" />
    </main>
  )
}
