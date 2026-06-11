import type { Metadata } from 'next'
import { BookOpenCheck, FileSearch, Scale } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Supreme Court Cases',
  description: 'How Thai Supreme Court decisions may be reviewed and used as part of legal analysis.',
}

const principles = [
  {
    icon: FileSearch,
    title: 'Compare the Facts Carefully',
    description: 'Each judgment turns on its own facts and evidence, so similarities and differences must be identified precisely.',
  },
  {
    icon: BookOpenCheck,
    title: 'Review the Law and the Court’s Reasoning',
    description: 'Consider the applicable provisions, the legal questions decided, and the reasons supporting the judgment.',
  },
  {
    icon: Scale,
    title: 'Use Decisions as Part of the Analysis',
    description: 'A prior judgment informs legal strategy but does not guarantee that another case will have the same result.',
  },
] as const

export default function EnglishDikaPage() {
  return (
    <main>
      <PageHero
        title="Supreme Court Decisions and Legal Principles"
        description="An introduction to reading and using Thai Supreme Court decisions as part of careful legal analysis."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Supreme Court Cases' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <item.icon className="size-7 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-bold text-primary">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-secondary/70 p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-primary">Important Note</h2>
            <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">
              Content in this section is general information. Applying a judgment to an actual dispute requires a review of the facts, documents, current law, and the most relevant decisions.
            </p>
          </div>
        </Container>
      </section>
      <CTASection title="Would You Like Us to Review Decisions Relevant to Your Matter?" />
    </main>
  )
}
