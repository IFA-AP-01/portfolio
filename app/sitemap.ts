import type { MetadataRoute } from 'next'

const baseUrl = 'https://www.ifateam.dev'

function absoluteUrl(path: string): string {
  if (path === '/') return baseUrl
  return `${baseUrl}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const legalPages = [
    '/privacy',
    '/privacy/scanner',
    '/privacy/scanner-ios',
    '/terms',
    '/terms/scanner-ios',
  ]

  return [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...legalPages.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
