'use client'

import { Palette, Calendar, Megaphone } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
}

const SERVICES: Service[] = [
  {
    id: 'planning',
    title: '展示企画・デザイン',
    description: '文化・技術・芸術展示の企画からデザインまで',
    icon: <Palette className="w-12 h-12" />,
    features: [
      'コンセプト企画・立案',
      '空間デザイン・設計',
      'インタラクティブ展示',
      'デジタル技術活用',
    ],
  },
  {
    id: 'management',
    title: 'イベント運営・管理',
    description: 'プロフェッショナルなイベント運営サービス',
    icon: <Calendar className="w-12 h-12" />,
    features: [
      'プロジェクト管理',
      '会場設営・運営',
      'スタッフィング',
      '安全管理・警備',
    ],
  },
  {
    id: 'promotion',
    title: '文化・芸術プロモーション',
    description: '効果的なプロモーション戦略の立案・実行',
    icon: <Megaphone className="w-12 h-12" />,
    features: [
      'マーケティング戦略',
      'メディア対応',
      'SNS活用',
      'パートナーシップ構築',
    ],
  },
]

export function ExhibitionServicesSection() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            展示・イベントサービス
          </h2>
          <p className="text-lg text-text-secondary">
            文化・技術・芸術分野の専門的な展示企画と運営サービス
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <h3 className="text-xl font-semibold text-text-dark mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                {service.description}
              </p>

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
