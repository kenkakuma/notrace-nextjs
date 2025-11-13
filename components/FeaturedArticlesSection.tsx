'use client'

import { allArticles, allNews } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

export function FeaturedArticlesSection() {
  // 获取最新的文章和新闻（合并显示）
  const latestArticles = allArticles
    .filter((article) => article.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .map(item => ({
      ...item,
      type: 'article' as const,
      href: item.url,
      isExternal: false
    }))

  const latestNews = allNews
    .filter((news) => news.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .map(item => ({
      ...item,
      type: 'news' as const,
      href: item.externalLink || item.url,
      isExternal: !!item.externalLink
    }))

  // 合并并按日期排序，取最新7条
  const allItems = [...latestArticles, ...latestNews]
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 7)

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={800} delay={0}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-32 bg-primary/20"></div>
              <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">News & Articles</span>
              <div className="h-px w-32 bg-primary/20"></div>
            </div>
            <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
              企業情報
            </h2>
            <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>
            <p className="text-xs md:text-sm text-text-secondary/80 max-w-md mx-auto leading-loose">
              最新のニュースと記事をご覧ください
            </p>
          </div>
        </ScrollReveal>

        {/* Vertical Scroll Layout - Japanese Book Style */}
        <div className="max-w-6xl mx-auto mb-12 overflow-x-auto">
          <div className="flex flex-row-reverse justify-center gap-8 pb-4 px-4">
            {allItems.map((item, index) => {
              const LinkComponent = item.type === 'news' && item.isExternal ? 'a' : Link
              const linkProps = item.type === 'news' && item.isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {}

              return (
                <ScrollReveal
                  key={item._id}
                  direction="right"
                  delay={index * 100}
                  duration={800}
                >
                  <LinkComponent href={item.href} {...linkProps}>
                    <div className="group flex flex-col items-center py-6 px-4 border-r border-gray-200/50 last:border-r-0 transition-all duration-500 cursor-pointer hover:bg-primary/5">
                      {/* Date at Top */}
                      <div className="flex flex-col items-center gap-2 mb-6 [writing-mode:vertical-rl] bg-orange-50/80 px-3 py-4 rounded-sm">
                        {/* Year - First Line */}
                        <div className="font-noto-serif-jp text-base font-light text-primary/80">
                          {format(new Date(item.date), 'yyyy', { locale: ja })}
                        </div>
                        {/* Month.Day - Second Line */}
                        <div className="font-noto-serif-jp text-base font-light text-primary/80">
                          {format(new Date(item.date), 'MM.dd', { locale: ja })}
                        </div>
                      </div>

                      {/* Title - Vertical Text Below */}
                      <div className="[writing-mode:vertical-rl] text-right">
                        <h3 className="font-noto-serif-jp text-base font-medium text-text-dark group-hover:text-primary transition-colors drop-shadow-sm">
                          {item.title}
                        </h3>
                      </div>

                      {/* Arrow Icon */}
                      <div className="mt-6 text-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-90">
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                    </div>
                  </LinkComponent>
                </ScrollReveal>
              )
            })}
          </div>
        </div>

        {/* Empty State */}
        {allItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xs text-text-secondary/70">
              現在、公開されている記事はありません
            </p>
          </div>
        )}

        {/* View All Link */}
        <div className="flex justify-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-10 py-3 border border-primary/30 text-primary/80 font-light text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-300"
          >
            すべて見る <span className="text-xs">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
