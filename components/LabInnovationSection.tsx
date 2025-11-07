'use client'

interface ProcessStep {
  title: string
  description: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: '1. 調査・分析',
    description:
      '市場動向や技術トレンドを徹底的に調査・分析し、イノベーションの機会を特定します。',
  },
  {
    title: '2. 研究・開発',
    description:
      '最新技術と創造的アイデアを組み合わせた革新的なソリューションを開発します。',
  },
  {
    title: '3. 実証・検証',
    description:
      'プロトタイプの作成と実証実験により、技術の有効性を検証します。',
  },
  {
    title: '4. 実用化・展開',
    description: '実証された技術の実用化と市場展開をサポートします。',
  },
]

export function LabInnovationSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-8">
              イノベーション創出プロセス
            </h2>

            <div className="space-y-8">
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="animate-fade-in-up pb-6 border-b border-gray-200 last:border-b-0"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 2)}s forwards`,
                    opacity: 0,
                  }}
                >
                  <h3 className="text-lg font-semibold text-text-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="animate-fade-in-up">
            <div className="rounded-2xl overflow-hidden h-96 md:h-full">
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop"
                alt="Innovation Process"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
