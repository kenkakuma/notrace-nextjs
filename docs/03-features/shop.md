# 商城集成方案

> Medusa商城API集成和商品展示

## 架构设计

### 双项目独立架构

```
用户访问
    ↓
┌─────────────────────────────────────┐
│  主站 (notrace-nextjs)               │
│  - 商品浏览 (LAB页面)                │
│  - 精选商品展示 (首页)               │
│  - 商城入口引导                      │
│  Port: 3000                          │
└────────────┬────────────────────────┘
             │ API调用
             ▼
┌─────────────────────────────────────┐
│  商城后端 (Medusa)                   │
│  - 商品数据API                       │
│  - 分类管理                          │
│  Port: 9000                          │
└─────────────────────────────────────┘
             ▲
             │ API调用
┌────────────┴────────────────────────┐
│  商城前端 (nteshop-storefront)       │
│  - 购物车                            │
│  - 结账流程                          │
│  - 订单管理                          │
│  Port: 8000                          │
└─────────────────────────────────────┘
```

### 设计理念

| 原则 | 说明 | 优势 |
|------|------|------|
| 职责分离 | 主站=展示,商城=交易 | 维护简单 |
| 技术独立 | 各自技术栈 | 灵活升级 |
| 数据解耦 | API调用获取数据 | 无需同步 |
| 部署独立 | 独立部署扩展 | 性能优化 |

## 功能模块

### 1. 首页商城入口

#### 位置
```
首页 → 商城入口区块 (ShopEntranceSection)
```

#### 组件
```typescript
// components/ShopEntranceSection.tsx
export default function ShopEntranceSection() {
  return (
    <Section variant="gradient">
      <Container>
        <div className="text-center">
          <h2>NO TRACE SHOP</h2>
          <p>厳選されたコーヒー商品</p>
          <a href={process.env.NEXT_PUBLIC_SHOP_URL}>
            ショップへ移動
          </a>
        </div>
      </Container>
    </Section>
  )
}
```

### 2. 首页精选商品

#### 规格
```yaml
展示数量: 6个商品
排序: 最新商品优先
布局: 3列网格 (响应式)
组件: FeaturedProductsFromShop
```

#### 实现
```typescript
// components/FeaturedProductsFromShop.tsx
export default async function FeaturedProductsFromShop() {
  const products = await getProducts(6)

  return (
    <Section>
      <Container>
        <h2>精選商品</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

### 3. LAB商品展示页

#### 页面路由
```
/lab → LAB商品展示页
```

#### 功能
| 功能 | 说明 |
|------|------|
| 全部商品 | 显示所有商品 |
| 分类筛选 | 按collection筛选 |
| 响应式布局 | 移动端友好 |
| 商城跳转 | 点击跳转商城详情 |

#### 组件结构
```typescript
// app/lab/page.tsx
export default async function LabPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ])

  return (
    <main>
      <LabHeroSection />
      <LabProductsSection
        products={products}
        collections={collections}
      />
    </main>
  )
}
```

## API集成

### 数据获取函数

#### lib/medusa.ts
```typescript
const SHOP_API_URL = process.env.NEXT_PUBLIC_SHOP_API_URL

// 获取商品列表
export async function getProducts(limit = 50) {
  try {
    const response = await fetch(
      `${SHOP_API_URL}/store/products?limit=${limit}`,
      { next: { revalidate: 60 } }  // 缓存60秒
    )

    if (!response.ok) throw new Error('Failed to fetch')

    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error('Medusa API Error:', error)
    return []
  }
}

// 按分类获取商品
export async function getProductsByCollection(collectionId: string) {
  try {
    const response = await fetch(
      `${SHOP_API_URL}/store/products?collection_id[]=${collectionId}`,
      { next: { revalidate: 60 } }
    )

    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// 获取分类列表
export async function getCollections() {
  try {
    const response = await fetch(
      `${SHOP_API_URL}/store/collections`,
      { next: { revalidate: 300 } }  // 缓存5分钟
    )

    const data = await response.json()
    return data.collections || []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}
```

### 数据类型

#### types/medusa.ts
```typescript
export interface MedusaProduct {
  id: string
  title: string
  description: string | null
  thumbnail: string | null
  handle: string
  collection?: {
    id: string
    title: string
  }
  variants: MedusaVariant[]
}

export interface MedusaVariant {
  id: string
  title: string
  prices: MedusaPrice[]
}

export interface MedusaPrice {
  amount: number
  currency_code: string
}

export interface MedusaCollection {
  id: string
  title: string
  handle: string
}
```

## 组件实现

### ProductCard 商品卡片

```typescript
// components/ProductCard.tsx
interface ProductCardProps {
  product: MedusaProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL
  const price = product.variants[0]?.prices[0]?.amount || 0
  const formattedPrice = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(price / 100)

  return (
    <a
      href={`${shopUrl}/products/${product.handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl
                      transition-all duration-300 overflow-hidden">
        {/* 图片 */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          {product.thumbnail ? (
            <OptimizedImage
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105
                        transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center
                            text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* 内容 */}
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-text-dark
                        line-clamp-2 group-hover:text-primary
                        transition-colors">
            {product.title}
          </h3>

          {product.description && (
            <p className="text-sm text-text-secondary line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-primary">
              {formattedPrice}
            </span>

            {product.collection && (
              <span className="text-xs text-text-secondary
                              px-2 py-1 bg-bg-light rounded">
                {product.collection.title}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}
```

### LabProductsSection 分类筛选

```typescript
'use client'

import { useState } from 'react'

interface LabProductsSectionProps {
  products: MedusaProduct[]
  collections: MedusaCollection[]
}

export default function LabProductsSection({
  products,
  collections,
}: LabProductsSectionProps) {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)

  const filteredProducts = selectedCollection
    ? products.filter(p => p.collection?.id === selectedCollection)
    : products

  return (
    <Section>
      <Container size="large">
        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setSelectedCollection(null)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !selectedCollection
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-dark hover:bg-gray-200'
            }`}
          >
            全て
          </button>

          {collections.map(collection => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCollection === collection.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-dark hover:bg-gray-200'
              }`}
            >
              {collection.title}
            </button>
          ))}
        </div>

        {/* 商品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-text-secondary">
              商品が見つかりませんでした
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
```

## 状态处理

### 加载状态

```typescript
// app/lab/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12
                        border-b-2 border-primary mx-auto mb-4" />
        <p className="text-text-secondary">読み込み中...</p>
      </div>
    </div>
  )
}
```

### 错误状态

```typescript
// app/lab/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-text-dark">
          エラーが発生しました
        </h2>
        <p className="text-text-secondary">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-lg
                    hover:bg-primary/90 transition-colors"
        >
          再試行
        </button>
      </div>
    </div>
  )
}
```

### 空状态

```typescript
{products.length === 0 && (
  <div className="text-center py-12">
    <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-text-dark mb-2">
      商品がありません
    </h3>
    <p className="text-text-secondary">
      商品が追加されるまでお待ちください
    </p>
  </div>
)}
```

## 性能优化

### 缓存策略

```typescript
// 商品数据缓存60秒
export const revalidate = 60

// 或使用fetch缓存
fetch(url, {
  next: { revalidate: 60 }
})
```

### 图片优化

```typescript
// 使用Next.js Image优化
<Image
  src={thumbnail}
  alt={title}
  width={400}
  height={400}
  quality={80}
  placeholder="blur"
  blurDataURL="/images/placeholder.jpg"
/>
```

### 并行请求

```typescript
// 并行获取数据
const [products, collections] = await Promise.all([
  getProducts(),
  getCollections(),
])
```

## 环境配置

### 开发环境

```bash
# .env.local
NEXT_PUBLIC_SHOP_API_URL=http://localhost:9000
NEXT_PUBLIC_SHOP_URL=http://localhost:8000
```

### 生产环境

```bash
# .env.production
NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp
```

## 监控和日志

### API调用监控

```typescript
export async function getProducts(limit = 50) {
  const startTime = Date.now()

  try {
    const response = await fetch(...)
    const data = await response.json()

    console.log(`Products fetched in ${Date.now() - startTime}ms`)
    return data.products
  } catch (error) {
    console.error('API Error:', {
      endpoint: '/store/products',
      duration: Date.now() - startTime,
      error: error.message,
    })
    return []
  }
}
```

## 测试建议

### 手动测试清单

| 测试项 | 步骤 | 预期结果 |
|--------|------|----------|
| 首页商品 | 访问首页 | 显示6个商品 |
| LAB全部商品 | 访问/lab | 显示所有商品 |
| 分类筛选 | 点击分类按钮 | 商品正确筛选 |
| 商城跳转 | 点击商品卡片 | 新标签打开商城 |
| 加载状态 | 网络限速 | 显示加载动画 |
| 错误处理 | 关闭商城后端 | 显示空状态 |

---

**最后更新**: 2025-01-12
