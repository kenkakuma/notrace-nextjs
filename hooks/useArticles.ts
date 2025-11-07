'use client'

/**
 * Hook用于获取和过滤文章
 * 注意：文章数据从Contentlayer生成，需要在构建后才能使用
 */
export function useArticles() {
  /**
   * 获取所有文章并按日期排序
   */
  const getAllArticles = () => {
    // 动态导入以支持Contentlayer生成的类型
    let allArticles: any[] = []
    try {
      // @ts-ignore
      const { allArticles: articles } = require('contentlayer/generated')
      if (articles) {
        allArticles = articles
      }
    } catch (e) {
      console.warn('Contentlayer articles not yet generated')
      return []
    }

    return allArticles.sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA // 最新的在前
    })
  }

  /**
   * 获取特色文章
   */
  const getFeaturedArticles = () => {
    return getAllArticles()
      .filter((article) => article.featured)
      .slice(0, 6)
  }

  /**
   * 按分类获取文章
   */
  const getArticlesByCategory = (category: string) => {
    return getAllArticles().filter((article) => article.category === category)
  }

  /**
   * 按标签获取文章
   */
  const getArticlesByTag = (tag: string) => {
    return getAllArticles().filter((article) => {
      if (Array.isArray(article.tags)) {
        return article.tags.includes(tag)
      }
      return false
    })
  }

  /**
   * 获取相关文章
   */
  const getRelatedArticles = (slug: string, limit: number = 3) => {
    const articles = getAllArticles()
    const article = articles.find((a) => a.slug === slug)
    if (!article) return []

    return articles
      .filter((a) => {
        if (a.slug === slug) return false
        if (!Array.isArray(article.tags) || !Array.isArray(a.tags)) return false
        return a.tags.some((tag: any) => article.tags?.includes(tag))
      })
      .slice(0, limit)
  }

  /**
   * 根据slug获取单篇文章
   */
  const getArticleBySlug = (slug: string) => {
    return getAllArticles().find((article) => article.slug === slug)
  }

  /**
   * 搜索文章
   */
  const searchArticles = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return getAllArticles().filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(lowerQuery)
      const descMatch = article.description.toLowerCase().includes(lowerQuery)
      const tagsMatch = Array.isArray(article.tags) && article.tags.some((tag: any) =>
        tag.toLowerCase().includes(lowerQuery)
      )
      return titleMatch || descMatch || tagsMatch
    })
  }

  return {
    getAllArticles,
    getFeaturedArticles,
    getArticlesByCategory,
    getArticlesByTag,
    getRelatedArticles,
    getArticleBySlug,
    searchArticles,
  }
}
