import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Thiangtham Law Office | Legal Services in Thailand',
    template: '%s | Thiangtham Law Office',
  },
  description:
    'Thai legal consultation, representation, litigation, contracts, and business legal services from Thiangtham Law Office in Ubon Ratchathani.',
  openGraph: {
    title: 'Thiangtham Law Office | Legal Services in Thailand',
    description:
      'Legal consultation, representation, litigation, and document services for individuals and businesses in Thailand.',
    locale: 'en_US',
    type: 'website',
  },
}

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
