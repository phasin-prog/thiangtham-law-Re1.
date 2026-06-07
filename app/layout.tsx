import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Noto_Sans_Thai, Noto_Serif_Thai, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const notoThai = Noto_Sans_Thai({
  variable: '--font-noto-thai',
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
})

const notoSerifThai = Noto_Serif_Thai({
  variable: '--font-noto-serif-thai',
  subsets: ['thai', 'latin'],
  weight: ['500', '600', '700'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thiangtham-law.example.com'),
  title: {
    default: 'สำนักกฎหมายเที่ยงธรรมทนายความ | ทนายเดชอุดม อุบลราชธานี',
    template: '%s | สำนักกฎหมายเที่ยงธรรมทนายความ',
  },
  description:
    'ให้คำปรึกษา ว่าความ และดูแลคดีแพ่ง คดีอาญา คดีครอบครัว คดีมรดก คดีหนี้ และสัญญา โดยสำนักกฎหมายเที่ยงธรรมทนายความ อำเภอเดชอุดม จังหวัดอุบลราชธานี',
  keywords: [
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
  generator: 'v0.app',
  openGraph: {
    title: 'สำนักกฎหมายเที่ยงธรรมทนายความ | ทนายเดชอุดม อุบลราชธานี',
    description:
      'ให้คำปรึกษา ว่าความ และดูแลคดีด้วยความรอบคอบ ตรงไปตรงมา และเป็นธรรม',
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
    <html
      lang="th"
      className={`${notoThai.variable} ${notoSerifThai.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
