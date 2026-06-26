import { BookOpenCheck, FileSearch, Scale, Gavel, ChevronRight } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import Link from 'next/link'

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

const dikaSamples = [
  {
    id: 'dika-1',
    year: '2565',
    category: 'คดีแพ่ง (ละเมิด)',
    title: 'การเรียกค่าเสียหายกรณีละเมิดและอายุความ',
    summary: 'วินิจฉัยเรื่องการนับอายุความในมูลหนี้ละเมิด เมื่อผู้เสียหายทราบถึงการละเมิดและรู้ตัวผู้จะพึงต้องใช้ค่าสินไหมทดแทน',
    highlight: 'อายุความ 1 ปี นับแต่รู้เรื่องและรู้ตัว'
  },
  {
    id: 'dika-2',
    year: '2564',
    category: 'คดีครอบครัว',
    title: 'อำนาจปกครองบุตรและการแบ่งสินสมรส',
    summary: 'หลักการพิจารณาประโยชน์สูงสุดของบุตรในการกำหนดผู้ใช้อำนาจปกครอง และการพิสูจน์ที่มาของทรัพย์สินว่าเป็นสินส่วนตัวหรือสินสมรส',
    highlight: 'ยึดประโยชน์สูงสุดของบุตรเป็นหลัก'
  },
  {
    id: 'dika-3',
    year: '2566',
    category: 'คดีมรดก',
    title: 'ความสมบูรณ์ของพินัยกรรมแบบเขียนเองทั้งฉบับ',
    summary: 'การตรวจสอบลายมือชื่อและข้อความในพินัยกรรมที่ผู้ทำพินัยกรรมเขียนด้วยลายมือตนเองทั้งฉบับตามประมวลกฎหมายแพ่งและพาณิชย์',
    highlight: 'ต้องเขียนและลงลายมือชื่อด้วยตนเองทั้งฉบับ'
  }
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

          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <Gavel className="size-6 text-gold" />
              <h2 className="font-serif text-2xl font-bold text-primary">ตัวอย่างแนวคำพิพากษาที่น่าสนใจ</h2>
            </div>
            
            <div className="grid gap-6">
              {dikaSamples.map((dika) => (
                <div key={dika.id} className="group relative rounded-2xl border border-border bg-white p-8 shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="rounded-full bg-navy-soft px-3 py-1 text-xs font-bold text-primary">
                          พ.ศ. {dika.year}
                        </span>
                        <span className="text-xs font-bold text-gold-ink uppercase tracking-wider">
                          {dika.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary group-hover:text-gold-ink transition-colors">
                        {dika.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {dika.summary}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-gold" />
                        <span className="text-xs font-bold text-primary italic">ประเด็นสำคัญ: {dika.highlight}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/dika/${dika.id}`}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-[transform,background-color,border-color,color] duration-200 group-hover:bg-gold group-hover:border-gold group-hover:text-navy"
                    >
                      <ChevronRight className="size-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-secondary/70 p-6 md:p-8 border border-gold/10">
            <h2 className="font-serif text-2xl font-bold text-primary">ข้อควรทราบในการใช้แนวคำพิพากษา</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                1. <strong>ข้อเท็จจริงต่างกัน ผลอาจต่างกัน:</strong> คำพิพากษาฎีกาแต่ละเรื่องวินิจฉัยบนพื้นฐานของพยานหลักฐานในคดีนั้นๆ หากข้อเท็จจริงในเรื่องของคุณต่างออกไปเพียงเล็กน้อย ผลทางกฎหมายอาจเปลี่ยนแปลงได้
              </p>
              <p>
                2. <strong>กฎหมายมีการแก้ไข:</strong> ต้องตรวจสอบว่ากฎหมายที่ใช้ในขณะที่ศาลมีคำพิพากษานั้น ยังคงมีผลบังคับใช้อยู่หรือมีการแก้ไขเปลี่ยนแปลงในภายหลังหรือไม่
              </p>
              <p>
                3. <strong>แนววินิจฉัยอาจมีการเปลี่ยนแปลง:</strong> แม้คำพิพากษาฎีกาจะเป็นแนวทางที่สำคัญ แต่ศาลอาจมีการวางแนววินิจฉัยใหม่ที่ต่างจากเดิมได้ตามความเหมาะสมของยุคสมัยและเหตุการณ์
              </p>
            </div>
          </div>
        </Container>
      </section>
      <CTASection title="ต้องการวิเคราะห์แนวคำพิพากษาที่เกี่ยวข้องกับเรื่องของคุณ?" />
    </main>
  )
}
