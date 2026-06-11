import type { ArticleCategoryKey, LegalArticle } from '@/lib/data/articles'

export const englishArticleCategories: { key: ArticleCategoryKey; label: string }[] = [
  { key: 'civil', label: 'Civil Law' },
  { key: 'criminal', label: 'Criminal Law' },
  { key: 'family', label: 'Family Law' },
  { key: 'inheritance', label: 'Inheritance Law' },
  { key: 'land', label: 'Land Law' },
  { key: 'cheque', label: 'Cheque Law' },
  { key: 'lawyer-guide', label: 'Hiring a Lawyer' },
  { key: 'contracts', label: 'Contracts and Business' },
  { key: 'labor', label: 'Labor Law' },
]

const author = 'Thiangtham Law Office Legal Team'

export const englishLegalArticles: LegalArticle[] = [
  {
    slug: 'divorce-documents-checklist',
    title: 'What Documents Should You Prepare for a Divorce Case?',
    excerpt:
      'A practical checklist to help a lawyer assess the grounds for divorce, children, marital property, and related claims.',
    category: 'Family Law',
    categoryKey: 'family',
    date: 'May 30, 2026',
    author,
    readTime: '6 min read',
    sections: [
      {
        heading: 'Start with family status and the key events',
        paragraphs: [
          'Prepare the marriage registration, household records, children’s birth certificates, and a chronological summary of the events. Include your objectives regarding children, maintenance, and property.',
        ],
      },
      {
        heading: 'Documents commonly reviewed',
        bullets: [
          'Marriage registration, identification, and household registration',
          'Birth certificates and records of children’s expenses',
          'Property, debt, income, and bank records',
          'Messages, photographs, or other evidence related to the dispute',
          'Previous agreements or correspondence between the spouses',
        ],
      },
      {
        heading: 'Every family matter is different',
        paragraphs: [
          'The documents actually required depend on the legal grounds, the remedies requested, and the issues disputed by the other party. Clear originals or readable copies should be reviewed before filing.',
        ],
      },
    ],
  },
  {
    slug: 'what-to-do-when-sued-in-civil-case',
    title: 'What Should You Do After Being Sued in a Civil Case?',
    excerpt:
      'Immediate steps after receiving a civil claim, from checking the court documents to organizing facts and evidence.',
    category: 'Civil Law',
    categoryKey: 'civil',
    date: 'May 27, 2026',
    author,
    readTime: '5 min read',
    sections: [
      {
        heading: 'Read every page of the court documents',
        paragraphs: [
          'Check the court name, case number, parties, hearing date, and any directions. Keep the envelope or proof showing when the documents were received because deadlines may affect your right to defend the case.',
        ],
      },
      {
        heading: 'Organize the information before responding',
        bullets: [
          'The claim, summons, and all attachments',
          'Contracts, receipts, transfer records, and demand letters',
          'Messages, email, photographs, and witness information',
          'A timeline and points you believe are inaccurate or incomplete',
        ],
      },
      {
        heading: 'Do not ignore the hearing date',
        paragraphs: [
          'Seek advice promptly so there is enough time to review the documents and prepare. Missing a deadline or court date may reduce the opportunity to present your facts and legal arguments.',
        ],
      },
    ],
  },
  {
    slug: 'bounced-cheque-filing-deadline',
    title: 'How Quickly Should You Act on a Dishonored Cheque?',
    excerpt:
      'The relevant dates and documents to review when a bank refuses payment of a cheque.',
    category: 'Cheque Law',
    categoryKey: 'cheque',
    date: 'May 24, 2026',
    author,
    readTime: '5 min read',
    sections: [
      {
        heading: 'The answer depends on the facts and legal route',
        paragraphs: [
          'Important dates may include the cheque date, presentation date, bank refusal date, and the date the relevant person became known. Civil debt recovery and criminal issues must be assessed separately.',
        ],
      },
      {
        heading: 'Documents to review promptly',
        bullets: [
          'The original cheque and a clear copy',
          'The bank return memo or refusal notice',
          'The contract, invoice, or evidence of the underlying debt',
          'Demand letters and payment negotiations',
        ],
      },
      {
        heading: 'Do not wait until a deadline is close',
        paragraphs: [
          'Have the dates and original documents reviewed promptly. General information cannot replace a calculation based on the actual cheque and transaction records.',
        ],
      },
    ],
  },
  {
    slug: 'estate-administrator-petition',
    title: 'Who Is an Estate Administrator and How Are They Appointed?',
    excerpt:
      'An overview of an estate administrator’s role, common documents, and the court petition process.',
    category: 'Inheritance Law',
    categoryKey: 'inheritance',
    date: 'May 20, 2026',
    author,
    readTime: '6 min read',
    sections: [
      {
        heading: 'The administrator manages the deceased person’s estate',
        paragraphs: [
          'Responsibilities may include collecting assets, paying liabilities, dealing with authorities, and distributing property to the persons entitled under a will or Thai law.',
        ],
      },
      {
        heading: 'Information commonly required',
        bullets: [
          'Death certificate and household registration of the deceased',
          'Information and relationship records for the heirs',
          'The will, if one exists',
          'A list of assets, liabilities, and official records',
          'Information about the proposed estate administrator',
        ],
      },
      {
        heading: 'The court considers the facts in each petition',
        paragraphs: [
          'Procedure and documents may vary depending on the location, assets, and whether another interested person objects. Review the requirements before filing to reduce avoidable delays.',
        ],
      },
    ],
  },
  {
    slug: 'what-to-do-after-court-summons',
    title: 'What Should You Do After Receiving a Court Summons?',
    excerpt:
      'The first details to check and why court deadlines should not be ignored.',
    category: 'Hiring a Lawyer',
    categoryKey: 'lawyer-guide',
    date: 'May 2, 2026',
    author,
    readTime: '4 min read',
    sections: [
      {
        heading: 'Check the court, case number, and hearing date',
        paragraphs: [
          'Read every page and identify who received the summons, the type of case, the date of the hearing, and any required response. Receiving a summons does not mean the case has already been lost.',
        ],
      },
      {
        heading: 'Prepare the available information',
        bullets: [
          'Copies of the summons and every attachment',
          'Contracts, payment records, and correspondence with the other party',
          'A short chronological summary of the events',
          'Enough time for a lawyer to review the matter before the hearing',
        ],
      },
      {
        heading: 'Avoid an unreviewed response',
        paragraphs: [
          'Do not sign, admit, or send an important response before understanding its effect. Review the facts and documents before choosing a legal strategy.',
        ],
      },
    ],
  },
  {
    slug: 'essential-contract-terms',
    title: 'What Terms Should a Well-Drafted Contract Include?',
    excerpt:
      'Core provisions to check before signing so that obligations and remedies are clear.',
    category: 'Contracts and Business',
    categoryKey: 'contracts',
    date: 'April 20, 2026',
    author,
    readTime: '6 min read',
    sections: [
      {
        heading: 'Define obligations in measurable terms',
        paragraphs: [
          'A contract should state who must do what, when delivery is due, what standard applies, and how payment will be made. Broad language often leaves the parties with different expectations.',
        ],
      },
      {
        heading: 'Provisions to check',
        bullets: [
          'Party details and authority to sign',
          'Scope, price, tax, and payment dates',
          'Warranties, corrections, and liability',
          'Termination events and notice procedure',
          'Governing law and dispute resolution',
        ],
      },
      {
        heading: 'One template does not fit every transaction',
        paragraphs: [
          'A sample contract may be a useful starting point, but it should be adapted to the actual workflow, risks, and bargaining position of the parties.',
        ],
      },
    ],
  },
  {
    slug: 'when-landlord-can-evict-tenant',
    title: 'When Can a Landlord Seek Eviction?',
    excerpt: 'Points to review when rent is unpaid, a lease has ended, or a tenant refuses to leave the property.',
    category: 'Land Law',
    categoryKey: 'land',
    date: 'May 17, 2026',
    author,
    readTime: '5 min read',
    sections: [
      {
        heading: 'Start with the lease and the reason for termination',
        paragraphs: [
          'Review the lease term, payment obligations, notices, breach provisions, and the date possession should be returned. The correct procedure depends on the agreement and the actual events.',
        ],
      },
      {
        heading: 'Useful records',
        bullets: [
          'Lease agreement and property documents',
          'Rent invoices, receipts, and payment records',
          'Termination notices and delivery evidence',
          'Messages, photographs, and records of property condition',
        ],
      },
    ],
  },
  {
    slug: 'criminal-bail-documents',
    title: 'What Documents May Be Needed for Criminal Bail?',
    excerpt: 'General information about identity, case, and security documents that may be reviewed for a bail application.',
    category: 'Criminal Law',
    categoryKey: 'criminal',
    date: 'May 16, 2026',
    author,
    readTime: '5 min read',
    sections: [
      {
        heading: 'Requirements depend on the stage and authority',
        paragraphs: [
          'The required documents and security may differ during police investigation, prosecution, trial, or appeal. Confirm the current requirements with the responsible authority.',
        ],
      },
      {
        heading: 'Information commonly prepared',
        bullets: [
          'Identification and household registration records',
          'Case number, allegation, summons, warrant, or detention records',
          'Documents for the proposed security or guarantor',
          'Information supporting the request and ability to comply with conditions',
        ],
      },
    ],
  },
  {
    slug: 'prepare-documents-before-civil-case',
    title: 'How to Prepare Documents Before a Civil Case',
    excerpt: 'A structured way to organize agreements, payments, correspondence, evidence, and a timeline before consultation.',
    category: 'Civil Law',
    categoryKey: 'civil',
    date: 'May 15, 2026',
    author,
    readTime: '5 min read',
    sections: [
      {
        heading: 'Begin with a verifiable timeline',
        paragraphs: [
          'List the agreement, important performance dates, the first problem, demands made, and each response. Records with clear dates and sources make the dispute easier to assess.',
        ],
      },
      {
        heading: 'Preserve the original evidence',
        bullets: [
          'Contracts, quotations, purchase orders, and invoices',
          'Receipts, bank statements, and transfer records',
          'Messages, email, formal notices, and photographs',
          'Court or authority documents already received',
        ],
      },
    ],
  },
  {
    slug: 'unfair-dismissal-basics',
    title: 'What Should an Employee Know About Unfair Dismissal?',
    excerpt: 'Important records and potential employment rights to review after termination.',
    category: 'Labor Law',
    categoryKey: 'labor',
    date: 'April 8, 2026',
    author,
    readTime: '5 min read',
    sections: [
      {
        heading: 'Check the reason and effective date of termination',
        paragraphs: [
          'Keep the termination letter, warnings, employment agreement, payslips, and proof of the last working day. Rights depend on the reason, length of service, and other facts.',
        ],
      },
      {
        heading: 'Potential issues to assess',
        bullets: [
          'Outstanding wages and overtime',
          'Statutory severance',
          'Payment in lieu of notice',
          'Potential compensation for unfair termination',
        ],
      },
    ],
  },
  {
    slug: 'how-to-start-inheritance-management',
    title: 'How Should Estate Administration Begin?',
    excerpt: 'Initial steps for identifying heirs, assets, liabilities, and whether an estate administrator may be required.',
    category: 'Inheritance Law',
    categoryKey: 'inheritance',
    date: 'March 25, 2026',
    author,
    readTime: '5 min read',
    sections: [
      {
        heading: 'Collect the deceased person’s core records',
        paragraphs: [
          'Start with the death certificate, household registration, marital status, children, and any will. Then identify assets and liabilities and the authorities involved.',
        ],
      },
      {
        heading: 'When court appointment may be required',
        paragraphs: [
          'A court-appointed estate administrator may be required to transfer land, withdraw funds, or manage assets when an authority requires a court order. Check the actual assets and agency requirements before proceeding.',
        ],
      },
    ],
  },
]

export function getEnglishLegalArticle(slug: string) {
  return englishLegalArticles.find((article) => article.slug === slug)
}
