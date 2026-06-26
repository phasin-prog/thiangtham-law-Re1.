import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearAllRateLimits,
  consumeRateLimit,
} from './rate-limit'

describe('consumeRateLimit', () => {
  beforeEach(() => clearAllRateLimits())

  it('blocks requests after the configured limit', () => {
    expect(consumeRateLimit('contact:test', 2, 60_000, 1_000).allowed).toBe(true)
    expect(consumeRateLimit('contact:test', 2, 60_000, 1_001).allowed).toBe(true)
    expect(consumeRateLimit('contact:test', 2, 60_000, 1_002).allowed).toBe(false)
  })

  it('opens a new window after expiration', () => {
    consumeRateLimit('contact:test', 1, 1_000, 1_000)
    expect(consumeRateLimit('contact:test', 1, 1_000, 2_001).allowed).toBe(true)
  })
})
