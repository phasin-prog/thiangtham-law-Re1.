import Link from 'next/link'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import {
  articleCategories,
  legalArticles,
  type ArticleCategoryKey,
} from '@/lib/data/articles'
import { getLocalePath } from '@/lib/i18n-config'
import { cn } from '@/lib/utils'

type Props = {
  searchParams: Promise<{ category?: string }>
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { category } = await searchParams
  const activeCategory = articleCategories.some((item) => item.key === category)
    ? category as ArticleCategoryKey
    : undefined
  const filteredArticles = activeCategory
    ? legalArticles.filter((article) => article.categoryKey === activeCategory)
    : legalArticles
  const activeLabel = articleCategories.find((item) => item.key === activeCategory)?.label

  return (
    <main>
      <PageHero
        title="บทความกฎหมายน่ารู้"
        description="ฐานความรู้กฎหมายแบบ local data สำหรับเตรียมเอกสาร ทำความเข้าใจขั้นตอน และตั้งคำถามก่อนขอคำปรึกษาเฉพาะกรณี"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'บทความกฎหมายน่ารู้' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <nav
            data-motion-reveal=""
            className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm"
            aria-label="หมวดบทความ"
          >
            <Link
              href={getLocalePath('/articles', 'th')}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                !activeCategory
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-primary hover:bg-gold/20',
              )}
            >
              ทั้งหมด
            </Link>
            {articleCategories.map((item) => (
              <Link
                key={item.key}
                href={getLocalePath(`/articles?category=${item.key}`, 'th')}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  activeCategory === item.key
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-primary hover:bg-gold/20',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-9 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-primary">
                {activeLabel ?? 'บทความทั้งหมด'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                พบ {filteredArticles.length} บทความ
              </p>
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              ยังไม่มีบทความในหมวดนี้
            </div>
          )}
        </Container>
      </section>
      <CTASection title="มีคำถามจากสถานการณ์จริงของคุณ?" />
    </main>
  )
}
