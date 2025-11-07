'use client'

import { Brain, Leaf } from 'lucide-react'

interface ResearchArea {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
}

const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 'ai-iot',
    title: 'AI・IoTテクノロジー',
    description: '人工知能とIoTの融合技術',
    icon: <Brain className="w-12 h-12" />,
    features: [
      '機械学習・深層学習',
      'スマートデバイス開発',
      'データ分析・予測技術',
      'エッジコンピューティング',
    ],
  },
  {
    id: 'sustainable',
    title: 'サステナブル技術',
    description: '持続可能な社会実現のための技術',
    icon: <Leaf className="w-12 h-12" />,
    features: [
      '環境配慮型材料開発',
      'エネルギー効率化技術',
      'リサイクル技術革新',
      'カーボンニュートラル',
    ],
  },
]

export function LabResearchSection() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            研究開発領域
          </h2>
          <p className="text-lg text-text-secondary">
            革新的な技術研究で社会課題の解決に取り組む専門分野
          </p>
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESEARCH_AREAS.map((area, index) => (
            <div
              key={area.id}
              className="animate-fade-in-up bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                opacity: 0,
              }}
            >
              {/* Icon */}
              <div className="text-primary mb-6">{area.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-text-dark mb-2">
                {area.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                {area.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {area.features.map((feature) => (
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
