import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { ServiceCard } from '@/components/service-card'
import { legalServices } from '@/lib/data/services'

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="บริการกฎหมาย"
        description="บริการให้คำปรึกษา ตรวจเอกสาร เจรจา และดำเนินคดี โดยพิจารณาจากข้อเท็จจริงและพยานหลักฐานของแต่ละกรณี"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'บริการกฎหมาย' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {legalServices.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </Container>
      </section>
      <CTASection
        title="ไม่แน่ใจว่าปัญหาอยู่ในบริการหมวดใด?"
        description="ส่งรายละเอียดเบื้องต้นได้ ทีมงานจะช่วยจัดประเภทเรื่องและแจ้งข้อมูลที่ควรเตรียมสำหรับการปรึกษา"
      />
    </main>
  )
}
