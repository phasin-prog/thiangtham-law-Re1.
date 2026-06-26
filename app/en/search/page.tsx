'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpenText, Search } from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { englishLegalArticles } from '@/lib/data/articles-en'

export default function EnglishSearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return englishLegalArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.paragraphs?.some((p) => p.toLowerCase().includes(q)) ||
            s.bullets?.some((b) => b.toLowerCase().includes(q)),
        ),
    )
  }, [query])

  const hasQuery = query.trim().length > 0

  return (
    <main>
      <PageHero
        title="Search Legal Information"
        description="Search the article library or browse the legal service and case work categories offered by the office."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Search' }]}
      />
      <section className="py-14 md:py-20">
        <Container className="max-w-4xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <label htmlFor="site-search-en" className="sr-only">Search terms</label>
            <input
              id="site-search-en"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="For example: divorce, civil claim, estate administrator"
              className="min-h-14 min-w-0 flex-1 bg-transparent px-5 outline-none"
            />
            <button type="submit" className="inline-flex items-center gap-2 bg-primary px-5 font-bold text-white transition hover:bg-primary-dark">
              <Search className="size-5 text-gold" aria-hidden="true" />
              Search
            </button>
          </form>

          {hasQuery && (
            <div className="mt-8">
              <p className="text-sm font-semibold text-primary">{results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</p>
              {results.length > 0 ? (
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((article) => (
                    <ArticleCard key={article.slug} article={article} locale="en" />
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-muted-foreground">No articles match your search. Try different keywords or browse the categories below.</p>
              )}
            </div>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Link href="/en/legal-knowledge" className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
              <BookOpenText className="size-7 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl font-bold text-primary">Legal Knowledge</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">Browse general articles by legal topic and practical guide.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                View Article Categories
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/en/services" className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Search className="size-7 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl font-bold text-primary">Legal Services</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">Browse litigation, contracts, tax support, foreign document services, enforcement, mediation, and business services.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                View All Services
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}
