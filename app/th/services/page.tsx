import Link from 'next/link'
import { ArrowRight, FileText, Gavel } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { ServiceCard } from '@/components/service-card'
import { SectionHeading } from '@/components/section-heading'
import { getLegalService } from '@/lib/data/services'

const nonLitigationSlugs = [
  'contracts',
  'business',
  'legal-advisory',
  'tax',
  'visa-foreign-documents'
]

const litigationSlugs = [
  'civil',
  'criminal',
  'family',
  'inheritance',
  'land',
  'administrative',
  'cheque',
  'anti-corruption',
  'enforcement'
]

function resolveServices(slugs: string[]) {
  return slugs
    .map((slug) => getLegalService(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
}

const mainServices = resolveServices(nonLitigationSlugs)
const litigationServices = resolveServices(litigationSlugs)

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="บริการกฎหมาย"
        description="บริการที่ปรึกษากฎหมายธุรกิจ งานทะเบียน สัญญา ภาษี และบริการด้านเอกสารต่างประเทศครบวงจร"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'บริการกฎหมาย' }]}
      />

      {/* Intro Section */}
      <section className="py-20 bg-ivory/30">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl leading-tight">
                มุ่งเน้นการป้องกันและวางแผนทางกฎหมายอย่างมีระบบ
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                นอกจากการว่าความในศาล สำนักงานกฎหมายเที่ยงธรรมให้ความสำคัญกับการให้คำปรึกษาเพื่อลดความเสี่ยง 
                การจัดทำนิติกรรมสัญญาที่รัดกุม และการประสานงานด้านเอกสารราชการอย่างมืออาชีพ
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/th/contact"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-primary px-8 text-base font-bold text-white shadow-xl transition-all hover:bg-primary-dark hover:-translate-y-1"
              >
                ปรึกษาเบื้องต้น
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Non-Litigation Services */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-gold mb-4">Our Core Services</span>
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">ที่ปรึกษาและงานนิติกรรม</h2>
            <div className="mt-8 h-1 w-20 bg-gold" />
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mainServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Litigation Section (Secondary) */}
      <section className="bg-secondary/10 py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[350px_1fr]">
            <aside>
              <div className="sticky top-32">
                <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-primary text-gold mb-8">
                  <Gavel className="size-8" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-6">งานคดีและกระบวนการศาล</h2>
                <p className="text-lg leading-relaxed text-muted-foreground mb-10">
                  ครอบคลุมการว่าความและการต่อสู้คดีทุกประเภท โดยทีมทนายความที่มีประสบการณ์สูงในแต่ละสาขา
                </p>
                <Link
                  href="/th/case-studies"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:text-gold transition-colors"
                >
                  ดูตัวอย่างงานคดี
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </aside>
            <div className="grid gap-6 sm:grid-cols-2">
              {litigationServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Fee Policy Section */}
      <section className="py-24">
        <Container>
          <div className="rounded-[3rem] border border-border bg-white p-10 md:p-16 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
              <FileText className="size-64" />
            </div>
            <div className="relative z-10">
              <SectionHeading
                title="ความโปร่งใสเรื่องค่าธรรมเนียม"
                description="เราให้ความสำคัญกับความชัดเจนในเรื่องค่าใช้จ่าย เพื่อให้ลูกความสามารถวางแผนงบประมาณได้อย่างแม่นยำ"
              />
              
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: 'ปรึกษาเบื้องต้น', desc: 'วิเคราะห์ข้อเท็จจริงและเอกสารเบื้องต้นเพื่อประเมินแนวทาง', price: 'ตามขอบเขตงาน' },
                  { title: 'งานนิติกรรมสัญญา', desc: 'ร่างและตรวจสัญญาตามความซับซ้อนและมูลค่าของธุรกิจ', price: 'เริ่มต้นตามตกลง' },
                  { title: 'งานทะเบียนธุรกิจ', desc: 'จดทะเบียนนิติบุคคล ภาษี และเอกสารราชการต่าง ๆ', price: 'ตามอัตราค่าธรรมเนียม' },
                  { title: 'ที่ปรึกษาประจำ', desc: 'บริการดูแลงานกฎหมายรายเดือนสำหรับนิติบุคคลและธุรกิจ', price: 'รายเดือน/รายปี' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col rounded-2xl bg-secondary/30 p-8 transition-transform hover:-translate-y-1">
                    <h3 className="font-serif text-xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.desc}</p>
                    <p className="mt-auto font-bold text-primary">{item.price}</p>
                  </div>
                ))}
              </div>
              
              <p className="mt-12 text-sm text-muted-foreground border-t border-border pt-8 italic">
                * อัตราค่าบริการจะพิจารณาเสนอเป็นลายลักษณ์อักษรหลังได้รับทราบรายละเอียดและข้อเท็จจริงครบถ้วน
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="ต้องการที่ปรึกษากฎหมายสำหรับธุรกิจของคุณ?"
        description="ติดต่อเพื่อสอบถามข้อมูลเบื้องต้นหรือนัดหมายเข้าพบทีมงานเพื่อปรึกษาหารืออย่างละเอียด"
      />
    </main>
  )
}
