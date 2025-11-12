# 外部服务集成

> Medusa、Cloudinary、Sveltia CMS集成说明

## 集成架构

```
┌──────────────────────────────────────────────┐
│         notrace-nextjs (主站)                 │
│         Port: 3000                            │
└────┬──────────┬──────────┬───────────────────┘
     │          │          │
     │ API      │ CDN      │ Git
     ▼          ▼          ▼
┌─────────┐ ┌──────────┐ ┌──────────────┐
│ Medusa  │ │Cloudinary│ │Sveltia CMS   │
│商城后端 │ │图片服务  │ │+ GitHub      │
│Port:9000│ │          │ │内容管理      │
└─────────┘ └──────────┘ └──────────────┘
```

## Medusa 商城集成

### 架构说明

| 组件 | 端口 | 职责 |
|------|------|------|
| notrace-nextjs | 3000 | 主站,展示商品 |
| nteshop-storefront | 8000 | 商城前端 |
| Medusa Backend | 9000 | 商城API |

### API端点

#### 商品列表
```typescript
// 端点
GET ${SHOP_API_URL}/store/products

// 参数
?limit=50                    // 限制数量
&offset=0                    // 偏移量
&collection_id[]={id}        // 按分类筛选

// 响应
{
  products: Array<{
    id: string
    title: string
    description: string
    thumbnail: string
    handle: string
    collection: {
      id: string
      title: string
    }
    variants: Array<{
      prices: Array<{
        amount: number
        currency_code: string
      }>
    }>
  }>
  count: number
  limit: number
  offset: number
}
```

#### 商品分类
```typescript
// 端点
GET ${SHOP_API_URL}/store/collections

// 响应
{
  collections: Array<{
    id: string
    title: string
    handle: string
  }>
}
```

### 环境变量

```bash
# 开发环境
NEXT_PUBLIC_SHOP_API_URL=http://localhost:9000
NEXT_PUBLIC_SHOP_URL=http://localhost:8000

# 生产环境
NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp
```

### 数据类型定义

```typescript
// types/medusa.ts
export interface MedusaProduct {
  id: string
  title: string
  description: string
  thumbnail: string
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

### 使用示例

#### 获取商品列表
```typescript
// lib/medusa.ts
export async function getProducts(limit = 50) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SHOP_API_URL}/store/products?limit=${limit}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await response.json()
  return data.products
}
```

#### 按分类获取商品
```typescript
export async function getProductsByCollection(collectionId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SHOP_API_URL}/store/products?collection_id[]=${collectionId}`
  )

  const data = await response.json()
  return data.products
}
```

#### 获取分类列表
```typescript
export async function getCollections() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SHOP_API_URL}/store/collections`
  )

  const data = await response.json()
  return data.collections
}
```

### CORS配置

#### Medusa后端配置
```javascript
// nteshop/medusa-config.js
module.exports = {
  projectConfig: {
    store_cors: process.env.STORE_CORS || "http://localhost:3000",
    admin_cors: process.env.ADMIN_CORS || "http://localhost:7001",
  }
}
```

#### 环境变量
```bash
# nteshop/.env
STORE_CORS=http://localhost:3000
```

### 错误处理

```typescript
export async function getProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SHOP_API_URL}/store/products`
    )

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Medusa API Error:', error)
    return { products: [] }  // 返回空数组
  }
}
```

## Cloudinary 集成

### 配置

#### 环境变量
```bash
# 公开配置 (前端使用)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# 私有配置 (后端上传)
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### SDK初始化
```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary
```

### 图片组件

#### CldImage使用
```typescript
import { CldImage } from 'next-cloudinary'

export default function ImageExample() {
  return (
    <CldImage
      src="sample"                    // Public ID
      width={800}
      height={600}
      alt="描述"
      crop="fill"                     // 裁剪模式
      gravity="auto"                  // 智能焦点
    />
  )
}
```

#### 变换参数
```typescript
<CldImage
  src="sample"
  width={800}
  height={600}
  crop="fill"           // fill | fit | crop | scale
  gravity="auto"        // auto | face | center
  quality="auto"        // auto | 1-100
  format="auto"         // auto | webp | jpg | png
  fetchFormat="auto"    // 自动格式选择
/>
```

### URL构建

#### 直接URL
```typescript
// https://res.cloudinary.com/{cloud}/image/upload/{transformations}/{publicId}

const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_800,h_600,c_fill/${publicId}`
```

#### SDK构建
```typescript
import cloudinary from '@/lib/cloudinary'

const url = cloudinary.url('sample', {
  width: 800,
  height: 600,
  crop: 'fill',
  quality: 'auto',
  fetch_format: 'auto',
})
```

### 图片上传

#### Server Action
```typescript
'use server'

import cloudinary from '@/lib/cloudinary'

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'notrace' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(buffer)
  })
}
```

#### 客户端调用
```typescript
'use client'

export default function UploadForm() {
  async function handleSubmit(formData: FormData) {
    const result = await uploadImage(formData)
    console.log('Uploaded:', result)
  }

  return (
    <form action={handleSubmit}>
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  )
}
```

### 图片管理

#### 列出图片
```typescript
import cloudinary from '@/lib/cloudinary'

export async function listImages(folder = 'notrace') {
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: folder,
    max_results: 100,
  })

  return result.resources
}
```

#### 删除图片
```typescript
export async function deleteImage(publicId: string) {
  const result = await cloudinary.uploader.destroy(publicId)
  return result
}
```

## Sveltia CMS 集成

### 配置文件

#### public/admin/config.yml
```yaml
# 后端配置
backend:
  name: github
  repo: owner/repo
  branch: main

# 媒体库配置
media_folder: public/images
public_folder: /images

# 内容集合
collections:
  - name: articles
    label: 企業文章
    folder: content/articles
    create: true
    slug: "{{slug}}"
    fields:
      - { name: title, label: タイトル, widget: string }
      - { name: description, label: 説明, widget: text }
      - { name: publishedAt, label: 公開日, widget: datetime }
      - { name: category, label: カテゴリ, widget: select, options: [...] }
      - { name: body, label: 本文, widget: markdown }

  - name: news
    label: ニュース
    folder: content/news
    create: true
    fields:
      # 同上
```

### GitHub配置

#### OAuth App设置
1. 访问 GitHub Settings → Developer settings → OAuth Apps
2. 创建新应用
3. 配置:
   ```
   Application name: Sveltia CMS
   Homepage URL: https://your-site.com
   Authorization callback URL: https://your-site.com/admin/cms
   ```
4. 获取 Client ID 和 Secret

#### 环境变量
```bash
GITHUB_TOKEN=your_github_token
```

### 集成到Next.js

#### CMS页面
```typescript
// app/admin/cms/page.tsx
export default function CMSPage() {
  return (
    <div className="h-screen">
      <iframe
        src="/admin/"
        className="w-full h-full border-0"
        title="Sveltia CMS"
      />
    </div>
  )
}
```

#### 静态文件
```
public/
└── admin/
    ├── index.html      # Sveltia CMS入口
    └── config.yml      # 配置文件
```

### Contentlayer集成

#### 自动处理
```typescript
// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `articles/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    // ...
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Article, News],
})
```

#### 数据使用
```typescript
// CMS编辑 → Git commit → Contentlayer处理 → 自动更新

import { allArticles } from 'contentlayer/generated'

export default function ArticlesPage() {
  return (
    <div>
      {allArticles.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  )
}
```

## 集成监控

### 健康检查

#### Medusa API
```typescript
export async function checkMedusaHealth() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SHOP_API_URL}/health`,
      { method: 'HEAD' }
    )
    return response.ok
  } catch {
    return false
  }
}
```

#### Cloudinary
```typescript
export async function checkCloudinaryHealth() {
  try {
    await cloudinary.api.ping()
    return true
  } catch {
    return false
  }
}
```

### 错误恢复

#### 降级策略
```typescript
// 商品获取失败 → 显示占位符
const products = await getProducts().catch(() => [])

// 图片加载失败 → 显示默认图片
<Image
  src={thumbnail || '/images/placeholder.jpg'}
  onError={(e) => {
    e.currentTarget.src = '/images/placeholder.jpg'
  }}
/>
```

## 性能优化

### 缓存策略

#### Next.js缓存
```typescript
// 商品数据缓存60秒
export const revalidate = 60

export async function getProducts() {
  // 自动缓存
}
```

#### Cloudinary缓存
```typescript
// CDN缓存设置
<CldImage
  src="sample"
  deliveryType="fetch"
  // 浏览器缓存1天,CDN缓存1周
/>
```

### 并发请求

```typescript
// 并行获取数据
const [products, collections] = await Promise.all([
  getProducts(),
  getCollections(),
])
```

---

**最后更新**: 2025-01-12
