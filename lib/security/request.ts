export type JsonBodyResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413 | 415; code: string }

function firstHeaderValue(value: string | null) {
  return value?.split(',')[0]?.trim() || ''
}

export function getClientIdentifier(request: Request) {
  const ip =
    firstHeaderValue(request.headers.get('x-vercel-forwarded-for')) ||
    firstHeaderValue(request.headers.get('x-forwarded-for')) ||
    firstHeaderValue(request.headers.get('x-real-ip'))
  const userAgent = request.headers.get('user-agent')?.slice(0, 120) || 'unknown'

  return ip || `unknown:${userAgent}`
}

export function isSameOriginRequest(request: Request) {
  if (request.headers.get('sec-fetch-site') === 'cross-site') {
    return false
  }

  const origin = request.headers.get('origin')
  if (!origin) {
    return true
  }

  try {
    const requestUrl = new URL(request.url)
    const originUrl = new URL(origin)
    const expectedHost =
      firstHeaderValue(request.headers.get('x-forwarded-host')) ||
      request.headers.get('host') ||
      requestUrl.host
    const expectedProtocol =
      firstHeaderValue(request.headers.get('x-forwarded-proto')) ||
      requestUrl.protocol.replace(':', '')

    return (
      originUrl.host === expectedHost &&
      originUrl.protocol === `${expectedProtocol}:`
    )
  } catch {
    return false
  }
}

export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<JsonBodyResult> {
  const contentType = request.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase()
  if (
    contentType !== 'application/json' &&
    !contentType?.endsWith('+json')
  ) {
    return { ok: false, status: 415, code: 'UNSUPPORTED_MEDIA_TYPE' }
  }

  const contentLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return { ok: false, status: 413, code: 'PAYLOAD_TOO_LARGE' }
  }

  if (!request.body) {
    return { ok: false, status: 400, code: 'INVALID_JSON' }
  }

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      totalBytes += value.byteLength
      if (totalBytes > maxBytes) {
        await reader.cancel()
        return { ok: false, status: 413, code: 'PAYLOAD_TOO_LARGE' }
      }

      chunks.push(value)
    }

    const bytes = new Uint8Array(totalBytes)
    let offset = 0
    for (const chunk of chunks) {
      bytes.set(chunk, offset)
      offset += chunk.byteLength
    }

    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, status: 400, code: 'INVALID_JSON' }
  } finally {
    reader.releaseLock()
  }
}

export async function withTimeout<T>(
  operation: PromiseLike<T>,
  timeoutMs: number,
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined

  try {
    return await Promise.race([
      Promise.resolve(operation),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => {
          reject(new Error('REQUEST_TIMEOUT'))
        }, timeoutMs)
      }),
    ])
  } finally {
    if (timeout) clearTimeout(timeout)
  }
}
