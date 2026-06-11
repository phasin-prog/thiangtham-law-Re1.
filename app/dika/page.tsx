import { BookOpenCheck, FileSearch, Scale } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'

const principles = [
  {
    icon: FileSearch,
    title: 'ตรวจข้อเท็จจริงของคดี',
    description:
      'คำพิพากษาแต่ละเรื่องอ้างอิงข้อเท็จจริงและพยานหลักฐานเฉพาะกรณี จึงต้องเปรียบเทียบอย่างระมัดระวัง',
  },
  {
    icon: BookOpenCheck,
    title: 'ตรวจบทกฎหมายและแนววินิจฉัย',
    description:
      'พิจารณาบทบัญญัติที่ใช้บังคับ ประเด็นที่ศาลวินิจฉัย และเหตุผลประกอบคำพิพากษา',
  },
  {
    icon: Scale,
    title: 'ใช้ประกอบการวางแนวทาง',
    description:
      'แนวคำพิพากษาเป็นข้อมูลประกอบการวิเคราะห์ ไม่ใช่คำรับรองว่าคดีอื่นจะมีผลเช่นเดียวกัน',
  },
]

export default function DikaPage() {
  return (
    <main>
      <PageHero
        title="ฎีกาและแนวคำพิพากษา"
        description="หลักการอ่านและใช้แนวคำพิพากษาเพื่อประกอบการวิเคราะห์ข้อกฎหมายอย่างเหมาะสม"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ฎีกา' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <item.icon className="size-7 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-bold text-primary">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-secondary/70 p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-primary">ข้อควรทราบ</h2>
            <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">
              เนื้อหาในหมวดนี้เป็นข้อมูลทั่วไป การนำคำพิพากษาไปใช้กับข้อพิพาทจริงต้องตรวจข้อเท็จจริง
              เอกสาร กฎหมายที่ใช้บังคับ และแนวคำพิพากษาที่เป็นปัจจุบันก่อนเสมอ
            </p>
          </div>
        </Container>
      </section>
      <CTASection title="ต้องการวิเคราะห์แนวคำพิพากษาที่เกี่ยวข้องกับเรื่องของคุณ?" />
    </main>
  )
}
