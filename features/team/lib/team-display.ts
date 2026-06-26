import { getLocalePath, type Locale } from '@/lib/i18n-config'
import type { LocalizedText, Member, MemberCategory } from '@/types/team'

export type TeamSectionKey = MemberCategory

export type TeamSectionConfig = {
  id: TeamSectionKey
  label: LocalizedText
  title: LocalizedText
  description: LocalizedText
  eyebrow?: LocalizedText
}

export const teamSectionConfigs: TeamSectionConfig[] = [
  {
    id: 'leader',
    label: { th: 'หัวหน้าสำนักงาน', en: 'Head Lawyer' },
    eyebrow: { th: 'หัวหน้าสำนักงาน', en: 'Head Lawyer' },
    title: { th: 'หัวหน้าสำนักงาน', en: 'Head Lawyer' },
    description: {
      th: 'ดูแลทิศทางการทำงานของสำนักงาน การพิจารณาประเด็นสำคัญ และการประสานงานกับทีมทนายความตามข้อมูลและเอกสารของแต่ละเรื่อง',
      en: 'Leads the office workflow, reviews key issues, and coordinates with the lawyer team based on each matter’s facts and documents.',
    },
  },
  {
    id: 'lawyer',
    label: { th: 'ทีมทนายความ', en: 'Lawyers' },
    eyebrow: { th: 'ทีมทนายความ', en: 'Lawyers' },
    title: { th: 'ทีมทนายความ', en: 'Lawyers' },
    description: {
      th: 'รับฟังข้อเท็จจริง ตรวจเอกสาร วิเคราะห์ประเด็นกฎหมาย และสนับสนุนการดำเนินงานคดีร่วมกับทีมสำนักงาน',
      en: 'Review facts, check documents, analyze legal issues, and support case work together with the office team.',
    },
  },
  {
    id: 'advisor',
    label: { th: 'ที่ปรึกษาทางกฎหมาย', en: 'Legal Consultants' },
    eyebrow: { th: 'ที่ปรึกษาทางกฎหมาย', en: 'Legal Consultants' },
    title: { th: 'ที่ปรึกษาทางกฎหมาย', en: 'Legal Consultants' },
    description: {
      th: 'สนับสนุนการพิจารณาประเด็น งานเอกสารเฉพาะด้าน งานวิชาการ และการประสานงานตามขอบเขตบทบาทที่เกี่ยวข้อง',
      en: 'Support issue review, specialized documents, academic perspectives, and coordination within their related roles.',
    },
  },
  {
    id: 'staff',
    label: { th: 'ทีมสำนักงานและฝ่ายประสานงานคดี', en: 'Office and Case Coordination Team' },
    eyebrow: { th: 'ฝ่ายสำนักงาน', en: 'Office Team' },
    title: { th: 'ทีมสำนักงานและฝ่ายประสานงานคดี', en: 'Office and Case Coordination Team' },
    description: {
      th: 'ดูแลการนัดหมาย เอกสาร การติดตามขั้นตอน และการประสานงานเบื้องต้นกับลูกความ โดยไม่ให้คำปรึกษาทางกฎหมายแทนทนายความ',
      en: 'Handles appointments, documents, procedural follow-up, and initial client coordination, without giving legal advice in place of lawyers.',
    },
  },
]

export function getLocalizedText(text: LocalizedText, locale: Locale): string {
  return locale === 'en' ? text.en : text.th
}

export function getTeamProfileHref(slug: string, locale: Locale): string {
  return getLocalePath(`/team/${slug}`, locale)
}

export function getEducationSummary(member: Member, locale: Locale): string {
  const education = member.education.at(-1)
  if (education) return getLocalizedText(education, locale)

  return locale === 'en'
    ? 'No public education record is currently listed.'
    : 'ยังไม่มีข้อมูลการศึกษาที่เผยแพร่ในหน้านี้'
}

export function getCardRoleSummary(member: Member, locale: Locale): string {
  if (member.category === 'staff') {
    return locale === 'en'
      ? 'Handles appointments, documents, procedural follow-up, and initial client coordination, without giving legal advice in place of lawyers.'
      : 'ดูแลการนัดหมาย เอกสาร การติดตามขั้นตอน และการประสานงานเบื้องต้นกับลูกความ โดยไม่ให้คำปรึกษาทางกฎหมายแทนทนายความ'
  }

  if (member.category === 'advisor') {
    return locale === 'en'
      ? 'Provides support within related work areas, helps review issues, and adds academic or specialized document perspectives.'
      : 'ให้คำปรึกษาในขอบเขตงานที่เกี่ยวข้อง สนับสนุนการพิจารณาประเด็น และช่วยเสริมมุมมองด้านวิชาการหรือเอกสารเฉพาะด้าน'
  }

  return locale === 'en'
    ? 'Supports consultation, fact review, document preparation, and case work together with the office team under legal procedure.'
    : 'ดูแลการให้คำปรึกษา ตรวจสอบข้อเท็จจริง เตรียมเอกสาร และดำเนินงานคดีร่วมกับทีมสำนักงานตามขั้นตอนทางกฎหมาย'
}

export function getProfileRoleDescription(member: Member, locale: Locale): string {
  if (member.category === 'leader') {
    return locale === 'en'
      ? 'As Head Lawyer, this person leads the office’s legal work, reviews major issues, coordinates case planning, and works with lawyers and office staff according to each matter’s facts and documents.'
      : 'ในฐานะหัวหน้าสำนักงาน มีบทบาทในการกำกับแนวทางการทำงานของสำนักงาน พิจารณาประเด็นสำคัญ วางแผนงานคดี และประสานการทำงานร่วมกับทีมทนายความและฝ่ายสำนักงานตามข้อเท็จจริงและเอกสารของแต่ละเรื่อง'
  }

  if (member.category === 'lawyer') {
    return locale === 'en'
      ? 'As a member of the lawyer team, this person helps receive initial facts, review related documents, coordinate with the office team, and support case work according to legal procedure.'
      : 'ในฐานะทนายความประจำทีม มีบทบาทในการรับฟังข้อเท็จจริงเบื้องต้น ตรวจสอบเอกสารที่เกี่ยวข้อง ประสานงานกับทีมสำนักงาน และสนับสนุนการดำเนินงานคดีตามขั้นตอนทางกฎหมาย'
  }

  if (member.category === 'advisor') {
    return locale === 'en'
      ? 'As a legal consultant or advisor, this person supports issue review and related documentation within the role and information available to the office.'
      : 'ในฐานะที่ปรึกษาทางกฎหมาย มีบทบาทในการสนับสนุนการพิจารณาประเด็นและเอกสารที่เกี่ยวข้องภายในขอบเขตบทบาทและข้อมูลที่สำนักงานมีอยู่'
  }

  return locale === 'en'
    ? 'As part of the office and case coordination team, this person handles appointments, documents, initial coordination, and procedural follow-up, without giving legal advice in place of lawyers.'
    : 'ในฐานะฝ่ายสำนักงานและประสานงานคดี มีบทบาทดูแลการนัดหมาย เอกสาร การประสานงานเบื้องต้น และการติดตามขั้นตอน โดยไม่ให้คำปรึกษาทางกฎหมายแทนทนายความ'
}

export function getRelatedWorkAreas(member: Member, locale: Locale): string[] {
  if (member.specialties.length > 0) {
    return member.specialties.map((specialty) => getLocalizedText(specialty, locale))
  }

  if (member.category === 'lawyer') {
    return locale === 'en'
      ? ['Initial fact review', 'Document review and preparation', 'Case coordination', 'Legal procedure support']
      : ['การรับฟังข้อเท็จจริงเบื้องต้น', 'การตรวจสอบและเตรียมเอกสาร', 'การประสานงานคดี', 'การดำเนินงานตามขั้นตอนทางกฎหมาย']
  }

  if (member.category === 'advisor') {
    return locale === 'en'
      ? ['Related issue review', 'Specialized document support', 'Academic or professional perspective', 'Coordination within the advisor role']
      : ['การพิจารณาประเด็นที่เกี่ยวข้อง', 'การสนับสนุนเอกสารเฉพาะด้าน', 'มุมมองด้านวิชาการหรือวิชาชีพ', 'การประสานงานตามขอบเขตบทบาทที่ปรึกษา']
  }

  return locale === 'en'
    ? ['Appointments', 'Documents', 'Initial client coordination', 'Procedural follow-up', 'No legal advice in place of lawyers']
    : ['การนัดหมาย', 'เอกสาร', 'การประสานงานเบื้องต้นกับลูกความ', 'การติดตามขั้นตอน', 'ไม่ให้คำปรึกษาทางกฎหมายแทนทนายความ']
}

export function getWorkingApproach(member: Member, locale: Locale): string[] {
  if (member.category === 'staff') {
    return locale === 'en'
      ? [
          'Receives and organizes coordination details for the office.',
          'Supports document handling and appointment follow-up.',
          'Refers legal questions to lawyers rather than giving legal advice directly.',
        ]
      : [
          'รับและจัดระเบียบข้อมูลการประสานงานเบื้องต้นให้สำนักงาน',
          'สนับสนุนการจัดการเอกสารและการติดตามนัดหมาย',
          'ส่งต่อคำถามทางกฎหมายให้ทนายความพิจารณา โดยไม่ให้คำปรึกษาทางกฎหมายแทนทนายความ',
        ]
  }

  if (member.category === 'advisor') {
    return locale === 'en'
      ? [
          'Reviews related information within the advisor role.',
          'Supports the team with academic, professional, or document-focused perspectives where relevant.',
          'Works with lawyers and office staff based on available facts and documents.',
        ]
      : [
          'พิจารณาข้อมูลที่เกี่ยวข้องภายในขอบเขตบทบาทที่ปรึกษา',
          'สนับสนุนทีมด้วยมุมมองด้านวิชาการ วิชาชีพ หรือเอกสารเฉพาะด้านเมื่อเกี่ยวข้อง',
          'ทำงานร่วมกับทนายความและฝ่ายสำนักงานตามข้อเท็จจริงและเอกสารที่มีอยู่',
        ]
  }

  return locale === 'en'
    ? [
        'Begins with the facts, documents, and deadlines relevant to the matter.',
        'Coordinates with the office team for document preparation and appointment handling.',
        'Considers legal issues based on available evidence before recommending next steps.',
      ]
    : [
        'เริ่มจากข้อเท็จจริง เอกสาร และกำหนดเวลาที่เกี่ยวข้องกับเรื่องนั้น',
        'ประสานงานกับทีมสำนักงานในการเตรียมเอกสารและการนัดหมาย',
        'พิจารณาประเด็นกฎหมายจากพยานหลักฐานที่มีอยู่ก่อนเสนอแนวทางดำเนินการ',
      ]
}
