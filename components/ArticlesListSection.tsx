'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

interface Article {
  id: number
  date: string
  title: string
  category: string
  excerpt: string
  readTime: string
  content: string
  tags: string[]
}

const ARTICLES: Article[] = [
  {
    id: 1,
    date: '2025.01.15',
    title: '無迹探索株式会社設立準備開始のお知らせ',
    category: '企業ニュース',
    excerpt:
      '新しい価値創造を目指して、無迹探索株式会社の設立準備を開始いたします。革新的なソリューションで、お客様と共に成長していくことを目指しています。',
    readTime: '3分',
    content: `<h2>設立背景</h2>
      <p>日本と中国を架け橋とする革新的なビジネスソリューション企業として、無迹探索株式会社の設立を準備いたします。</p>
      <h2>事業内容</h2>
      <p>珈琲事業、展示イベント運営、技術研究開発、会員制コミュニティの運営を中心に、高品質なサービスを提供いたします。</p>`,
    tags: ['設立', '企業情報', '新サービス'],
  },
  {
    id: 2,
    date: '2025.01.10',
    title: '東京ルアー・フライフィッシング学院 2025年春季コース募集開始',
    category: 'サービス',
    excerpt:
      '初心者から上級者まで、本格的なフライフィッシング技術を学べるコースです。経験豊富なインストラクターによる実践的な指導を行います。',
    readTime: '4分',
    content: `<h2>コース概要</h2>
      <p>東京ルアー・フライフィッシング学院では、初心者から上級者まで、各レベルに合わせた実践的な技術指導を行います。</p>
      <h2>プログラム内容</h2>
      <p>最新のフィッシング器具を用いた体験学習、プロガイドによる実地指導、技術認定試験などをご用意しております。</p>`,
    tags: ['教育', 'スポーツ', 'イベント'],
  },
  {
    id: 3,
    date: '2025.01.08',
    title: '厳選コーヒー商品ラインナップ拡充について',
    category: 'コーヒー事業',
    excerpt:
      'サステナブル調達による高品質コーヒー商品の新ラインナップを発表。生産者との直接取引により、最高品質のコーヒーをお届けします。',
    readTime: '3分',
    content: `<h2>新商品ラインナップ</h2>
      <p>世界の優良農園から直接仕入れた高品質なコーヒー豆を使用した新商品シリーズを発表いたします。</p>
      <h2>品質へのこだわり</h2>
      <p>北京で培った焙煎技術と日本の品質基準を融合させた、唯一無二のコーヒー商品をお届けいたします。</p>`,
    tags: ['商品', 'コーヒー', '品質'],
  },
  {
    id: 4,
    date: '2025.01.05',
    title: '中国アーティスト展示スペース 中目黒オープン準備中',
    category: '展示・イベント',
    excerpt:
      '現代中国アートを紹介する展示スペースが中目黒にオープン予定。文化交流を通じて新たな価値創造を目指します。',
    readTime: '3分',
    content: `<h2>展示スペース概要</h2>
      <p>現代中国アーティストの作品を中心に、日本と中国の文化交流を促進する展示スペースを中目黒に開設いたします。</p>
      <h2>展示予定</h2>
      <p>定期的に企画展を開催し、両国のアーティストと観覧者の交流の場を提供いたします。</p>`,
    tags: ['展示', 'アート', '文化交流'],
  },
  {
    id: 5,
    date: '2025.01.03',
    title: '2025年限定釣具予約受付開始 - Shimano・Daiwa最新モデル',
    category: '釣具・器具',
    excerpt:
      '2025年の限定釣具の予約受付を開始。Shimano、Daiwの最新モデルを含む厳選されたラインナップをご用意しました。',
    readTime: '3分',
    content: `<h2>限定モデル詳細</h2>
      <p>ShimanoとDaiwaの2025年最新限定モデルを含む、厳選された高品質釣具の予約受付を開始いたします。</p>
      <h2>予約方法</h2>
      <p>オンラインまたは店頭にて予約を承ります。数量限定となっておりますので、お早めにご予約ください。</p>`,
    tags: ['釣具', '限定商品', 'Shimano'],
  },
]

export function ArticlesListSection() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Articles List */}
        <div className="space-y-6">
          {ARTICLES.map((article, index) => (
            <div
              key={article.id}
              className="animate-fade-in-up group cursor-pointer"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                opacity: 0,
              }}
            >
              <div className="pb-6 border-b border-gray-200 last:border-b-0 hover:pb-6 transition-all">
                {/* Article Header */}
                <div className="flex items-start justify-between gap-4">
                  {/* Date Badge */}
                  <div className="flex-shrink-0 text-center">
                    <div className="text-xs font-semibold text-primary mb-1">
                      {article.date.split('.')[1]}月
                    </div>
                    <div className="text-2xl font-bold text-text-dark">
                      {article.date.split('.')[2]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <Link href={`/articles/${article.id}`}>
                      <h3 className="text-lg md:text-xl font-semibold text-text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium text-xs">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-text-secondary">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <span className="text-text-secondary">{article.readTime}</span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-text-secondary leading-relaxed mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            すべての記事を見る
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
