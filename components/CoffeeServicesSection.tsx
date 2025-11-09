'use client'

interface BusinessAxis {
  number: string
  title: string
  description: string[]
}

interface CoreService {
  number: string
  title: string
  description: string
}

const BUSINESS_AXES: BusinessAxis[] = [
  {
    number: '01',
    title: '北京発・品質向上支援',
    description: [
      '北京直火焙煎カフェの運営ノウハウを基盤に、',
      '日本の焙煎技術・設備・資材を導入。',
      '中国のコーヒー企業の品質向上と',
      'ブランド価値創造を支援します。',
    ],
  },
  {
    number: '02',
    title: '日本発・市場開拓支援',
    description: [
      '日本の中小コーヒー企業の技術力を活かし、',
      '中国市場向けの商品開発・OEM生産を実現。',
      '設計から販売まで、ワンストップで',
      'ビジネス展開をサポートします。',
    ],
  },
]

const CORE_SERVICES: CoreService[] = [
  {
    number: '01',
    title: '焙煎設備ソリューション',
    description:
      '日本製焙煎機の選定から導入、 メンテナンスまでトータルサポート。 安定した品質と効率的な生産を実現します。',
  },
  {
    number: '02',
    title: '資材調達サポート',
    description:
      'ドリップバッグ、フィルター、パッケージなど、 日本製高品質資材を最適価格で提供。 ブランドイメージを高める包材設計も支援します。',
  },
  {
    number: '03',
    title: '技術トランスファー',
    description:
      '焙煎プロファイル開発、抽出レシピ設計、 品質管理システム構築まで、 日本の技術ノウハウを体系的に移転します。',
  },
  {
    number: '04',
    title: 'OEM開発パートナーシップ',
    description:
      '商品企画からレシピ開発、パッケージデザイン、 生産管理まで一貫サポート。 お客様独自のブランド構築を実現します。',
  },
  {
    number: '05',
    title: '人材育成プログラム',
    description:
      '日本での焙煎研修、カフェ視察、 バリスタトレーニングなど、 実践的な技術習得の機会を提供します。',
  },
  {
    number: '06',
    title: 'マーケット・エクスパンション',
    description:
      '日本企業の中国市場参入から、 中国企業の日本市場展開まで、 両国間のビジネス拡大を戦略的に支援します。',
  },
]

export function CoffeeServicesSection() {
  return (
    <>
      {/* Business Structure Section - 事業構成（双軸型） */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              事業構成（双軸型）
            </h2>
            <p className="text-lg text-text-secondary">
              中国現地基盤と日本技術力を活かした二つの事業軸で相互成長を実現
            </p>
          </div>

          {/* Business Axes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {BUSINESS_AXES.map((axis) => (
              <div
                key={axis.number}
                className="bg-bg-light rounded-lg p-8 border border-gray-200"
              >
                <div className="text-primary text-sm font-bold mb-2">
                  {axis.number}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-text-dark mb-4">
                  {axis.title}
                </h3>
                <div className="space-y-1">
                  {axis.description.map((line, index) => (
                    <p key={index} className="text-text-secondary leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Section - 6つのコアサービス */}
      <section className="py-16 md:py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              6つのコアサービス
            </h2>
            <p className="text-lg text-text-secondary">
              お客様のニーズに応える包括的ソリューション
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.number}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="text-primary text-sm font-bold mb-2">
                  {service.number}
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-4">
                  {service.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
