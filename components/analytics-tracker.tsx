'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const sessionStorageKey = 'site_analytics_session_id'
const heartbeatIntervalMs = 60_000

type AnalyticsEvent = 'pageview' | 'heartbeat'

function isTrackablePath(pathname: string) {
  return (
    pathname.startsWith('/') &&
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !/\.[a-z0-9]{2,8}$/i.test(pathname)
  )
}

function getSessionId() {
  try {
    const existing = window.localStorage.getItem(sessionStorageKey)
    if (existing) return existing

    const sessionId = window.crypto.randomUUID()
    window.localStorage.setItem(sessionStorageKey, sessionId)
    return sessionId
  } catch {
    return null
  }
}

function sendAnalyticsEvent(path: string, event: AnalyticsEvent) {
  const sessionId = getSessionId()
  if (!sessionId) return

  const payload = JSON.stringify({
    event,
    path,
    sessionId,
  })

  if (navigator.sendBeacon) {
    const body = new Blob([payload], { type: 'application/json' })
    if (navigator.sendBeacon('/api/analytics/track', body)) return
  }

  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt the public website.
  })
}

export function AnalyticsTracker() {
  const pathname = usePathname()
  const lastTrackedPath = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname || !isTrackablePath(pathname)) return
    if (lastTrackedPath.current === pathname) return

    lastTrackedPath.current = pathname
    sendAnalyticsEvent(pathname, 'pageview')
  }, [pathname])

  useEffect(() => {
    if (!pathname || !isTrackablePath(pathname)) return

    const sendHeartbeat = () => {
      if (document.visibilityState === 'visible') {
        sendAnalyticsEvent(pathname, 'heartbeat')
      }
    }

    const interval = window.setInterval(sendHeartbeat, heartbeatIntervalMs)
    document.addEventListener('visibilitychange', sendHeartbeat)

    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', sendHeartbeat)
    }
  }, [pathname])

  return null
}
