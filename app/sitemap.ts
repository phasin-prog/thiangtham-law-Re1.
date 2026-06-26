import type { MetadataRoute } from 'next'
import { profileSlugs } from '@/features/profile'

const baseUrl = 'https://www.thiangthamlaw.com'

const thRoutes = [
  '/th',
  '/th/about',
  '/th/services',

  // Local SEO pages
  '/th/lawyer-det-udom',
  '/th/lawyer-ubon-ratchathani',

  '/th/lawyers',
  '/th/articles',
  '/th/process',
  '/th/case-studies',
  '/th/contact',
  '/th/consultation',
  '/th/privacy',
  '/th/terms',
  '/th/team',
  ...profileSlugs.map((slug) => `/th/team/${slug}`),
]

const enRoutes = [
  '/en',
  '/en/about',
  '/en/services',
  '/en/lawyers',
  '/en/articles',
  '/en/process',
  '/en/case-studies',
  '/en/contact',
  '/en/consultation',
  '/en/privacy',
  '/en/terms',
  '/en/team',
  ...profileSlugs.map((slug) => `/en/team/${slug}`),
]

function toLanguagePath(route: string, locale: 'th' | 'en') {
  return route.replace(/^\/(th|en)/, `/${locale}`)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes = [...thRoutes, ...enRoutes].map((route) => {
    const isHome = route === '/th' || route === '/en'

    return {
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: isHome ? 1.0 : 0.8,
      alternates: {
        languages: {
          th: `${baseUrl}${toLanguagePath(route, 'th')}`,
          en: `${baseUrl}${toLanguagePath(route, 'en')}`,
          'x-default': `${baseUrl}${toLanguagePath(route, 'th')}`,
        },
      },
    }
  })

  return routes
}