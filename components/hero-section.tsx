import Link from 'next/link'
import Image from 'next/image'
import { Phone, MessageCircle, MapPin, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/lib/site-data'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-burgundy text-burgundy-foreground">
      <div className="absolute inset-0">
        <Image
          src="/law-office-hero.png"
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy via-burgundy/95 to-burgundy/70" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-xs font-medium text-gold">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            สำนักงานกฎหมายในอำเภอเดชอุดม จังหวัดอุบลราชธานี
          </p>
          <h1 className="mt-5 text-balance font-serif text-3xl font-bold leading-tight text-gold sm:text-4xl md:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-burgundy-foreground/90">
            {siteConfig.tagline}
          </p>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-burgundy-foreground/75">
            ให้บริการด้านคดีแพ่ง คดีอาญา คดีครอบครัว คดีมรดก คดีหนี้ สัญญา และการให้คำปรึกษากฎหมายทั่วไป
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${siteConfig.phones[0].replace(/-/g, '')}`}
              className="flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-burgundy-dark transition-colors hover:bg-gold-soft"
            >
              <Phone className="size-4" aria-hidden="true" />
              โทรปรึกษาเบื้องต้น
            </a>
            <a
              href={`https://line.me/R/ti/p/~${siteConfig.line}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-gold/60 px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-burgundy-dark"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              ติดต่อผ่าน LINE
            </a>
            <a
              href={siteConfig.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-gold/60 px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-burgundy-dark"
            >
              <MapPin className="size-4" aria-hidden="true" />
              ดูแผนที่สำนักงาน
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="rounded-xl border-2 border-gold/40 bg-burgundy-dark/60 p-2 backdrop-blur-sm">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src="/law-office-hero.png"
                alt="ภายในสำนักกฎหมายเที่ยงธรรมทนายความ"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
