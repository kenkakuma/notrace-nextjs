'use client'

interface QualityFeature {
  title: string
  description: string
}

const QUALITY_FEATURES: QualityFeature[] = [
  {
    title: '革新的な企画力',
    description:
      '独創的なアイデアと豊富な経験に基づいて、お客様の期待を超える展示企画を提供します。',
  },
  {
    title: '最新技術の活用',
    description:
      'デジタル技術とインタラクティブメディアを駆使して、来場者に印象的な体験を創造します。',
  },
  {
    title: '細部への配慮',
    description:
      '空間デザインから運営まで、すべての細部にわたって品質にこだわった展示を実現します。',
  },
]

export function ExhibitionQualitySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-8">
              品質へのこだわり
            </h2>

            <div className="space-y-8">
              {QUALITY_FEATURES.map((feature, index) => (
                <div
                  key={feature.title}
                  className="animate-fade-in-up"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 2)}s forwards`,
                    opacity: 0,
                  }}
                >
                  <h3 className="text-xl font-semibold text-text-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="animate-fade-in-up">
            <div className="rounded-2xl overflow-hidden h-96 md:h-full">
              <img
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop"
                alt="Exhibition Quality"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
