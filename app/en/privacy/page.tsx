import type { Metadata } from 'next'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Thiangtham Law Office collects, uses, and protects personal information from clients and website visitors.',
  alternates: {
    canonical: 'https://thiangtham-law.com/en/privacy',
    languages: {
      'th-TH': 'https://thiangtham-law.com/th/privacy',
      'en-US': 'https://thiangtham-law.com/en/privacy',
    },
  },
}

export default function EnglishPrivacyPage() {
  return (
    <main>
      <PageHero
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information"
        crumbs={[
          { href: '/en', label: 'Home' },
          { label: 'Privacy Policy' },
        ]}
      />
      <section className="py-14 md:py-20">
        <Container className="max-w-4xl">
          <div className="prose prose-navy max-w-none leading-8 text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-primary">
              1. Collection of Personal Information
            </h2>
            <p>
              The office collects personal information that you voluntarily provide through
              contact forms, appointment requests, or legal consultation inquiries. This may
              include your name, telephone number, email address, and details of the legal
              matter you wish to discuss.
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">
              2. Purpose of Use
            </h2>
            <p>
              We use your information solely for the purposes of responding to your inquiry,
              providing preliminary legal consultation, scheduling appointments, and carrying
              out work within the agreed scope of engagement.
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">
              3. Confidentiality
            </h2>
            <p>
              Information and documents related to a client&apos;s case or dispute are
              treated with the highest level of confidentiality in accordance with
              professional legal ethics. We do not disclose client information to any third
              party without your consent, except where required by a court order or
              applicable law.
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">
              4. Your Rights
            </h2>
            <p>
              You have the right to access, review, correct, or request the deletion of
              personal information held by the office. To exercise these rights, please
              contact us through our main communication channels.
            </p>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary">
              5. Policy Updates
            </h2>
            <p>
              The office may update this privacy policy from time to time to reflect changes
              in legal requirements or our services. Any updates will be published on this
              website.
            </p>
          </div>
        </Container>
      </section>
    </main>
  )
}
