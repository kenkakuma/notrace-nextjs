'use client'

import Link from 'next/link'
import { useHeroData } from '@/hooks/useHeroData'

export function HeroSection() {
  const { config } = useHeroData()

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${config.currentBackground}')`,
        }}
      />

      {/* Overlay for text clarity */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-end pb-16 md:pb-24">
        {/* Main Title */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in-up">
          {config.heroContent.title}
        </h1>

        {/* Subtitle */}
        <p className="text-white text-lg md:text-xl mb-6 animate-fade-in-up animation-delay-100">
          日中コーヒービジネスの新基準
        </p>

        {/* Description */}
        <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
          北京で磨いた焙煎技術と、日本の品質管理を融合。
          <br />
          両国の架け橋として、コーヒー文化の発展に貢献します。
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
          <Link href="/about">
            <button className="px-8 py-3 bg-black/80 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-black transition-all duration-300">
              私たちについて
            </button>
          </Link>
          <Link href="/coffee">
            <button className="px-8 py-3 bg-black/80 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-black transition-all duration-300">
              サービス詳細
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
