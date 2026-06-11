import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import './globals.css'
import { FloatingContactButton } from '@/components/floating-contact-button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { DocumentLocale } from '@/components/document-locale'

export const metadata: Metadata = {
  metadataBase: new URL('https://thiangtham-law.example.com'),
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
    'ทนายเดชอุดม',
    'ทนายอุบลราชธานี',
    'สำนักกฎหมายอุบลราชธานี',
    'ปรึกษาทนายเดชอุดม',
    'ทนายคดีแพ่งอุบลราชธานี',
    'ทนายคดีอาญาอุบลราชธานี',
    'ทนายคดีมรดกอุบลราชธานี',
    'ทนายคดีครอบครัวอุบลราชธานี',
  ],
  openGraph: {
    title: 'สำนักกฎหมายเที่ยงธรรมทนายความ | ปรึกษากฎหมายและรับว่าความ',
    description:
      'ก่อตั้งเมื่อปี พ.ศ. 2550 นำโดยนายเกษม ฉิมพลี พร้อมทีมทนายความมากกว่า 9 คน',
    locale: 'th_TH',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className="bg-background" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.lang=location.pathname==='/en'||location.pathname.startsWith('/en/')?'en':'th'",
          }}
        />
      </head>
      <body className="pb-16 font-sans antialiased lg:pb-0">
        <DocumentLocale />
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingContactButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
