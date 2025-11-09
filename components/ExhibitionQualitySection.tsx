'use client'

interface PlatformFeature {
  title: string
  description: string
}

const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    title: '中日市場連携',
    description:
      '北京の直火焙煎カフェ基盤と日本の技術力を活用し、中日両国のコーヒー文化と市場をつなぐ架け橋として機能します。',
  },
  {
    title: '開放的な展示空間',
    description:
      '独立咖啡主理人から大手企業まで、あらゆる規模のコーヒー関係者が平等に参加できる開放的な展示・交流の場を提供します。',
  },
  {
    title: '総合的サポート体制',
    description:
      '展示企画から運営、マーケティング、技術交流まで、コーヒービジネス成功に必要なあらゆる要素を一貫してサポートします。',
  },
]

export function ExhibitionQualitySection() {
  return (
    <section className="py-16 md:py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark text-center">
            プラットフォームの特色
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Features */}
          <div className="space-y-8">
            {PLATFORM_FEATURES.map((feature) => (
              <div key={feature.title}>
                <h3 className="text-xl font-bold text-text-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400"
              alt="Coffee Exhibition Platform"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
