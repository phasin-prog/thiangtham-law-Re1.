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
    default: 'สำนักกฎหมายเที่ยงธรรมทนายความ | ปรึกษากฎหมายและรับว่าความ',
    template: '%s | สำนักกฎหมายเที่ยงธรรมทนายความ',
  },
  description:
    'สำนักกฎหมายเที่ยงธรรมทนายความ ก่อตั้งเมื่อปี พ.ศ. 2550 นำโดยนายเกษม ฉิมพลี ให้คำปรึกษากฎหมาย รับว่าความ และดำเนินคดี พร้อมทีมทนายมากกว่า 9 คน',
  keywords: [
    'สำนักกฎหมาย',
    'ทนายความ',
    'ปรึกษากฎหมาย',
    'รับว่าความ',
    'คดีแพ่ง',
    'คดีอาญา',
    'คดีครอบครัว',
    'คดีมรดก',
    'คดีที่ดิน',
    'ทนายความไทย',
    'สำนักกฎหมายเที่ยงธรรมทนายความ',
    'เที่ยงธรรมทนายความ',
    'ทนายอุบลราชธานี',
    'สำนักกฎหมายอุบลราชธานี',
  ],
openGraph: {
  title: 'สำนักกฎหมายเที่ยงธรรมทนายความ | ปรึกษากฎหมายและรับว่าความ',
  description: 'สำนักกฎหมายเที่ยงธรรมทนายความ ก่อตั้งเมื่อปี พ.ศ. 2550 ให้คำปรึกษากฎหมาย รับว่าความ และดำเนินคดี พร้อมทีมทนายคุณภาพ',
  url: 'https://www.thiangthamlaw.com/th',
  siteName: 'สำนักกฎหมายเที่ยงธรรมทนายความ',
  images: [
    {
      url: '/law-office-hero.png',
      width: 1200,
      height: 630,
      alt: 'สำนักกฎหมายเที่ยงธรรมทนายความ',
    },
  ],
  locale: 'th_TH',
  type: 'website',
},
  twitter: {
    card: 'summary_large_image',
    title: 'สำนักกฎหมายเที่ยงธรรมทนายความ | ปรึกษากฎหมายและรับว่าความ',
    description: 'สำนักกฎหมายเที่ยงธรรมทนายความ ก่อตั้งเมื่อปี พ.ศ. 2550 ให้คำปรึกษากฎหมาย รับว่าความ และดำเนินคดี พร้อมทีมทนายคุณภาพ',
    images: ['/law-office-hero.png'],
  },
  alternates: {
  canonical: 'https://www.thiangthamlaw.com/th',
  languages: {
    'th-TH': 'https://www.thiangthamlaw.com/th',
    'en-US': 'https://www.thiangthamlaw.com/en',
    },
  },
}

export default async function ThaiLayout({
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
    name: officeInfo.name,
    alternateName: officeInfo.englishName,
    description: metadata.description,
    url: 'https://www.thiangthamlaw.com/th',
    telephone: officeContact.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: officeContact.address,
      addressLocality: 'เดชอุดม',
      addressRegion: 'อุบลราชธานี',
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
    <LanguageProvider initialLocale={initialLocale ?? 'th'}>
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
