import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { legalArticles } from '@/lib/data/articles'

export default function LegalKnowledgePage() {
  return (
    <main>
      <PageHero
        title="กฎหมายน่ารู้"
        description="บทความและข้อมูลกฎหมายเบื้องต้นสำหรับเตรียมเอกสาร ทำความเข้าใจขั้นตอน และตั้งคำถามก่อนขอคำปรึกษาเฉพาะกรณี"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'กฎหมายน่ารู้' }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {legalArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              ดูบทความทั้งหมด
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
      <CTASection title="มีคำถามจากสถานการณ์จริงของคุณ?" />
    </main>
  )
}
