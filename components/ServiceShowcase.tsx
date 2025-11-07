'use client'

import { useState } from 'react'

interface Service {
  id: string
  title: string
  category: string
  description: string
  icon: string
  image: string
}

const SERVICES: Service[] = [
  {
    id: 'coffee',
    title: '珈琲 | COFFEE',
    category: '飲料・文化事業',
    description:
      '高品質コーヒー商品の企画開発・貿易・ブランド展開を通じて、コーヒー文化の探求と普及に取り組んでいます。',
    icon: '☕',
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 'equipment',
    title: '器具 | EQUIPMENT',
    category: '製品開発事業',
    description:
      '専門器具の設計・開発・販売から技術サポートまで、一貫したサービスを提供しています。',
    icon: '🔧',
    image:
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 'exhibition',
    title: '展覧 | EXHIBITION',
    category: '文化・芸術事業',
    description:
      '文化・技術・芸術分野の展示企画からイベント運営まで、革新的なアプローチで印象的な体験を創造します。',
    icon: '🏛️',
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 'lab',
    title: 'ラボ | LAB',
    category: '技術研究・イノベーション',
    description:
      '最先端技術とイノベーション開発・スポーツ関連研究を通じて、未来の価値創造に挑戦しています。',
    icon: '🔬',
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 'club',
    title: 'クラブ | CLUB',
    category: '会員制コミュニティ',
    description:
      '会員制コミュニティ・専門家ネットワーク運営を通じて、特別な体験と深いつながりを提供します。',
    icon: '👥',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format',
  },
]

export function ServiceShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Determine which service to display
  const displayIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex
  const currentService = SERVICES[displayIndex]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-bg-light to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-primary to-orange-600 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent mb-3">
            総合サービスリソース
          </h2>
          <p className="text-lg text-text-secondary mb-6 uppercase tracking-wider">
            COMPREHENSIVE SERVICE RESOURCES
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-text-secondary mb-2">
              お客様のニーズに応える幅広いサービスを提供し、
            </p>
            <p className="text-text-secondary">
              最適なソリューションで価値創造をサポートいたします。
            </p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-96">
          {/* Service List - Left Side (7 columns) */}
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {SERVICES.map((service, index) => (
                <div
                  key={service.id}
                  className={`p-5 rounded-lg border-2 transition-all duration-300 cursor-pointer group ${
                    hoveredIndex === index
                      ? 'bg-white border-primary shadow-lg'
                      : 'bg-white/50 border-transparent hover:border-primary/30'
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <h4 className="text-lg font-semibold text-text-dark mb-1 group-hover:text-primary transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-sm text-primary font-medium mb-2">
                        {service.category}
                      </p>
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="text-2xl text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Display - Right Side (5 columns) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-lg overflow-hidden shadow-lg h-96 flex flex-col">
              {/* Image Container */}
              <div className="relative flex-1 bg-black overflow-hidden">
                {currentService?.image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={currentService.image}
                      alt={currentService.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <div className="text-5xl mb-4">📸</div>
                    <p className="text-center text-sm">
                      サービスにマウスオーバーして
                      <br />
                      関連画像をご覧ください
                    </p>
                  </div>
                )}
              </div>

              {/* Image Overlay Info */}
              {currentService && (
                <div className="bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <span className="inline-block px-3 py-1 bg-primary/80 rounded-full text-xs font-semibold mb-3">
                    {currentService.category}
                  </span>
                  <h5 className="text-xl font-bold mb-2">{currentService.title}</h5>
                  <p className="text-sm text-white/80 line-clamp-2">
                    {currentService.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
