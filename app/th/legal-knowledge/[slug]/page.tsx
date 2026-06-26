import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/article-card'
import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { legalArticles } from '@/lib/data/articles'

const categories = {
  'civil-law': {
    title: 'กฎหมายแพ่ง',
    description: 'ความรู้เกี่ยวกับสิทธิ หน้าที่ สัญญา หนี้ ละเมิด และข้อพิพาทระหว่างบุคคล',
  },
  'criminal-law': {
    title: 'กฎหมายอาญา',
    description: 'ข้อมูลเบื้องต้นเกี่ยวกับสิทธิของผู้เสียหาย ผู้ต้องหา จำเลย และขั้นตอนคดีอาญา',
  },
  'family-law': {
    title: 'กฎหมายครอบครัว',
    description: 'ความรู้เกี่ยวกับการหย่า สินสมรส บุตร ค่าอุปการะ และข้อพิพาทในครอบครัว',
  },
  'inheritance-law': {
    title: 'กฎหมายมรดก',
    description: 'ข้อมูลเกี่ยวกับทายาท พินัยกรรม ผู้จัดการมรดก และการแบ่งทรัพย์มรดก',
  },
  'land-law': {
    title: 'กฎหมายที่ดิน',
    description: 'ความรู้เกี่ยวกับกรรมสิทธิ์ การครอบครอง การเช่า และข้อพิพาทเรื่องที่ดิน',
  },
  'hiring-lawyer': {
    title: 'คู่มือว่าจ้างทนาย',
    description: 'แนวทางเตรียมข้อมูล ตั้งคำถาม และทำความเข้าใจขอบเขตงานก่อนว่าจ้างทนายความ',
  },
  'litigation-guide': {
    title: 'เทคนิคการต่อสู้คดี',
    description: 'หลักคิดเบื้องต้นในการจัดข้อเท็จจริง เอกสาร พยานหลักฐาน และประเด็นข้อกฎหมาย',
  },
  'court-process': {
    title: 'ขั้นตอนขึ้นศาล',
    description: 'ภาพรวมขั้นตอนตั้งแต่ได้รับหมาย นัดพิจารณา สืบพยาน ไปจนถึงคำพิพากษา',
  },
  'legal-documents': {
    title: 'การเตรียมเอกสารคดี',
    description: 'แนวทางรวบรวม ตรวจสอบ และจัดลำดับเอกสารเพื่อใช้ขอคำปรึกษาหรือดำเนินคดี',
  },
} as const

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]
  return category
    ? { title: category.title, description: category.description }
    : { title: 'ไม่พบหมวดกฎหมาย' }
}

export default async function LegalKnowledgeCategoryPage({ params }: Props) {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]
  if (!category) notFound()

  return (
    <main>
      <PageHero
        title={category.title}
        description={category.description}
        crumbs={[
          { href: '/', label: 'หน้าแรก' },
          { href: '/legal-knowledge', label: 'กฎหมายน่ารู้' },
          { label: category.title },
        ]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {legalArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <p className="mt-9 rounded-xl border border-gold/30 bg-secondary/70 p-5 text-sm leading-7 text-muted-foreground">
            บทความเป็นข้อมูลกฎหมายทั่วไป การนำไปใช้กับกรณีจริงควรตรวจข้อเท็จจริง เอกสาร
            กำหนดเวลา และกฎหมายที่ใช้บังคับเป็นรายกรณี
          </p>
        </Container>
      </section>
      <CTASection title={`มีคำถามเกี่ยวกับ${category.title}?`} />
    </main>
  )
}
