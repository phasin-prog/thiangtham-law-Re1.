import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  createProfileJsonLd,
  createProfileMetadata,
  getProfileBySlug,
  ProfilePage,
  profileSlugs,
} from '@/features/profile'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return profileSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const member = getProfileBySlug(slug)

  return member
    ? createProfileMetadata(member, 'th')
    : {
        title: 'ไม่พบประวัติบุคลากร',
        alternates: {
          canonical: 'https://www.thiangthamlaw.com/th/team',
        },
      }
}

export default async function PersonProfilePage({ params }: Props) {
  const { slug } = await params
  const member = getProfileBySlug(slug)

  if (!member) {
    notFound()
  }

  const jsonLd = createProfileJsonLd(member, 'th')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfilePage member={member} />
    </>
  )
}
