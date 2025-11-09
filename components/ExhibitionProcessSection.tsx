'use client'

interface ProcessStep {
  id: number
  title: string
  description: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'ニーズ分析・企画立案',
    description:
      '参加者の目標とニーズを詳細分析し、最適な展示・競技プランを企画立案します',
  },
  {
    id: 2,
    title: '会場準備・システム構築',
    description:
      '会場設営、展示システム、競技環境の構築を専門チームが一貫して担当します',
  },
  {
    id: 3,
    title: '参加者サポート・研修',
    description:
      '出展者・競技者向けの事前研修と当日サポートで成功を確実にします',
  },
  {
    id: 4,
    title: 'イベント実施・成果評価',
    description:
      'プロフェッショナルな運営でイベントを成功に導き、詳細な成果分析を提供します',
  },
]

export function ExhibitionProcessSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
            展示・競技開催プロセス
          </h2>
          <p className="text-lg text-text-secondary">
            コーヒー展示・競技イベントの企画から実施まで、プロフェッショナルな運営サポート
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.id} className="text-center">
              {/* Step Number Circle */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.id}
                </div>
              </div>

              {/* Step Title */}
              <h3 className="text-lg font-bold text-text-dark mb-3">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
