import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpenText, Search } from 'lucide-react'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'ค้นหา',
  description: 'ค้นหาบริการและบทความกฎหมายของสำนักกฎหมายเที่ยงธรรมทนายความ',
}

export default function SearchPage() {
  return (
    <main>
      <PageHero
        title="ค้นหาข้อมูลกฎหมาย"
        description="ค้นหาหัวข้อจากฐานบทความ หรือเลือกดูหมวดบริการกฎหมายและงานคดีของสำนักงาน"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ค้นหา' }]}
      />
      <section className="py-14 md:py-20">
        <Container className="max-w-4xl">
          <form action="/articles" className="flex overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <label htmlFor="site-search" className="sr-only">
              คำค้นหา
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="เช่น ฟ้องหย่า เช็คเด้ง คดีแพ่ง ผู้จัดการมรดก"
              className="min-h-14 min-w-0 flex-1 bg-transparent px-5 outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary px-5 font-bold text-white transition hover:bg-primary-dark"
            >
              <Search className="size-5 text-gold" aria-hidden="true" />
              ค้นหา
            </button>
          </form>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Link href="/th/legal-knowledge" className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
              <BookOpenText className="size-7 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl font-bold text-primary">กฎหมายน่ารู้</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                เลือกอ่านบทความตามหมวดกฎหมายและคู่มือประชาชน
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                ดูหมวดบทความ
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/th/services" className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Search className="size-7 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl font-bold text-primary">บริการกฎหมาย</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                เลือกบริการตามประเภทคดี สัญญา บังคับคดี ภาษี และเอกสารต่างประเทศ
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                ดูบริการทั้งหมด
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}
