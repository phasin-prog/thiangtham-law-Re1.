export type StaffMember = {
  name: string
  duty: string
}

export const team: StaffMember[] = [
  {
    name: 'ทีมประสานงานคดี',
    duty: 'ดูแลการนัดหมาย การติดตามขั้นตอน และการประสานงานกับลูกความ',
  },
  {
    name: 'ทีมเอกสารและข้อมูลคดี',
    duty: 'จัดเตรียม รวบรวม และตรวจสอบเอกสารที่เกี่ยวข้องกับการดำเนินคดี',
  },
]

export default team
