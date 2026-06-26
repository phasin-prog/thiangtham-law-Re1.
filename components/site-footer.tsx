'use client'

import Link from 'next/link'
import {
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  Send,
} from 'lucide-react'
import { Container } from '@/components/container'
import { articleCategories } from '@/lib/data/articles'
import { publicNavigation, serviceMenuLinks } from '@/lib/data/navigation'
import { officeContact, officeInfo } from '@/lib/data/office'
import { featuredLegalServices } from '@/lib/data/services'
import { siteConfig } from '@/lib/site-data'
import { getLocalePath, useTranslation } from '@/lib/i18n'

export function SiteFooter() {
  const { locale, t } = useTranslation()

  return (
    <footer className="bg-primary-dark text-primary-foreground border-t border-white/5">
      <Container className="grid gap-12 py-16 md:py-20 sm:grid-cols-2 xl:grid-cols-[1.5fr_0.8fr_1fr_1fr_1.5fr]">
        <div className="max-w-xs">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl border border-gold/40 bg-white/5 shadow-inner">
              <Scale className="size-6 text-gold" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              {t(siteConfig.name, officeInfo.englishName)}
            </span>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-primary-foreground/70">
            {t(
              `ก่อตั้งเมื่อปี พ.ศ. ${officeInfo.establishedYear} นำโดย${officeInfo.headLawyer} ผู้มีประสบการณ์เป็นทนายความมากกว่า 19 ปี พร้อมทีมทนายความมากกว่า 9 คน`,
              'Established in 2007 and led by Mr. Kasem Chimphlee, who has over 19 years of legal experience, with a team of more than 9 lawyers.',
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={officeContact.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={`https://line.me/R/ti/p/~${officeContact.line}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Line"
              className="flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
            <a
              href={`https://wa.me/${officeContact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
            >
              <Send className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{t('ลิงก์ด่วน', 'Quick Links')}</h2>
          <ul className="mt-6 space-y-3.5 text-sm">
            {publicNavigation.map((link) => (
              <li key={link.href}>
                <Link href={getLocalePath(link.href, locale)} className="text-primary-foreground/60 transition-colors hover:text-gold">
                  {t(link.label, link.labelEn)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={getLocalePath('/team', locale)} className="text-primary-foreground/60 transition-colors hover:text-gold">
                {t('ทนายความ และทีมงาน', 'Lawyers & Team')}
              </Link>
            </li>
            <li>
              <Link href={getLocalePath('/privacy', locale)} className="text-primary-foreground/60 transition-colors hover:text-gold">
                {t('นโยบายความเป็นส่วนตัว', 'Privacy Policy')}
              </Link>
            </li>
            <li>
              <Link href={getLocalePath('/terms', locale)} className="text-primary-foreground/60 transition-colors hover:text-gold">
                {t('ข้อกำหนดการใช้งาน', 'Terms of Use')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{t('บริการกฎหมาย', 'Legal Services')}</h2>
          <ul className="mt-6 space-y-3.5 text-sm">
            {featuredLegalServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={getLocalePath(`/services/${service.slug}`, locale)}
                  className="text-primary-foreground/60 transition-colors hover:text-gold"
                >
                  {t(
                    service.title,
                    serviceMenuLinks.find((item) => item.href === `/services/${service.slug}`)?.labelEn ?? service.title,
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{t('หมวดบทความ', 'Article Categories')}</h2>
          <ul className="mt-6 space-y-3.5 text-sm">
            {articleCategories.slice(0, 6).map((category) => (
              <li key={category.key}>
                <Link
                  href={`${getLocalePath('/articles', locale)}?category=${category.key}`}
                  className="text-primary-foreground/60 transition-colors hover:text-gold"
                >
                  {t(category.label, category.labelEn)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{t('ติดต่อสำนักงาน', 'Contact Office')}</h2>
          <ul className="mt-6 space-y-5 text-sm leading-relaxed text-primary-foreground/70">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                {officeContact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/-/g, '')}`}
                    className="block font-semibold text-white transition-colors hover:text-gold"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href={`https://line.me/R/ti/p/~${officeContact.line}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-white transition-colors hover:text-gold"
              >
                Line ID: {officeContact.line}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href={officeContact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary-foreground/70 transition-colors hover:text-gold"
              >
                {t(officeContact.address, officeContact.addressEn)}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="text-primary-foreground/70">
                {t(officeContact.hours, officeContact.hoursEn)}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-black/20">
        <Container className="flex flex-col gap-4 py-8 text-[12px] font-medium leading-relaxed text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl text-balance">
            {t(
              'คำเตือน: ข้อมูลในเว็บไซต์นี้จัดทำขึ้นเพื่อให้ความรู้ทั่วไป ไม่ถือเป็นคำปรึกษาทางกฎหมายเฉพาะกรณี การให้คำแนะนำที่เหมาะสมต้องพิจารณาจากข้อเท็จจริง เอกสาร และกำหนดเวลาที่เกี่ยวข้องในแต่ละเรื่องโดยเฉพาะ',
              'Disclaimer: The information on this website is for general educational purposes only and does not constitute legal advice for any specific case. Appropriate legal counsel requires a thorough review of the specific facts, documents, and relevant deadlines.',
            )}
          </p>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <p>© {new Date().getFullYear()} {t(siteConfig.name, officeInfo.englishName)}</p>
            <p className="opacity-60 tracking-[0.12em]">AUTHENTIC LEGAL COUNSEL</p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
