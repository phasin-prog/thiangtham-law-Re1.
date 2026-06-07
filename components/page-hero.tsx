import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { href?: string; label: string }

export function PageHero({
  title,
  description,
  crumbs,
}: {
  title: string
  description?: string
  crumbs: Crumb[]
}) {
  return (
    <section className="border-b-2 border-gold/40 bg-burgundy text-burgundy-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-burgundy-foreground/70">
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-gold">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold">{c.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-4 text-balance font-serif text-3xl font-bold text-gold md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-burgundy-foreground/85">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
