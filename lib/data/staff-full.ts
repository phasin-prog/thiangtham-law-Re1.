export type EducationItem = {
  year?: string
  th: string
  en: string
}

export type StaffMember = {
  id: string
  department: {
    th: string
    en: string
  }
  name: {
    th: string
    en: string
  }
  education: {
    full: EducationItem[]
    short: EducationItem[]
  }
}

export const teamMembers: StaffMember[] = [
  {
    id: "foreign_affairs_001",
    department: {
      th: "ฝ่ายต่างประเทศ",
      en: "International Affairs"
    },
    name: {
      th: "นางนวลจันทร์ รัสคิวิคซ์",
      en: "Mrs. Nuanchan Ruszkiewicz"
    },
    education: {
      full: [
        {
          th: "ปริญญาตรี รัฐศาสตรบัณฑิต มหาวิทยาลัยรามคำแหง",
          en: "Bachelor of Political Science, Ramkhamhaeng University"
        }
      ],
      short: [
        {
          th: "ป.ตรี รัฐศาสตรบัณฑิต ม.รามคำแหง",
          en: "B.Pol.Sc., Ramkhamhaeng University"
        }
      ]
    }
  },
  {
    id: "legal_advisor_001",
    department: {
      th: "ที่ปรึกษาทางกฎหมาย",
      en: "Legal Advisor"
    },
    name: {
      th: "ดร.รณชัย สำเภานนท์",
      en: "Dr. Ronnachai Samphaonon"
    },
    education: {
      full: [
        {
          th: "ศึกษาศาสตรบัณฑิต สาขาการบริหารการศึกษา, มหาวิทยาลัยสุโขทัยธรรมาธิราช",
          en: "Bachelor of Education in Educational Administration, Sukhothai Thammathirat Open University"
        },
        {
          th: "นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยอุบลราชธานี",
          en: "Bachelor of Laws (LL.B.), Ubon Ratchathani University"
        },
        {
          th: "ศึกษาศาสตรมหาบัณฑิต สาขาการบริหารการศึกษา, มหาวิทยาลัยมหาสารคาม",
          en: "Master of Education in Educational Administration, Mahasarakham University"
        },
        {
          th: "ปรัชญาดุษฎีบัณฑิต สาขาพุทธศาสตร์, มหาวิทยาลัยมหามกุฏราชวิทยาลัย (มมร.)",
          en: "Doctor of Philosophy in Buddhist Studies, Mahamakut Buddhist University (MBU)"
        },
        {
          th: "ประกาศนียบัตรกฎหมายปกครองและวิธีพิจารณาคดีปกครอง, คณะนิติศาสตร์ มหาวิทยาลัยอุบลราชธานี",
          en: "Certificate in Administrative Law and Administrative Court Procedure, Faculty of Law, Ubon Ratchathani University"
        }
      ],
      short: [
        {
          th: "ศ.บ. มสธ.",
          en: "B.Ed., STOU"
        },
        {
          th: "น.บ. ม.อุบลราชธานี",
          en: "LL.B., Ubon Ratchathani University"
        },
        {
          th: "ศ.ม. ม.มหาสารคาม",
          en: "M.Ed., Mahasarakham University"
        },
        {
          th: "ปร.ด. มมร.",
          en: "Ph.D., Mahamakut Buddhist University"
        },
        {
          th: "ประกาศนียบัตรกฎหมายปกครอง ม.อุบลราชธานี",
          en: "Certificate in Administrative Law, Ubon Ratchathani University"
        }
      ]
    }
  },
  {
    id: "tech_advisor_001",
    department: {
      th: "ที่ปรึกษาด้านเทคโนโลยี",
      en: "Technology Advisor"
    },
    name: {
      th: "รองศาสตราจารย์ ดร.วิชชา ฉิมพลี",
      en: "Associate Professor Dr. Witcha Chimphlee"
    },
    education: {
      full: [
        {
          th: "วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์) วิทยาลัยครูเพชรบุรี",
          en: "Bachelor of Science (Computer Science), Phetchaburi Teacher's College"
        },
        {
          th: "วิทยาศาสตรมหาบัณฑิต (วิทยาการคอมพิวเตอร์) สถาบันบัณฑิตพัฒนบริหารศาสตร์",
          en: "Master of Science (Computer Science), National Institute of Development Administration (NIDA)"
        },
        {
          th: "ปรัชญาดุษฎีบัณฑิต (วิทยาการคอมพิวเตอร์) มหาวิทยาลัยเทคโนโลยีแห่งมาเลเซีย",
          en: "Doctor of Philosophy (Computer Science), Universiti Teknologi Malaysia (UTM), Malaysia"
        }
      ],
      short: []
    }
  },
  {
    id: "legal_consultant_002",
    department: {
      th: "หัวหน้าสำนักงาน / ทนายความ",
      en: "Managing Attorney / Attorney-at-Law"
    },
    name: {
      th: "นายเกษม ฉิมพลี",
      en: "Mr. Kasem Chimphlee"
    },
    education: {
      full: [
        {
          th: "นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยราชธานี",
          en: "Bachelor of Laws (LL.B.), Ratchathani University"
        },
        {
          th: "นิติศาสตรมหาบัณฑิต (น.ม.), มหาวิทยาลัยรามคำแหง",
          en: "Master of Laws (LL.M.), Ramkhamhaeng University"
        }
      ],
      short: [
        {
          th: "น.บ. ม.ราชธานี",
          en: "LL.B., Ratchathani University"
        },
        {
          th: "น.ม. ม.รามคำแหง",
          en: "LL.M., Ramkhamhaeng University"
        }
      ]
    }
  },
  {
    id: "assistant_lawyer_001",
    department: {
      th: "เจ้าหน้าที่สำนักงาน / ฝ่ายประสานงานคดี",
      en: "Office Staff / Case Coordination Officer"
    },
    name: {
      th: "นางสาวชุติมา ฉิมพลี",
      en: "Ms. Chutima Chimphlee"
    },
    education: {
      full: [
        {
          th: "วิทยาศาสตรบัณฑิต, มหาวิทยาลัยอุบลราชธานี",
          en: "Bachelor of Science, Ubon Ratchathani University"
        },
        {
          th: "นิติศาสตรบัณฑิต (น.บ.), มหาวิทยาลัยรามคำแหง",
          en: "Bachelor of Laws (LL.B.), Ramkhamhaeng University"
        }
      ],
      short: [
        {
          th: "วทบ. ม.อุบลราชธานี",
          en: "B.Sc., Ubon Ratchathani University"
        },
        {
          th: "น.บ. ม.รามคำแหง",
          en: "LL.B., Ramkhamhaeng University"
        }
      ]
    }
  },
  {
    id: "case_admin_001",
    department: {
      th: "ฝ่ายธุรการคดี",
      en: "Case Administration"
    },
    name: {
      th: "นายพศิน พสุมาตร",
      en: "Mr. Phasin Pasumart"
    },
    education: {
      full: [],
      short: []
    }
  }
]
