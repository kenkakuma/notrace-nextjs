import { allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '企業文章 | NO TRACE EXPLORATION',
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
      <section className="py-24 md:py-32 ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* English Label with Lines */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-32 bg-primary/20"></div>
              <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Articles</span>
              <div className="h-px w-32 bg-primary/20"></div>
            </div>

            {/* Main Title */}
            <h1 className="font-noto-serif-jp text-2xl md:text-3xl lg:text-4xl font-medium text-text-dark mb-8 leading-relaxed drop-shadow-sm">
              企業文章
            </h1>

            {/* Divider */}
            <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>

            {/* Description */}
            <p className="text-sm md:text-base text-text-secondary/80 leading-loose max-w-2xl mx-auto">
              コーヒー事業、イノベーション、文化交流に関する記事をご覧いただけます
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button className="px-6 py-2 border border-primary/30 text-primary/80 font-light text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-300">
              すべて ({publishedArticles.length})
            </button>
            {categories.map((category) => {
              const count = publishedArticles.filter(
                (article) => article.category === category
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

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-24 md:py-32 ">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-12 text-center drop-shadow-sm">
              注目記事
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <ArticleCard key={article._id} article={article} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-12 text-center drop-shadow-sm">
            すべての記事
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {publishedArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary/80 text-sm">
                現在、公開されている記事はありません
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
