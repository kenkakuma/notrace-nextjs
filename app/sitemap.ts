import { MetadataRoute } from 'next'
import { allArticles, allNews } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://no-trace.jp'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/coffee',
    '/exhibition',
    '/shop',
    '/club',
    '/contact',
    '/news',
    '/articles',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // News pages
  const newsPages = allNews
    .filter((news) => news.published)
    .map((news) => ({
      url: `${baseUrl}${news.url}`,
      lastModified: new Date(news.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Article pages
  const articlePages = allArticles
    .filter((article) => article.published)
    .map((article) => ({
      url: `${baseUrl}${article.url}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticPages, ...newsPages, ...articlePages]
}
