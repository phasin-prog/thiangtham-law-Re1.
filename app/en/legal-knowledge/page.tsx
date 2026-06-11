import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { englishLegalArticles } from '@/lib/data/articles-en'

export const metadata: Metadata = {
  title: 'Legal Knowledge',
  description: 'General Thai legal information and practical guides for preparing documents and understanding legal procedures.',
}

export default function EnglishLegalKnowledgePage() {
  return (
    <main>
      <PageHero
        title="Legal Knowledge"
        description="General legal articles and practical guides to help you prepare documents, understand procedures, and ask focused questions before obtaining advice."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Legal Knowledge' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {englishLegalArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.slug} article={article} locale="en" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/en/articles"
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              View All Articles
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
      <CTASection title="Do You Have a Question About Your Actual Situation?" />
    </main>
  )
}
