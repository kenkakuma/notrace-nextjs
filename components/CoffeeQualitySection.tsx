'use client'

interface QualityFeature {
  title: string
  description: string
}

const QUALITY_FEATURES: QualityFeature[] = [
  {
    title: '厳選された豆',
    description:
      '世界各地の優良農園から直接仕入れた高品質なコーヒー豆のみを使用しています。',
  },
  {
    title: '独自の焙煎技術',
    description:
      '豆の特性を最大限に引き出す独自の焙煎技術により、最高の風味を実現しています。',
  },
  {
    title: 'サステナブルな取り組み',
    description:
      '環境と生産者に配慮したサステナブルなコーヒー作りに取り組んでいます。',
  },
]

export function CoffeeQualitySection() {
  return (
    <section className="py-20 bg-bg-light">
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
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop"
                alt="Coffee Quality"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
