'use client'

import Link from 'next/link'
import Image from 'next/image'
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
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
          {config.heroContent.title}
        </h1>

        {/* Description */}
        <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed whitespace-pre-line animate-fade-in-up animation-delay-100">
          {config.heroContent.description}
        </p>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          {/* Coffee Card */}
          <Link href={config.heroContent.button2Link}>
            <div className="bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary to-orange-600 px-6 py-4">
                <span className="text-white text-sm font-semibold">珈琲事業</span>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                  プレミアムコーヒー商品
                </h3>
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                  世界各地から厳選した高品質コーヒー豆を使用し、独自の焙煎技術で最高品質を実現します。
                </p>
                <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-text-dark transition-colors">
                  {config.heroContent.button2Text}
                </button>
              </div>
            </div>
          </Link>

          {/* Exhibition Card */}
          <Link href="/exhibition">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-orange-500 to-primary px-6 py-4">
                <span className="text-white text-sm font-semibold">展示・イベント</span>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                  文化・芸術企画運営
                </h3>
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                  中国現代アートから文化交流まで、革新的な展示とイベントを企画・運営いたします。
                </p>
                <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-text-dark transition-colors">
                  展示企画を見る
                </button>
              </div>
            </div>
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
