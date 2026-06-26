import type { Metadata } from 'next'
import { officeContact, officeInfo } from '@/lib/data/office'
import { getLocalePath, type Locale } from '@/lib/i18n-config'
import type { Member } from '@/types/team'
import { getLocalizedText } from '@/features/team/lib/team-display'

const siteUrl = 'https://thiangtham-law.com'

function getProfilePath(slug: string, locale: Locale) {
  return getLocalePath(`/team/${slug}`, locale)
}

function getProfileTitle(member: Member, locale: Locale) {
  const name = getLocalizedText(member.name, locale)
  const role = getLocalizedText(member.role, locale)
  return locale === 'en' ? `${name} - ${role}` : `${name} | ${role}`
}

function getProfileDescription(member: Member, locale: Locale) {
  if (member.bio) {
    return getLocalizedText(member.bio, locale)
  }

  const role = getLocalizedText(member.role, locale)
  const experience = member.experience[0] ? getLocalizedText(member.experience[0], locale) : ''

  return [role, experience].filter(Boolean).join(' - ')
}

export function createProfileMetadata(member: Member, locale: Locale): Metadata {
  const path = getProfilePath(member.slug, locale)
  const alternateLocale: Locale = locale === 'en' ? 'th' : 'en'
  const title = getProfileTitle(member, locale)
  const description = getProfileDescription(member, locale)

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        th: `${siteUrl}${getProfilePath(member.slug, 'th')}`,
        en: `${siteUrl}${getProfilePath(member.slug, 'en')}`,
        'x-default': `${siteUrl}${getProfilePath(member.slug, alternateLocale)}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: locale === 'en' ? officeInfo.englishName : officeInfo.name,
      images: [
        {
          url: member.avatar,
          width: 1200,
          height: 630,
          alt: getLocalizedText(member.name, locale),
        },
      ],
      locale: locale === 'en' ? 'en_US' : 'th_TH',
      type: 'profile',
    },
  }
}

export function createProfileJsonLd(member: Member, locale: Locale) {
  const path = getProfilePath(member.slug, locale)

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: getLocalizedText(member.name, locale),
    jobTitle: getLocalizedText(member.role, locale),
    image: `${siteUrl}${member.avatar}`,
    url: `${siteUrl}${path}`,
    worksFor: {
      '@type': 'LegalService',
      name: locale === 'en' ? officeInfo.englishName : officeInfo.name,
      url: siteUrl,
      telephone: officeContact.phones[0],
    },
    knowsAbout: member.specialties.map((specialty) => getLocalizedText(specialty, locale)),
  }
}
