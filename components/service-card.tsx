import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/lib/site-data'
import { serviceIcons } from '@/lib/service-icons'

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon]
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
    >
      <span className="flex size-12 items-center justify-center rounded-lg bg-burgundy/10 text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-burgundy-foreground">
        {Icon && <Icon className="size-6" aria-hidden="true" />}
      </span>
      <h3 className="mt-4 font-serif text-lg font-bold text-burgundy">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.short}
      </p>
      <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-burgundy">
        อ่านรายละเอียด
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}
