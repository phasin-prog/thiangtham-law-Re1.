import { describe, expect, it } from 'vitest'
import {
  getClientIdentifier,
  isSameOriginRequest,
  readJsonBody,
} from './request'

describe('isSameOriginRequest', () => {
  it('accepts a matching browser origin', () => {
    const request = new Request('https://thiangtham-law.com/api/contact', {
      headers: {
        host: 'thiangtham-law.com',
        origin: 'https://thiangtham-law.com',
        'sec-fetch-site': 'same-origin',
      },
    })

    expect(isSameOriginRequest(request)).toBe(true)
  })

  it('rejects cross-site browser requests', () => {
    const request = new Request('https://thiangtham-law.com/api/contact', {
      headers: {
        host: 'thiangtham-law.com',
        origin: 'https://attacker.example',
        'sec-fetch-site': 'cross-site',
      },
    })

    expect(isSameOriginRequest(request)).toBe(false)
  })
})

describe('readJsonBody', () => {
  it('parses bounded JSON', async () => {
    const request = new Request('https://thiangtham-law.com/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    })

    await expect(readJsonBody(request, 100)).resolves.toEqual({
      ok: true,
      value: { ok: true },
    })
  })

  it('rejects oversized bodies even without content-length', async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"message":"0123456789"}'))
        controller.close()
      },
    })
    const request = new Request('https://thiangtham-law.com/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: stream,
      duplex: 'half',
    } as RequestInit & { duplex: 'half' })

    await expect(readJsonBody(request, 10)).resolves.toMatchObject({
      ok: false,
      status: 413,
    })
  })
})

describe('getClientIdentifier', () => {
  it('prefers the Vercel-provided client address', () => {
    const request = new Request('https://thiangtham-law.com', {
      headers: {
        'x-vercel-forwarded-for': '203.0.113.10',
        'x-forwarded-for': '198.51.100.7',
        'user-agent': 'security-test',
      },
    })

    expect(getClientIdentifier(request)).toBe('203.0.113.10')
  })
})
