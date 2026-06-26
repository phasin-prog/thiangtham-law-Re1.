import type { Metadata } from 'next'
import { Container } from '@/components/container'
import { ConsultationForm } from '@/components/consultation-form'
import { FAQAccordion } from '@/components/faq-accordion'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'

export const metadata: Metadata = {
  title: 'Initial Consultation',
  description: 'Send the initial facts and request a follow-up from the legal team at Thiangtham Law Office.',
  alternates: {
    canonical: 'https://www.thiangthamlaw.com/en/consultation',
    languages: {
      'th-TH': 'https://www.thiangthamlaw.com/th/consultation',
      'en-US': 'https://www.thiangthamlaw.com/en/consultation',
    },
  },
}

const consultationFaqs = [
  {
    q: 'Does submitting the form immediately create a lawyer-client engagement?',
    a: 'No. Our team will first review the information, contact you, and explain the proposed scope and fees before any engagement is agreed.',
  },
  {
    q: 'How much detail should I provide?',
    a: 'Identify the parties, important events, dates, available documents, and the help you need. Do not send passwords, original documents, or unnecessary sensitive data.',
  },
  {
    q: 'Will the information be kept confidential?',
    a: 'The office uses submitted information for initial assessment and follow-up and treats contact information and documents with care.',
  },
]

export default function EnglishConsultationPage() {
  return (
    <main>
      <PageHero
        title="Initial Legal Consultation"
        description="Send the initial details so our team can review the matter and contact you through your preferred channel."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Initial Consultation' }]}
      />
      <section className="py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.55fr]">
          <ConsultationForm />
          <aside>
            <SectionHeading
              eyebrow="Before You Submit"
              title="Describe the Facts in Order"
              description="Include important dates, the parties involved, key events, available documents, and the assistance you need. Legal terminology is not required."
            />
            <div className="mt-7 rounded-2xl border border-gold/35 bg-secondary/70 p-6">
              <h2 className="font-serif text-xl font-bold text-primary">Privacy</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Information is used for an initial assessment and follow-up. Submitting the form does not establish a lawyer-client engagement until the scope of work is clearly agreed.
              </p>
            </div>
          </aside>
        </Container>
      </section>
      <section className="bg-secondary/60 py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.6fr_1fr]">
          <SectionHeading eyebrow="Consultation FAQ" title="What to Know Before You Submit" />
          <FAQAccordion items={consultationFaqs} />
        </Container>
      </section>
    </main>
  )
}
