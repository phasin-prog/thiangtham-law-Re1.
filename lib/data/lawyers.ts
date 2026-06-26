export type Lawyer = {
  slug: string
  name: string
  nameEn: string
  role: string
  roleEn: string
  licenseNumber?: string
  expertise?: string[]
  expertiseEn?: string[]
  experience?: string
  experienceEn?: string
  education?: { degree: string; degreeEn: string }[]
  bio?: string
  bioEn?: string
  image?: string
  certificateUrl?: string
}

export const lawyers: Lawyer[] = [
  {
    slug: 'kasem-chimphlee',
    name: 'นายเกษม ฉิมพลี',
    nameEn: 'Mr. Kasem Chimphlee',
    role: 'หัวหน้าสำนักงาน / ทนายความ',
    roleEn: 'Managing Attorney / Attorney-at-Law',
    licenseNumber: '2838/2550',
    expertise: ['กฎหมายแพ่งและพาณิชย์', 'กฎหมายอาญา', 'กฎหมายครอบครัวและมรดก', 'กฎหมายที่ดิน'],
    expertiseEn: ['Civil and Commercial Law', 'Criminal Law', 'Family and Inheritance Law', 'Land Law'],
    experience: 'ประสบการณ์เป็นทนายความมากกว่า 19 ปี',
    experienceEn: 'Over 19 years of legal experience',
    education: [
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยราชธานี',
        degreeEn: 'Bachelor of Laws (LL.B.), Ratchathani University',
      },
      {
        degree: 'นิติศาสตรมหาบัณฑิต (น.ม.), มหาวิทยาลัยรามคำแหง',
        degreeEn: 'Master of Laws (LL.M.), Ramkhamhaeng University',
      }
    ],
    bio: 'มีความเชี่ยวชาญสูงในการวางแผนรูปคดี การสืบพยาน และการเจรจาไกล่เกลี่ย โดยเน้นความรอบคอบและรักษาผลประโยชน์สูงสุดของลูกความ',
    bioEn: 'Highly specialized in case strategy, witness examination, and mediation, focusing on thoroughness and protecting client interests.',
    image: '/staff/kasem-chimphli.svg',
    certificateUrl: '/staff/certificate-kasem.pdf',
  },
  {
    slug: 'panya-raekliang',
    name: 'นายปัญญา แรกเลียง',
    nameEn: 'Mr. Panya Raekliang',
    role: 'ทนายความ',
    roleEn: 'Attorney-at-Law',
    education: [
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยราชภัฏอุบลราชธานี',
        degreeEn: 'Bachelor of Laws (LL.B.), Ubon Ratchathani Rajabhat University',
      }
    ],
    image: '/staff/panya-raekliang.svg',
  },
  {
    slug: 'suwit-wongchan',
    name: 'พันตำรวจโทสุวิทย์ วงษ์จันทร์',
    nameEn: 'Police Lieutenant Colonel Suwit Wongchan',
    role: 'ทนายความ',
    roleEn: 'Attorney-at-Law',
    education: [
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยรามคำแหง',
        degreeEn: 'Bachelor of Laws (LL.B.), Ramkhamhaeng University',
      }
    ],
    image: '/staff/suwit-wongchun.svg',
  },
  {
    slug: 'pranot-hongthong',
    name: 'พันตำรวจโทประนต หงษ์ทอง',
    nameEn: 'Police Lieutenant Colonel Pranot Hongthong',
    role: 'ทนายความ',
    roleEn: 'Attorney-at-Law',
    education: [
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยสุโขทัยธรรมาธิราช',
        degreeEn: 'Bachelor of Laws (LL.B.), Sukhothai Thammathirat Open University',
      }
    ],
    image: '/staff/pranot-hongthong.svg',
  },
  {
    slug: 'phasin-sriwattanasombat',
    name: 'นายพศิน ศรีวัฒนสมบัติ',
    nameEn: 'Mr. Phasin Sriwattanasombat',
    role: 'ทนายความ',
    roleEn: 'Attorney-at-Law',
    education: [
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยอุบลราชธานี',
        degreeEn: 'Bachelor of Laws (LL.B.), Ubon Ratchathani University',
      }
    ],
    image: '/staff/phasin-sri.svg',
  },
  {
    slug: 'thanthanat-setthamat',
    name: 'นายธันย์ธนัช เศฐมาตย์',
    nameEn: 'Mr. Thanthanat Setthamat',
    role: 'ทนายความ',
    roleEn: 'Attorney-at-Law',
    education: [
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยมหาสารคาม',
        degreeEn: 'Bachelor of Laws (LL.B.), Mahasarakham University',
      }
    ],
    image: '/staff/thanthanat-settamat.svg',
  },
  {
    slug: 'kachapol-srilapsri',
    name: 'นายกชพล ศรีลับศรี',
    nameEn: 'Mr. Kachapol Srilapsri',
    role: 'ทนายความ',
    roleEn: 'Attorney-at-Law',
    education: [
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยราชธานี',
        degreeEn: 'Bachelor of Laws (LL.B.), Ratchathani University',
      },
      {
        degree: 'นิติศาสตรมหาบัณฑิต (น.ม.), มหาวิทยาลัยรามคำแหง',
        degreeEn: 'Master of Laws (LL.M.), Ramkhamhaeng University',
      }
    ],
    image: '/staff/kachapol-sri.svg',
  },
  {
    slug: 'pharadon-nonsri',
    name: 'นายภราดล นนทศรี',
    nameEn: 'Mr. Pharadon Nonsri',
    role: 'ทนายความ',
    roleEn: 'Attorney-at-Law',
    education: [
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยสุโขทัยธรรมาธิราช',
        degreeEn: 'Bachelor of Laws (LL.B.), Sukhothai Thammathirat Open University',
      }
    ],
    image: '/staff/pharadon-nonsri.svg',
  },
  {
    slug: 'nattawat-sutthangthitinan',
    name: 'นายณัฐวัชต์ สุทธังฐิตินันท์',
    nameEn: 'Mr. Natthawat Sutthangthitinan',
    role: 'ทนายความ',
    roleEn: 'Attorney-at-Law',
    education: [
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยราชธานี',
        degreeEn: 'Bachelor of Laws (LL.B.), Ratchathani University',
      }
    ],
    image: '/staff/nattawat.svg',
  },
]

export default lawyers
