import { getSupabaseAdmin } from '@/lib/supabase'
import { withTimeout } from '@/lib/security/request'
import {
  getTeamMemberBySlug,
  getTeamMembers,
  groupTeamMembers,
} from '@/lib/data/team-members'
import type {
  LocalizedText,
  Member,
  MemberCategory,
  MemberSource,
  TeamMemberGroups,
} from '@/types/team'

const upstreamTimeoutMs = 4_000

type TeamRow = Record<string, unknown>
type TeamRowsBySource = Partial<Record<MemberSource, TeamRow[]>>

const sourceToCategory: Record<MemberSource, MemberCategory[]> = {
  lawyers: ['leader', 'lawyer'],
  advisors: ['advisor'],
  staff: ['staff'],
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function asStringArray(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  }

  if (typeof value !== 'string' || !value.trim()) return undefined

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      : undefined
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
}

function normalizeKey(value: string): string {
  return value.replace(/\s+/g, '').toLocaleLowerCase('th-TH')
}

function localizeFromThai(value: unknown, fallback: LocalizedText): LocalizedText {
  const text = asString(value)
  return text ? { th: text, en: fallback.en } : fallback
}

function localizedListFromThai(values: string[] | undefined, fallback: LocalizedText[]): LocalizedText[] {
  if (!values?.length) return fallback

  return values.map((value, index) => ({
    th: value,
    en: fallback[index]?.en ?? value,
  }))
}

function getImage(row: TeamRow): string | undefined {
  return asString(row.image) ?? asString(row.image_url) ?? asString(row.avatar)
}

function getRowForMember(member: Member, rows: TeamRowsBySource): TeamRow | undefined {
  const sourceRows = rows[member.source] ?? []
  const matchingRows = sourceRows.filter((row) => {
    const sourceCategories = sourceToCategory[member.source]
    const category = asString(row.category)
    return !category || sourceCategories.includes(category as MemberCategory)
  })

  const byName = new Map(
    matchingRows
      .map((row) => [asString(row.name), row] as const)
      .filter((entry): entry is readonly [string, TeamRow] => Boolean(entry[0]))
      .map(([name, row]) => [normalizeKey(name), row] as const),
  )

  return byName.get(normalizeKey(member.name.th)) ?? matchingRows[member.sourceOrder]
}

function mergeMember(member: Member, row: TeamRow | undefined): Member {
  if (!row) return member

  const image = getImage(row)
  const expertise = asStringArray(row.expertise)
  const experience = asString(row.experience) ?? asString(row.work_history) ?? asString(row.duty)
  const bio = asString(row.bio)

  return {
    ...member,
    name: localizeFromThai(row.name, member.name),
    role: localizeFromThai(row.role, member.role),
    avatar: image ?? member.avatar,
    specialties: localizedListFromThai(expertise, member.specialties),
    experience: experience ? [{ th: experience, en: member.experience[0]?.en ?? experience }] : member.experience,
    bio: bio ? { th: bio, en: member.bio?.en ?? bio } : member.bio,
    licenseNumber: asString(row.license_number) ?? asString(row.licenseNumber) ?? member.licenseNumber,
  }
}

async function readTeamRowsFromSupabase(): Promise<TeamRowsBySource | undefined> {
  try {
    const supabase = getSupabaseAdmin()
    const [lawyers, advisors, staff] = await withTimeout(
      Promise.all([
        supabase.from('lawyers').select('*').order('id'),
        supabase.from('advisors').select('*').order('id'),
        supabase.from('staff').select('*').order('id'),
      ]),
      upstreamTimeoutMs,
    )

    if (lawyers.error || advisors.error || staff.error) {
      throw lawyers.error ?? advisors.error ?? staff.error
    }

    return {
      lawyers: lawyers.data ?? [],
      advisors: advisors.data ?? [],
      staff: staff.data ?? [],
    }
  } catch (error) {
    console.warn(
      'Using static team data because Supabase team data could not be loaded:',
      error instanceof Error ? error.message : error,
    )
    return undefined
  }
}

function groupMembers(members: Member[]): TeamMemberGroups {
  return {
    leader: members.filter((member) => member.category === 'leader'),
    lawyer: members.filter((member) => member.category === 'lawyer'),
    advisor: members.filter((member) => member.category === 'advisor'),
    staff: members.filter((member) => member.category === 'staff'),
  }
}

export async function getTeamMembersWithSupabase(): Promise<Member[]> {
  const rows = await readTeamRowsFromSupabase()
  if (!rows) return getTeamMembers()

  return getTeamMembers().map((member) => mergeMember(member, getRowForMember(member, rows)))
}

export async function groupTeamMembersWithSupabase(): Promise<TeamMemberGroups> {
  const members = await getTeamMembersWithSupabase()
  return members === getTeamMembers() ? groupTeamMembers() : groupMembers(members)
}

export async function getTeamMemberBySlugWithSupabase(slug: string): Promise<Member | undefined> {
  const fallback = getTeamMemberBySlug(slug)
  if (!fallback) return undefined

  const rows = await readTeamRowsFromSupabase()
  return rows ? mergeMember(fallback, getRowForMember(fallback, rows)) : fallback
}
