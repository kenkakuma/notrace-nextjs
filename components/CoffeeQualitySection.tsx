'use client'

interface StrategicAdvantage {
  title: string
  description: string
}

const STRATEGIC_ADVANTAGES: StrategicAdvantage[] = [
  {
    title: '品質へのこだわり',
    description:
      '北京での実践経験から、日本製設備の優位性を実証。 火力制御・再現性・安全性で、 ブランド価値の維持と向上を実現します。',
  },
  {
    title: '安定供給体制',
    description:
      '急成長する需要に対応する、 信頼できる日本製資材の調達ネットワーク。 品質とコストの最適バランスを提供します。',
  },
  {
    title: '差別化の実現',
    description:
      '日本の焙煎理論と中国市場の嗜好を融合。 価格競争を超えた、 高付加価値商品の開発を支援します。',
  },
  {
    title: 'Win-Winモデル',
    description:
      '中国の市場力と日本の技術力を結合。 両国企業にとって持続可能な 成長モデルを構築します。',
  },
  {
    title: '信頼関係の構築',
    description:
      '単なる取引を超えた、 長期的パートナーシップの実現。 文化理解に基づく真の協力関係を育みます。',
  },
  {
    title: '成長の加速',
    description:
      '優れた技術を持つ日本企業の海外展開と、 成長する中国企業の品質向上を同時に実現。 両国のコーヒー産業発展に貢献します。',
  },
]

export function CoffeeQualitySection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* English Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Why Choose Us</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
            なぜ私たちが選ばれるのか
          </h2>

          <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>

          <p className="text-xs md:text-sm text-text-secondary/80 max-w-md mx-auto leading-loose">
            6つの戦略的優位性
          </p>
        </div>

        {/* Strategic Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {STRATEGIC_ADVANTAGES.map((advantage) => (
            <div key={advantage.title} className="text-center">
              <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
                {advantage.title}
              </h3>
              <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
