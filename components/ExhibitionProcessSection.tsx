'use client'

interface ProcessStep {
  id: number
  title: string
  description: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: '企画・提案',
    description: 'お客様のニーズを理解し、最適な企画を提案いたします',
  },
  {
    id: 2,
    title: '設計・デザイン',
    description: '詳細な設計とデザインで理想の空間を創造します',
  },
  {
    id: 3,
    title: '制作・準備',
    description: '高品質な制作と入念な準備で成功を確実にします',
  },
  {
    id: 4,
    title: '実施・運営',
    description: 'プロフェッショナルな運営で最高の体験を提供します',
  },
]

export function ExhibitionProcessSection() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            プロジェクト進行プロセス
          </h2>
          <p className="text-lg text-text-secondary">
            お客様のニーズに応える体系的なプロジェクト管理
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.id}
              className="animate-fade-in-up text-center"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                opacity: 0,
              }}
            >
              {/* Step Number Circle */}
              <div className="flex justify-center mb-6">
                <div className="w-15 h-15 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.id}
                </div>
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-semibold text-text-dark mb-3">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
