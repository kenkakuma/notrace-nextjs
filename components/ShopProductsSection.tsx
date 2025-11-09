'use client'

interface Product {
  id: number
  name: string
  price: number
  category: string
  badge?: string
  image: string
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Sibarist FLAT 2 FAST Coffee Filter',
    price: 3630,
    category: '焙煎機',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop',
  },
  {
    id: 2,
    name: '北京ブレンド プレミアムコーヒー豆',
    price: 2800,
    category: 'コーヒー豆',
    badge: 'NEW',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600',
  },
  {
    id: 3,
    name: 'プロフェッショナルグラインダー',
    price: 45000,
    category: 'グラインダー',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600',
  },
  {
    id: 4,
    name: '限定版 ハンドドリップセット',
    price: 12800,
    category: 'ハンドドリップ',
    badge: 'NEW',
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
  },
  {
    id: 5,
    name: 'Hario V60 ドリッパーセット',
    price: 4800,
    category: 'HARIO',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=800&fit=crop',
  },
  {
    id: 6,
    name: 'プロフェッショナル エスプレッソマシン',
    price: 89000,
    category: 'エスプレッソ',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop',
  },
  {
    id: 7,
    name: 'ミルクスチーマー フォームマスター',
    price: 15600,
    category: 'ミルクスチーマー',
    badge: 'NEW',
    image:
      'https://images.unsplash.com/photo-1591958911259-bee2173bdcdc?w=800&h=800&fit=crop',
  },
  {
    id: 8,
    name: 'デジタル コーヒースケール',
    price: 6800,
    category: 'スケール',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop',
  },
  {
    id: 9,
    name: 'アートイザン グーズネック ケトル',
    price: 18900,
    category: 'ケトル',
    badge: 'NEW',
    image:
      'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=800&h=800&fit=crop',
  },
]

const CATEGORIES = [
  '海外ブランド',
  '国内ブランド',
  '焙煎機',
  'コーヒー豆',
  'グラインダー',
  'ハンドドリップ',
  'エスプレッソ',
  'ミルクスチーマー',
  'スケール',
  'ケトル',
]

export function ShopProductsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-text-dark mb-6">
              商品カテゴリー
            </h2>
            <ul className="space-y-3">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <button className="text-text-secondary hover:text-primary transition-colors text-left">
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                        {product.badge}
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium text-text-secondary">
                      {product.category}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-text-dark mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-xl font-bold text-text-dark">
                        ¥{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-text-secondary">から</span>
                    </div>
                    <button className="w-full py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                      + カートに追加
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
