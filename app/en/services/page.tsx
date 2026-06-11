import type { Metadata } from 'next'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { ServiceCard } from '@/components/service-card'
import { englishLegalServices } from '@/lib/data/services-en'

export const metadata: Metadata = {
  title: 'Legal Services',
  description:
    'Legal consultation, document review, negotiation, litigation, enforcement, and business legal services in Thailand.',
}

export default function EnglishServicesPage() {
  return (
    <main>
      <PageHero
        title="Legal Services"
        description="Consultation, document review, negotiation, and litigation based on the facts and evidence of each matter."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Legal Services' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {englishLegalServices.map((service) => (
              <ServiceCard key={service.slug} service={service} locale="en" />
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title="Not Sure Which Service Fits Your Matter?"
        description="Send us the initial details. Our team can help identify the type of matter and the documents to prepare for consultation."
      />
    </main>
  )
}
