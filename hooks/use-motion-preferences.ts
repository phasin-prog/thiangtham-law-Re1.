'use client'

import { useSyncExternalStore } from 'react'

function subscribeToQuery(query: string, callback: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function useMediaQuery(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (callback) => subscribeToQuery(query, callback),
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

export function useMotionPreferences() {
  const reducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
    true,
  )
  const finePointer = useMediaQuery('(pointer: fine)', false)
  const desktop = useMediaQuery('(min-width: 1024px)', false)

  return {
    reducedMotion,
    finePointer,
    desktop,
    allowEnhancedMotion: !reducedMotion && finePointer,
    allowSmoothScroll: !reducedMotion && finePointer && desktop,
  }
}
