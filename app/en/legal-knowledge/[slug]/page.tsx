import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { englishLegalArticles } from '@/lib/data/articles-en'
import type { ArticleCategoryKey } from '@/lib/data/articles'

const categories: Record<string, { title: string; description: string; articleCategoryKey?: ArticleCategoryKey }> = {
  'civil-law': { title: 'Civil Law', description: 'Rights, obligations, contracts, debts, wrongful acts, and private disputes.', articleCategoryKey: 'civil' },
  'criminal-law': { title: 'Criminal Law', description: 'General information for complainants, accused persons, defendants, and criminal procedure.', articleCategoryKey: 'criminal' },
  'family-law': { title: 'Family Law', description: 'Divorce, marital property, children, maintenance, and family disputes.', articleCategoryKey: 'family' },
  'inheritance-law': { title: 'Inheritance Law', description: 'Heirs, wills, estate administrators, and distribution of estate assets.', articleCategoryKey: 'inheritance' },
  'land-law': { title: 'Land Law', description: 'Ownership, possession, leases, boundaries, access rights, and land disputes.', articleCategoryKey: 'land' },
  'hiring-lawyer': { title: 'Guide to Hiring a Lawyer', description: 'How to prepare information, ask questions, and understand the scope of legal work.', articleCategoryKey: 'lawyer-guide' },
  'litigation-guide': { title: 'Litigation Guide', description: 'Organizing facts, documents, evidence, and legal issues before or during litigation.' },
  'court-process': { title: 'Court Process', description: 'An overview from receiving court papers through hearings, evidence, and judgment.' },
  'legal-documents': { title: 'Legal Document Preparation', description: 'How to gather, check, and organize documents for consultation or court proceedings.' },
}

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]
  return category
    ? {
        title: category.title,
        description: category.description,
        alternates: {
          canonical: `https://www.thiangthamlaw.com/en/legal-knowledge/${slug}`,
          languages: {
            'th-TH': `https://www.thiangthamlaw.com/th/legal-knowledge/${slug}`,
            'en-US': `https://www.thiangthamlaw.com/en/legal-knowledge/${slug}`,
          },
        },
      }
    : { title: 'Category Not Found' }
}

export default async function EnglishLegalKnowledgeCategoryPage({ params }: Props) {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]
  if (!category) notFound()

  const filteredArticles = category.articleCategoryKey
    ? englishLegalArticles.filter((article) => article.categoryKey === category.articleCategoryKey)
    : englishLegalArticles

  return (
    <main>
      <PageHero
        title={category.title}
        description={category.description}
        crumbs={[
          { href: '/en', label: 'Home' },
          { href: '/en/legal-knowledge', label: 'Legal Knowledge' },
          { label: category.title },
        ]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale="en" />
            ))}
          </div>
          <p className="mt-9 rounded-xl border border-gold/30 bg-secondary/70 p-5 text-sm leading-7 text-muted-foreground">
            These articles provide general legal information. Applying the information to an actual matter requires a review of the facts, documents, deadlines, and current law.
          </p>
        </Container>
      </section>
      <CTASection title={`Do You Have a Question About ${category.title}?`} />
    </main>
  )
}
