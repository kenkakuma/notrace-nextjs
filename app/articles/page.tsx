import { allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '企業文章 | NO TRACE EXPLORER',
  description: '無迹探索のコーヒー事業、展示イベント、研究開発に関する企業文章をご覧いただけます。',
}

export default function ArticlesPage() {
  // 公開済み記事のみを取得し、日付順にソート
  const publishedArticles = allArticles
    .filter((article) => article.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  // 注目記事
  const featuredArticles = publishedArticles.filter((article) => article.featured)

  // カテゴリー別記事数
  const categories = Array.from(
    new Set(publishedArticles.map((article) => article.category))
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section variant="gradient" padding="large">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              企業文章
            </h1>
            <p className="text-lg md:text-xl text-text-secondary">
              コーヒー事業、イノベーション、文化交流に関する記事をご覧いただけます
            </p>
          </div>
        </Container>
      </Section>

      {/* Categories Filter */}
      <Section>
        <Container>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button className="px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              すべて ({publishedArticles.length})
            </button>
            {categories.map((category) => {
              const count = publishedArticles.filter(
                (article) => article.category === category
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

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <Section variant="light">
          <Container>
            <h2 className="text-3xl font-bold text-text-dark mb-8">
              注目記事
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <ArticleCard key={article._id} article={article} featured />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* All Articles */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold text-text-dark mb-8">
            すべての記事
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {publishedArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">
                現在、公開されている記事はありません
              </p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}
