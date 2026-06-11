import Link from 'next/link'
import {
  ArrowRight,
  BookOpenText,
  Building2,
  CalendarCheck2,
  ClipboardCheck,
  FileSearch,
  Gavel,
  Scale,
  Send,
  UsersRound,
} from 'lucide-react'
import { AboutPreviewSection } from '@/components/about-preview-section'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { FreeConsultationSection } from '@/components/free-consultation-section'
import { HeroSection } from '@/components/hero-section'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { TeamPreviewSection } from '@/components/team-preview-section'
import { WhyChooseUsSection } from '@/components/why-choose-us-section'
import { englishFeaturedLegalServices } from '@/lib/data/services-en'

const trustCards = [
  {
    href: '/en/about',
    icon: Building2,
    title: 'About Us',
    description: 'History, vision, and principles of our law office.',
  },
  {
    href: '/en/services',
    icon: Scale,
    title: 'Our Services',
    description: 'Find litigation, contract, and legal services.',
  },
  {
    href: '/en/legal-knowledge',
    icon: BookOpenText,
    title: 'Legal Knowledge',
    description: 'Read articles and legal guides for the public.',
  },
  {
    href: '/en/team',
    icon: UsersRound,
    title: 'Our Team',
    description: 'Meet our head lawyer and legal team.',
  },
] as const

const processSteps = [
  { icon: Send, title: 'Contact Us', description: 'Call, add Line, or send a form to provide initial details.' },
  { icon: CalendarCheck2, title: 'Initial Consultation', description: 'Tell us your facts, parties involved, and the help you need.' },
  { icon: FileSearch, title: 'Document Review', description: 'We review evidence and evaluate legal pathways.' },
  { icon: ClipboardCheck, title: 'Legal Strategy', description: 'We explain options, steps, costs, and risks.' },
  { icon: Gavel, title: 'Legal Action', description: 'We proceed with negotiations, filings, or litigation.' },
] as const

export default function EnglishHomePage() {
  return (
    <main>
      <HeroSection />

      <section className="relative z-10 -mt-5 pb-12 md:-mt-8">
        <Container>
          <div className="home-trust-grid grid overflow-hidden rounded-2xl border border-gold/25 bg-card shadow-xl sm:grid-cols-2 lg:grid-cols-4">
            {trustCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="home-trust-card group border-b border-border p-5 transition sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="home-trust-icon transition-colors">
                  <card.icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-3 font-serif text-lg font-bold text-primary">{card.title}</h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{card.description}</p>
                <span className="home-trust-link mt-3 inline-flex items-center gap-1 text-xs font-bold">
                  Learn More
                  <ArrowRight className="size-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FreeConsultationSection />

      <section className="pb-16 md:pb-22">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Legal Services"
            title="Our Core Services"
            description="Consultation, litigation, and legal documentation based on facts and evidence of each case."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {englishFeaturedLegalServices.map((service) => (
              <ServiceCard key={service.slug} service={service} locale="en" />
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link
              href="/en/services"
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              View All Services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <AboutPreviewSection />
      <TeamPreviewSection />
      <WhyChooseUsSection />

      <section className="bg-secondary/60 py-16 md:py-22">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Service Process"
            title="Start Consultation Without Legal Jargon"
            description="Just tell us your story and provide documents. Our team will help identify issues and explain the next steps."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <article key={step.title} className="home-process-card relative rounded-xl border bg-card p-6 shadow-sm transition-colors">
                <span className="absolute right-5 top-4 font-serif text-4xl font-bold text-gold/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="home-process-icon flex size-11 items-center justify-center rounded-lg">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-lg font-bold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/en/process"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-gold"
            >
              Detailed Process <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <CTASection
        title="Have a Legal Problem?"
        description="Let our team help review your information and evaluate initial pathways through your preferred channel."
      />
    </main>
  )
}
