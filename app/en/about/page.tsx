import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  History,
  Handshake,
  Target,
} from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { OfficeStats } from '@/components/office-stats'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { officeContact, officeInfo } from '@/lib/data/office'
import { lawyers } from '@/lib/data/lawyers'

export const metadata: Metadata = {
  title: 'About Us | Thiangtham Law Office',
  description:
    'Thiangtham Law Office was established in 2007, led by Mr. Kasem Chimphlee. We provide professional legal services with integrity and expertise.',
}

const headLawyer = lawyers.find((l) => l.slug === 'kasem-chimphlee') || lawyers[0]

const values = [
  {
    icon: Target,
    title: 'Vision',
    description: 'To be the most trusted law office, prioritizing facts and evidence in every case we handle.',
  },
  {
    icon: Handshake,
    title: 'Mission',
    description: 'Providing professional and transparent legal services to protect client interests within the framework of law and justice.',
  },
  {
    icon: ShieldCheck,
    title: 'Values',
    description: 'Honesty, transparency, dedication, and strict confidentiality are the cornerstones of our practice.',
  },
] as const

const contactItems = [
  { 
    icon: Phone, 
    label: 'Phone', 
    value: officeContact.phones[0], 
    href: `tel:${officeContact.phones[0].replace(/-/g, '')}`,
    subValue: officeContact.phones[1]
  },
  { icon: MessageCircle, label: 'LINE Official', value: `@${officeContact.line}`, href: `https://line.me/R/ti/p/~${officeContact.line}`, subValue: undefined },
  { icon: Mail, label: 'Office Email', value: officeContact.email, href: `mailto:${officeContact.email}`, subValue: undefined },
  { icon: Clock3, label: 'Office Hours', value: officeContact.hoursEn, href: undefined, subValue: undefined },
] as const

export default function EnglishAboutPage() {
  return (
    <main>
      {/* 1. About Hero */}
      <PageHero
        title="About Us"
        description="Over 19 years of dedication to justice and professional client representation."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'About Us' }]}
      />

      {/* 2. Office History */}
      <section className="py-20 md:py-32">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div data-motion-portrait="" className="relative">
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] border-8 border-white bg-primary shadow-2xl">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/law-office-hero.webp"
                  alt="Thiangtham Law Office"
                  fill
                  quality={90}
                  className="object-cover opacity-70 mix-blend-overlay"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-10 text-white">
                  <div className="inline-block rounded-full bg-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold mb-4">
                    Established 2007
                  </div>
                  <h3 className="font-serif text-3xl font-bold leading-tight">
                    Since {officeInfo.establishedYear}
                  </h3>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 -z-10 size-72 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 -z-10 size-72 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div data-motion-reveal="">
            <div className="flex items-center gap-3 mb-6">
              <History className="size-5 text-gold" />
              <span className="text-sm font-bold uppercase tracking-widest text-gold">Our History</span>
            </div>
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl leading-tight">
              Providing Systematic Legal Services with Integrity
            </h2>
            <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground text-lg">
              <p>
                <strong>{officeInfo.englishName}</strong> was established in 2007, led by 
                <strong> {headLawyer.nameEn}</strong> as the Managing Attorney, with a vision to create a standard of transparent and accountable legal services.
              </p>
              <p>
                For over {officeInfo.headLawyerExperience}, we have focused on multidimensional fact analysis, rigorous evidence preparation, and systematic case strategy. This ensures our clients have a clear understanding of their case status and potential outcomes.
              </p>
              <p>
                We believe that meticulous work and strict confidentiality are the keys to the long-standing trust our office has earned from our clients.
              </p>
            </div>
            <div className="mt-12">
              <OfficeStats />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Head Lawyer Feature */}
      <section className="bg-primary py-24 md:py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 size-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 size-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5 blur-[100px]" />
        
        <Container className="relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
            <div data-motion-reveal="">
              <div className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold mb-6">
                Managing Attorney
              </div>
              <h2 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
                {headLawyer.nameEn}
              </h2>
              <p className="mt-6 text-xl text-white/70 leading-relaxed font-serif">
                Expert Attorney with Over 19 Years of Experience
              </p>
              
              <div className="mt-12 space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="size-6 text-gold" />
                    <h3 className="font-serif text-2xl font-bold text-gold">Specialized Expertise</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {headLawyer.expertiseEn?.map((exp) => (
                      <span key={exp} className="rounded-xl bg-white/5 px-5 py-3 text-sm border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="size-6 text-gold" />
                    <h3 className="font-serif text-2xl font-bold text-gold">Education</h3>
                  </div>
                  <ul className="space-y-4">
                    {headLawyer.education?.map((edu, idx) => (
                      <li key={idx} className="flex gap-4 text-white/80 leading-relaxed text-lg">
                        <div className="size-2 rounded-full bg-gold mt-2.5 shrink-0" />
                        {edu.degreeEn}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div data-motion-portrait="" className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-2xl">
                <Image
                  src={headLawyer.image || '/staff/kasem-chimphli.svg'}
                  alt={headLawyer.nameEn}
                  fill
                  className="object-contain p-8 md:p-12"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 md:-left-12 rounded-3xl bg-gold p-8 md:p-10 text-primary shadow-2xl max-w-xs">
                <Scale className="size-12 mb-6" />
                <p className="font-serif text-2xl font-bold leading-tight italic">
                  &quot;Upholding Justice, Preserving Client Confidentiality&quot;
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Office Contact Block */}
      <section className="py-24 md:py-32 bg-secondary/10">
        <Container>
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-sm font-bold uppercase tracking-widest text-gold mb-4">Communication</span>
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">Contact the Office</h2>
            <div className="mt-8 h-1 w-20 bg-gold" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {contactItems.map((item) => {
              const content = (
                <>
                  <div className="mb-8 flex size-20 items-center justify-center rounded-3xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-gold group-hover:scale-110">
                    <item.icon className="size-10" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{item.label}</p>
                  <p className="font-serif text-xl font-bold text-primary group-hover:text-gold transition-colors">{item.value}</p>
                  {item.subValue && <p className="font-serif text-lg font-bold text-primary/60 mt-1">{item.subValue}</p>}
                </>
              )

              return item.href ? (
                <a 
                  key={item.label} 
                  href={item.href} 
                  target={item.href.startsWith('http') ? '_blank' : undefined} 
                  rel="noreferrer"
                  className="group relative flex flex-col items-center rounded-[2.5rem] border border-border bg-white p-10 text-center transition-all hover:-translate-y-2 hover:border-gold hover:shadow-2xl"
                >
                  {content}
                </a>
              ) : (
                <div 
                  key={item.label}
                  className="group relative flex flex-col items-center rounded-[2.5rem] border border-border bg-white p-10 text-center shadow-sm"
                >
                  {content}
                </div>
              )
            })}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col justify-center rounded-[3rem] bg-white border border-border p-10 md:p-16 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <MapPin className="size-48" />
              </div>
              <div className="relative z-10">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-gold mb-8">
                  <MapPin className="size-8" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-primary mb-6">Office Address</h3>
                <p className="text-xl leading-relaxed text-muted-foreground mb-12 max-w-xl">
                  {officeContact.addressEn}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={officeContact.mapUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-2xl bg-primary px-10 py-5 text-sm font-bold text-white transition-all hover:bg-primary-dark hover:shadow-lg active:scale-95"
                  >
                    Open in Google Maps
                    <ArrowRight className="size-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-[3rem] bg-primary p-10 md:p-16 text-white shadow-xl flex flex-col justify-center">
              <h3 className="font-serif text-3xl font-bold text-gold mb-8">Appointments</h3>
              <p className="leading-relaxed text-lg text-white/80 mb-10">
                To ensure a thorough case analysis, please schedule an appointment before visiting.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="size-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="size-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-white/90">Initial consultation via phone or LINE</span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="size-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="size-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-white/90">Prepare all relevant documents in advance</span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="size-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="size-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-white/90">Receive straightforward case analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Vision / Mission / Values */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-white">
        <Container>
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-sm font-bold uppercase tracking-widest text-gold mb-4">Our Principles</span>
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">Vision & Mission</h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center text-center rounded-[2.5rem] bg-ivory/30 p-12 border border-border/50 transition-all hover:bg-white hover:shadow-2xl hover:border-gold/20">
                <div className="mb-10 flex size-24 items-center justify-center rounded-full bg-gold/10 text-gold-ink">
                  <value.icon className="size-12" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-6">{value.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Team Summary */}
      <section className="py-24 md:py-32 bg-secondary/5">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div data-motion-reveal="">
              <SectionHeading
                eyebrow="Our Team"
                title="Expert Collaboration"
                description={`Our office has a team of more than 9 lawyers and advisors ready to dedicate themselves to protecting client interests. We work together as a team to cover every aspect of the law thoroughly.`}
              />
              <div className="mt-12 flex flex-col gap-8">
                <div className="flex gap-6 items-start">
                  <div className="size-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0">
                    <Briefcase className="size-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-xl">Specialized Expertise</h4>
                    <p className="text-muted-foreground mt-2 leading-relaxed">Attorneys with experience in various types of cases, including civil, criminal, and special cases.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="size-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0">
                    <ShieldCheck className="size-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-xl">Professional Standards</h4>
                    <p className="text-muted-foreground mt-2 leading-relaxed">Adhering to legal ethics and client privacy as our top priority.</p>
                  </div>
                </div>
              </div>
              <div className="mt-14">
                <Link
                  href="/en/team"
                  className="inline-flex items-center gap-3 rounded-2xl bg-primary px-10 py-5 text-sm font-bold text-white shadow-xl transition-all hover:bg-primary-dark hover:scale-105"
                >
                  Meet Our Team
                  <ArrowRight className="size-5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {lawyers.slice(1, 5).map((lawyer, idx) => (
                <div key={idx} className={`relative overflow-hidden rounded-[2.5rem] shadow-lg ${idx % 2 === 1 ? 'translate-y-12' : ''}`}>
                  <div className="aspect-[3/4] relative bg-white">
                    <Image
                      src={lawyer.image || '/person-placeholder.svg'}
                      alt={lawyer.nameEn}
                      fill
                      className="object-contain p-6 opacity-90 transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                    <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">{lawyer.roleEn}</p>
                    <p className="font-serif text-xl font-bold leading-tight">{lawyer.nameEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Final CTA */}
      <CTASection title="Standing Ready for Justice and Your Best Interests" />
    </main>
  )
}
