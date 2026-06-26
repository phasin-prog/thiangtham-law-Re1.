import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Lawyers',
  alternates: {
    canonical: 'https://www.thiangthamlaw.com/en/team',
    languages: {
      'th-TH': 'https://www.thiangthamlaw.com/th/team',
      'en-US': 'https://www.thiangthamlaw.com/en/team',
    },
  },
}

export default function EnglishLawyersRedirect() {
  redirect('/en/team')
}
