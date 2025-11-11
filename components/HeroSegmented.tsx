'use client'

import Link from 'next/link'
import { useHeroData } from '@/hooks/useHeroData'

export function HeroSegmented() {
  const { config } = useHeroData()

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-black ml-[calc(-50vw+50%)]">
      {/* Background Image - Full Screen */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('${config.currentBackground}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay for text clarity */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">

      {/* Content Wrapper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
        {/* Main Title - 简洁大气 */}
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight tracking-tight animate-fade-in-up">
          日中コーヒー商業橋
        </h1>

        {/* English Subtitle */}
        <p className="text-white/80 text-base md:text-lg mb-8 animate-fade-in-up animation-delay-100">
          The Japan-China Coffee Business Bridge
        </p>

        {/* Value Proposition - 精简 */}
        <p className="text-white/70 text-sm md:text-base mb-12 leading-relaxed animate-fade-in-up animation-delay-150">
          北京焙煎専門技術 × 日本品質管理
        </p>

        {/* User Segmentation - 简洁按钮式 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 animate-fade-in-up animation-delay-200">
          {/* Label */}
          <span className="text-white/60 text-sm">あなたに合ったサービスを選択：</span>

          {/* Two Simple Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* B2B Button */}
            <Link href="/coffee">
              <button className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-[#E17B47] hover:border-[#E17B47] transition-all duration-300 min-w-[160px]">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-medium">企業のお客様</span>
                  <span className="text-xs text-white/70 group-hover:text-white/90">Business</span>
                </div>
              </button>
            </Link>

            {/* B2C Button */}
            <Link href="/shop">
              <button className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-[#E17B47] hover:border-[#E17B47] transition-all duration-300 min-w-[160px]">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-medium">コーヒー愛好者</span>
                  <span className="text-xs text-white/70 group-hover:text-white/90">Enthusiast</span>
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* Services Overview - 极简展示 */}
        <div className="grid grid-cols-2 gap-8 max-w-2xl text-white/50 text-xs md:text-sm animate-fade-in-up animation-delay-250">
          <div className="text-left">
            <p className="mb-1">貿易・OEM</p>
            <p className="mb-1">品質管理</p>
            <p>展示サービス</p>
          </div>
          <div className="text-left">
            <p className="mb-1">設備・器具</p>
            <p className="mb-1">コミュニティ</p>
            <p>イベント</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-white/40 text-xs mt-12 animate-fade-in-up animation-delay-300">
          両国の架け橋として、コーヒー文化の発展に貢献します
        </p>
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
