import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  LockKeyhole,
  MessageSquareText,
  Scale,
} from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { OfficeStats } from '@/components/office-stats'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { WhyChooseUsSection } from '@/components/why-choose-us-section'
import { officeInfo } from '@/lib/data/office'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Thiangtham Law Office, established in 2007, led by Mr. Kasem Chimphlee with a team of over 9 lawyers.',
}

const principlesEn = [
  {
    icon: FileSearch,
    title: 'Careful Fact Analysis',
    description: 'Listening, sequencing events, reviewing documents, and identifying issues before proposing a path.',
  },
  {
    icon: Scale,
    title: 'Evidence and Strategy',
    description: 'Considering rights, duties, statutes of limitations, and legal strategies that fit the goals.',
  },
  {
    icon: MessageSquareText,
    title: 'Clear Communication',
    description: 'Explaining opportunities, risks, steps, costs, and limitations before making decisions.',
  },
  {
    icon: LockKeyhole,
    title: 'Confidentiality',
    description: 'Handling client information and documents with care and for the intended purposes.',
  },
] as const

export default function EnglishAboutPage() {
  return (
    <main>
      <PageHero
        title="About Thiangtham Law Office"
        description="A law office that prioritizes fact analysis, evidence preparation, and explaining options to clients before decisions are made."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'About Us' }]}
      />

      <section className="py-14 md:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[440px] overflow-hidden rounded-3xl border border-gold/25 bg-primary">
            <Image
              src="/law-office-hero.png"
              alt="Thiangtham Law Office"
              fill
              className="object-cover opacity-70"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <p className="text-sm font-semibold text-gold">Office History</p>
              <p className="mt-2 font-serif text-3xl font-bold">
                Established in 2007
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Office History"
              title="Providing Legal Services to Individuals and Businesses"
            />
            <div className="mt-6 space-y-4 leading-8 text-muted-foreground">
              <p>
                {officeInfo.englishName} was established in 2007, led by Mr. Kasem Chimphlee as the Head of Office.
              </p>
              <p>
                Throughout our years of operation, the office has been dedicated to providing legal services to both individuals and corporations, emphasizing systematic fact analysis, evidence preparation, and case strategy.
              </p>
              <p>
                Mr. Kasem Chimphlee has over 19 years of experience as a lawyer, along with a team of more than 9 lawyers ready to provide consultation, representation, and careful legal management.
              </p>
              <p>
                We prioritize explaining legal options to clients, ensuring they understand the opportunities, risks, processes, and procedures before moving forward.
              </p>
            </div>
            <div className="mt-7">
              <OfficeStats />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary/60 py-14 md:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Head of Office"
            title="Mr. Kasem Chimphlee"
            description="Over 19 years of experience as a lawyer, providing consultation and case strategy based on facts, evidence, and legal principles."
          />
          <div className="mx-auto mt-9 max-w-3xl rounded-2xl border border-gold/30 bg-card p-7 text-center shadow-sm">
            <p className="font-serif text-xl font-bold text-primary">Legal Team of More Than 9 Lawyers</p>
            <p className="mt-3 leading-7 text-muted-foreground">
              Ready to provide consultation, representation, litigation, and coordination throughout the legal process.
            </p>
            <Link
              href="/en/team"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold"
            >
              View Our Team
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Office Philosophy"
            title="Our Working Principles"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {principlesEn.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <principle.icon className="size-7 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-bold text-primary">{principle.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.description}</p>
                <CheckCircle2 className="mt-5 size-5 text-primary" aria-hidden="true" />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseUsSection />

      <CTASection title="Need Legal Consultation?" />
    </main>
  )
}
