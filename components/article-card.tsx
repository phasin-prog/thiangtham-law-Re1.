import Link from 'next/link'
import { ArrowRight, Clock3, UserRound } from 'lucide-react'
import type { LegalArticle } from '@/lib/data/articles'

export function ArticleCard({
  article,
  locale = 'th',
}: {
  article: LegalArticle
  locale?: 'th' | 'en'
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-gold/70 hover:shadow-lg">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className="rounded-full bg-gold-soft/55 px-3 py-1 text-gold-ink">
          {article.category}
        </span>
        <span>{article.date}</span>
        <span className="inline-flex items-center gap-1">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {article.readTime}
        </span>
        <span className="inline-flex items-center gap-1">
          <UserRound className="size-3.5" aria-hidden="true" />
          {article.author}
        </span>
      </div>
      <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-primary">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
        {article.excerpt}
      </p>
      <Link
        href={`${locale === 'en' ? '/en' : ''}/articles/${article.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
      >
        {locale === 'en' ? 'Read Article' : 'อ่านบทความ'}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  )
}
