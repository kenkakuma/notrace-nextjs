'use client'

import { Lightbulb, Shield, Users } from 'lucide-react'

interface Principle {
  icon: React.ReactNode
  title: string
  englishTitle: string
  description: string
}

const PRINCIPLES: Principle[] = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: '技術革新',
    englishTitle: 'Innovation',
    description: '常に新しい価値を追求し、市場のニーズに応える',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: '信頼第一',
    englishTitle: 'Trust',
    description: '透明性と誠実さで、長期的な信頼関係を構築',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: '共創価値',
    englishTitle: 'Co-Creation',
    description: 'パートナーと共に成長し、持続可能な未来を実現',
  },
]

export function PhilosophySection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-semibold text-sm">企業理念</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
              文化をつなぎ、未来を創る
            </h2>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              異なる文化と技術を繋ぎ合わせ、イノベーションと信頼を基盤とした持続可能なパートナーシップで両国市場に新たな価値を提供します。
            </p>

            {/* Principles */}
            <div className="space-y-6">
              {PRINCIPLES.map((principle, index) => (
                <div
                  key={index}
                  className="flex gap-4 group"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                    opacity: 0,
                  }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                    {principle.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1">
                      {principle.title}
                    </h4>
                    <p className="text-primary text-xs font-medium mb-2">
                      {principle.englishTitle}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Decorative Visual */}
          <div className="relative h-96 hidden lg:block animate-fade-in-up animation-delay-200">
            {/* Central Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-64 h-64 bg-gradient-to-r from-primary/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Floating Elements */}
            <svg
              className="w-full h-full absolute"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Element 1 - Top Left */}
              <circle
                cx="100"
                cy="100"
                r="30"
                fill="url(#gradient1)"
                opacity="0.6"
                className="animate-bounce"
              />

              {/* Element 2 - Top Right */}
              <circle
                cx="300"
                cy="120"
                r="25"
                fill="url(#gradient2)"
                opacity="0.5"
                className="animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />

              {/* Element 3 - Bottom Left */}
              <circle
                cx="80"
                cy="300"
                r="28"
                fill="url(#gradient3)"
                opacity="0.55"
                className="animate-bounce"
                style={{ animationDelay: '0.4s' }}
              />

              {/* Element 4 - Bottom Right */}
              <circle
                cx="320"
                cy="280"
                r="26"
                fill="url(#gradient4)"
                opacity="0.5"
                className="animate-bounce"
                style={{ animationDelay: '0.1s' }}
              />

              {/* Element 5 - Center */}
              <circle
                cx="200"
                cy="200"
                r="35"
                fill="url(#gradient5)"
                opacity="0.7"
                className="animate-pulse"
              />

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E17B47" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#E17B47" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E17B47" />
                  <stop offset="100%" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#E17B47" />
                </linearGradient>
                <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E17B47" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
