import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { ServiceCard } from '@/components/service-card'
import { SectionHeading } from '@/components/section-heading'
import { getEnglishLegalService } from '@/lib/data/services-en'

const caseWorkSlugs = [
  'civil',
  'criminal',
  'family',
  'inheritance',
  'land',
  'administrative',
  'cheque',
  'appeal',
  'anti-corruption',
  'enforcement',
]

const advisorySlugs = ['contracts', 'business', 'labor', 'tax', 'visa-foreign-documents']

function resolveServices(slugs: string[]) {
  return slugs
    .map((slug) => getEnglishLegalService(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
}

const caseWorkServices = resolveServices(caseWorkSlugs)
const advisoryServices = resolveServices(advisorySlugs)

export const metadata: Metadata = {
  title: 'Legal Services',
  description:
    'Case work, legal advice, document review, tax support, and foreign document services in Thailand.',
  alternates: {
    canonical: 'https://www.thiangthamlaw.com/en/services',
    languages: {
      'th-TH': 'https://www.thiangthamlaw.com/th/services',
      'en-US': 'https://www.thiangthamlaw.com/en/services',
    },
  },
}

export default function EnglishServicesPage() {
  return (
    <main>
      <PageHero
        title="Legal Services"
        description="Case work is shown separately from advisory and document services. Case studies and matter summaries are kept on the Case Work page."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Legal Services' }]}
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="rounded-2xl border border-gold/20 bg-card p-6 shadow-sm md:p-8">
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
              Use the Case Work page for representative matters and the services page for consultation, documents, tax, and visa-related support.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/en/case-studies"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Go to Case Work
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/en/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-bold text-primary transition hover:border-gold hover:text-gold-ink"
              >
                Contact the Office
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Case Work"
            title="Litigation & Case Work"
            description="Disputed matters, litigation, defense, and court or agency procedures."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseWorkServices.map((service) => (
              <ServiceCard key={service.slug} service={service} locale="en" />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-secondary/25 py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Advisory"
            title="Advisory, Documents, Tax & Foreign Matters"
            description="Practical support for contracts, business documents, tax coordination, and foreign-use documents."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advisoryServices.map((service) => (
              <ServiceCard key={service.slug} service={service} locale="en" />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-serif text-2xl font-bold text-primary">Fees & Transparency</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              We explain the scope and fees clearly before work starts, so you know what is included and what is billed separately.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-primary">Initial Consultation</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Early assessment by phone, online, or form submission, plus a summary of documents to prepare.
                </p>
                <p className="mt-6 text-lg font-bold text-primary">Starting: by agreement</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-primary">Court Fees</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Court filing fees, service fees, and other government charges billed at actual cost.
                </p>
                <p className="mt-6 text-lg font-bold text-primary">Per official notice</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-primary">Representation Fee</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Based on matter complexity, work duration, and the assets or issues involved in each case.
                </p>
                <p className="mt-6 text-lg font-bold text-primary">Quoted per matter</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-primary">Monthly Advisory</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Ongoing legal support for businesses, including contract review and routine advisory work.
                </p>
                <p className="mt-6 text-lg font-bold text-primary">Starting: monthly / yearly</p>
              </div>
            </div>
            <p className="mt-8 rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
              * The prices above are only a rough starting point. We provide written quotations after reviewing the facts and supporting documents for each matter.
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        title="Not Sure Which Service Fits Your Matter?"
        description="Send us the initial details. Our team can review the scope and estimate the likely fee range before you decide."
      />
    </main>
  )
}
