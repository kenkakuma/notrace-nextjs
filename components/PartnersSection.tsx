'use client'

interface Partner {
  id: number
  name: string
  logo: string
}

const PARTNERS: Partner[] = [
  { id: 1, name: 'Partner 1', logo: '🏢' },
  { id: 2, name: 'Partner 2', logo: '🏭' },
  { id: 3, name: 'Partner 3', logo: '🏗️' },
  { id: 4, name: 'Partner 4', logo: '🌐' },
  { id: 5, name: 'Partner 5', logo: '📱' },
  { id: 6, name: 'Partner 6', logo: '🔬' },
  { id: 7, name: 'Partner 7', logo: '🎓' },
  { id: 8, name: 'Partner 8', logo: '🚀' },
]

export function PartnersSection() {
  // Double the partners for seamless loop
  const doubledPartners = [...PARTNERS, ...PARTNERS]

  return (
    <section className="py-20 bg-gradient-to-b from-bg-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            業界リーダーからの信頼
          </h2>
          <p className="text-lg text-text-secondary animate-fade-in-up animation-delay-100">
            グローバルパートナーとの協働により卓越した成果を提供
          </p>
        </div>

        {/* Partners Scroll Container */}
        <div className="relative overflow-hidden bg-white rounded-2xl p-8">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-12">
              {doubledPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-32 h-32 flex items-center justify-center bg-gradient-to-br from-primary/10 to-orange-600/10 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                      {partner.logo}
                    </div>
                    <p className="text-xs font-medium text-text-secondary group-hover:text-primary transition-colors">
                      {partner.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-text-secondary mt-12 text-lg">
          あなたのビジネスパートナーとして、共に成長・発展を目指します
        </p>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 24px));
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
