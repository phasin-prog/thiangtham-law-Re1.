'use client'

import { FileQuestion, Home } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref = '/',
}: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-secondary/30 p-12 text-center">
      <div className="flex size-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-border">
        <FileQuestion className="size-10 text-gold-ink" />
      </div>
      <h3 className="mt-8 font-serif text-2xl font-bold text-primary">
        {title || t('อยู่ระหว่างการจัดเตรียมข้อมูล', 'Information Coming Soon')}
      </h3>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        {description || t(
          'ขออภัย ข้อมูลในส่วนนี้ยังไม่พร้อมใช้งาน ทีมงานกำลังเร่งดำเนินการอัปเดตข้อมูลที่ถูกต้องเพื่อให้ท่านได้รับชมในเร็วๆ นี้',
          'We apologize, this section is currently being updated. Our team is working to provide accurate and professional content for you shortly.'
        )}
      </p>
      <Link
        href={actionHref}
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary-dark hover:-translate-y-0.5"
      >
        <Home className="size-4" />
        {actionLabel || t('กลับไปหน้าแรก', 'Return to Home')}
      </Link>
    </div>
  )
}
