export type Locale = 'th' | 'en'

export const locales: Locale[] = ['th', 'en']
export const defaultLocale: Locale = 'th'
export const localeStorageKey = 'thiangtham.locale'
export const localeCookieName = 'thiangtham-locale'

export function isLocale(value: unknown): value is Locale {
  return value === 'th' || value === 'en'
}

export function getRouteLocale(pathname: string): Locale {
  if (pathname.startsWith('/en')) return 'en'
  return 'th'
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/'
  if (pathname === '/en') return '/'
  if (pathname.startsWith('/th/')) return pathname.slice(3) || '/'
  if (pathname === '/th') return '/'
  return pathname
}

export function getLocalePath(path: string, locale: Locale): string {
  if (!path || path.startsWith('#') || path.startsWith('//') || !path.startsWith('/')) {
    return path
  }

  const [, pathname = '/', suffix = ''] = path.match(/^([^?#]*)(.*)$/) ?? []
  const normalizedPath = stripLocalePrefix(pathname || '/')
  return `/${locale}${normalizedPath === '/' ? '' : normalizedPath}${suffix}`
}

export const buildLocalePath = getLocalePath
export const withLocale = getLocalePath
