import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        title="นโยบายความเป็นส่วนตัว"
        description="การดูแลและคุ้มครองข้อมูลส่วนบุคคลของลูกความและผู้เยี่ยมชมเว็บไซต์"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'Privacy' }]}
      />
      <section className="py-14 md:py-20">
        <Container className="max-w-4xl">
          <div className="prose prose-navy max-w-none leading-8 text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-primary">1. การเก็บรวบรวมข้อมูลส่วนบุคคล</h2>
            <p>
              สำนักงานจะเก็บรวบรวมข้อมูลส่วนบุคคลที่ท่านให้ไว้โดยสมัครใจผ่านแบบฟอร์มการติดต่อ การนัดหมาย หรือการปรึกษาทางกฎหมาย เช่น ชื่อ-นามสกุล เบอร์โทรศัพท์ อีเมล และรายละเอียดของข้อพิพาท
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">2. วัตถุประสงค์ในการใช้ข้อมูล</h2>
            <p>
              เราใช้ข้อมูลของท่านเพื่อวัตถุประสงค์ในการติดต่อกลับ ให้คำปรึกษาทางกฎหมาย นัดหมายเข้าพบ และการดำเนินงานตามขอบเขตงานที่ได้รับมอบหมายเท่านั้น
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">3. การรักษาความลับ</h2>
            <p>
              ข้อมูลและเอกสารที่เกี่ยวข้องกับคดีหรือข้อพิพาทของลูกความจะถูกเก็บรักษาไว้เป็นความลับสูงสุดตามมาตรฐานจริยธรรมวิชาชีพทนายความ และจะไม่ถูกเปิดเผยต่อบุคคลภายนอกโดยไม่ได้รับความยินยอมจากท่าน เว้นแต่เป็นการปฏิบัติตามคำสั่งศาลหรือกฎหมาย
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">4. สิทธิของเจ้าของข้อมูล</h2>
            <p>
              ท่านมีสิทธิในการเข้าถึง ตรวจสอบ แก้ไข หรือขอให้ลบข้อมูลส่วนบุคคลของท่านที่สำนักงานเก็บรักษาไว้ โดยสามารถติดต่อแจ้งความประสงค์ได้ผ่านช่องทางติดต่อหลักของสำนักงาน
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">5. การปรับปรุงนโยบาย</h2>
            <p>
              สำนักงานอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราวเพื่อให้สอดคล้องกับการเปลี่ยนแปลงของกฎหมายและการให้บริการ โดยจะประกาศให้ทราบผ่านทางเว็บไซต์นี้
            </p>
          </div>
        </Container>
      </section>
    </main>
  )
}
