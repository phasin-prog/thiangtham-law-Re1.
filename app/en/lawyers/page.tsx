import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Lawyers',
  alternates: {
    canonical: 'https://thiangtham-law.com/en/team',
    languages: {
      'th-TH': 'https://thiangtham-law.com/th/team',
      'en-US': 'https://thiangtham-law.com/en/team',
    },
  },
}

export default function EnglishLawyersRedirect() {
  redirect('/en/team')
}
