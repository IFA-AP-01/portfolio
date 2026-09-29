import type { MetadataRoute } from 'next'

const baseUrl = 'https://www.ifateam.dev'

function absoluteUrl(path: string): string {
  if (path === '/') return baseUrl
  return `${baseUrl}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  return [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
