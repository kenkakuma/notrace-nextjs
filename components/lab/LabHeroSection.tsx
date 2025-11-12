'use client'

import { ShoppingBag, Package, Sparkles } from 'lucide-react'

const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || 'http://localhost:8000'

export function LabHeroSection() {
  return (
    <section className="py-24 md:py-32 ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* English Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Coffee Equipment</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          {/* Main Title */}
          <h1 className="font-noto-serif-jp text-2xl md:text-3xl lg:text-4xl font-medium text-text-dark mb-8 leading-relaxed drop-shadow-sm">
            設備・器具
          </h1>

          {/* Divider */}
          <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-primary/80 font-light mb-8 tracking-wide">
            プレミアムコーヒー器具セレクション
          </p>

          {/* Description */}
          <p className="text-sm md:text-base text-text-secondary/80 leading-loose max-w-2xl mx-auto mb-4">
            北京の老舗カフェで培われた経験と技術を基に
          </p>
          <p className="text-xs md:text-sm text-text-secondary/70 leading-loose max-w-xl mx-auto">
            選び抜いた高品質なコーヒー機器をお届けします
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 opacity-60">
              <Package className="w-10 h-10 text-primary/70" strokeWidth={1.5} />
            </div>
            <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
              プロ仕様器具
            </h3>
            <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
              バリスタレベルの抽出器具とアクセサリー
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 opacity-60">
              <Sparkles className="w-10 h-10 text-primary/70" strokeWidth={1.5} />
            </div>
            <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
              厳選コーヒー豆
            </h3>
            <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
              世界各地から選ばれたプレミアム品質の豆
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 opacity-60">
              <ShoppingBag className="w-10 h-10 text-primary/70" strokeWidth={1.5} />
            </div>
            <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
              グローバル配送
            </h3>
            <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
              世界13カ国にスピーディーにお届け
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-3 bg-primary/90 text-white font-light text-sm tracking-wide hover:bg-primary transition-all duration-300"
          >
            オンラインストアで購入
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <p className="mt-4 text-xs text-text-secondary/70">
            ※ オンラインストアは別ウィンドウで開きます
          </p>
        </div>
      </div>
    </section>
  )
}
