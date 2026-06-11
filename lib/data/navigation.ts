export type NavigationLink = {
  label: string
  labelEn: string
  href: string
}

export type ServiceMenuGroup = {
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  links: NavigationLink[]
}

export type NavigationMenuGroup = {
  title: string
  titleEn: string
  links: NavigationLink[]
}

export const publicNavigation: NavigationLink[] = [
  { href: '/', label: 'หน้าแรก', labelEn: 'Home' },
  { href: '/about', label: 'เกี่ยวกับเรา', labelEn: 'About Us' },
  { href: '/services', label: 'บริการของเรา', labelEn: 'Our Services' },
  { href: '/legal-knowledge', label: 'กฎหมายน่ารู้', labelEn: 'Legal Knowledge' },
  { href: '/dika', label: 'ฎีกา', labelEn: 'Supreme Court Cases' },
  { href: '/case-studies', label: 'ตัวอย่างผลงาน', labelEn: 'Case Studies' },
  { href: '/process', label: 'ขั้นตอนการใช้บริการ', labelEn: 'Service Process' },
  { href: '/contact', label: 'ติดต่อเรา', labelEn: 'Contact' },
]

export const teamNavigationLink: NavigationLink = {
  href: '/team',
  label: 'ทนายความและทีมงาน',
  labelEn: 'Lawyers & Team',
}

export const headerNavigation: NavigationLink[] = [
  publicNavigation[0], // Home
  publicNavigation[1], // About
  publicNavigation[2], // Services
  publicNavigation[3], // Knowledge
  teamNavigationLink,
  publicNavigation[4], // Dika
  publicNavigation[5], // Case Studies
  publicNavigation[6], // Process
  publicNavigation[7], // Contact
]

export const serviceMenuGroups: ServiceMenuGroup[] = [
  {
    title: 'บริการด้านคดีความ',
    titleEn: 'Litigation Services',
    description:
      'รับว่าความ ฟ้องคดี ต่อสู้คดี และให้คำปรึกษาเกี่ยวกับข้อพิพาททางกฎหมายหลากหลายประเภท',
    descriptionEn: 'Representation, litigation, defense, and legal consulting for various disputes.',
    links: [
      { label: 'คดีแพ่ง', labelEn: 'Civil Cases', href: '/services/civil' },
      { label: 'คดีอาญา', labelEn: 'Criminal Cases', href: '/services/criminal' },
      { label: 'คดีครอบครัว', labelEn: 'Family Cases', href: '/services/family' },
      { label: 'คดีมรดก', labelEn: 'Inheritance Cases', href: '/services/inheritance' },
      { label: 'คดีเช็ค', labelEn: 'Cheque Cases', href: '/services/cheque' },
      { label: 'คดีที่ดิน', labelEn: 'Land Disputes', href: '/services/land' },
      { label: 'คดีผู้บริโภค', labelEn: 'Consumer Cases', href: '/services/consumer' },
    ],
  },
  {
    title: 'อุทธรณ์ ฎีกา และคดีชำนาญพิเศษ',
    titleEn: 'Appeals & Specialized Cases',
    description:
      'วิเคราะห์ประเด็นข้อกฎหมาย ข้อเท็จจริง และแนวทางดำเนินการในคดีที่มีลักษณะเฉพาะ',
    descriptionEn: 'Legal analysis and specialized case procedures for higher courts.',
    links: [
      { label: 'อุทธรณ์และฎีกา', labelEn: 'Appeals and Supreme Court Appeals', href: '/services/appeal' },
      { label: 'คดีล้มละลาย', labelEn: 'Bankruptcy Cases', href: '/services/bankruptcy' },
      { label: 'คดีปกครอง', labelEn: 'Administrative Cases', href: '/services/administrative' },
      { label: 'คดีทรัพย์สินทางปัญญา', labelEn: 'Intellectual Property Cases', href: '/services/intellectual-property' },
      { label: 'คดีชำนาญพิเศษ', labelEn: 'Specialized Cases', href: '/services/specialized-cases' },
    ],
  },
  {
    title: 'นิติกรรม สัญญา และงานทะเบียนธุรกิจ',
    titleEn: 'Legal Documents & Business',
    description:
      'จัดทำ ตรวจสอบ และให้คำปรึกษาเกี่ยวกับสัญญา เอกสารทางกฎหมาย และงานทะเบียนธุรกิจ',
    descriptionEn: 'Drafting, reviewing, and consulting on contracts and business registrations.',
    links: [
      { label: 'จัดทำนิติกรรมสัญญา', labelEn: 'Contracts and Legal Documents', href: '/services/contracts' },
      {
        label: 'จดทะเบียนบริษัทและทะเบียนพาณิชย์',
        labelEn: 'Business Registration',
        href: '/services/business-registration',
      },
    ],
  },
  {
    title: 'สืบทรัพย์ บังคับคดี และไกล่เกลี่ย',
    titleEn: 'Enforcement & Mediation',
    description:
      'ดำเนินการภายหลังมีคำพิพากษา รวมถึงการเจรจาเพื่อหาทางยุติข้อพิพาทอย่างเหมาะสม',
    descriptionEn: 'Post-judgment actions, asset investigation, and dispute resolution.',
    links: [
      { label: 'สืบทรัพย์และบังคับคดี', labelEn: 'Asset Investigation and Enforcement', href: '/services/enforcement' },
      { label: 'ไกล่เกลี่ยและประนีประนอมยอมความ', labelEn: 'Mediation and Settlement', href: '/services/mediation' },
    ],
  },
]

export const serviceMenuLinks = serviceMenuGroups.flatMap((group) =>
  group.links.map((link) => ({ ...link, groupTitle: group.title, groupDescription: group.description })),
)

export const serviceDropdownLinks = serviceMenuGroups.flatMap((group) => group.links)

export const legalKnowledgeMenuGroups: NavigationMenuGroup[] = [
  {
    title: 'หมวดกฎหมาย',
    titleEn: 'Legal Categories',
    links: [
      { label: 'กฎหมายแพ่ง', labelEn: 'Civil Law', href: '/legal-knowledge/civil-law' },
      { label: 'กฎหมายอาญา', labelEn: 'Criminal Law', href: '/legal-knowledge/criminal-law' },
      { label: 'กฎหมายครอบครัว', labelEn: 'Family Law', href: '/legal-knowledge/family-law' },
      { label: 'กฎหมายมรดก', labelEn: 'Inheritance Law', href: '/legal-knowledge/inheritance-law' },
      { label: 'กฎหมายที่ดิน', labelEn: 'Land Law', href: '/legal-knowledge/land-law' },
    ],
  },
  {
    title: 'คู่มือประชาชน',
    titleEn: 'Public Guides',
    links: [
      { label: 'คู่มือว่าจ้างทนาย', labelEn: 'Guide to Hiring a Lawyer', href: '/legal-knowledge/hiring-lawyer' },
      { label: 'เทคนิคการต่อสู้คดี', labelEn: 'Litigation Guide', href: '/legal-knowledge/litigation-guide' },
      { label: 'ขั้นตอนขึ้นศาล', labelEn: 'Court Process', href: '/legal-knowledge/court-process' },
      { label: 'การเตรียมเอกสารคดี', labelEn: 'Legal Document Preparation', href: '/legal-knowledge/legal-documents' },
    ],
  },
]

export const articleCategoryLinks = legalKnowledgeMenuGroups.flatMap((group) => group.links)

export const navigationCta: NavigationLink = {
  label: 'ปรึกษาปัญหากฎหมาย',
  labelEn: 'Consultation',
  href: '/consultation',
}

