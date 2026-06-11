import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { MapSection } from '@/components/map-section'
import { PageHero } from '@/components/page-hero'
import { siteConfig } from '@/lib/site-data'

export default function ContactPage() {
  const contacts = [
    { icon: Phone, label: 'โทรศัพท์', value: siteConfig.phones.join(' / '), href: `tel:${siteConfig.phones[0].replace(/-/g, '')}` },
    { icon: MessageCircle, label: 'Line', value: siteConfig.line, href: `https://line.me/R/ti/p/~${siteConfig.line}` },
    { icon: Mail, label: 'อีเมล', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Clock3, label: 'เวลาทำการ', value: siteConfig.hours },
  ]

  return (
    <main>
      <PageHero
        title="ติดต่อเรา"
        description="เลือกช่องทางที่สะดวก หรือนัดหมายล่วงหน้าเพื่อให้ทีมงานเตรียมรับเรื่องและเอกสารได้เหมาะสม"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ติดต่อเรา' }]}
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
              <h2 className="mt-4 font-serif text-2xl font-bold text-gold">ที่อยู่สำนักงาน</h2>
              <p className="mt-3 leading-8 text-primary-foreground/80">{siteConfig.address}</p>
              <p className="mt-5 text-sm leading-7 text-primary-foreground/65">
                กรุณานัดหมายก่อนเข้าพบ เพื่อให้ทีมงานยืนยันเวลาและแจ้งรายการเอกสารที่ควรนำมา
              </p>
            </div>
            <MapSection />
          </div>
        </Container>
      </section>
      <CTASection title="ต้องการส่งรายละเอียดก่อนนัดหมาย?" />
    </main>
  )
}
