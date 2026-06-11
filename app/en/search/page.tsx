import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpenText, Search } from 'lucide-react'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Find English legal services and articles from Thiangtham Law Office.',
}

export default function EnglishSearchPage() {
  return (
    <main>
      <PageHero
        title="Search Legal Information"
        description="Search the article library or browse the legal service categories offered by the office."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Search' }]}
      />
      <section className="py-14 md:py-20">
        <Container className="max-w-4xl">
          <form action="/en/articles" className="flex overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <label htmlFor="site-search-en" className="sr-only">Search terms</label>
            <input
              id="site-search-en"
              name="q"
              type="search"
              placeholder="For example: divorce, civil claim, estate administrator"
              className="min-h-14 min-w-0 flex-1 bg-transparent px-5 outline-none"
            />
            <button type="submit" className="inline-flex items-center gap-2 bg-primary px-5 font-bold text-white transition hover:bg-primary-dark">
              <Search className="size-5 text-gold" aria-hidden="true" />
              Search
            </button>
          </form>
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
              <p className="mt-2 text-sm leading-7 text-muted-foreground">Browse litigation, contracts, enforcement, mediation, and business services.</p>
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
