'use client'

interface Service {
  number: string
  title: string
  description: string
  features: string[]
}

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'コーヒー展示プラットフォーム',
    description:
      '中国・日本・独立咖啡主理人のための総合展示空間を提供し、コーヒー文化と技術の交流促進を実現',
    features: [
      '焙煎技術・器具の展示スペース',
      '中日市場マッチング支援',
      '独立主理人ブランド展示',
      'バイヤー・投資家との商談機会',
      'コーヒー文化体験コーナー',
      'デジタル展示・VR体験',
    ],
  },
  {
    number: '02',
    title: '展会・展覧会運営サービス',
    description:
      'コーヒー専門展会の企画・運営から参加者サポートまで、包括的な展覧会開催サービス',
    features: [
      '年間コーヒー展覧会スケジュール',
      '会場選定・ブース設計支援',
      '中日同時通訳サービス',
      'メディア・PR戦略立案',
      '出展者向け研修プログラム',
      'アフターフォロー・成果分析',
    ],
  },
  {
    number: '03',
    title: 'コーヒー競技・コンテストサービス',
    description:
      '焙煎・抽出・ラテアート等の各種コーヒー競技の企画・運営と審査員派遣サービス',
    features: [
      '焙煎競技・カッピング大会',
      'ラテアート・バリスタ競技',
      '中日合同コーヒーコンテスト',
      '専門審査員・指導者派遣',
      '優勝者技術交流プログラム',
      '競技結果のブランド活用支援',
    ],
  },
]

export function ExhibitionServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* English Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Comprehensive Services</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
            総合コーヒー展示サービス
          </h2>

          <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>

          <p className="text-xs md:text-sm text-text-secondary/80 max-w-2xl mx-auto leading-loose">
            中国・日本・独立咖啡主理人のための開放的な展示・競技・交流プラットフォーム
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="p-8 transition-all duration-500 group"
            >
              <div className="text-primary/80 text-xs font-light tracking-wide mb-4">
                {service.number}
              </div>
              <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
                {service.title}
              </h3>
              <p className="text-xs text-text-secondary/80 leading-loose mb-6">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-primary/80 font-light mt-0.5 flex-shrink-0 text-xs">
                      ✓
                    </span>
                    <span className="text-text-secondary/70 text-xs leading-loose">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
