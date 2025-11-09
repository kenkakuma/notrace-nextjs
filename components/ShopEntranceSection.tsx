'use client'

import Link from 'next/link'
import { ShoppingBag, Coffee, Package, Sparkles } from 'lucide-react'

const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || 'http://localhost:8000'

export function ShopEntranceSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-bg-light to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
            MUSEKI Coffee Shop
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-4">
            厳選されたコーヒー豆と器具を、世界中にお届けします
          </p>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            北京の焙煎技術と日本の品質管理が融合した、プレミアムコーヒー体験
          </p>
        </div>

        {/* 主要特性 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <Coffee className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-3">
              プレミアム豆
            </h3>
            <p className="text-text-secondary">
              世界各地から厳選された
              <br />
              最高品質のコーヒー豆
            </p>
          </div>

          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <Package className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-3">
              プロ仕様器具
            </h3>
            <p className="text-text-secondary">
              バリスタレベルの
              <br />
              抽出器具とアクセサリー
            </p>
          </div>

          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-3">
              グローバル配送
            </h3>
            <p className="text-text-secondary">
              世界13カ国に
              <br />
              スピーディーにお届け
            </p>
          </div>
        </div>

        {/* CTA按钮区域 */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-3">
                オンラインストアへ
                <ShoppingBag className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <Link
              href="/lab"
              className="px-10 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              商品を見る
            </Link>
          </div>
          <p className="mt-6 text-sm text-text-secondary">
            ※ オンラインストアは別ウィンドウで開きます
          </p>
        </div>

        {/* 提示信息 */}
        <div className="mt-16 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
              <span className="text-primary font-bold">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-text-dark mb-2">
                多言語・多通貨対応
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                オンラインストアは英語、中文、日本語の3ヶ国語に対応。
                EUR、CNY、USDの3通貨でお支払いいただけます。
                お客様の地域に最適な言語と通貨が自動的に選択されます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
