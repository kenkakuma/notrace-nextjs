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
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
            総合コーヒー展示サービス
          </h2>
          <p className="text-lg text-text-secondary">
            中国・日本・独立咖啡主理人のための開放的な展示・競技・交流プラットフォーム
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="bg-bg-light rounded-lg p-8 border border-gray-200"
            >
              <div className="text-primary text-sm font-bold mb-2">
                {service.number}
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-text-secondary text-sm leading-relaxed">
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
