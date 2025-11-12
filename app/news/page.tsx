import { allNews, allArticles } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '企業情報 | NO TRACE EXPLORATION',
  description: '無迹探索の最新ニュース、記事、プレスリリース、イベント情報をご覧いただけます。',
}

export default function NewsPage() {
  // 合并 articles 和 news,按日期排序
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* English Label with Lines */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-32 bg-primary/20"></div>
              <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">News & Articles</span>
              <div className="h-px w-32 bg-primary/20"></div>
            </div>

            {/* Main Title */}
            <h1 className="font-noto-serif-jp text-2xl md:text-3xl font-medium text-text-dark mb-6 leading-relaxed drop-shadow-sm">
              企業情報
            </h1>

            {/* Divider */}
            <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>

            {/* Description */}
            <p className="text-sm md:text-base text-text-secondary/80 leading-loose max-w-2xl mx-auto">
              最新のニュースと記事をご覧ください
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-1">
            {allItems.map((item) => {
              const LinkComponent = item.isExternal ? 'a' : Link
              const linkProps = item.isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {}
              const href = item.href || '#'

              return (
                <LinkComponent key={item._id} href={href} {...linkProps}>
                  <div className="group py-6 border-b border-gray-200/30 hover:bg-primary/5 transition-all duration-300 px-6">
                    <div className="flex items-start justify-between gap-6">
                      {/* Left: Date and Category */}
                      <div className="flex-shrink-0 w-32">
                        <div className="text-sm text-primary/70 font-light mb-2">
                          {format(new Date(item.date), 'yyyy.MM.dd', { locale: ja })}
                        </div>
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary/80 text-xs font-light">
                          {item.category}
                        </div>
                      </div>

                      {/* Right: Title and External Icon */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-noto-serif-jp text-base md:text-lg font-medium text-text-dark group-hover:text-primary transition-colors leading-relaxed">
                          {item.title}
                          {item.isExternal && (
                            <ExternalLink className="inline-block w-4 h-4 ml-2 text-primary/60" strokeWidth={1.5} />
                          )}
                        </h3>
                        {item.description && (
                          <p className="mt-2 text-xs md:text-sm text-text-secondary/70 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </LinkComponent>
              )
            })}
          </div>

          {allItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary/80 text-sm">
                現在、公開されている情報はありません
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
