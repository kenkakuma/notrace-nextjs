import { allNews } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { NewsCard } from '@/components/news/NewsCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ニュース | NO TRACE EXPLORER',
  description: '無迹探索の最新ニュース、プレスリリース、イベント情報をご覧いただけます。',
}

export default function NewsPage() {
  // 公開済みニュースのみを取得し、日付順にソート
  const publishedNews = allNews
    .filter((news) => news.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  // 注目ニュース
  const featuredNews = publishedNews.filter((news) => news.featured)

  // カテゴリー別ニュース数
  const categories = Array.from(
    new Set(publishedNews.map((news) => news.category))
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-bg-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* English Label with Lines */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-32 bg-primary/20"></div>
              <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">News</span>
              <div className="h-px w-32 bg-primary/20"></div>
            </div>

            {/* Main Title */}
            <h1 className="font-noto-serif-jp text-2xl md:text-3xl lg:text-4xl font-medium text-text-dark mb-8 leading-relaxed drop-shadow-sm">
              ニュース
            </h1>

            {/* Divider */}
            <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>

            {/* Description */}
            <p className="text-sm md:text-base text-text-secondary/80 leading-loose max-w-2xl mx-auto">
              無迹探索の最新情報、プレスリリース、イベント情報をお届けします
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button className="px-6 py-2 border border-primary/30 text-primary/80 font-light text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-300">
              すべて ({publishedNews.length})
            </button>
            {categories.map((category) => {
              const count = publishedNews.filter(
                (news) => news.category === category
              ).length
              return (
                <button
                  key={category}
                  className="px-6 py-2 border border-gray-200/50 text-text-secondary/80 font-light text-sm tracking-wide hover:border-primary/30 hover:text-primary transition-all duration-300"
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-24 md:py-32 bg-bg-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-12 text-center drop-shadow-sm">
              注目のニュース
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredNews.map((news) => (
                <NewsCard key={news._id} news={news} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All News */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-12 text-center drop-shadow-sm">
            すべてのニュース
          </h2>
          <div className="space-y-6">
            {publishedNews.map((news) => (
              <NewsCard key={news._id} news={news} layout="horizontal" />
            ))}
          </div>

          {publishedNews.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary/80 text-sm">
                現在、公開されているニュースはありません
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
