import type { Metadata } from 'next'
import { CalendarCheck2, ClipboardCheck, FileSearch, Gavel, Send } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Service Process',
  description:
    'How to contact Thiangtham Law Office, provide initial facts, submit documents, review options, and begin legal work.',
}

const steps = [
  {
    icon: Send,
    title: 'Contact the Office',
    description: 'Reach us by phone, Line, Facebook, WhatsApp, email, or the consultation form.',
  },
  {
    icon: CalendarCheck2,
    title: 'Provide the Initial Facts',
    description: 'Describe the events in order, the parties involved, important dates, and the outcome you need.',
  },
  {
    icon: FileSearch,
    title: 'Document Review and Initial Assessment',
    description: 'Our team reviews the available records, evidence, and any missing information that may be required.',
  },
  {
    icon: ClipboardCheck,
    title: 'Legal Strategy and Scope',
    description: 'We explain rights, options, procedures, costs, risks, and the proposed scope before you decide.',
  },
  {
    icon: Gavel,
    title: 'Legal Action',
    description: 'We proceed with negotiation, notices, filings, defense, litigation, or other agreed legal work.',
  },
] as const

export default function EnglishProcessPage() {
  return (
    <main>
      <PageHero
        title="Our Service Process"
        description="Start by describing the facts in order and sending the documents you have. You do not need to use legal terminology."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Service Process' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-4xl space-y-5">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-[80px_1fr] sm:items-center"
              >
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-gold">
                  <step.icon className="size-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold">Step {index + 1}</p>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-primary">{step.title}</h2>
                  <p className="mt-2 leading-7 text-muted-foreground">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title="Ready to Share the Initial Details?"
        description="Send the facts and available documents. Our team will contact you to explain the appropriate next step."
      />
    </main>
  )
}
