'use client'

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  buildLocalePath,
  defaultLocale,
  getLocalePath,
  getRouteLocale,
  isLocale,
  localeCookieName,
  localeStorageKey,
  locales,
  withLocale,
  type Locale,
} from '@/lib/i18n-config'

export {
  defaultLocale,
  buildLocalePath,
  getLocalePath,
  isLocale,
  localeCookieName,
  localeStorageKey,
  locales,
  withLocale,
  type Locale,
}

type LanguagePhase = 'idle' | 'out' | 'in'

type LanguageContextValue = {
  locale: Locale
  targetLocale: Locale
  phase: LanguagePhase
  successLocale: Locale | null
  switchLocale: (newLocale: Locale) => void
  t: (th: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLocale() {
  try {
    const storedLocale = window.localStorage.getItem(localeStorageKey)
    return isLocale(storedLocale) ? storedLocale : null
  } catch {
    return null
  }
}

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(localeStorageKey, locale)
  } catch {
    // Storage can be unavailable in privacy-restricted contexts.
  }

  document.cookie = `${localeCookieName}=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const pathname = usePathname()
  const router = useRouter()
  const routeLocale = getRouteLocale(pathname)
  const fallbackLocale = initialLocale ?? routeLocale ?? defaultLocale
  const [locale, setLocale] = useState<Locale>(fallbackLocale)
  const [targetLocale, setTargetLocale] = useState<Locale>(fallbackLocale)
  const [phase, setPhase] = useState<LanguagePhase>('idle')
  const [successLocale, setSuccessLocale] = useState<Locale | null>(null)
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([])

  useEffect(() => {
    const storedLocale = readStoredLocale()
    if (!storedLocale || storedLocale === locale) return

    startTransition(() => {
      setLocale(storedLocale)
      setTargetLocale(storedLocale)
    })
  }, [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dataset.locale = locale
    document.documentElement.dataset.languagePhase = phase
  }, [locale, phase])

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  function queueTimer(callback: () => void, delay: number) {
    const timer = setTimeout(callback, delay)
    timersRef.current.push(timer)
  }

  function clearTimers() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  function switchLocale(newLocale: Locale) {
    if (newLocale === targetLocale) return

    clearTimers()
    setTargetLocale(newLocale)
    setSuccessLocale(null)
    setPhase('out')

    queueTimer(() => {
      startTransition(() => {
        setLocale(newLocale)
      })
      persistLocale(newLocale)
      setPhase('in')
      setSuccessLocale(newLocale)

      const targetPath = getLocalePath(pathname, newLocale)
      if (targetPath !== pathname) {
        router.push(targetPath)
      }
    }, 110)

    queueTimer(() => {
      setPhase('idle')
    }, 220)

    queueTimer(() => {
      setSuccessLocale(null)
    }, 710)
  }

  function t(th: string, en: string) {
    return locale === 'en' ? en : th
  }

  return (
    <LanguageContext.Provider
      value={{
        locale,
        targetLocale,
        phase,
        successLocale,
        switchLocale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useCurrentLocale(): Locale {
  const context = useContext(LanguageContext)
  if (!context) return defaultLocale
  return context.locale
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      locale: defaultLocale,
      targetLocale: defaultLocale,
      phase: 'idle' as const,
      successLocale: null,
      switchLocale: () => undefined,
      t: (th: string) => th,
    }
  }

  return context
}
