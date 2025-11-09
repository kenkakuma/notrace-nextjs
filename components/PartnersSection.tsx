'use client'

const PARTNERS = [
  'Shimano',
  'Daiwa',
  '東京珈琲',
  '東京アートギャラリー',
  'スポーツテック株式会社',
  'イベントソリューション',
  'イノベーションラボ',
  'グローバル貿易',
]

export function PartnersSection() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            業界リーダーからの信頼
          </h2>
          <p className="text-lg text-text-secondary">
            グローバルパートナーとの協働により卓越した成果を提供
          </p>
        </div>

        {/* Partners Logos - Infinite Scroll */}
        <div className="relative">
          {/* Fade Effects */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-light to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-light to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Container */}
          <div className="flex overflow-hidden">
            {/* First Set of Logos */}
            <div className="flex animate-scroll">
              {PARTNERS.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                  style={{ width: '200px', height: '100px' }}
                >
                  <div className="text-center">
                    <span className="text-lg md:text-xl font-semibold text-text-secondary hover:text-primary transition-colors">
                      {partner}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Set of Logos (for seamless loop) */}
            <div className="flex animate-scroll" aria-hidden="true">
              {PARTNERS.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                  style={{ width: '200px', height: '100px' }}
                >
                  <div className="text-center">
                    <span className="text-lg md:text-xl font-semibold text-text-secondary hover:text-primary transition-colors">
                      {partner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
