'use client'

import { ShoppingBag, Package, Sparkles } from 'lucide-react'

const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || 'http://localhost:8000'

export function LabHeroSection() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-bg-light to-primary/10">
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-28">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6">
            MUSEKI Coffee Shop
          </h1>

          <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
            プレミアムコーヒー器具セレクション
          </p>

          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
            北京の老舗カフェで培われた経験と技術を基に
            <br />
            選び抜いた高品質なコーヒー機器をお届けします
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-text-dark mb-2">
              プロ仕様器具
            </h3>
            <p className="text-sm text-text-secondary">
              バリスタレベルの
              <br />
              抽出器具とアクセサリー
            </p>
          </div>

          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-text-dark mb-2">
              厳選コーヒー豆
            </h3>
            <p className="text-sm text-text-secondary">
              世界各地から選ばれた
              <br />
              プレミアム品質の豆
            </p>
          </div>

          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-text-dark mb-2">
              グローバル配送
            </h3>
            <p className="text-sm text-text-secondary">
              世界13カ国に
              <br />
              スピーディーにお届け
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            オンラインストアで購入
            <ShoppingBag className="w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-text-secondary">
            ※ オンラインストアは別ウィンドウで開きます
          </p>
        </div>
      </div>
    </section>
  )
}
