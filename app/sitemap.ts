import type { MetadataRoute } from 'next'

const baseUrl = 'https://www.ifateam.dev'

const staticPaths: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/toonify', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/shorten-link', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog/edge-to-edge-no-optional', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/introducing_snapbyte', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/what-is-edge-caching', changeFrequency: 'monthly', priority: 0.7 },
]

function absoluteUrl(path: string): string {
  if (path === '/') return baseUrl
  return `${baseUrl}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }))

  return staticEntries
}
