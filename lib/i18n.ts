'use client'

import { usePathname, useRouter } from 'next/navigation'

export type Locale = 'th' | 'en'

export const locales: Locale[] = ['th', 'en']
export const defaultLocale: Locale = 'th'

export function useCurrentLocale(): Locale {
  const pathname = usePathname()
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en'
  }
  return 'th'
}

export function useTranslation() {
  const locale = useCurrentLocale()
  const router = useRouter()
  const pathname = usePathname()

  const t = (th: string, en: string) => (locale === 'en' ? en : th)

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return

    let newPath = pathname
    if (newLocale === 'en') {
      newPath = `/en${pathname === '/' ? '' : pathname}`
    } else {
      newPath = pathname.replace(/^\/en/, '') || '/'
    }
    router.push(newPath)
  }

  return { locale, t, switchLocale }
}

export function getLocalePath(path: string, locale: Locale) {
  if (locale === 'en') {
    return `/en${path === '/' ? '' : path}`
  }
  return path
}
