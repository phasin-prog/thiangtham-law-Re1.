import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { englishLegalArticles, getEnglishLegalArticle } from '@/lib/data/articles-en'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return englishLegalArticles.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getEnglishLegalArticle(slug)
  return article ? { title: article.title, description: article.excerpt } : { title: 'Article Not Found' }
}

export default async function EnglishArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = getEnglishLegalArticle(slug)
  if (!article) notFound()
  const related = englishLegalArticles.filter((item) => item.slug !== article.slug).slice(0, 3)

  return (
    <main>
      <PageHero
        title={article.title}
        description={`${article.category} · ${article.date} · ${article.author} · ${article.readTime}`}
        crumbs={[
          { href: '/en', label: 'Home' },
          { href: '/en/articles', label: 'Articles' },
          { label: article.title },
        ]}
      />
      <article className="py-14 md:py-20">
        <Container className="max-w-4xl">
          <p className="text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
          <div className="mt-10 space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-2xl font-bold text-primary">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 leading-7 text-muted-foreground">
                        <span className="mt-3 size-1.5 shrink-0 rounded-full bg-gold" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-gold/35 bg-secondary/70 p-6 text-sm leading-7 text-muted-foreground">
            This article provides general information and is not legal advice for a specific matter. Facts, documents, deadlines, and current law may lead to a different legal assessment.
          </div>
          <Link href="/en/articles" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <ArrowLeft className="size-4" /> Back to Articles
          </Link>
        </Container>
      </article>
      <section className="bg-secondary/60 py-14">
        <Container>
          <h2 className="font-serif text-2xl font-bold text-primary">Related Articles</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {related.map((item) => <ArticleCard key={item.slug} article={item} locale="en" />)}
          </div>
        </Container>
      </section>
      <CTASection />
    </main>
  )
}
