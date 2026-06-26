import type { Metadata } from 'next'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'

const processSteps = [
  {
    title: 'Collect facts and source documents',
    description:
      'The team reviews the timeline, parties, key documents, and deadlines that may affect the client position.',
  },
  {
    title: 'Assess legal issues and evidence',
    description:
      'Lawyers identify what must be proven, evaluate risk, and list additional documents or witnesses that may be needed.',
  },
  {
    title: 'Set the action plan',
    description:
      'The office recommends practical options such as negotiation, demand letters, filing a claim, defending a claim, or post-judgment enforcement.',
  },
  {
    title: 'Track progress and adjust',
    description:
      'During the matter, the team reports progress, reviews new documents, and adjusts strategy as facts develop.',
  },
]

const matterTypes = [
  'Civil disputes and contracts',
  'Family and inheritance matters',
  'Criminal matters and bail',
  'Land and property disputes',
  'Enforcement and asset tracing',
  'Documents, transactions, and business work',
]

export const metadata: Metadata = {
  title: 'Case Work Approach | Thiangtham Law Office',
  description:
    'An anonymized overview of how Thiangtham Law Office receives matters, reviews evidence, sets strategy, and tracks legal work without disclosing client information.',
  alternates: {
    canonical: 'https://thiangtham-law.com/en/case-studies',
    languages: {
      'th-TH': 'https://thiangtham-law.com/th/case-studies',
      'en-US': 'https://thiangtham-law.com/en/case-studies',
    },
  },
}

export default function EnglishCaseStudiesPage() {
  return (
    <main>
      <PageHero
        title="Case Work Approach"
        description="This page explains our anonymized work process, showing how facts, documents, and legal strategy are handled before a matter proceeds."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Case Work' }]}
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="rounded-xl border border-gold/25 bg-card p-6 md:p-8">
              <p className="text-sm font-bold text-gold-ink">Publication standard</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-primary">
                No party names, case numbers, or identifying client details are published.
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                Real legal matters involve specific facts and confidentiality limits. This page describes the office workflow so prospective clients can understand what to prepare and how lawyers evaluate a matter before recommending next steps.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {matterTypes.map((item) => (
                <div key={item} className="rounded-lg border border-border bg-white p-5">
                  <p className="font-serif text-xl font-bold text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary/25 py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-gold-ink">Work process</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary md:text-4xl">
              From first documents to a reviewable action plan
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-gold">
                    {index + 1}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-primary">{step.title}</h3>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="rounded-xl border border-gold/25 bg-primary p-8 text-primary-foreground md:p-10">
            <h2 className="font-serif text-3xl font-bold text-gold">What to prepare before consultation</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-primary-foreground/85 md:grid-cols-2">
              <li>ID information, contact details, and known information about the other party.</li>
              <li>Contracts, demand letters, court notices, or relevant government documents.</li>
              <li>A timeline with approximate dates, payment records, and communication evidence.</li>
              <li>Your preferred goal, such as negotiation, filing, defense, or enforcement.</li>
            </ul>
          </div>
        </Container>
      </section>

      <CTASection title="Need a lawyer to review your matter?" />
    </main>
  )
}
