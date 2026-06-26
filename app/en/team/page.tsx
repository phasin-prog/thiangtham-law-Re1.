import type { Metadata } from 'next'
import { TeamPage } from '@/features/team'
import { groupTeamMembersWithSupabase } from '@/lib/data/team-members-supabase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Lawyers, Advisors, and Case Coordination Team',
  description:
    'Meet the lawyers, advisors, and case coordination team of Thiangtham Law Office working together under licensed attorneys with a structured client-care process.',
  alternates: {
    canonical: 'https://www.thiangthamlaw.com/en/team',
    languages: {
      th: 'https://www.thiangthamlaw.com/th/team',
      en: 'https://www.thiangthamlaw.com/en/team',
    },
  },
}

export default async function EnglishTeamRoutePage() {
  const groups = await groupTeamMembersWithSupabase()

  return <TeamPage groups={groups} />
}
