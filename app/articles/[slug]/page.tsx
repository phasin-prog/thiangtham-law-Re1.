import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { getLegalArticle, legalArticles } from '@/lib/data/articles'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return legalArticles.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getLegalArticle(slug)
  return article ? { title: article.title, description: article.excerpt } : { title: 'ไม่พบบทความ' }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = getLegalArticle(slug)
  if (!article) notFound()
  const related = legalArticles.filter((item) => item.slug !== article.slug).slice(0, 3)

  return (
    <main>
      <PageHero
        title={article.title}
        description={`${article.category} · ${article.date} · ${article.author} · ${article.readTime}`}
        crumbs={[
          { href: '/', label: 'หน้าแรก' },
          { href: '/articles', label: 'บทความ' },
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
            บทความนี้เป็นข้อมูลทั่วไป ไม่ใช่คำปรึกษาทางกฎหมายเฉพาะกรณี
            ข้อเท็จจริง เอกสาร และกำหนดเวลาของแต่ละเรื่องอาจทำให้แนวทางแตกต่างกัน
          </div>
          <Link href="/articles" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <ArrowLeft className="size-4" /> กลับไปหน้าบทความ
          </Link>
        </Container>
      </article>
      <section className="bg-secondary/60 py-14">
        <Container>
          <h2 className="font-serif text-2xl font-bold text-primary">บทความที่เกี่ยวข้อง</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {related.map((item) => <ArticleCard key={item.slug} article={item} />)}
          </div>
        </Container>
      </section>
      <CTASection />
    </main>
  )
}
