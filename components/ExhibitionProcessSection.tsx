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
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* English Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Process</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
            展示・競技開催プロセス
          </h2>

          <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>

          <p className="text-xs md:text-sm text-text-secondary/80 max-w-2xl mx-auto leading-loose">
            コーヒー展示・競技イベントの企画から実施まで、プロフェッショナルな運営サポート
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.id} className="text-center">
              {/* Step Number - Minimalist */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 flex items-center justify-center opacity-60">
                  <span className="font-noto-serif-jp text-4xl font-light text-primary/70">
                    {step.id}
                  </span>
                </div>
              </div>

              {/* Step Title */}
              <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
