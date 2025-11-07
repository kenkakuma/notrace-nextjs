'use client'

import { Coffee, Dumbbell, Palette, Users } from 'lucide-react'

interface Club {
  id: string
  name: string
  category: string
  description: string
  image: string
  memberCount: string
  icon: React.ReactNode
  benefits: string[]
}

const CLUBS: Club[] = [
  {
    id: 'coffee-lovers',
    name: 'コーヒー愛好家クラブ',
    category: '飲料文化',
    description:
      '高品質コーヒーの知識を深め、愛好家同士の交流を楽しむコミュニティ',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    memberCount: '120+',
    icon: <Coffee className="w-8 h-8" />,
    benefits: [
      '限定コーヒー豆の先行購入',
      '専門家によるテイスティング講座',
      '産地直送コーヒーツアー',
      '焙煎体験ワークショップ',
    ],
  },
  {
    id: 'outdoor-sports',
    name: 'アウトドアスポーツクラブ',
    category: 'スポーツ',
    description:
      '釣り・スキー・ゴルフなど多彩なアウトドアスポーツを楽しむアクティブコミュニティ',
    image:
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
    memberCount: '80+',
    icon: <Dumbbell className="w-8 h-8" />,
    benefits: [
      '専門ガイド付きツアー',
      '最新器具の試用・割引',
      '技術向上セミナー',
      'プライベートレッスン',
    ],
  },
  {
    id: 'art-culture',
    name: '文化芸術サークル',
    category: '文化芸術',
    description:
      '展示鑑賞・アート制作・文化イベントを通じて芸術への理解を深めるコミュニティ',
    image:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    memberCount: '95+',
    icon: <Palette className="w-8 h-8" />,
    benefits: [
      '展示会の優先予約・割引',
      'アーティストとの交流会',
      '創作ワークショップ',
      'ギャラリーツアー',
    ],
  },
]

export function ClubsGridSection() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            コミュニティ一覧
          </h2>
          <p className="text-lg text-text-secondary">
            興味と専門性を共有する3つの特別なコミュニティ
          </p>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLUBS.map((club, index) => (
            <div
              key={club.id}
              className="animate-fade-in-up bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                opacity: 0,
              }}
            >
              {/* Club Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Club Content */}
              <div className="flex-grow p-6 flex flex-col">
                {/* Header with Icon and Category */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary flex-shrink-0">
                    {club.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-text-dark mb-1">
                      {club.name}
                    </h3>
                    <span className="inline-block text-xs font-semibold text-white bg-primary px-2 py-0.5 rounded-full">
                      {club.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {club.description}
                </p>

                {/* Benefits */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-text-dark mb-2">
                    会員特典:
                  </p>
                  <ul className="space-y-1">
                    {club.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-xs text-text-secondary">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Member Count */}
                <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                  <Users className="w-4 h-4" />
                  <span>{club.memberCount}名</span>
                </div>

                {/* Button */}
                <button className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-text-dark transition-colors text-sm">
                  詳細・入会案内
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
