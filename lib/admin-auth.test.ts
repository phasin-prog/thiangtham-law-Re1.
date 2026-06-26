import { afterEach, describe, expect, it } from 'vitest'
import { isAdminAuthorized } from './admin-auth'

const originalUser = process.env.ADMIN_USER
const originalPassword = process.env.ADMIN_PASS

afterEach(() => {
  process.env.ADMIN_USER = originalUser
  process.env.ADMIN_PASS = originalPassword
})

describe('isAdminAuthorized', () => {
  it('accepts the configured Basic Auth credentials', () => {
    process.env.ADMIN_USER = 'security-admin'
    process.env.ADMIN_PASS = 'a-long-test-password'
    const credentials = Buffer.from(
      'security-admin:a-long-test-password',
    ).toString('base64')
    const request = new Request('https://thiangtham-law.com/admin', {
      headers: { authorization: `Basic ${credentials}` },
    })

    expect(isAdminAuthorized(request)).toBe(true)
  })

  it('rejects incorrect or missing credentials', () => {
    process.env.ADMIN_USER = 'security-admin'
    process.env.ADMIN_PASS = 'a-long-test-password'
    const credentials = Buffer.from('security-admin:wrong').toString('base64')

    expect(
      isAdminAuthorized(
        new Request('https://thiangtham-law.com/admin', {
          headers: { authorization: `Basic ${credentials}` },
        }),
      ),
    ).toBe(false)
    expect(
      isAdminAuthorized(new Request('https://thiangtham-law.com/admin')),
    ).toBe(false)
  })
})
