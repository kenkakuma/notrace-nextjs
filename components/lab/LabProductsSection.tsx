'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Filter } from 'lucide-react'

const SHOP_API_URL = process.env.NEXT_PUBLIC_SHOP_API_URL || 'http://localhost:9000'
const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || 'http://localhost:8000'

interface Product {
  id: string
  title: string
  handle: string
  thumbnail?: string
  description?: string
  collection?: {
    title: string
  }
  variants?: Array<{
    id: string
    prices?: Array<{
      amount: number
      currency_code: string
    }>
  }>
}

interface ProductCollection {
  id: string
  title: string
  handle: string
}

export function LabProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [collections, setCollections] = useState<ProductCollection[]>([])
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch collections
  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch(`${SHOP_API_URL}/store/collections`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch collections')
        }

        const data = await response.json()
        setCollections(data.collections || [])
      } catch (err) {
        console.error('Error fetching collections:', err)
      }
    }

    fetchCollections()
  }, [])

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        let url = `${SHOP_API_URL}/store/products?limit=50`

        if (selectedCollection) {
          url += `&collection_id[]=${selectedCollection}`
        }

        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('商品データの取得に失敗しました')
        }

        const data = await response.json()
        setProducts(data.products || [])
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('商品の読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCollection])

  // Format price
  const formatPrice = (product: Product) => {
    if (!product.variants?.[0]?.prices?.[0]) return '価格未定'

    const price = product.variants[0].prices[0]
    const amount = price.amount / 100
    const currency = price.currency_code.toUpperCase()

    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      CNY: '¥',
      JPY: '¥',
    }

    return `${symbols[currency] || currency} ${amount.toFixed(2)}`
  }

  // Get image URL
  const getImageUrl = (thumbnail?: string) => {
    if (!thumbnail) return '/images/placeholder-product.svg'
    if (thumbnail.startsWith('http')) return thumbnail
    return `${SHOP_URL}${thumbnail}`
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-12 bg-gray-50 rounded-2xl">
            <p className="text-text-secondary mb-4">{error}</p>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              オンラインストアで見る
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Collections Filter */}
          <div className="lg:col-span-1">
            <div className="bg-bg-light rounded-2xl p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-text-dark">
                  商品カテゴリー
                </h2>
              </div>

              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCollection(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                      selectedCollection === null
                        ? 'bg-primary text-white font-semibold'
                        : 'text-text-secondary hover:bg-white hover:text-primary'
                    }`}
                  >
                    すべての商品
                  </button>
                </li>
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <button
                      onClick={() => setSelectedCollection(collection.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                        selectedCollection === collection.id
                          ? 'bg-primary text-white font-semibold'
                          : 'text-text-secondary hover:bg-white hover:text-primary'
                      }`}
                    >
                      {collection.title}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Collection Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-text-secondary">
                  {products.length} 件の商品
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center p-12 bg-gray-50 rounded-2xl">
                <p className="text-text-secondary mb-4">
                  このカテゴリーには商品がありません
                </p>
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
                >
                  すべての商品を見る
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <a
                    key={product.id}
                    href={`${SHOP_URL}/products/${product.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={getImageUrl(product.thumbnail)}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/images/placeholder-product.svg'
                        }}
                      />
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </div>

                      {/* Collection Badge */}
                      {product.collection && (
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-text-secondary">
                          {product.collection.title}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-text-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {product.description || 'プレミアムコーヒー製品'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(product)}
                        </span>
                        <span className="text-sm text-text-secondary group-hover:text-primary transition-colors">
                          詳細を見る →
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* View All Button */}
            {!loading && products.length > 0 && (
              <div className="text-center mt-12">
                <a
                  href={`${SHOP_URL}/products`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-text-dark text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
                >
                  オンラインストアですべて見る
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
