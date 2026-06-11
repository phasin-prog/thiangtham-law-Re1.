export type Lawyer = {
  name: string
  role: string
  licenseNumber?: string
  expertise?: string[]
  experience?: string
  bio?: string
  image?: string
}

export const lawyers: Lawyer[] = [
  {
    name: 'นายเกษม ฉิมพลี',
    role: 'หัวหน้าสำนักงาน',
    licenseNumber: '',
    expertise: ['ให้คำปรึกษากฎหมาย', 'รับว่าความ', 'วางแนวทางคดี'],
    experience: 'ประสบการณ์เป็นทนายความมากกว่า 19 ปี',
    bio: 'ให้ความสำคัญกับการวิเคราะห์ข้อเท็จจริง การเตรียมพยานหลักฐาน และการอธิบายทางเลือกทางกฎหมายแก่ลูกความอย่างเป็นระบบ',
    image: '/person-placeholder.svg',
  },
]

export default lawyers
