import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  FileText,
  Gavel,
  Landmark,
  MessageCircle,
  Scale,
  ShieldCheck,
  UsersRound,
  MapPin,
} from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { CTASection } from '@/components/cta-section'
import { Container } from '@/components/container'
import { FAQAccordion } from '@/components/faq-accordion'
import { HeroSection } from '@/components/hero-section'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { englishLegalArticles } from '@/lib/data/articles-en'
import { englishHomeFaqs } from '@/lib/data/faqs-en'
import { englishLegalServices } from '@/lib/data/services-en'
import { officeInfo } from '@/lib/data/office'

const servicePreviewSlugs = ['contracts', 'business', 'tax', 'visa-foreign-documents', 'labor'] as const
const casePreviewItems = [
  {
    icon: Scale,
    title: 'Civil Cases',
    description: 'Contract disputes, debt recovery, damages, and other civil claims',
  },
  {
    icon: ShieldCheck,
    title: 'Criminal Cases',
    description: 'Investigation, complaints, defenses, and criminal procedure',
  },
  {
    icon: UsersRound,
    title: 'Family Cases',
    description: 'Divorce, child custody, maintenance, and family property matters',
  },
  {
    icon: Landmark,
    title: 'Inheritance Cases',
    description: 'Estate administration, wills, heir rights, and estate division',
  },
  {
    icon: MapPin,
    title: 'Land Cases',
    description: 'Boundaries, possession, trespass, and ownership disputes',
  },
  {
    icon: FileText,
    title: 'Cheque Cases',
    description: 'Dishonored cheques, debt recovery, and supporting documents',
  },
] as const

const trustIndicators = [
  {
    icon: Building2,
    title: 'Established in 2007',
    description: 'An office with a steady practice and a clear way of working',
  },
  {
    icon: CalendarCheck2,
    title: 'More than 19 years of experience',
    description: 'Longstanding legal practice used to assess each matter carefully',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Lawyers and consultants working as a team',
    description: 'Different roles working together to manage facts and documents',
  },
  {
    icon: Gavel,
    title: 'Nationwide representation',
    description: 'Consultation and case support depending on the matter and location',
  },
  {
    icon: ShieldCheck,
    title: 'Client confidentiality',
    description: 'Information and documents are handled with professional care',
  },
] as const

const processSteps = [
  {
    icon: MessageCircle,
    title: 'Contact the office',
    description: 'Reach us by phone, Line, or the contact form',
  },
  {
    icon: FileText,
    title: 'Share the basic facts',
    description: 'Summarize the events, parties, and documents you already have',
  },
  {
    icon: Scale,
    title: 'Review documents and evaluate the issue',
    description: 'We assess the facts, records, and relevant legal questions',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Plan the work',
    description: 'We define the scope, next steps, and documents still needed',
  },
  {
    icon: Gavel,
    title: 'Proceed under the legal process',
    description: 'Work moves forward according to the agreed legal pathway',
  },
] as const

const whyPoints = [
  'Fact and evidence analysis',
  'Careful document review',
  'Clear communication of each step',
  'Strict client confidentiality',
  'No exaggerated outcome promises',
] as const

const servicePreviewItems = englishLegalServices.filter((service) =>
  servicePreviewSlugs.includes(service.slug as (typeof servicePreviewSlugs)[number]),
)

export default function EnglishHomePage() {
  return (
    <main className="overflow-x-hidden selection:bg-gold/30">
      <HeroSection />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            align="center"
            title="What visitors can understand right away"
            description="The key facts that help people recognize the office and how it works before they make contact."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {trustIndicators.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <item.icon className="size-6 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-lg font-bold text-primary">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-secondary/25 py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                title="Core legal services"
                description="Non-litigation work that helps prepare agreements, records, and legal documents before a dispute begins."
              />
              <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-semibold text-primary">
                  Common reasons people contact the office:
                </p>
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                    Review drafts before signing
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                    Prepare business, tax, and foreign document work
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                    Get an initial legal pathway before taking action
                  </li>
                </ul>
                <div className="pt-2">
                  <Link
                    href="/en/services"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold-ink"
                  >
                    View all services
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {servicePreviewItems.map((service) => (
                <ServiceCard key={service.slug} service={service} locale="en" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <SectionHeading
                title="Case categories handled by the office"
                description="A quick overview of the dispute and court-case categories that clients often ask about."
              />
              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  If your matter is already in dispute, prepare the facts, documents, and timeline first.
                  That makes the initial assessment more accurate.
                </p>
                <Link
                  href="/en/case-studies"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold-ink"
                >
                  View case approach
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {casePreviewItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-border bg-white p-5 shadow-sm"
                >
                  <item.icon className="size-6 text-gold" aria-hidden="true" />
                  <h2 className="mt-4 font-serif text-xl font-bold text-primary">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <Container>
          <SectionHeading
            light
            hideDivider
            title="Why clients choose this office"
            description="The tone is measured and practical, with emphasis on facts, documents, and process rather than promotion."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {whyPoints.map((point) => (
              <div key={point} className="rounded-xl border border-white/10 bg-white/6 p-5">
                <CheckCircle2 className="size-5 text-gold" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium leading-7 text-primary-foreground/85">{point}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                title={officeInfo.headLawyer}
                description="The head lawyer sets the office direction and reviews each matter through the lens of facts, records, and the legal issues involved."
              />
              <div className="mt-8 rounded-2xl border border-gold/25 bg-card p-6">
                <p className="text-sm font-semibold text-gold-ink">Head Lawyer</p>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {officeInfo.headLawyer} has more than 19 years of legal practice experience and helps guide the
                  office’s work with a focus on document review, issue analysis, and clear case planning.
                </p>
                <Link
                  href="/en/team/kasem-chimphlee"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold-ink"
                >
                  View role and profile
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/law-office-hero.webp"
                    alt={officeInfo.headLawyer}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                      Head Lawyer
                    </p>
                    <h2 className="mt-2 font-serif text-2xl font-bold">{officeInfo.headLawyer}</h2>
                    <p className="mt-2 text-sm leading-7 text-white/80">
                      Coordinates legal work with a calm and systematic approach
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs font-bold text-muted-foreground">Experience</p>
                  <p className="mt-1 font-serif text-lg font-bold text-primary">19+ years</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs font-bold text-muted-foreground">Founded</p>
                  <p className="mt-1 font-serif text-lg font-bold text-primary">2007</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary/25 py-16 md:py-20">
        <Container>
          <SectionHeading
            align="center"
            title="Work process"
            description="A clear sequence that helps clients understand how the office works from first contact onward."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <article key={step.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <step.icon className="size-6 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-xl font-bold text-primary">{step.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title="Latest articles"
              description="Short reads that help visitors prepare before they contact the office."
            />
            <Link href="/en/articles" className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-gold-ink">
              View all articles
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {englishLegalArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} locale="en" />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                light
                hideDivider
                title="Frequently asked questions"
                description="Basic questions that help clients prepare the right information before their first discussion."
              />
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/6 p-6">
                <p className="text-sm leading-7 text-primary-foreground/80">
                  If you are unsure where to start, call or send a Line message first.
                </p>
                <Link
                  href="/en/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold transition hover:text-white"
                >
                  Contact the office
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div>
              <FAQAccordion items={englishHomeFaqs} />
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Need the office to review your matter?"
        description="Call, Line, or send the initial details and the team will review the information first."
      />
    </main>
  )
}
