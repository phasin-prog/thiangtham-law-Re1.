import { MetadataRoute } from 'next'
import { profileSlugs } from '@/features/profile'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.thiangthamlaw.com'

  const thRoutes = [
    '/th',
    '/th/about',
    '/th/services',
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

  const routes = [...thRoutes, ...enRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/th' || route === '/en' ? 1.0 : 0.8,
  }))

  return routes
}
