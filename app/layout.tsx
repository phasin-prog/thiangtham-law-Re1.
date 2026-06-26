import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import './globals.css'

export const metadata: Metadata = {
  title: 'สำนักกฎหมายเที่ยงธรรมทนายความ',
  description: 'ปรึกษากฎหมายและรับว่าความ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className="bg-background" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(()=>{try{const path=location.pathname;const locale=path.startsWith('/en')?'en':'th';document.documentElement.lang=locale;document.documentElement.dataset.locale=locale;}catch{}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-gold">
          Skip to main content
        </a>
        {children}
        <AnalyticsTracker />
        {process.env.NODE_ENV === 'production' && <Analytics />}

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7LXBDR1Z2V"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7LXBDR1Z2V');
            `,
          }}
        />
      </body>
    </html>
  )
}

