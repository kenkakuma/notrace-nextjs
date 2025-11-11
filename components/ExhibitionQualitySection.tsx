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
    <section className="py-24 md:py-32 bg-bg-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* English Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Platform Features</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
            プラットフォームの特色
          </h2>

          <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Features */}
          <div className="space-y-12">
            {PLATFORM_FEATURES.map((feature) => (
              <div key={feature.title} className="text-center lg:text-left">
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
                  {feature.title}
                </h3>
                <p className="text-xs text-text-secondary/80 leading-loose">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400"
              alt="Coffee Exhibition Platform"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
