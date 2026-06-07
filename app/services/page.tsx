import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { services } from '@/lib/site-data'

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            align="center"
            eyebrow="บริการทางกฎหมาย"
            title="บริการกฎหมายของเรา"
            description="เราให้บริการด้านคดีและเอกสารทางกฎหมายอย่างรอบคอบ ทั้งคดีแพ่ง คดีอาญา คดีครอบครัว และอีกหลายด้าน"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
