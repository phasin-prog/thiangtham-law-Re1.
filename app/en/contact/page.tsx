import type { Metadata } from 'next'
import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { MapSection } from '@/components/map-section'
import { PageHero } from '@/components/page-hero'
import { officeContact } from '@/lib/data/office'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Thiangtham Law Office by phone, Line, email, or appointment in Det Udom, Ubon Ratchathani.',
}

export default function EnglishContactPage() {
  const contacts = [
    { icon: Phone, label: 'Phone', value: officeContact.phones.join(' / '), href: `tel:${officeContact.phones[0].replace(/-/g, '')}` },
    { icon: MessageCircle, label: 'Line', value: officeContact.line, href: `https://line.me/R/ti/p/~${officeContact.line}` },
    { icon: Mail, label: 'Email', value: officeContact.email, href: `mailto:${officeContact.email}` },
    { icon: Clock3, label: 'Office Hours', value: officeContact.hoursEn },
  ]

  return (
    <main>
      <PageHero
        title="Contact Us"
        description="Choose a convenient contact channel or arrange an appointment so our team can prepare for your matter and documents."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Contact Us' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((item) => {
              const content = (
                <>
                  <item.icon className="size-6 text-gold" aria-hidden="true" />
                  <p className="mt-4 text-sm font-medium text-muted-foreground">{item.label}</p>
                  <p className="mt-1 break-words font-semibold leading-7 text-primary">{item.value}</p>
                </>
              )
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-gold">
                  {content}
                </a>
              ) : (
                <div key={item.label} className="rounded-2xl border border-border bg-card p-6 shadow-sm">{content}</div>
              )
            })}
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.45fr_1fr]">
            <div className="rounded-2xl bg-primary p-7 text-primary-foreground">
              <MapPin className="size-7 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-2xl font-bold text-gold">Office Address</h2>
              <p className="mt-3 leading-8 text-primary-foreground/80">{officeContact.addressEn}</p>
              <p className="mt-5 text-sm leading-7 text-primary-foreground/65">
                Please arrange an appointment before visiting so our team can confirm the time and advise which documents to bring.
              </p>
            </div>
            <MapSection />
          </div>
        </Container>
      </section>
      <CTASection title="Would You Like to Send the Details Before Your Appointment?" />
    </main>
  )
}
