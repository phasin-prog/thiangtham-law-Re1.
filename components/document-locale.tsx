'use client'

import { useEffect } from 'react'
import { useCurrentLocale } from '@/lib/i18n'

export function DocumentLocale() {
  const locale = useCurrentLocale()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
