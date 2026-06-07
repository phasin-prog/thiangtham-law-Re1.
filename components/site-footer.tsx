import Link from 'next/link'
import { Phone, MessageCircle, Mail, MapPin, Share2, Scale } from 'lucide-react'
import { siteConfig, navLinks, services } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="bg-burgundy text-burgundy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/60">
              <Scale className="size-5 text-gold" aria-hidden="true" />
            </span>
            <span className="font-serif text-lg font-bold text-gold">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-burgundy-foreground/80">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold text-gold">
            เมนูหลัก
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-burgundy-foreground/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold text-gold">
            บริการกฎหมาย
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-burgundy-foreground/80 transition-colors hover:text-gold"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold text-gold">
            ติดต่อสำนักงาน
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-burgundy-foreground/80">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>
                {siteConfig.phones[0]}
                <br />
                {siteConfig.phones[1]}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>LINE: {siteConfig.line}</span>
            </li>
            <li className="flex items-start gap-2">
              <Share2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{siteConfig.facebook}</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all transition-colors hover:text-gold"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-burgundy-foreground/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} · สงวนลิขสิทธิ์
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-gold">
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link href="/legal-disclaimer" className="transition-colors hover:text-gold">
              ข้อจำกัดความรับผิด
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
