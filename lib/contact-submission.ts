export const consultationServices = [
  'civil',
  'criminal',
  'family',
  'inheritance',
  'contract',
  'land',
  'debt',
  'other',
] as const

export type ConsultationService = (typeof consultationServices)[number]

export type ContactSubmission = {
  name: string
  phone: string
  message: string
  service: ConsultationService
  locale: 'th' | 'en'
  sourcePath: string
}

type ValidationResult =
  | { success: true; data: ContactSubmission }
  | { success: false }

const consultationServiceSet = new Set<string>(consultationServices)
const phonePattern = /^(?=.*\d)[0-9+\-().\s]{6,30}$/

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export function isHoneypotSubmission(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return false
  }

  return readString((input as Record<string, unknown>).website).length > 0
}

export function validateContactSubmission(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { success: false }
  }

  const body = input as Record<string, unknown>
  const name = readString(body.name)
  const rawPhone = readString(body.phone)
  const message = readString(body.message)
  const service = readString(body.service)
  const locale = readString(body.locale)
  const sourcePath = readString(body.sourcePath) || '/'

  if (name.length < 2 || name.length > 120) {
    return { success: false }
  }

  if (!phonePattern.test(rawPhone)) {
    return { success: false }
  }

  const phoneDigits = rawPhone.replace(/\D/g, '')
  const phone = rawPhone.startsWith('+') ? `+${phoneDigits}` : phoneDigits
  if (phoneDigits.length < 6 || phoneDigits.length > 20) {
    return { success: false }
  }

  if (message.length < 10 || message.length > 5000) {
    return { success: false }
  }

  if (!consultationServiceSet.has(service)) {
    return { success: false }
  }

  if (locale !== 'th' && locale !== 'en') {
    return { success: false }
  }

  if (
    body.consent !== true ||
    sourcePath.length > 255 ||
    !sourcePath.startsWith('/') ||
    /\s/.test(sourcePath)
  ) {
    return { success: false }
  }

  return {
    success: true,
    data: {
      name,
      phone,
      message,
      service: service as ConsultationService,
      locale,
      sourcePath,
    },
  }
}
