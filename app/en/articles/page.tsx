import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { englishArticleCategories, englishLegalArticles } from '@/lib/data/articles-en'
import type { ArticleCategoryKey } from '@/lib/data/articles'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Legal Articles',
  description: 'English-language articles about Thai civil, criminal, family, inheritance, cheque, labor, and contract law.',
}

type Props = { searchParams: Promise<{ category?: string }> }

export default async function EnglishArticlesPage({ searchParams }: Props) {
  const { category } = await searchParams
  const activeCategory = englishArticleCategories.some((item) => item.key === category)
    ? category as ArticleCategoryKey
    : undefined
  const filteredArticles = activeCategory
    ? englishLegalArticles.filter((article) => article.categoryKey === activeCategory)
    : englishLegalArticles
  const activeLabel = englishArticleCategories.find((item) => item.key === activeCategory)?.label

  return (
    <main>
      <PageHero
        title="Legal Articles and Guides"
        description="General Thai legal information to help you prepare documents, understand procedures, and identify questions for a case-specific consultation."
        crumbs={[{ href: '/en', label: 'Home' }, { label: 'Legal Articles' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <nav className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm" aria-label="Article categories">
            <Link href="/en/articles" className={cn('rounded-full px-4 py-2 text-sm font-semibold transition', !activeCategory ? 'bg-primary text-white' : 'bg-secondary text-primary hover:bg-gold/20')}>
              All Articles
            </Link>
            {englishArticleCategories.map((item) => (
              <Link
                key={item.key}
                href={`/en/articles?category=${item.key}`}
                className={cn('rounded-full px-4 py-2 text-sm font-semibold transition', activeCategory === item.key ? 'bg-primary text-white' : 'bg-secondary text-primary hover:bg-gold/20')}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-9">
            <p className="text-sm font-semibold text-primary">{activeLabel ?? 'All Articles'}</p>
            <p className="mt-1 text-sm text-muted-foreground">{filteredArticles.length} articles</p>
          </div>
          {filteredArticles.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} locale="en" />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              No articles are available in this category yet.
            </div>
          )}
        </Container>
      </section>
      <CTASection title="Do You Have a Question About Your Actual Situation?" />
    </main>
  )
}
