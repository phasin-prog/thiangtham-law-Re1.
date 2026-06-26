import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LegalService } from '@/lib/data/services'
import { getLocalePath, type Locale } from '@/lib/i18n-config'
import { serviceIcons } from '@/lib/service-icons'

export function ServiceCard({
  service,
  locale = 'th',
}: {
  service: LegalService
  locale?: Locale
}) {
  const Icon = serviceIcons[service.icon]
  return (
    <Link
      href={getLocalePath(`/services/${service.slug}`, locale)}
      data-motion-reveal=""
      data-motion-depth=""
      className="group relative flex flex-col rounded-[2rem] border border-border bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-gold/40 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-transparent to-gold/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[2rem]" />
      
      <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-gold group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10">
        {Icon && <Icon className="size-8" aria-hidden="true" />}
      </div>

      <h3 className="font-serif text-2xl font-bold text-primary transition-colors duration-300 group-hover:text-gold-ink leading-tight">
        {service.title}
      </h3>
      
      <div className="mt-5 h-1 w-12 rounded-full bg-gold/20 transition-all duration-300 group-hover:w-20 group-hover:bg-gold" />
      
      <p className="mt-6 flex-1 text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-primary/70">
        {service.description}
      </p>

      <div className="mt-10 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary transition-all duration-300 group-hover:text-gold-ink group-hover:gap-5">
        <span>{locale === 'en' ? 'Learn More' : 'อ่านรายละเอียด'}</span>
        <ArrowRight
          className="size-5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}
