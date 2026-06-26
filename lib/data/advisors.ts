export type Advisor = {
  slug: string
  name: string
  nameEn: string
  role: string
  roleEn: string
  education?: { degree: string; degreeEn: string }[]
  experience?: string
  experienceEn?: string
  workHistory?: string
  workHistoryEn?: string
  image?: string
}

export const advisors: Advisor[] = [
  {
    slug: 'witcha-chimphlee',
    name: 'รองศาสตราจารย์ ดร.วิชชา ฉิมพลี',
    nameEn: 'Associate Professor Dr. Witcha Chimphlee',
    role: 'ที่ปรึกษาฝ่ายวิชาการ',
    roleEn: 'Academic Advisor',
    education: [
      {
        degree: 'วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์) วิทยาลัยครูเพชรบุรี',
        degreeEn: 'Bachelor of Science (Computer Science), Phetchaburi Teacher\'s College',
      },
      {
        degree: 'วิทยาศาสตรมหาบัณฑิต (วิทยาการคอมพิวเตอร์) สถาบันบัณฑิตพัฒนบริหารศาสตร์',
        degreeEn: 'Master of Science (Computer Science), National Institute of Development Administration (NIDA)',
      },
      {
        degree: 'ปรัชญาดุษฎีบัณฑิต (วิทยาการคอมพิวเตอร์) มหาวิทยาลัยเทคโนโลยีแห่งมาเลเซีย ประเทศมาเลเซีย',
        degreeEn: 'Doctor of Philosophy (Computer Science), Universiti Teknologi Malaysia (UTM), Malaysia',
      }
    ],
    experience: 'ผู้ช่วยศาสตราจารย์ มหาวิทยาลัยสวนดุสิต',
    experienceEn: 'Assistant Professor, Suan Dusit University',
    workHistory: 'อาจารย์มหาวิทยาลัยและที่ปรึกษาด้านเทคโนโลยี สารสนเทศ และวิชาการ',
    workHistoryEn: 'University Professor and advisor in technology, information systems, and academic affairs',
    image: '/staff/wicha-chimphli.svg',
  },
  {
    slug: 'ronnachai-samphaonon',
    name: 'ดร.รณชัย สำเภานนท์',
    nameEn: 'Dr. Ronnachai Samphaonon',
    role: 'ที่ปรึกษาทางกฎหมาย',
    roleEn: 'Legal Advisor',
    education: [
      {
        degree: 'ศึกษาศาสตรบัณฑิต สาขาการบริหารการศึกษา, มหาวิทยาลัยสุโขทัยธรรมาธิราช',
        degreeEn: 'Bachelor of Education in Educational Administration, Sukhothai Thammathirat Open University',
      },
      {
        degree: 'นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยอุบลราชธานี',
        degreeEn: 'Bachelor of Laws (LL.B.), Ubon Ratchathani University',
      },
      {
        degree: 'ศึกษาศาสตรมหาบัณฑิต สาขาการบริหารการศึกษา, มหาวิทยาลัยมหาสารคาม',
        degreeEn: 'Master of Education in Educational Administration, Mahasarakham University',
      },
      {
        degree: 'ปรัชญาดุษฎีบัณฑิต สาขาพุทธศาสตร์, มหาวิทยาลัยมหามกุฏราชวิทยาลัย (มมร.)',
        degreeEn: 'Doctor of Philosophy in Buddhist Studies, Mahamakut Buddhist University (MBU)',
      },
      {
        degree: 'ประกาศนียบัตรกฎหมายปกครองและวิธีพิจารณาคดีปกครอง, คณะนิติศาสตร์ มหาวิทยาลัยอุบลราชธานี',
        degreeEn: 'Certificate in Administrative Law and Administrative Court Procedure, Faculty of Law, Ubon Ratchathani University',
      }
    ],
    experience: 'อดีตผู้อำนวยการ (ผ.อ.) และผู้เชี่ยวชาญการบริหารงานบุคคล',
    experienceEn: 'Former Director and Human Resources Management Expert',
    workHistory: 'มีความเชี่ยวชาญด้านการประสานงานหน่วยงานภาครัฐและคดีปกครอง',
    workHistoryEn: 'Expert in government coordination and administrative law cases',
    image: '/staff/ronnachai-samphaonon.svg',
  },
  {
    slug: 'nuanchan-ruszkiewicz',
    name: 'นางนวลจันทร์ รัสคิวิคซ์',
    nameEn: 'Mrs. Nuanchan Ruszkiewicz',
    role: 'ที่ปรึกษาฝ่ายต่างประเทศ',
    roleEn: 'Foreign Affairs Advisor',
    education: [
      {
        degree: 'ปริญญาตรี รัฐศาสตรบัณฑิต มหาวิทยาลัยรามคำแหง',
        degreeEn: 'Bachelor of Political Science, Ramkhamhaeng University',
      }
    ],
    experience: 'ผู้เชี่ยวชาญด้านการสื่อสารและประสานงานต่างประเทศ',
    experienceEn: 'Expert in international communication and coordination',
    workHistory: 'ดูแลเคสลูกความชาวต่างชาติและการประสานงานคดีต่างประเทศ',
    workHistoryEn: 'Managing foreign client cases and international coordination',
    image: '/staff/nuanchan-raskiuwix.svg',
  },
]

export default advisors
