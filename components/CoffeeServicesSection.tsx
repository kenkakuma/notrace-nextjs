'use client'

import { Lightbulb, Globe, Trophy, Plane } from 'lucide-react'

interface Service {
  id: string
  title: string
  icon: React.ReactNode
  features: string[]
}

const SERVICES: Service[] = [
  {
    id: 'development',
    title: '商品企画開発',
    icon: <Lightbulb className="w-12 h-12" />,
    features: [
      '高品質コーヒー商品の企画開発',
      'ドリップバッグ開発・製造',
      'オリジナルブレンド開発',
      'パッケージデザイン',
    ],
  },
  {
    id: 'trade',
    title: 'コーヒー貿易',
    icon: <Globe className="w-12 h-12" />,
    features: [
      '世界各地からの優良豆輸入',
      '直接取引による品質保証',
      '適正価格での安定供給',
      'サステナブル調達',
    ],
  },
  {
    id: 'branding',
    title: 'ブランド展開',
    icon: <Trophy className="w-12 h-12" />,
    features: [
      'オリジナルブランド展開',
      'マーケティング戦略立案',
      '販売チャネル開拓',
      'ブランド価値向上',
    ],
  },
  {
    id: 'international',
    title: '中国戦略展開',
    icon: <Plane className="w-12 h-12" />,
    features: [
      '中国市場向け商品開発',
      '海外販売戦略立案',
      '現地パートナーシップ構築',
      'クロスボーダーEC展開',
    ],
  },
]

export function CoffeeServicesSection() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            コーヒーサービス
          </h2>
          <p className="text-lg text-text-secondary">
            品質と伝統を融合させた総合的なコーヒーソリューション
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="animate-fade-in-up bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                opacity: 0,
              }}
            >
              {/* Icon */}
              <div className="text-primary mb-6">{service.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-text-dark mb-4">
                {service.title}
              </h3>

              {/* Features List */}
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-text-secondary text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
