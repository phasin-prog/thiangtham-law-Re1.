export const teamMembers = [
  {
    name: 'นายเกษม ฉิมพลี',
    role: 'หัวหน้าสำนักงาน',
    experience: 'ประสบการณ์เป็นทนายความมากกว่า 19 ปี',
    description:
      'หัวหน้าสำนักงานสำนักกฎหมายเที่ยงธรรมทนายความ มีประสบการณ์ในการให้คำปรึกษา รับว่าความ และวางแนวทางคดีมากกว่า 19 ปี โดยให้ความสำคัญกับการวิเคราะห์ข้อเท็จจริง การเตรียมพยานหลักฐาน และการอธิบายทางเลือกทางกฎหมายแก่ลูกความอย่างเป็นระบบ',
    image: '/person-placeholder.svg',
  },
] as const

export const teamRoles = [
  {
    title: 'ทีมทนายความ',
    description:
      'ทีมงานทนายความมากกว่า 9 คน พร้อมให้คำปรึกษา รับว่าความ และดำเนินคดีในหลากหลายประเภท',
  },
  {
    title: 'ที่ปรึกษากฎหมาย',
    description:
      'ให้คำปรึกษาด้านข้อกฎหมาย เอกสาร สัญญา และแนวทางดำเนินคดี',
  },
  {
    title: 'ทีมประสานงานคดี',
    description:
      'ดูแลการนัดหมาย เอกสาร การติดตามขั้นตอน และการประสานงานกับลูกความ',
  },
  {
    title: 'ทีมเอกสารและข้อมูลคดี',
    description:
      'ช่วยจัดเตรียม รวบรวม และตรวจสอบเอกสารที่เกี่ยวข้องกับการดำเนินคดี',
  },
] as const

export const teamValues = [
  'รอบคอบ',
  'ชัดเจน',
  'รักษาความลับ',
  'อธิบายขั้นตอนให้เข้าใจ',
  'วางแนวทางคดีตามข้อเท็จจริงและข้อกฎหมาย',
] as const

// Legacy shape retained for existing pages that still consume team from site-data.
export const team = teamRoles.map((role) => ({
  name: role.title,
  role: role.title,
  duty: role.description,
  image: '/team-placeholder.svg',
}))

export default team
