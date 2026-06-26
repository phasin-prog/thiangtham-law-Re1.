'use client'

import Link from 'next/link'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { englishArticleCategories, englishLegalArticles } from '@/lib/data/articles-en'
import type { ArticleCategoryKey } from '@/lib/data/articles'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n'
import { use } from 'react'

type Props = { searchParams: Promise<{ category?: string }> }

export default function EnglishArticlesPage({ searchParams }: Props) {
  const { t } = useTranslation()
  const { category } = use(searchParams)

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
        title={t('บทความและสาระน่ารู้', 'Legal Articles and Guides')}
        description={t('รวมข้อมูลกฎหมายเบื้องต้นเพื่อช่วยให้ท่านเตรียมตัวและเข้าใจขั้นตอนก่อนปรึกษาทนายความ', 'General Thai legal information to help you prepare documents, understand procedures, and identify questions for a case-specific consultation.')}
        crumbs={[{ href: '/en', label: t('หน้าแรก', 'Home') }, { label: t('บทความกฎหมาย', 'Legal Articles') }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <nav
            data-motion-reveal=""
            className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm"
            aria-label={t('หมวดหมู่บทความ', 'Article categories')}
          >
            <Link href="/en/articles" className={cn('rounded-full px-4 py-2 text-sm font-semibold transition', !activeCategory ? 'bg-primary text-white' : 'bg-secondary text-primary hover:bg-gold/20')}>
              {t('บทความทั้งหมด', 'All Articles')}
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
            <p className="text-sm font-semibold text-primary">{activeLabel ?? t('บทความทั้งหมด', 'All Articles')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{filteredArticles.length} {t('บทความ', 'articles')}</p>
          </div>
          {filteredArticles.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} locale="en" />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              {t('ยังไม่มีบทความในหมวดหมู่นี้', 'No articles are available in this category yet.')}
            </div>
          )}
        </Container>
      </section>
      <CTASection title={t('ต้องการปรึกษาทนายความเกี่ยวกับเรื่องของคุณ?', 'Do You Have a Question About Your Actual Situation?')} />
    </main>
  )
}
