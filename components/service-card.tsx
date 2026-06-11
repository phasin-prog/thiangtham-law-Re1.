import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LegalService } from '@/lib/data/services'
import { serviceIcons } from '@/lib/service-icons'

export function ServiceCard({
  service,
  locale = 'th',
}: {
  service: LegalService
  locale?: 'th' | 'en'
}) {
  const Icon = serviceIcons[service.icon]
  return (
    <Link
      href={`${locale === 'en' ? '/en' : ''}/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold/70 hover:shadow-lg"
    >
      <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {Icon && <Icon className="size-6" aria-hidden="true" />}
      </span>
      <h3 className="mt-4 font-serif text-lg font-bold text-primary">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground">
        {service.description}
      </p>
      <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
        {locale === 'en' ? 'Discuss This Matter' : 'ปรึกษาคดีนี้'}
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}
