import { randomUUID } from 'node:crypto'
import {
  adminJson,
  requireAdminRequest,
} from '@/lib/admin-auth'
import { readJsonBody, withTimeout } from '@/lib/security/request'
import { getSupabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const maxImageBytes = 5 * 1024 * 1024
const maxBase64Length = Math.ceil(maxImageBytes / 3) * 4 + 4
const maxRequestBytes = maxBase64Length + 10_000
const upstreamTimeoutMs = 10_000

const imageExtensions = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
} as const

type ImageMimeType = keyof typeof imageExtensions

function hasValidImageSignature(buffer: Buffer, contentType: ImageMimeType) {
  if (contentType === 'image/png') {
    return buffer.subarray(0, 8).equals(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    )
  }
  if (contentType === 'image/jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  }
  if (contentType === 'image/gif') {
    const signature = buffer.subarray(0, 6).toString('ascii')
    return signature === 'GIF87a' || signature === 'GIF89a'
  }

  return (
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  )
}

export async function POST(request: Request) {
  const denied = requireAdminRequest(request, { sameOrigin: true })
  if (denied) return denied

  const bodyResult = await readJsonBody(request, maxRequestBytes)
  if (!bodyResult.ok) {
    return adminJson({ error: bodyResult.code }, { status: bodyResult.status })
  }

  if (
    !bodyResult.value ||
    typeof bodyResult.value !== 'object' ||
    Array.isArray(bodyResult.value)
  ) {
    return adminJson({ error: 'Invalid payload' }, { status: 400 })
  }

  const { filename, content } = bodyResult.value as {
    filename?: unknown
    content?: unknown
  }
  if (typeof filename !== 'string' || typeof content !== 'string') {
    return adminJson({ error: 'Missing filename or content' }, { status: 400 })
  }

  const dataUrlMatch = content.match(
    /^data:(image\/(?:png|jpeg|webp|gif));base64,([A-Za-z0-9+/=]+)$/,
  )
  if (!dataUrlMatch) {
    return adminJson({ error: 'Unsupported image format' }, { status: 400 })
  }

  const [, rawContentType, base64] = dataUrlMatch
  const contentType = rawContentType as ImageMimeType
  if (base64.length > maxBase64Length) {
    return adminJson({ error: 'Image exceeds 5 MB' }, { status: 413 })
  }

  const buffer = Buffer.from(base64, 'base64')
  if (
    buffer.byteLength === 0 ||
    buffer.byteLength > maxImageBytes ||
    !hasValidImageSignature(buffer, contentType)
  ) {
    return adminJson({ error: 'Invalid image content' }, { status: 400 })
  }

  const baseName =
    filename
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 60) || 'image'
  const objectName = `${Date.now()}-${randomUUID()}-${baseName}.${imageExtensions[contentType]}`

  try {
    const supabase = getSupabaseAdmin()
    const { error } = await withTimeout(
      supabase.storage
        .from('uploads')
        .upload(objectName, buffer, {
          contentType,
          upsert: false,
        }),
      upstreamTimeoutMs,
    )

    if (error) throw error

    const {
      data: { publicUrl },
    } = supabase.storage.from('uploads').getPublicUrl(objectName)

    return adminJson({ ok: true, url: publicUrl })
  } catch (error) {
    console.error(
      'Admin upload failed',
      error instanceof Error ? error.message : error,
    )
    return adminJson({ error: 'Unable to upload image' }, { status: 503 })
  }
}
