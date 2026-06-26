'use client'

import { MapPin, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/site-data'
import { useTranslation } from '@/lib/i18n'

export function MapSection() {
  const { t } = useTranslation()

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-start gap-3 border-b border-border p-5">
        <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h3 className="font-serif text-base font-bold text-primary">
            {t('ที่ตั้งสำนักงาน', 'Office Location')}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t(siteConfig.address, '1005 Moo 24, Mueang Det, Det Udom District, Ubon Ratchathani 34160, Thailand')}
          </p>
          <a
            href={siteConfig.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            {t('เปิดใน Google Maps', 'Open in Google Maps')}
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <iframe
        title={t('แผนที่สำนักกฎหมายเที่ยงธรรมทนายความ', 'Map of Thiangtham Law Office')}
        src="https://www.google.com/maps?q=อำเภอเดชอุดม+อุบลราชธานี&output=embed"
        className="h-72 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
