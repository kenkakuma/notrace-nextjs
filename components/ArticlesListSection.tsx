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
          {ARTICLES.map((article, index) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group block"
            >
              <div className="grid grid-cols-[140px_1fr] gap-8 py-8 border-b border-gray-200/50 last:border-b-0 transition-all duration-500 hover:bg-primary/5">
                {/* Date Column - Timeline Style */}
                <div className="text-right pr-8 border-r border-gray-200/50">
                  <div className="font-noto-serif-jp text-xl font-light text-primary/80 mb-1">
                    {article.date.split('.')[0]}
                  </div>
                  <div className="font-noto-serif-jp text-base text-text-secondary/60">
                    {article.date.split('.')[1]}.{article.date.split('.')[2]}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-grow min-w-0">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary/80 text-xs font-light tracking-wide">
                        {article.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-noto-serif-jp text-base md:text-lg font-medium text-text-dark mb-3 group-hover:text-primary transition-colors drop-shadow-sm">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-text-secondary/80 leading-loose mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-text-secondary/60 font-light"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 text-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-0 group-hover:translate-x-2">
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-10 py-3 border border-primary/30 text-primary/80 font-light text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-300"
          >
            すべての記事を見る <span className="text-xs">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
