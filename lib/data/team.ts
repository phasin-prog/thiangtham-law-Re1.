export const teamMembers = [
  {
    slug: 'chutima-chimphlee',
    name: 'นางสาวชุติมา ฉิมพลี',
    nameEn: 'Ms. Chutima Chimphlee',
    role: 'เจ้าหน้าที่สำนักงาน / ฝ่ายประสานงานคดี',
    roleEn: 'Office Staff / Case Coordination Officer',
    image: '/staff/chutima-chimphli.svg',
  },
  {
    slug: 'phasin-pasumart',
    name: 'นายพศิน พสุมาตร',
    nameEn: 'Mr. Phasin Pasumart',
    role: 'ฝ่ายธุรการคดี',
    roleEn: 'Case Administration',
    image: '/staff/phasin-pasumart.svg',
  },
] as const

export const teamRoles = [
  {
    title: 'ทีมทนายความ',
    titleEn: 'Lawyer Team',
    description:
      'ทีมงานทนายความพร้อมให้คำปรึกษา รับว่าความ และดำเนินคดีในหลากหลายประเภท',
    descriptionEn:
      'A team of lawyers ready to provide consultation and litigation services across various fields.',
  },
  {
    title: 'ที่ปรึกษา',
    titleEn: 'Advisors',
    description:
      'ให้คำปรึกษาด้านเอกสาร สัญญา และแนวทางดำเนินคดี',
    descriptionEn: 'Consultation on documents, contracts, and case strategies.',
  },
  {
    title: 'ทีมงานสำนักงาน',
    titleEn: 'Office Staff',
    description:
      'ดูแลการนัดหมาย เอกสาร การติดตามขั้นตอน และการประสานงานกับลูกความ',
    descriptionEn: 'Managing appointments, documentation, tracking procedures, and client coordination.',
  },
] as const

export const teamValues = [
  { th: 'รอบคอบ', en: 'Thorough' },
  { th: 'ชัดเจน', en: 'Clear' },
  { th: 'รักษาความลับ', en: 'Confidential' },
  { th: 'อธิบายขั้นตอนให้เข้าใจ', en: 'Easy to Understand' },
  { th: 'วางแนวทางคดีตามข้อเท็จจริงและข้อกฎหมาย', en: 'Fact-Based Strategy' },
] as const

// Legacy shape retained for existing pages
export const team = teamRoles.map((role) => ({
  name: role.title,
  nameEn: role.titleEn,
  role: role.title,
  roleEn: role.titleEn,
  duty: role.description,
  dutyEn: role.descriptionEn,
  image: '/team-placeholder.svg',
}))

export default team
