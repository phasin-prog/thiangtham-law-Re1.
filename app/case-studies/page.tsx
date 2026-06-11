import { FileCheck2, LockKeyhole, SearchCheck } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'

const workflow = [
  {
    icon: SearchCheck,
    title: 'แยกประเด็นและตรวจเอกสาร',
    description:
      'เริ่มจากลำดับเหตุการณ์ เอกสารที่มี คู่กรณี กำหนดเวลา และเป้าหมายของผู้ขอคำปรึกษา',
  },
  {
    icon: FileCheck2,
    title: 'วางทางเลือกในการดำเนินการ',
    description:
      'อธิบายทางเลือกในการเจรจา การจัดทำหนังสือ การไกล่เกลี่ย หรือการดำเนินคดีตามความเหมาะสม',
  },
  {
    icon: LockKeyhole,
    title: 'รักษาความลับของลูกความ',
    description:
      'ตัวอย่างที่เผยแพร่จะต้องตัดข้อมูลระบุตัวบุคคลและได้รับอนุญาตตามความเหมาะสมก่อน',
  },
]

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHero
        title="ตัวอย่างแนวทางการทำงาน"
        description="ภาพรวมวิธีตรวจข้อมูล วางประเด็น และเลือกแนวทางดำเนินการ โดยไม่เปิดเผยข้อมูลลับหรือสร้างความคาดหวังต่อผลคดี"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ตัวอย่างผลงาน' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {workflow.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <item.icon className="size-7 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-bold text-primary">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-gold/35 bg-secondary/70 p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-primary">ไม่รับรองผลคดีจากตัวอย่าง</h2>
            <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">
              ผลของแต่ละเรื่องขึ้นอยู่กับข้อเท็จจริง พยานหลักฐาน ข้อกฎหมาย และดุลพินิจของหน่วยงานหรือศาล
              ตัวอย่างแนวทางการทำงานจึงไม่ใช่คำรับรองว่ากรณีอื่นจะได้รับผลเช่นเดียวกัน
            </p>
          </div>
        </Container>
      </section>
      <CTASection title="ต้องการให้ตรวจข้อมูลและประเมินแนวทางเบื้องต้น?" />
    </main>
  )
}
