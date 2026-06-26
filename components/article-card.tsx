import Link from 'next/link'
import { ArrowRight, Clock3, UserRound } from 'lucide-react'
import type { LegalArticle } from '@/lib/data/articles'
import { getLocalePath, type Locale } from '@/lib/i18n-config'

export function ArticleCard({
  article,
  locale = 'th',
}: {
  article: LegalArticle
  locale?: Locale
}) {
  return (
    <article
      data-motion-reading=""
      data-motion-depth=""
      className="group flex h-full flex-col rounded-lg border border-border bg-card p-8 shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-gold/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div
        data-motion-meta=""
        className="flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70"
      >
        <span className="rounded-xs bg-gold/10 px-4 py-1.5 text-gold-ink ring-1 ring-gold/20">
          {article.category}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock3 className="size-4" aria-hidden="true" />
          {article.readTime}
        </span>
      </div>
      <h3 className="mt-6 text-balance font-serif text-2xl font-bold leading-[1.2] text-primary transition-colors duration-300 group-hover:text-gold-ink">
        {article.title}
      </h3>
      <p className="mt-4 flex-1 text-pretty text-base leading-relaxed text-muted-foreground/80">
        {article.excerpt}
      </p>
      <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-6">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
          <div className="flex size-8 items-center justify-center rounded-full bg-navy-soft text-primary">
            <UserRound className="size-4" />
          </div>
          {article.author}
        </div>
        <Link
          href={getLocalePath(`/articles/${article.slug}`, locale)}
        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary transition-colors duration-200 hover:text-gold-ink"
        >
          {locale === 'en' ? 'Read' : 'อ่านต่อ'}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
