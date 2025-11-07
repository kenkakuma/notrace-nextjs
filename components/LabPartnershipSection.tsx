'use client'

import { BookOpen, Laptop, Trophy, DollarSign } from 'lucide-react'

interface Partner {
  id: number
  name: string
  type: string
  icon: React.ReactNode
}

const PARTNERS: Partner[] = [
  {
    id: 1,
    name: '大学研究機関',
    type: '学術パートナー',
    icon: <BookOpen className="w-12 h-12" />,
  },
  {
    id: 2,
    name: 'テクノロジー企業',
    type: '技術パートナー',
    icon: <Laptop className="w-12 h-12" />,
  },
  {
    id: 3,
    name: 'スポーツ団体',
    type: '実証パートナー',
    icon: <Trophy className="w-12 h-12" />,
  },
  {
    id: 4,
    name: '投資機関',
    type: '資金パートナー',
    icon: <DollarSign className="w-12 h-12" />,
  },
]

export function LabPartnershipSection() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            パートナーシップ
          </h2>
          <p className="text-lg text-text-secondary">
            研究開発を支える信頼できるパートナーネットワーク
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNERS.map((partner, index) => (
            <div
              key={partner.id}
              className="animate-fade-in-up bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 text-center"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                opacity: 0,
              }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6 text-primary">
                {partner.icon}
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-text-dark mb-2">
                {partner.name}
              </h3>

              {/* Type */}
              <p className="text-sm font-medium text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
                {partner.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
