'use client'

import Link from 'next/link'
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  Send,
  Share2,
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
    <footer className="bg-burgundy-dark text-burgundy-foreground">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 xl:grid-cols-[1.25fr_0.8fr_1fr_1fr_1.25fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full border border-gold/50">
              <Scale className="size-5 text-gold" aria-hidden="true" />
            </span>
            <span className="font-serif text-lg font-bold text-gold">
              {t(siteConfig.name, officeInfo.englishName)}
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-burgundy-foreground/70">
            {t(
              `ก่อตั้งเมื่อปี พ.ศ. ${officeInfo.establishedYear} นำโดย${officeInfo.headLawyer} ผู้มีประสบการณ์เป็นทนายความมากกว่า 19 ปี พร้อมทีมทนายความมากกว่า 9 คน`,
              'Established in 2007 and led by Mr. Kasem Chimphlee, who has over 19 years of legal experience, with a team of more than 9 lawyers.',
            )}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={officeContact.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-gold transition hover:border-gold hover:bg-white/5"
            >
              <Share2 className="size-4" aria-hidden="true" />
            </a>
            <a
              href={`https://line.me/R/ti/p/~${officeContact.line}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Line"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-gold transition hover:border-gold hover:bg-white/5"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
            </a>
            <a
              href={`https://wa.me/${officeContact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-gold transition hover:border-gold hover:bg-white/5"
            >
              <Send className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gold">{t('ลิงก์ด่วน', 'Quick Links')}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {publicNavigation.map((link) => (
              <li key={link.href}>
                <Link href={getLocalePath(link.href, locale)} className="text-burgundy-foreground/70 transition hover:text-gold">
                  {t(link.label, link.labelEn)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={getLocalePath('/team', locale)} className="text-burgundy-foreground/70 transition hover:text-gold">
                {t('ทนายความ ที่ปรึกษา และทีมงาน', 'Lawyers, Advisors & Team')}
              </Link>
            </li>
            <li>
              <Link href={getLocalePath('/consultation', locale)} className="text-burgundy-foreground/70 transition hover:text-gold">
                {t('ปรึกษาปัญหากฎหมาย', 'Legal Consultation')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-gold">{t('บริการกฎหมาย', 'Legal Services')}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {featuredLegalServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={getLocalePath(`/services/${service.slug}`, locale)}
                  className="text-burgundy-foreground/70 transition hover:text-gold"
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
          <h2 className="font-semibold text-gold">{t('หมวดบทความ', 'Article Categories')}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {articleCategories.slice(0, 6).map((category) => (
              <li key={category.key}>
                <Link
                  href={`${getLocalePath('/articles', locale)}?category=${category.key}`}
                  className="text-burgundy-foreground/70 transition hover:text-gold"
                >
                  {t(category.label, category.labelEn)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-gold">{t('ติดต่อสำนักงาน', 'Contact the Office')}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-burgundy-foreground/70">
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <div>
                {officeContact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/-/g, '')}`}
                    className="block transition hover:text-gold"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-2">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href={`https://line.me/R/ti/p/~${officeContact.line}`}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-gold"
              >
                Line: {officeContact.line}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${officeContact.email}`} className="break-all transition hover:text-gold">
                {officeContact.email}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href={officeContact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-gold"
              >
                {t(officeContact.address, officeContact.addressEn)}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {t(officeContact.hours, officeContact.hoursEn)}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs leading-6 text-burgundy-foreground/60 md:flex-row md:items-end md:justify-between">
          <p className="max-w-4xl">
            {t(
              'ข้อมูลในเว็บไซต์นี้จัดทำขึ้นเพื่อให้ความรู้ทั่วไป ไม่ถือเป็นคำปรึกษาทางกฎหมายเฉพาะกรณี การให้คำแนะนำที่เหมาะสมต้องพิจารณาข้อเท็จจริง เอกสาร และกำหนดเวลาที่เกี่ยวข้อง',
              'The information on this website is general legal information, not advice for a specific matter. Appropriate advice requires a review of the relevant facts, documents, and deadlines.',
            )}
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} {t(siteConfig.name, officeInfo.englishName)}</p>
        </Container>
      </div>
    </footer>
  )
}
