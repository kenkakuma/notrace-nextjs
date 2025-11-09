'use client'

export function ShopHeroSection() {
  return (
    <section className="py-20 bg-bg-light border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-4">
          ショップ | SHOP
        </h1>
        <p className="text-2xl text-primary font-semibold mb-4">
          プレミアムコーヒー器具セレクション
        </p>
        <p className="text-lg text-text-secondary mb-6">
          北京の老舗カフェで培われた経験と技術を基に
          <br />
          選び抜いた高品質なコーヒー機器をお届けします
        </p>

        {/* Development Notice */}
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-orange-50 border border-orange-200 rounded-lg text-primary text-sm">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            本ページは現在開発建設中です。表示されている商品はすべてテスト用サンプルとなります。
          </span>
        </div>
      </div>
    </section>
  )
}
