import { advisors } from '@/lib/data/advisors'
import { lawyers } from '@/lib/data/lawyers'
import { teamMembers as staffMembers } from '@/lib/data/team'
import { teamMembers as staffFull } from '@/lib/data/staff-full'
import type { LocalizedText, Member, MemberCategory, TeamMemberGroups } from '@/types/team'

const PERSON_PLACEHOLDER = '/person-placeholder.svg'
const LEADER_SLUGS = new Set(['kasem-chimphlee'])

const localized = (th = '', en = th): LocalizedText => ({ th, en })

const compact = (items: Array<LocalizedText | undefined>): LocalizedText[] =>
  items.filter((item): item is LocalizedText => Boolean(item && (item.th || item.en)))

const mapEducation = (education?: { degree: string; degreeEn: string }[]): LocalizedText[] =>
  education?.map((item) => localized(item.degree, item.degreeEn)) ?? []

const mapLawyer = (lawyer: (typeof lawyers)[number], index: number): Member => ({
  id: `lawyer-${lawyer.slug}`,
  slug: lawyer.slug,
  name: localized(lawyer.name, lawyer.nameEn),
  role: localized(lawyer.role, lawyer.roleEn),
  category: LEADER_SLUGS.has(lawyer.slug) ? 'leader' : 'lawyer',
  avatar: lawyer.image ?? PERSON_PLACEHOLDER,
  specialties:
    lawyer.expertise?.map((item, itemIndex) => localized(item, lawyer.expertiseEn?.[itemIndex] ?? item)) ?? [],
  education: mapEducation(lawyer.education),
  experience: compact([lawyer.experience ? localized(lawyer.experience, lawyer.experienceEn) : undefined]),
  bio: lawyer.bio ? localized(lawyer.bio, lawyer.bioEn) : undefined,
  licenseNumber: lawyer.licenseNumber,
  certificateUrl: lawyer.certificateUrl,
  source: 'lawyers',
  sourceOrder: index,
})

const mapAdvisor = (advisor: (typeof advisors)[number], index: number): Member => ({
  id: `advisor-${advisor.slug}`,
  slug: advisor.slug,
  name: localized(advisor.name, advisor.nameEn),
  role: localized(advisor.role, advisor.roleEn),
  category: 'advisor',
  avatar: advisor.image ?? PERSON_PLACEHOLDER,
  specialties: [],
  education: mapEducation(advisor.education),
  experience: compact([
    advisor.experience ? localized(advisor.experience, advisor.experienceEn) : undefined,
    advisor.workHistory ? localized(advisor.workHistory, advisor.workHistoryEn) : undefined,
  ]),
  source: 'advisors',
  sourceOrder: index,
})

const mapStaff = (staff: (typeof staffMembers)[number], index: number): Member => {
  const fullData = staffFull.find((s) => s.name.th === staff.name || s.name.en === staff.nameEn)

  return {
    id: `staff-${staff.slug}`,
    slug: staff.slug,
    name: localized(staff.name, staff.nameEn),
    role: localized(staff.role, staff.roleEn),
    category: 'staff',
    avatar: staff.image ?? PERSON_PLACEHOLDER,
    specialties: [],
    education: fullData?.education.full.map((item) => localized(item.th, item.en)) ?? [],
    experience: [],
    source: 'staff',
    sourceOrder: index,
  }
}

const sortBySourceOrder = (members: Member[]): Member[] =>
  [...members].sort((current, next) => current.sourceOrder - next.sourceOrder)

const createTeamMembers = (): Member[] => [
  ...lawyers.map(mapLawyer),
  ...advisors.map(mapAdvisor),
  ...staffMembers.map(mapStaff),
]

export const teamMembers: Member[] = createTeamMembers()

export const teamMemberSlugs = teamMembers.map((member) => member.slug)

export const getTeamMembers = (): Member[] => teamMembers

export const getTeamMemberBySlug = (slug: string): Member | undefined =>
  teamMembers.find((member) => member.slug === slug)

export const getTeamMembersByCategory = (category: MemberCategory): Member[] =>
  sortBySourceOrder(teamMembers.filter((member) => member.category === category))

export const groupTeamMembers = (): TeamMemberGroups => ({
  leader: getTeamMembersByCategory('leader'),
  lawyer: getTeamMembersByCategory('lawyer'),
  advisor: getTeamMembersByCategory('advisor'),
  staff: getTeamMembersByCategory('staff'),
})

export const validateTeamMemberSlugs = (): string[] => {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const member of teamMembers) {
    if (seen.has(member.slug)) {
      duplicates.add(member.slug)
    }

    seen.add(member.slug)
  }

  return [...duplicates]
}
