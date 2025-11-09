'use client'

import { Compass, Lightbulb, Globe } from 'lucide-react'

interface BusinessCard {
  icon: React.ReactNode
  title: string
  description: string
}

const BUSINESS_CARDS: BusinessCard[] = [
  {
    icon: <Compass className="w-8 h-8" />,
    title: '私たちの事業領域',
    description:
      '北京の日式直火焙煎カフェ基盤と日本技術力による双軸型事業展開で、焙煎機器・資材調達、OEM・共同開発支援、技術交流・人材育成を通して両国市場の成長を支援します。',
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: '革新を推進する技術力',
    description:
      '最新テクノロジーと従来の手法を組み合わせ、お客様の課題に対して最適なソリューションを提案します。継続的な改善と品質向上に取り組んでいます。',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: '業界変革への取り組み',
    description:
      '50+体験プログラム、15+パートナー企業との協力により、業界の未来を見据えた持続可能な成長モデルを構築し、社会的価値を創造します。',
  },
]

export function BusinessValueSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content - Left/Right Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Main Title */}
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-dark leading-tight">
              NO TRACE EXPLORERでは、
              <br />
              未知の領域を探索し、
              <br />
              お客様の長期的な
              <br />
              価値創造を目指します。
            </h1>
          </div>

          {/* Right Side - Description */}
          <div className="flex flex-col justify-center">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              コーヒーを中心とした総合ビジネスソリューション
            </p>
            <p className="text-base md:text-lg text-text-secondary mt-4 leading-relaxed">
              北京直火焙煎の実績と日本の品質基準を融合。
              <br />
              コーヒー事業から文化交流まで、
              <br />
              4つの専門分野で価値を創造します。
            </p>
          </div>
        </div>

        {/* Business Cards - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BUSINESS_CARDS.map((card, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-lg hover:bg-bg-light transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="flex-shrink-0 text-primary group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
