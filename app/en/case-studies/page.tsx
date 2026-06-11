import type { Metadata } from 'next'
import { FileCheck2, LockKeyhole, SearchCheck } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'An overview of how Thiangtham Law Office reviews facts, documents, options, and confidentiality.',
}

const workflow = [
  {
    icon: SearchCheck,
    title: 'Identify the Issues and Review Documents',
    description: 'We begin with the timeline, available documents, parties, deadlines, and the client’s practical objective.',
  },
  {
    icon: FileCheck2,
    title: 'Develop Practical Legal Options',
    description: 'We explain possible negotiation, notices, mediation, filing, defense, or litigation based on the matter.',
  },
  {
    icon: LockKeyhole,
    title: 'Protect Client Confidentiality',
    description: 'Any published example must remove identifying information and be used only when appropriate permission exists.',
  },
] as const

export default function EnglishCaseStudiesPage() {
  return (
    <main>
      <PageHero
        title="How We Approach Legal Matters"
        description="An overview of how we review information, identify issues, and select a legal path without disclosing confidential client information or promising a result."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'How We Work' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {workflow.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <item.icon className="size-7 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-bold text-primary">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-gold/35 bg-secondary/70 p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-primary">Past Work Does Not Guarantee a Result</h2>
            <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">
              The outcome of every matter depends on its facts, evidence, applicable law, and the discretion of the relevant authority or court. An example of our working method is not a promise that another matter will have the same result.
            </p>
          </div>
        </Container>
      </section>
      <CTASection title="Would You Like an Initial Review of Your Information and Options?" />
    </main>
  )
}
