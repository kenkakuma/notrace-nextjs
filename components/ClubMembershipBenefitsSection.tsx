'use client'

import { Users, Star, BookOpen, Heart } from 'lucide-react'

interface Feature {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    id: 1,
    title: '専門家ネットワーク',
    description: '各分野の専門家との直接的なつながり',
    icon: <Users className="w-10 h-10" />,
  },
  {
    id: 2,
    title: '限定イベント',
    description: '会員限定の特別なイベントや体験',
    icon: <Star className="w-10 h-10" />,
  },
  {
    id: 3,
    title: '学習機会',
    description: '継続的なスキルアップとナレッジシェア',
    icon: <BookOpen className="w-10 h-10" />,
  },
  {
    id: 4,
    title: 'コミュニティ',
    description: '同じ興味を持つ仲間との深いつながり',
    icon: <Heart className="w-10 h-10" />,
  },
]

export function ClubMembershipBenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            会員制サービスの特徴
          </h2>
          <p className="text-lg text-text-secondary">
            会員だけが享受できる特別な価値とサービス
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className="animate-fade-in-up bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                opacity: 0,
              }}
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-text-dark mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
