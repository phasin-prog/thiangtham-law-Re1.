import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FloatingContactButton } from '@/components/floating-contact-button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { DocumentLocale } from '@/components/document-locale'
import { MotionShell } from '@/components/motion/motion-shell'
import { LanguageProvider } from '@/lib/i18n'
import { isLocale, localeCookieName } from '@/lib/i18n-config'
import { officeContact, officeInfo } from '@/lib/data/office'

export const metadata: Metadata = {
  title: {
    default: 'Thiangtham Law Office | Legal Services in Thailand',
    template: '%s | Thiangtham Law Office',
  },
  description:
    'Thai legal consultation, representation, litigation, contracts, and business legal services from Thiangtham Law Office in Ubon Ratchathani.',
  keywords: [
    'Thai law office',
    'lawyer Thailand',
    'legal consultation Thailand',
    'litigation lawyer',
    'criminal defense Thailand',
    'family law Thailand',
    'inheritance law Thailand',
    'land dispute lawyer',
    'Ubon Ratchathani lawyer',
    'Thiangtham Law Office',
  ],
 openGraph: {
  title: 'Thiangtham Law Office | Legal Services in Thailand',
  description:
    'Legal consultation, representation, litigation, and document services for individuals and businesses in Thailand.',
  url: 'https://www.thiangthamlaw.com/en',
  siteName: 'Thiangtham Law Office',
  images: [
    {
      url: '/law-office-hero.png',
      width: 1200,
      height: 630,
      alt: 'Thiangtham Law Office Thailand',
    },
  ],
  locale: 'en_US',
  type: 'website',
},
  twitter: {
    card: 'summary_large_image',
    title: 'Thiangtham Law Office | Legal Services in Thailand',
    description: 'Professional legal services, litigation, and consultation in Thailand.',
    images: ['/law-office-hero.png'],
  },
alternates: {
  canonical: 'https://www.thiangthamlaw.com/en',
  languages: {
    'th-TH': 'https://www.thiangthamlaw.com/th',
    'en-US': 'https://www.thiangthamlaw.com/en',
    },
  },
}

export default async function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const savedLocale = cookieStore.get(localeCookieName)?.value
  const initialLocale = isLocale(savedLocale) ? savedLocale : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: officeInfo.englishName,
    alternateName: officeInfo.name,
    description: metadata.description,
    url: 'https://www.thiangthamlaw.com/en',
    telephone: officeContact.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: officeContact.address,
      addressLocality: 'Det Udom',
      addressRegion: 'Ubon Ratchathani',
      postalCode: '34160',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 14.904,
      longitude: 105.078,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
  }

  return (
    <LanguageProvider initialLocale={initialLocale ?? 'en'}>
      <DocumentLocale />
      <MotionShell
        header={<SiteHeader />}
        footer={<SiteFooter />}
        floating={<FloatingContactButton />}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </MotionShell>
    </LanguageProvider>
  )
}
