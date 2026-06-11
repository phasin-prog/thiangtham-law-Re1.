import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { PersonCard } from '@/components/person-card'
import { lawyers } from '@/lib/site-data'

export default function LawyersPage() {
  return (
    <main>
      <PageHero
        title="ทนายความ"
        description="ทีมทนายความของสำนักงานให้คำปรึกษา วางแนวทาง และดำเนินคดีโดยพิจารณาจากข้อเท็จจริง พยานหลักฐาน และกฎหมายที่เกี่ยวข้อง"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ทนายความ' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-gold">ทีมกฎหมาย</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-primary md:text-3xl">
              ดูแลแต่ละเรื่องด้วยความรอบคอบและตรงไปตรงมา
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              ข้อมูลประวัติและเลขใบอนุญาตที่ยังไม่ได้รับการยืนยันจะแสดงเป็นข้อมูลรอระบุ
              เพื่อหลีกเลี่ยงการเผยแพร่ข้อมูลที่คลาดเคลื่อน
            </p>
          </div>
          <div
            className={
              lawyers.length === 1
                ? 'max-w-4xl'
                : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
            }
          >
            {lawyers.map((lawyer, index) => (
              <PersonCard
                key={`${lawyer.name}-${index}`}
                person={lawyer}
                variant="lawyer"
                featured={lawyers.length === 1}
              />
            ))}
          </div>
        </Container>
      </section>
      <CTASection title="ต้องการปรึกษาทนายความเกี่ยวกับเรื่องของคุณ?" />
    </main>
  )
}
