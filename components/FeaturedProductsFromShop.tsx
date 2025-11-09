'use client'

import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

const SHOP_API_URL = process.env.NEXT_PUBLIC_SHOP_API_URL || 'http://localhost:9000'
const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || 'http://localhost:8000'

interface Product {
  id: string
  title: string
  handle: string
  thumbnail?: string
  description?: string
  variants?: Array<{
    id: string
    prices?: Array<{
      amount: number
      currency_code: string
    }>
  }>
}

export function FeaturedProductsFromShop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        // 调用Medusa API获取产品
        const response = await fetch(`${SHOP_API_URL}/store/products?limit=6`, {
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
  }, [])

  // 格式化价格
  const formatPrice = (product: Product) => {
    if (!product.variants?.[0]?.prices?.[0]) return '価格未定'

    const price = product.variants[0].prices[0]
    const amount = price.amount / 100 // Medusa以分为单位
    const currency = price.currency_code.toUpperCase()

    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      CNY: '¥',
      JPY: '¥',
    }

    return `${symbols[currency] || currency} ${amount.toFixed(2)}`
  }

  // 获取产品图片URL
  const getImageUrl = (thumbnail?: string) => {
    if (!thumbnail) return '/images/placeholder-product.svg'

    // 如果是完整URL,直接返回
    if (thumbnail.startsWith('http')) return thumbnail

    // 如果是相对路径,拼接shop URL
    return `${SHOP_URL}${thumbnail}`
  }

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              厳選コーヒー
            </h2>
            <p className="text-lg text-text-secondary">
              読み込み中...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 md:py-24">
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
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
            厳選コーヒー
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            世界各地から厳選されたプレミアムコーヒー豆をご紹介します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <a
              key={product.id}
              href={`${SHOP_URL}/products/${product.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* 产品图片 */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl(product.thumbnail)}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/placeholder-product.svg'
                  }}
                />
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* 产品信息 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {product.description || 'プレミアムコーヒー豆'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">
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

        {/* 查看更多按钮 */}
        <div className="text-center mt-12">
          <a
            href={`${SHOP_URL}/products`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-text-dark text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            すべての商品を見る
          </a>
        </div>
      </div>
    </section>
  )
}
