import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  createProfileJsonLd,
  createProfileMetadata,
  ProfilePage,
  profileSlugs,
} from '@/features/profile'
import { getTeamMemberBySlugWithSupabase } from '@/lib/data/team-members-supabase'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return profileSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const member = await getTeamMemberBySlugWithSupabase(slug)

  return member
    ? createProfileMetadata(member, 'en')
    : {
        title: 'Profile Not Found',
        alternates: {
          canonical: 'https://www.thiangthamlaw.com/en/team',
        },
      }
}

export default async function EnglishPersonProfilePage({ params }: Props) {
  const { slug } = await params
  const member = await getTeamMemberBySlugWithSupabase(slug)

  if (!member) {
    notFound()
  }

  const jsonLd = createProfileJsonLd(member, 'en')

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
