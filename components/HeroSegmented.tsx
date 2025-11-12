'use client'

import Link from 'next/link'
import { useHeroData } from '@/hooks/useHeroData'

export function HeroSegmented() {
  const { config } = useHeroData()

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Japanese Book-Style Layout: Left Text, Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center items-center space-y-8 order-2 lg:order-1 text-center min-h-[500px] lg:min-h-[600px]">
            {/* Small Label */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-primary/30"></div>
              <span className="text-primary/70 text-xs tracking-[0.3em] uppercase">
                No Trace Explorer
              </span>
              <div className="h-px w-12 bg-primary/30"></div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="font-noto-serif-jp text-2xl md:text-3xl font-medium text-text-dark leading-tight tracking-tight">
                無迹探索株式会社
              </h1>
              <p className="text-sm md:text-base text-text-secondary/80 leading-relaxed">
                The Japan-China Coffee Business Bridge
              </p>
            </div>

            {/* Divider */}
            <div className="w-16 h-px bg-primary/30"></div>

            {/* Value Proposition */}
            <div className="space-y-3">
              <p className="font-noto-serif-jp text-base md:text-lg text-text-dark leading-relaxed">
                北京焙煎専門技術 × 日本品質管理
              </p>
              <p className="text-sm text-text-secondary/80 leading-loose max-w-md mx-auto">
                北京の直火焙煎カフェで培った専門技術と、日本の厳格な品質管理基準を融合させた、日中両国をつなぐコーヒー商社です。
              </p>
            </div>

            {/* Services Preview - Minimalist */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-text-secondary/60 max-w-md mx-auto">
              <div>貿易・OEM</div>
              <div>設備・器具</div>
              <div>品質管理</div>
              <div>コミュニティ</div>
              <div>展示サービス</div>
              <div>イベント</div>
            </div>
          </div>

          {/* Right Side - Image + Buttons */}
          <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2 min-h-[500px] lg:min-h-[600px] lg:mt-[80px]">
            {/* Image Container with subtle border and rounded corners */}
            <div className="relative aspect-[4/3] overflow-hidden border border-primary/10 rounded-md group">
              <img
                src={config.currentBackground}
                alt="NO TRACE EXPLORATION"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Service Selection - Below Image, aligned with image width */}
            <div className="space-y-4">
              {/* Label */}
              <p className="text-xs text-text-secondary/70 tracking-wide">
                サービスを選択：
              </p>

              {/* Two Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {/* Business Button */}
                <Link href="/coffee">
                  <button className="group w-full py-4 px-6 border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-sm">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-noto-serif-jp text-sm font-medium text-text-dark">
                        企業のお客様
                      </span>
                      <span className="text-xs text-text-secondary/60 tracking-wider">
                        Business
                      </span>
                    </div>
                  </button>
                </Link>

                {/* Enthusiast Button */}
                <Link href="/shop">
                  <button className="group w-full py-4 px-6 border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-sm">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-noto-serif-jp text-sm font-medium text-text-dark">
                        コーヒー愛好者
                      </span>
                      <span className="text-xs text-text-secondary/60 tracking-wider">
                        Enthusiast
                      </span>
                    </div>
                  </button>
                </Link>
              </div>

              {/* Tagline */}
              <p className="text-xs text-text-secondary/50 text-center mt-4 leading-relaxed">
                両国の架け橋として、コーヒー文化の発展に貢献します
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-5 h-5 text-primary/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
