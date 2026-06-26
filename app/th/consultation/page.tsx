import { Container } from '@/components/container'
import { ConsultationForm } from '@/components/consultation-form'
import { FAQAccordion } from '@/components/faq-accordion'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { consultationFaqs } from '@/lib/data/faqs'

export default function ConsultationPage() {
  return (
    <main>
      <PageHero
        title="ปรึกษาเบื้องต้น"
        description="ส่งรายละเอียดปัญหาเพื่อให้ทีมงานตรวจข้อมูลเบื้องต้นและติดต่อกลับตามช่องทางที่คุณสะดวก"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ปรึกษาเบื้องต้น' }]}
      />
      <section className="py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.55fr]">
          <ConsultationForm />
          <aside>
            <SectionHeading
              eyebrow="ก่อนส่งข้อมูล"
              title="เล่าข้อเท็จจริงตามลำดับ"
              description="ระบุวัน เวลา คู่กรณี เหตุการณ์สำคัญ เอกสารที่มี และสิ่งที่ต้องการความช่วยเหลือ โดยไม่ต้องใช้ศัพท์กฎหมาย"
            />
            <div className="mt-7 rounded-2xl border border-gold/35 bg-secondary/70 p-6">
              <h2 className="font-serif text-xl font-bold text-primary">ความเป็นส่วนตัว</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                ข้อมูลจะใช้เพื่อประเมินเบื้องต้นและติดต่อกลับเท่านั้น
                การส่งแบบฟอร์มยังไม่ถือเป็นการรับว่าความจนกว่าจะตกลงขอบเขตงานอย่างชัดเจน
              </p>
            </div>
          </aside>
        </Container>
      </section>
      <section className="bg-secondary/60 py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.6fr_1fr]">
          <SectionHeading eyebrow="คำถามเกี่ยวกับการปรึกษา" title="สิ่งที่ควรทราบก่อนส่งเรื่อง" />
          <FAQAccordion items={consultationFaqs} />
        </Container>
      </section>
    </main>
  )
}
