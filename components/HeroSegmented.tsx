'use client'

import Link from 'next/link'
import { useHeroData } from '@/hooks/useHeroData'

export function HeroSegmented() {
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
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
        {/* Main Title - 突出日中桥梁定位 */}
        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight animate-fade-in-up">
          日中コーヒー商業橋
        </h1>

        {/* English Subtitle */}
        <p className="text-white/90 text-xl md:text-2xl mb-3 animate-fade-in-up animation-delay-100">
          The Japan-China Coffee Business Bridge
        </p>

        {/* Value Proposition */}
        <p className="text-white/80 text-lg md:text-xl mb-12 max-w-3xl leading-relaxed animate-fade-in-up animation-delay-200">
          北京焙煎専門技術 × 日本品質管理
          <br className="hidden md:block" />
          Beijing Roasting Expertise × Japanese Quality Control
        </p>

        {/* User Segmentation - Two Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl animate-fade-in-up animation-delay-300">
          {/* B2B Path - 企業客戶 */}
          <Link href="/coffee">
            <div className="group relative bg-black/60 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 md:p-10 hover:bg-black/70 hover:border-[#E17B47] hover:scale-105 transition-all duration-300 cursor-pointer">
              {/* Icon/Badge */}
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-[#E17B47]/20 rounded-full flex items-center justify-center group-hover:bg-[#E17B47]/30 transition-colors">
                  <svg className="w-8 h-8 text-[#E17B47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">
                企業のお客様
              </h2>
              <p className="text-white/70 text-base mb-6">
                For Business
              </p>

              {/* Services List */}
              <ul className="text-white/80 text-base space-y-2 mb-6">
                <li className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">•</span>
                  貿易・OEM
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">•</span>
                  品質管理サービス
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">•</span>
                  展示・イベント
                </li>
              </ul>

              {/* CTA */}
              <div className="text-[#E17B47] font-medium text-lg group-hover:underline">
                詳しく見る →
              </div>
            </div>
          </Link>

          {/* B2C Path - 咖啡愛好者 */}
          <Link href="/lab">
            <div className="group relative bg-black/60 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 md:p-10 hover:bg-black/70 hover:border-[#E17B47] hover:scale-105 transition-all duration-300 cursor-pointer">
              {/* Icon/Badge */}
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-[#E17B47]/20 rounded-full flex items-center justify-center group-hover:bg-[#E17B47]/30 transition-colors">
                  <svg className="w-8 h-8 text-[#E17B47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">
                コーヒー愛好者
              </h2>
              <p className="text-white/70 text-base mb-6">
                For Enthusiasts
              </p>

              {/* Features List */}
              <ul className="text-white/80 text-base space-y-2 mb-6">
                <li className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">•</span>
                  設備・器具
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">•</span>
                  コミュニティ
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">•</span>
                  イベント参加
                </li>
              </ul>

              {/* CTA */}
              <div className="text-[#E17B47] font-medium text-lg group-hover:underline">
                商品を見る →
              </div>
            </div>
          </Link>
        </div>

        {/* Small Text Below Cards */}
        <p className="text-white/60 text-sm mt-8 animate-fade-in-up animation-delay-400">
          私たちは両国の架け橋として、コーヒー文化の発展に貢献します
        </p>
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
