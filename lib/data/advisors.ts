export type Advisor = {
  name: string
  role: string
  workHistory?: string
  image?: string
}

export const advisors: Advisor[] = [
  {
    name: 'ที่ปรึกษา (รอระบุชื่อ)',
    role: 'ที่ปรึกษากฎหมายอาวุโส',
    workHistory:
      'ให้คำปรึกษาด้านกฎหมายธุรกิจและสัญญา สนับสนุนการวางแนวทางคดีและให้ความเห็นทางกฎหมายในประเด็นที่ซับซ้อน',
    image: '/person-placeholder.svg',
  },
  {
    name: 'ที่ปรึกษา (รอระบุชื่อ)',
    role: 'ที่ปรึกษากฎหมาย',
    workHistory:
      'ให้คำปรึกษาด้านที่ดินและมรดก ช่วยตรวจสอบเอกสารและข้อเท็จจริงเพื่อประกอบการวางแนวทางคดี',
    image: '/person-placeholder.svg',
  },
]

export default advisors
