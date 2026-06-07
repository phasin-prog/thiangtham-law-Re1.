import { MapPin, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/site-data'

export function MapSection() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-start gap-3 border-b border-border p-5">
        <MapPin className="mt-0.5 size-5 shrink-0 text-burgundy" aria-hidden="true" />
        <div>
          <h3 className="font-serif text-base font-bold text-burgundy">
            ที่ตั้งสำนักงาน
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {siteConfig.address}
          </p>
          <a
            href={siteConfig.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy transition-colors hover:text-burgundy-dark"
          >
            เปิดใน Google Maps
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <iframe
        title="แผนที่สำนักกฎหมายเที่ยงธรรมทนายความ"
        src="https://www.google.com/maps?q=อำเภอเดชอุดม+อุบลราชธานี&output=embed"
        className="h-72 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
