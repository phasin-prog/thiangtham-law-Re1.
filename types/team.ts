export type Locale = 'th' | 'en'

export type LocalizedText = {
  th: string
  en: string
}

export type MemberCategory = 'leader' | 'lawyer' | 'advisor' | 'staff'

export type MemberSource = 'lawyers' | 'advisors' | 'staff'

export type Member = {
  id: string
  slug: string
  name: LocalizedText
  role: LocalizedText
  category: MemberCategory
  avatar: string
  specialties: LocalizedText[]
  education: LocalizedText[]
  experience: LocalizedText[]
  bio?: LocalizedText
  licenseNumber?: string
  certificateUrl?: string
  source: MemberSource
  sourceOrder: number
}

export type TeamMemberGroups = Record<MemberCategory, Member[]>

export const memberCategories = ['leader', 'lawyer', 'advisor', 'staff'] as const
