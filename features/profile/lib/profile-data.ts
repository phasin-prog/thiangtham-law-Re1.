import { getTeamMemberBySlug, teamMemberSlugs } from '@/lib/data/team-members'
import type { Member } from '@/types/team'

export const profileSlugs = teamMemberSlugs

export function getProfileBySlug(slug: string): Member | undefined {
  return getTeamMemberBySlug(slug)
}

export function hasProfileDetails(member: Member): boolean {
  return (
    member.education.length > 0 ||
    member.specialties.length > 0 ||
    member.experience.length > 0 ||
    Boolean(member.bio)
  )
}
