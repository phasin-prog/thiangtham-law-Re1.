import { serviceMenuGroups } from '@/lib/data/navigation'
import { serviceRouteSlugs, type LegalService } from '@/lib/data/services'

const commonDocuments = [
  'Passport or identification document',
  'Contracts, official notices, court documents, or other relevant records',
  'Payment records, correspondence, photographs, or witness information',
  'A written timeline with important dates and the people involved',
]

const detailedEnglishServices: LegalService[] = [
  {
    slug: 'civil',
    title: 'Civil & Commercial Litigation',
    description: 'Expert legal counsel and representation for contractual disputes, tortious liability, debt recovery, and property claims.',
    overview:
      'Civil and commercial disputes involve the enforcement of private rights and obligations. A comprehensive assessment begins with a review of the underlying agreement, factual timeline, pecuniary evidence, and the specific remedies sought by the parties.',
    icon: 'scale',
    topics: [
      'Breach of contract and specific performance',
      'Tort claims and compensation for wrongful acts',
      'Loan recovery, commercial debt, and guarantees',
      'Civil litigation and defense strategy',
      'Legal notices and formal demands',
      'Alternative dispute resolution (Negotiation & Mediation)',
    ],
    help: [
      'Analyze factual backgrounds and evaluate evidentiary weight',
      'Assess statutory limitation periods and jurisdictional risks',
      'Draft pleadings, motions, and comprehensive legal defenses',
      'Represent and advocate in court or during mediation proceedings',
    ],
    documentsToPrepare: commonDocuments,
  },
  {
    slug: 'criminal',
    title: 'Criminal Defense & Prosecution',
    description: 'Specialized legal assistance for complainants and defendants at all stages of criminal proceedings, from investigation to trial.',
    overview:
      'Criminal matters significantly impact personal liberty and legal standing. Timely intervention and evidence preservation are critical. Expert legal advice should be secured before providing statements to authorities or taking any procedural action.',
    icon: 'shield',
    topics: [
      'Filing criminal complaints and private prosecutions',
      'Representation during police interviews and investigations',
      'Fraud, embezzlement, and white-collar crime',
      'Offenses against life, body, and reputation (Assault & Defamation)',
      'Drug-related offenses and statutory crimes',
      'Criminal trial defense and bail applications',
    ],
    help: [
      'Explain procedural rights and potential legal outcomes',
      'Perform forensic review of documents and digital evidence',
      'Prepare comprehensive defense statements and witness testimony',
      'Provide rigorous representation throughout the judicial process',
    ],
    documentsToPrepare: commonDocuments,
    noteTitle: 'Important Note on Criminal Matters',
    note:
      'Small factual details and legal deadlines may materially affect a criminal case. Preserve original evidence and seek advice promptly after receiving a summons, warrant, or request for a statement.',
  },
  {
    slug: 'family',
    title: 'Family Cases',
    description: 'Divorce, marital property, child custody, maintenance, and other family disputes.',
    overview:
      'Family disputes involve legal rights, personal relationships, and the welfare of children. We review the facts carefully, protect confidentiality, and consider negotiated solutions where appropriate.',
    icon: 'users',
    topics: [
      'Divorce and division of marital property',
      'Claims involving an extramarital relationship',
      'Parental power and child custody',
      'Child and spousal maintenance',
      'Paternity and parent-child rights',
    ],
    help: [
      'Review family status, objectives, and relevant evidence',
      'Explain legal rights and practical options',
      'Prepare agreements, petitions, and court documents',
      'Negotiate or litigate while considering the interests of children and family members',
    ],
    documentsToPrepare: [
      'Marriage or divorce registration documents',
      'Children’s birth certificates and household registration records',
      'Property, debt, income, and expense records',
      'Messages, photographs, agreements, or other relevant evidence',
    ],
  },
  {
    slug: 'inheritance',
    title: 'Inheritance Cases',
    description: 'Estate administration, wills, inheritance disputes, and appointment of an estate administrator.',
    overview:
      'Inheritance matters require a review of heirs, wills, assets, liabilities, and the authority needed to manage the estate. Court appointment may be required before certain assets can be transferred or collected.',
    icon: 'landmark',
    topics: [
      'Petitions to appoint an estate administrator',
      'Estate division and disputes among heirs',
      'Review of wills and inheritance rights',
      'Identification and collection of estate assets',
      'Transfer of land, bank accounts, and other property',
    ],
    help: [
      'Review the heirs, will, assets, and liabilities',
      'Prepare petitions and supporting documents',
      'Coordinate or negotiate estate distribution',
      'Represent parties in inheritance disputes when necessary',
    ],
    documentsToPrepare: [
      'Death certificate and household registration of the deceased',
      'Identification and relationship records of the heirs',
      'The will, if one exists',
      'Land title deeds, bank books, and evidence of other assets or liabilities',
    ],
  },
  {
    slug: 'land',
    title: 'Land Disputes',
    description: 'Eviction, trespass, access rights, boundaries, possession, and ownership disputes.',
    overview:
      'Land disputes require careful review of title documents, maps, boundaries, possession history, and actual land use. Site facts and official records often determine the available legal strategy.',
    icon: 'map',
    topics: [
      'Eviction and related compensation claims',
      'Trespass and interference with possession',
      'Rights of way and servitudes',
      'Boundary and ownership disputes',
      'Land sale and lease disputes',
    ],
    help: [
      'Review title deeds, maps, surveys, and possession records',
      'Assess ownership and possession arguments',
      'Prepare notices, claims, and defenses',
      'Coordinate surveys, negotiation, or litigation as appropriate',
    ],
    documentsToPrepare: [
      'Land title deed or other land-right document',
      'Maps, survey records, photographs, and boundary evidence',
      'Sale, lease, consent, or occupation agreements',
      'Correspondence from the Land Office or another authority',
    ],
  },
  {
    slug: 'administrative',
    title: 'Administrative Cases',
    description: 'Disputes between private parties and government agencies, administrative orders, and public-law remedies.',
    overview:
      'Administrative cases concern the use of state power, administrative orders, annulment or revision of those orders, and claims for compensation arising from government action. These matters require close review of the facts, the issued documents, and the filing deadline.',
    icon: 'landmark',
    topics: [
      'Challenging administrative orders',
      'Filing to annul or amend an order',
      'Claims for damages caused by government agencies',
      'Public-service and official-duty disputes',
      'Requests for temporary protection and administrative remedies',
    ],
    help: [
      'Review orders, notices, and documents issued by the agency',
      'Assess jurisdiction, deadlines, and procedural options',
      'Prepare complaints, petitions, and supporting documents',
      'Negotiate, revise, or litigate as appropriate',
    ],
    documentsToPrepare: commonDocuments,
  },
  {
    slug: 'cheque',
    title: 'Cheque Cases',
    description: 'Dishonored cheques, cheque-related offenses, and recovery of the underlying debt.',
    overview:
      'When a bank refuses payment, the cheque date, presentation date, return reason, and underlying transaction should be reviewed promptly because civil and criminal procedures may have different requirements and deadlines.',
    icon: 'receipt',
    topics: [
      'Dishonored or returned cheques',
      'Offenses arising from the use of a cheque',
      'Civil recovery of the underlying debt',
      'Settlement and payment negotiations',
    ],
    help: [
      'Review the cheque, return memo, and underlying debt',
      'Assess civil and criminal options and applicable deadlines',
      'Prepare notices, complaints, or court claims',
      'Negotiate payment terms and monitor compliance',
    ],
    documentsToPrepare: [
      'Original cheque and a clear copy',
      'Bank return memo or refusal notice',
      'Agreement, invoice, or evidence of the underlying debt',
      'Demand letters and payment correspondence',
    ],
  },
  {
    slug: 'anti-corruption',
    title: 'Anti-Corruption Cases',
    description: 'Matters involving corruption, misconduct, and disputes heard by the anti-corruption court.',
    overview:
      'Anti-corruption matters often involve the exercise of official authority, document review, and procedures specific to the anti-corruption court. A prompt review of the facts helps determine a suitable strategy for defense or response.',
    icon: 'shield',
    topics: [
      'Corruption and misconduct matters involving public officials',
      'Review of evidence and official records',
      'Advice before responding or giving a statement',
      'Defense in the anti-corruption court',
      'Handling matters where reputation and sensitive information are involved',
    ],
    help: [
      'Review facts, documents, and evidence available at the outset',
      'Explain the procedure and practical consequences',
      'Prepare statements, petitions, and supporting documents',
      'Plan a defense or negotiation strategy within the agreed scope',
    ],
    documentsToPrepare: commonDocuments,
  },
  {
    slug: 'business',
    title: 'Business and Contracts',
    description: 'Contract drafting, review, and legal advice designed to reduce business risk.',
    overview:
      'A contract should reflect the actual transaction, payment structure, responsibilities, termination rights, and dispute process. Reviewing these points before signing can reduce uncertainty and future disputes.',
    icon: 'briefcase',
    topics: [
      'Contract drafting and review',
      'Sale, service, and employment agreements',
      'Partnership and commercial arrangements',
      'Demand letters and formal notices',
      'Business disputes and pre-transaction advice',
    ],
    help: [
      'Identify the commercial objective and key risks',
      'Review important clauses and explain their legal effect',
      'Draft or revise documents for the actual transaction',
      'Advise on breach, termination, and dispute options',
    ],
    documentsToPrepare: commonDocuments,
  },
  {
    slug: 'labor',
    title: 'Labor Cases',
    description: 'Advice for employees and employers on labor rights, termination, compensation, and workplace disputes.',
    overview:
      'Labor matters require a review of the employment agreement, work rules, payroll history, warnings, termination grounds, and the steps taken by each party.',
    icon: 'hard-hat',
    topics: [
      'Unfair termination',
      'Severance and payment in lieu of notice',
      'Unpaid wages and overtime',
      'Employment agreements and work rules',
      'Employer-employee disputes and mediation',
    ],
    help: [
      'Review employment records, warnings, and termination documents',
      'Assess potential claims from the available information',
      'Advise employees or employers before action is taken',
      'Negotiate, mediate, or litigate when necessary',
    ],
    documentsToPrepare: [
      'Employment agreement and work rules',
      'Payslips and payment records',
      'Warnings, termination letter, or resignation letter',
      'Attendance records and relevant communications',
    ],
  },
  {
    slug: 'tax',
    title: 'Tax Services',
    description: 'Tax advice, filing support, and response coordination for individuals and businesses.',
    overview:
      'Tax matters often start with a review of income, expenses, supporting records, notices from authorities, and the deadlines that apply. We help organize the facts and documents so the next response is clear and timely.',
    icon: 'calculator',
    topics: [
      'Individual and business tax review',
      'Preparation of supporting records for filing',
      'Response to questions and coordination with accountants',
      'Review of notices and tax correspondence',
      'Deadline tracking and submission planning',
    ],
    help: [
      'Review the facts, records, and tax position on hand',
      'Explain the issue and the next response step-by-step',
      'Coordinate with accountants or other relevant advisers',
      'Proceed within the agreed scope and keep the work on track',
    ],
    documentsToPrepare: [
      'Tax returns, notices, or orders from authorities',
      'Income, expense, and bookkeeping records',
      'Company certificates, contracts, or related supporting documents',
      'Any previous response letters or clarification submitted',
    ],
    noteTitle: 'Important Note on Tax Matters',
    note:
      'Tax outcomes depend on the facts and the records available. Please keep all supporting documents together so we can assess the correct path efficiently.',
  },
  {
    slug: 'visa-foreign-documents',
    title: 'Visa & Foreign Document Services',
    description: 'Document review, translation coordination, and foreign-use document preparation.',
    overview:
      'Visa and foreign document work covers pre-filing document checks, powers of attorney, supporting letters, translation, certification, and preparation for submission to embassies, foreign authorities, or overseas counterparties.',
    icon: 'globe',
    topics: [
      'Visa document checklist review',
      'Translation and certification coordination',
      'Employment letters and supporting documents',
      'Preparation of documents for use abroad',
      'Status follow-up and work coordination',
    ],
    help: [
      'Check the document list before submission',
      'Arrange the packet to match the travel or filing purpose',
      'Coordinate translations, certification, and foreign-use documents',
      'Keep you updated on progress within the agreed scope',
    ],
    documentsToPrepare: [
      'Passport and identification documents',
      'Application forms or invitation letters, if any',
      'Employment, income, address, or relationship evidence requested for filing',
      'Original documents that must be translated, certified, or used abroad',
    ],
    noteTitle: 'Important Note on Visa and Foreign Documents',
    note:
      'Visa and foreign document requirements vary by country and purpose. Our office can review completeness and prepare the documents required for the stated use.',
  },
  {
    slug: 'contracts',
    title: 'Contracts and Legal Documents',
    description: 'Drafting and review of sale, lease, service, employment, loan, and other legal documents.',
    overview:
      'Effective drafting starts with the parties’ objectives, the actual workflow, payment terms, responsibilities, delivery, breach, termination, and dispute resolution.',
    icon: 'file-text',
    topics: [
      'Sale and lease agreements',
      'Service and employment agreements',
      'Loan and guarantee agreements',
      'Wills, powers of attorney, and legal instruments',
      'Pre-signing contract review',
    ],
    help: [
      'Clarify the transaction and risks that need to be controlled',
      'Review key clauses and explain their legal effect',
      'Draft or revise the document for its intended use',
      'Identify points that should be negotiated before signing',
    ],
    documentsToPrepare: commonDocuments,
  },
]

function createEnglishMenuService(slug: string): LegalService | undefined {
  const menuItem = serviceMenuGroups
    .flatMap((group) => group.links.map((link) => ({ ...link, groupDescriptionEn: group.descriptionEn })))
    .find((item) => item.href === `/services/${slug}`)

  if (!menuItem) return undefined

  return {
    slug,
    title: menuItem.labelEn,
    description: menuItem.groupDescriptionEn,
    overview:
      `${menuItem.labelEn} requires a case-specific review of the facts, documents, deadlines, and applicable Thai law. ` +
      'Our office reviews the initial information and explains practical options before the scope of work is agreed.',
    icon: 'scale',
    topics: [
      `Initial assessment of the key issues in ${menuItem.labelEn.toLowerCase()}`,
      'Review of relevant documents and evidence',
      'Explanation of rights, duties, options, and risks',
      'Planning for negotiation, filing, defense, or another legal procedure',
    ],
    help: [
      'Organize the initial facts and timeline',
      'Review available documents and identify missing information',
      'Assess practical options and important limitations',
      'Proceed under the agreed scope and provide progress updates',
    ],
    documentsToPrepare: commonDocuments,
    noteTitle: 'General Information Only',
    note:
      'Procedure, timing, cost, and available remedies depend on the facts and documents of each matter. Obtain advice before taking a step that may affect your legal rights.',
  }
}

export const englishLegalServices = serviceRouteSlugs.map((slug) => {
  const service =
    detailedEnglishServices.find((item) => item.slug === slug) ?? createEnglishMenuService(slug)
  if (!service) throw new Error(`Missing English legal service: ${slug}`)
  return service
})

const featuredServiceSlugs = [
  'civil',
  'criminal',
  'family',
  'inheritance',
  'land',
  'cheque',
  'appeal',
  'contracts',
] as const

export const englishFeaturedLegalServices = featuredServiceSlugs.map((slug) => {
  const service = englishLegalServices.find((item) => item.slug === slug)
  if (!service) throw new Error(`Missing featured English legal service: ${slug}`)
  return service
})

const englishServiceAliases: Record<string, string> = {
  'civil-case': 'civil',
  'criminal-case': 'criminal',
  'family-law': 'family',
  'inheritance-law': 'inheritance',
  'debt-case': 'civil',
  'contract-law': 'contracts',
  'legal-advisory': 'business',
}

export const englishServiceRouteSlugs = [
  ...serviceRouteSlugs,
  ...Object.keys(englishServiceAliases),
]

export function getEnglishLegalService(slug: string) {
  const canonicalSlug = englishServiceAliases[slug] ?? slug
  return englishLegalServices.find((service) => service.slug === canonicalSlug)
}
