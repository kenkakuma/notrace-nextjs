'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Article {
  id: number
  date: string
  title: string
  category: string
  excerpt: string
}

const ARTICLES: Article[] = [
  {
    id: 1,
    date: '2025.01.15',
    title: '無迹探索株式会社設立準備開始のお知らせ',
    category: '企業ニュース',
    excerpt:
      '革新的なソリューションで新たなビジネス価値を創造する企業として、無迹探索株式会社の設立準備を開始いたします。',
  },
  {
    id: 2,
    date: '2025.01.10',
    title: '東京ルアー・フライフィッシング学院 2025年春季コース募集開始',
    category: 'サービス',
    excerpt:
      'プロフェッショナルな技術指導と最新器具を用いた実践的なフィッシング技術習得プログラムの受講生を募集いたします。',
  },
  {
    id: 3,
    date: '2025.01.08',
    title: '厳選コーヒー商品ラインナップ拡充について',
    category: 'コーヒー事業',
    excerpt:
      '世界各地から厳選した高品質コーヒー豆を使用した新商品を順次発表。サステナブルな調達と独自の焙煎技術で最高の品質を実現。',
  },
  {
    id: 4,
    date: '2025.01.05',
    title: '中国アーティスト展示スペース 中目黒オープン準備中',
    category: '展示・イベント',
    excerpt:
      '中国現代アートの発信地となる新しい展示スペースが中目黒にオープン予定。革新的なアート企画と文化交流の拠点として機能いたします。',
  },
  {
    id: 5,
    date: '2025.01.03',
    title: '2025年限定釣具予約受付開始 - Shimano・Daiwa最新モデル',
    category: '釣具・器具',
    excerpt:
      '業界トップブランドのShimanoとDaiwaの限定最新モデル釣具が2025年用に登場。予約受付を開始いたしました。',
  },
]

export function FeaturedArticlesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side - Title */}
          <div className="lg:col-span-3">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark">
              企業情報
            </h2>
          </div>

          {/* Right Side - News List */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              {ARTICLES.slice(0, 5).map((article, index) => (
                <Link key={article.id} href={`/article/${article.id}`}>
                  <div className="group pb-6 border-b border-gray-200 last:border-b-0 hover:pb-6 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <h3 className="text-xl font-semibold text-text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Meta Information */}
                        <div className="flex items-center gap-4 text-sm">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                            {article.category}
                          </span>
                          <span className="text-text-secondary">
                            {article.date}
                          </span>
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <div className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 mt-10 px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              すべての記事を見る
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
