'use client'

import { Zap, Target, Lightbulb } from 'lucide-react'

interface ValueProp {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const VALUE_PROPS: ValueProp[] = [
  {
    id: 'business-domain',
    title: '私たちの事業領域',
    description:
      '北京の日式直火焙煎カフェ基盤と日本技術力による双軸型事業展開で、焙煎機器・資材調達、OEM・共同開発支援、技術交流・人材育成を通して両国市場の成長を支援します。',
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 'innovation',
    title: '革新を推進する技術力',
    description:
      '最新テクノロジーと従来の手法を組み合わせ、お客様の課題に対して最適なソリューションを提案します。継続的な改善と品質向上に取り組んでいます。',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 'transformation',
    title: '業界変革への取り組み',
    description:
      '50+体験プログラム、15+パートナー企業との協力により、業界の未来を見据えた持続可能な成長モデルを構築し、社会的価値を創造します。',
    icon: <Lightbulb className="w-6 h-6" />,
  },
]

export function BusinessValueSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight">
            <span className="block">NO TRACE EXPLORERは、</span>
            <span className="block">未知の可能性を探求し、</span>
            <span className="block">お客様の長期的な</span>
            <span className="block">価値創造を目指します。</span>
          </h2>

          {/* Subheading */}
          <div className="mt-8">
            <p className="text-xl md:text-2xl text-text-dark font-semibold mb-4">
              コーヒーを中心とした総合ビジネスソリューション
            </p>
            <div className="space-y-2 text-lg text-text-secondary">
              <p>北京直火焙煎の実績と日本の品質基準を融合。</p>
              <p>コーヒー事業から文化交流まで、</p>
              <p>4つの専門分野で価値を創造します。</p>
            </div>
          </div>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUE_PROPS.map((prop, index) => (
            <div
              key={prop.id}
              className="group relative bg-gradient-to-br from-white to-bg-light rounded-2xl p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                opacity: 0,
              }}
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                {prop.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-text-dark mb-4 group-hover:text-primary transition-colors">
                {prop.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed">
                {prop.description}
              </p>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
