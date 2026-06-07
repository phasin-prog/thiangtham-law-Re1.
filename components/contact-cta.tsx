import { Phone, MessageCircle, Mail, MapPin, Share2 } from 'lucide-react'
import { siteConfig } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'

export function ContactCTA() {
  return (
    <section className="bg-burgundy-dark text-burgundy-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <SectionHeading
          align="center"
          light
          eyebrow="ติดต่อเรา"
          title="ต้องการปรึกษากฎหมาย ติดต่อสำนักกฎหมายเที่ยงธรรมทนายความ"
          description="ทีมงานพร้อมรับเรื่องและให้ข้อมูลเบื้องต้น ท่านสามารถติดต่อได้หลายช่องทางตามสะดวก"
        />

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Phone,
              label: 'โทรศัพท์',
              value: `${siteConfig.phones[0]} / ${siteConfig.phones[1]}`,
              href: `tel:${siteConfig.phones[0].replace(/-/g, '')}`,
            },
            {
              icon: MessageCircle,
              label: 'LINE',
              value: siteConfig.line,
              href: `https://line.me/R/ti/p/~${siteConfig.line}`,
            },
            {
              icon: Share2,
              label: 'Facebook',
              value: siteConfig.facebook,
              href: '#',
            },
            {
              icon: Mail,
              label: 'อีเมล',
              value: siteConfig.email,
              href: `mailto:${siteConfig.email}`,
            },
            {
              icon: MapPin,
              label: 'แผนที่สำนักงาน',
              value: 'เปิดแผนที่ Google Maps',
              href: siteConfig.mapUrl,
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-start gap-3 rounded-lg border border-gold/30 bg-burgundy p-4 transition-colors hover:border-gold"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15">
                <item.icon className="size-5 text-gold" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-burgundy-foreground/70">
                  {item.label}
                </span>
                <span className="block break-words text-sm font-medium">
                  {item.value}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`tel:${siteConfig.phones[0].replace(/-/g, '')}`}
            className="flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-burgundy-dark transition-colors hover:bg-gold-soft"
          >
            <Phone className="size-4" aria-hidden="true" />
            โทร {siteConfig.phones[0]}
          </a>
          <a
            href={`tel:${siteConfig.phones[1].replace(/-/g, '')}`}
            className="flex items-center gap-2 rounded-md border border-gold/60 px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-burgundy"
          >
            <Phone className="size-4" aria-hidden="true" />
            โทร {siteConfig.phones[1]}
          </a>
          <a
            href={`https://line.me/R/ti/p/~${siteConfig.line}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md border border-gold/60 px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-burgundy"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            ติดต่อผ่าน LINE
          </a>
          <a
            href={siteConfig.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md border border-gold/60 px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-burgundy"
          >
            <MapPin className="size-4" aria-hidden="true" />
            เปิดแผนที่
          </a>
        </div>
      </div>
    </section>
  )
}
