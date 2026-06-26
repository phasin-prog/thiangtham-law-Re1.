import type { Metadata } from 'next'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms and conditions for using the Thiangtham Law Office website and legal information.',
  alternates: {
    canonical: 'https://thiangtham-law.com/en/terms',
    languages: {
      'th-TH': 'https://thiangtham-law.com/th/terms',
      'en-US': 'https://thiangtham-law.com/en/terms',
    },
  },
}

export default function EnglishTermsPage() {
  return (
    <main>
      <PageHero
        title="Terms of Use"
        description="Terms and conditions for using this website"
        crumbs={[
          { href: '/en', label: 'Home' },
          { label: 'Terms of Use' },
        ]}
      />
      <section className="py-14 md:py-20">
        <Container className="max-w-4xl">
          <div className="prose prose-navy max-w-none leading-8 text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-primary">
              1. Disclaimer
            </h2>
            <p>
              The information provided on this website is for general educational purposes
              only and is intended to offer preliminary legal knowledge to the public. It
              does not constitute legal advice for any specific case.
            </p>
            <p className="mt-4">
              Relying on the information presented here without consulting a qualified
              lawyer may carry risks. The office accepts no liability for any loss or damage
              arising from the use of information on this website without professional legal
              guidance.
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">
              2. Intellectual Property
            </h2>
            <p>
              All articles, content, images, and logos on this website are the property of
              Thiangtham Law Office. You may not copy, modify, or use any material for
              commercial purposes without prior written permission.
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">
              3. External Links
            </h2>
            <p>
              This website may contain links to external websites for your convenience. The
              office has no control over and assumes no responsibility for the content or
              policies of any third-party websites.
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">
              4. Contact and Case Acceptance
            </h2>
            <p>
              Submitting a message through the contact form on this website does not
              establish a lawyer-client relationship. A formal engagement is only created
              once both parties have agreed to the scope of work and a written engagement
              letter has been signed.
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">
              5. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and shall be interpreted in
              accordance with the laws of the Kingdom of Thailand.
            </p>
          </div>
        </Container>
      </section>
    </main>
  )
}
