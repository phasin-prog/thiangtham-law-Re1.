'use client'

import Link from 'next/link'
import { Gavel, Home, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/container'
import { useTranslation } from '@/lib/i18n'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center py-20">
      <Container className="text-center">
        <div className="mx-auto mb-8 flex size-24 items-center justify-center rounded-3xl bg-secondary text-primary">
          <Gavel className="size-12" />
        </div>
        <h1 className="font-serif text-6xl font-black text-primary md:text-8xl">404</h1>
        <h2 className="mt-6 font-serif text-3xl font-bold text-primary-dark md:text-4xl">
          {t('ไม่พบหน้าที่คุณต้องการ', 'Page Not Found')}
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
          {t(
            'ขออภัย หน้าที่คุณกำลังมองหาอาจถูกลบไปแล้ว เปลี่ยนชื่อ หรือไม่พร้อมใช้งานในขณะนี้',
            'Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
          )}
        </p>
        
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/th"
            className="inline-flex h-14 items-center gap-3 rounded-full bg-primary px-8 font-bold text-white transition-all hover:bg-primary-dark"
          >
            <Home className="size-5" />
            {t('กลับหน้าแรก', 'Return Home')}
          </Link>
          <button
            onClick={() => typeof window !== 'undefined' && window.history.back()}
            className="inline-flex h-14 items-center gap-3 rounded-full border-2 border-primary px-8 font-bold text-primary transition-all hover:bg-primary hover:text-white"
          >
            <ArrowLeft className="size-5" />
            {t('ย้อนกลับ', 'Go Back')}
          </button>
        </div>
      </Container>
    </main>
  )
}
