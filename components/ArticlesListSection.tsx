import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { allNews, allArticles } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import { ja } from 'date-fns/locale'

export function ArticlesListSection() {
  // 合并并排序所有内容
  const allItems = [
    ...allArticles
      .filter((article) => article.published)
      .map(item => ({
        ...item,
        type: 'article' as const,
        href: item.url,
        isExternal: false
      })),
    ...allNews
      .filter((news) => news.published)
      .map(item => ({
        ...item,
        type: 'news' as const,
        href: item.externalLink || item.url,
        isExternal: !!item.externalLink
      }))
  ].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  .slice(0, 7) // 只显示最新的7条

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">News & Articles</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
            最新情報
          </h2>

          <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>

          <p className="text-xs md:text-sm text-text-secondary/80 max-w-md mx-auto leading-loose">
            企業活動とサービスの最新情報
          </p>
        </div>

        {/* Articles Timeline - Japanese Style */}
        <div className="max-w-4xl mx-auto space-y-0 mb-16">
          {allItems.map((item) => {
            const LinkComponent = item.isExternal ? 'a' : Link
            const linkProps = item.isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {}
            const href = item.href || '#'

            return (
              <LinkComponent
                key={item._id}
                href={href}
                {...linkProps}
                className="group block"
              >
              <div className="grid grid-cols-[140px_1fr] gap-8 py-8 border-b border-gray-200/50 last:border-b-0 transition-all duration-500 hover:bg-primary/5">
                {/* Date Column - Timeline Style */}
                <div className="text-right pr-8 border-r border-gray-200/50">
                  <div className="font-noto-serif-jp text-xl font-light text-primary/80 mb-1">
                    {format(new Date(item.date), 'yyyy', { locale: ja })}
                  </div>
                  <div className="font-noto-serif-jp text-base text-text-secondary/60">
                    {format(new Date(item.date), 'MM.dd', { locale: ja })}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-grow min-w-0">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary/80 text-xs font-light tracking-wide">
                        {item.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-noto-serif-jp text-base md:text-lg font-medium text-text-dark mb-3 group-hover:text-primary transition-colors drop-shadow-sm">
                      {item.title}
                      {item.isExternal && <ExternalLink className="inline w-4 h-4 ml-2" />}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-text-secondary/80 leading-loose mb-3 line-clamp-2">
                      {item.excerpt || item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-text-secondary/60 font-light"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 text-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-0 group-hover:translate-x-2">
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </LinkComponent>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-10 py-3 border border-primary/30 text-primary/80 font-light text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-300"
          >
            すべての記事を見る <span className="text-xs">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
