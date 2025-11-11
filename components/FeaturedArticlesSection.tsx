'use client'

import { allArticles, allNews } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

export function FeaturedArticlesSection() {
  // 获取最新的文章和新闻（合并显示）
  const latestArticles = allArticles
    .filter((article) => article.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3)
    .map(item => ({
      ...item,
      type: 'article' as const,
      href: item.url
    }))

  const latestNews = allNews
    .filter((news) => news.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 2)
    .map(item => ({
      ...item,
      type: 'news' as const,
      href: item.externalLink || item.url,
      isExternal: !!item.externalLink
    }))

  // 合并并按日期排序，取最新5条
  const allItems = [...latestArticles, ...latestNews]
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 5)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side - Title */}
          <div className="lg:col-span-3">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark">
              企業情報
            </h2>
          </div>

          {/* Right Side - Content List */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              {allItems.map((item) => {
                const LinkComponent = item.type === 'news' && item.isExternal ? 'a' : Link
                const linkProps = item.type === 'news' && item.isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {}

                return (
                  <LinkComponent key={item._id} href={item.href} {...linkProps}>
                    <div className="group pb-6 border-b border-gray-200 last:border-b-0 hover:pb-6 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        {/* Content */}
                        <div className="flex-grow min-w-0">
                          <h3 className="text-xl font-semibold text-text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                            {item.type === 'news' && item.isExternal && (
                              <ExternalLink className="inline w-4 h-4 ml-2" />
                            )}
                          </h3>

                          {/* Meta Information */}
                          <div className="flex items-center gap-4 text-sm">
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                              {item.category}
                            </span>
                            <span className="text-text-secondary">
                              {format(new Date(item.date), 'yyyy.MM.dd', { locale: ja })}
                            </span>
                          </div>
                        </div>

                        {/* Arrow Icon */}
                        <div className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </LinkComponent>
                )
              })}
            </div>

            {/* Empty State */}
            {allItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary">
                  現在、公開されている記事はありません
                </p>
              </div>
            )}

            {/* View All Links */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
              >
                企業文章を見る
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-300 text-text-dark rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                ニュースを見る
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
