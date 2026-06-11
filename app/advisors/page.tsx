import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { PersonCard } from '@/components/person-card'
import { advisors } from '@/lib/site-data'

export default function AdvisorsPage() {
  return (
    <main>
      <PageHero
        title="ที่ปรึกษา"
        description="ที่ปรึกษาสนับสนุนการวิเคราะห์ประเด็นกฎหมายและการวางแนวทางในเรื่องที่ต้องใช้ความรู้เฉพาะด้าน"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ที่ปรึกษา' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-gold">ที่ปรึกษากฎหมาย</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-primary md:text-3xl">
              สนับสนุนการพิจารณาประเด็นที่ซับซ้อน
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              การให้ความเห็นในแต่ละกรณีต้องอาศัยข้อเท็จจริงและเอกสารประกอบ
              ข้อมูลบนหน้านี้จึงเป็นขอบเขตความเชี่ยวชาญโดยสรุป
            </p>
          </div>
          <div
            className={
              advisors.length <= 2
                ? 'grid max-w-4xl gap-6 sm:grid-cols-2'
                : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
            }
          >
            {advisors.map((advisor, index) => (
              <PersonCard key={`${advisor.name}-${index}`} person={advisor} variant="advisor" />
            ))}
          </div>
        </Container>
      </section>
      <CTASection title="ต้องการให้ทีมงานช่วยประเมินประเด็นกฎหมายเบื้องต้น?" />
    </main>
  )
}
