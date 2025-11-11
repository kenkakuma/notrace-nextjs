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
      <Section variant="gradient" padding="large">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              ニュース
            </h1>
            <p className="text-lg md:text-xl text-text-secondary">
              無迹探索の最新情報、プレスリリース、イベント情報をお届けします
            </p>
          </div>
        </Container>
      </Section>

      {/* Categories Filter */}
      <Section>
        <Container>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button className="px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              すべて ({publishedNews.length})
            </button>
            {categories.map((category) => {
              const count = publishedNews.filter(
                (news) => news.category === category
              ).length
              return (
                <button
                  key={category}
                  className="px-6 py-2 rounded-full bg-gray-100 text-text-dark font-medium hover:bg-gray-200 transition-colors"
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <Section variant="light">
          <Container>
            <h2 className="text-3xl font-bold text-text-dark mb-8">
              注目のニュース
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredNews.map((news) => (
                <NewsCard key={news._id} news={news} featured />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* All News */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold text-text-dark mb-8">
            すべてのニュース
          </h2>
          <div className="space-y-6">
            {publishedNews.map((news) => (
              <NewsCard key={news._id} news={news} layout="horizontal" />
            ))}
          </div>

          {publishedNews.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">
                現在、公開されているニュースはありません
              </p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}
