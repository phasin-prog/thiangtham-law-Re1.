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
    title: 'Civil Cases',
    description: 'Advice and representation for contracts, debts, tort claims, and compensation disputes.',
    overview:
      'Civil cases concern private rights, duties, property, and obligations. A useful assessment starts with the agreement, timeline, payment evidence, correspondence, and the remedy each party is seeking.',
    icon: 'scale',
    topics: [
      'Breach of contract and contractual enforcement',
      'Compensation claims arising from wrongful acts',
      'Loans, debts, and guarantees',
      'Civil claims and defense',
      'Demand letters and formal notices',
      'Negotiation and mediation',
    ],
    help: [
      'Review the facts, agreements, and available evidence',
      'Assess rights, limitation periods, and initial risks',
      'Prepare notices, pleadings, defenses, and supporting documents',
      'Negotiate, mediate, or litigate under the agreed scope of work',
    ],
    documentsToPrepare: commonDocuments,
  },
  {
    slug: 'criminal',
    title: 'Criminal Cases',
    description: 'Legal assistance for complainants, accused persons, and defendants at key stages of a criminal matter.',
    overview:
      'Criminal matters can affect personal liberty and legal rights. Statements, evidence preservation, and timely action are important, so legal advice should be obtained before taking a step that may affect the case.',
    icon: 'shield',
    topics: [
      'Police complaints and criminal reports',
      'Advice before interviews or statements',
      'Fraud and misappropriation',
      'Assault and bodily harm',
      'Defamation',
      'Defense during investigation and court proceedings',
    ],
    help: [
      'Explain rights and procedures based on the client’s role in the matter',
      'Review documents, witnesses, and digital evidence',
      'Prepare for police interviews, hearings, and court appearances',
      'Represent and coordinate the matter under the agreed engagement',
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
