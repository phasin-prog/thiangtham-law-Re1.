import type { Metadata } from 'next'
import Image from 'next/image'
import {
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MessageCircle,
  MessageSquareText,
  Phone,
  Scale,
} from 'lucide-react'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { officeContact } from '@/lib/data/office'
import { teamMembers } from '@/lib/data/team'

export const metadata: Metadata = {
  title: 'Lawyers, Advisors & Team',
  description:
    'Legal team of Thiangtham Law Office, led by Mr. Kasem Chimphlee and a team of more than 9 lawyers.',
}

const roleIcons = [Scale, MessageSquareText, ClipboardCheck, FileText] as const

const teamValuesEn = [
  'Careful',
  'Clear',
  'Confidential',
  'Explainable process',
  'Fact-based strategy',
]

const teamRolesEn = [
  {
    title: 'Legal Team',
    description: 'A team of more than 9 lawyers ready for consultation and litigation across various categories.',
  },
  {
    title: 'Legal Advisors',
    description: 'Providing expert advice on legal issues, documents, contracts, and case strategy.',
  },
  {
    title: 'Case Coordinators',
    description: 'Managing appointments, documentation, process tracking, and client communication.',
  },
  {
    title: 'Document & Research Team',
    description: 'Preparing, gathering, and verifying legal documents and research for litigation.',
  },
]

export default function EnglishTeamPage() {
  const headLawyer = teamMembers[0]

  return (
    <main>
      <PageHero
        title="Lawyers, Advisors & Legal Team"
        description="A dedicated legal team ready to provide systematic legal pathways."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Lawyers & Team' }]}
      />

      <section className="py-14 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[380px_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-gold/30 bg-secondary shadow-lg">
            <Image
              src={headLawyer.image}
              alt={`Head Lawyer ${headLawyer.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 380px"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Lawyers, Advisors & Legal Team
            </p>
            <h1 className="mt-3 font-serif text-3xl font-bold text-primary md:text-4xl">
              Mr. Kasem Chimphlee
            </h1>
            <p className="mt-2 text-lg font-semibold text-primary/75">Head of Office</p>
            <p className="mt-1 font-semibold text-gold">Over 19 Years of Experience</p>
            <p className="mt-6 max-w-3xl leading-8 text-muted-foreground">
              Mr. Kasem Chimphlee is the Head of Thiangtham Law Office with over 19 years of experience in legal consultation, litigation, and case strategy. He emphasizes meticulous fact analysis, evidence preparation, and explaining legal options to clients systematically.
            </p>
            <div className="mt-7 rounded-2xl border border-gold/30 bg-secondary/70 p-6">
              <p className="font-serif text-xl font-bold text-primary">
                Legal Team of More Than 9 Lawyers
              </p>
              <p className="mt-2 leading-7 text-muted-foreground">
                Ready to provide consultation, representation, litigation, and meticulous case management throughout the legal process.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary/60 py-14 md:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Team Overview"
            title="Our Team Roles"
            description="Our team is organized by roles to ensure specialized handling of your legal matters."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamRolesEn.map((role, index) => {
              const Icon = roleIcons[index]
              return (
                <article key={role.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-gold">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-serif text-xl font-bold text-primary">{role.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{role.description}</p>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Work Values"
            title="Our Core Values"
            description="Our work is driven by verified facts, documented evidence, and clear communication."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {teamValuesEn.map((value) => (
              <div
                key={value}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                <p className="font-semibold leading-7 text-primary">{value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-14 text-primary-foreground">
        <Container className="flex flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold text-gold">Need Legal Advice?</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
              Contact our legal team today
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://line.me/R/ti/p/~${officeContact.line}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 font-bold text-primary-dark transition hover:bg-gold-soft"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Consult via Line
            </a>
            <a
              href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:border-gold hover:text-gold"
            >
              <Phone className="size-5" aria-hidden="true" />
              Call Us
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}
