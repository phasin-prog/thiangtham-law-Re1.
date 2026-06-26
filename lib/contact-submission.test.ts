import { describe, expect, it } from 'vitest'
import {
  isHoneypotSubmission,
  validateContactSubmission,
} from './contact-submission'

const validSubmission = {
  name: 'สมชาย ใจดี',
  phone: '081-234-5678',
  message: 'ต้องการปรึกษาเรื่องผิดสัญญาและการเรียกค่าเสียหาย',
  service: 'civil',
  locale: 'th',
  sourcePath: '/',
  consent: true,
}

describe('validateContactSubmission', () => {
  it('normalizes and accepts a valid submission', () => {
    const result = validateContactSubmission({
      ...validSubmission,
      name: '  สมชาย ใจดี  ',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('สมชาย ใจดี')
      expect(result.data.phone).toBe('0812345678')
    }
  })

  it('rejects invalid phone numbers', () => {
    expect(
      validateContactSubmission({
        ...validSubmission,
        phone: 'call me',
      }).success,
    ).toBe(false)
  })

  it('requires consent and a useful message', () => {
    expect(
      validateContactSubmission({
        ...validSubmission,
        consent: false,
      }).success,
    ).toBe(false)

    expect(
      validateContactSubmission({
        ...validSubmission,
        message: 'สั้น',
      }).success,
    ).toBe(false)
  })
})

describe('isHoneypotSubmission', () => {
  it('detects a filled hidden website field', () => {
    expect(isHoneypotSubmission({ website: 'https://spam.example' })).toBe(true)
    expect(isHoneypotSubmission({ website: '' })).toBe(false)
  })
})
