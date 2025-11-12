# API参考文档

> 内部API端点和数据结构

## API端点总览

| 端点 | 方法 | 说明 | 状态 |
|------|------|------|------|
| `/api/hero-config` | GET | 获取Hero配置 | ✅ 已实现 |
| `/api/cloudinary/images` | GET | 获取图片列表 | 📝 计划中 |
| `/api/hero-config` | POST | 保存Hero配置 | 📝 计划中 |

## Hero配置API

### GET /api/hero-config

#### 说明
获取首页Hero区域配置数据

#### 请求
```http
GET /api/hero-config HTTP/1.1
Host: localhost:3000
```

#### 响应
```json
{
  "title": "日中間のコーヒービジネスを探索する",
  "subtitle": "品質と信頼で結ぶ、新しいコーヒー体験",
  "cta_text": "詳しく見る",
  "cta_link": "/about",
  "background_image": "/images/hero-bg.jpg"
}
```

#### 数据类型
```typescript
interface HeroConfig {
  title: string
  subtitle: string
  cta_text: string
  cta_link: string
  background_image?: string
}
```

#### 实现
```typescript
// app/api/hero-config/route.ts
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      'content',
      'hero',
      'config.md'
    )
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { data } = matter(fileContent)

    return Response.json(data)
  } catch (error) {
    console.error('Failed to read hero config:', error)
    return Response.json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    )
  }
}
```

#### 错误响应
```json
{
  "error": "Failed to load configuration"
}
```

#### 使用示例
```typescript
// 客户端调用
const response = await fetch('/api/hero-config')
const config = await response.json()

// 服务端调用
const config = await fetch(
  `http://localhost:3000/api/hero-config`
).then(res => res.json())
```

## Cloudinary图片API

### GET /api/cloudinary/images

#### 说明
获取Cloudinary图片列表

#### 状态
📝 计划中

#### 请求
```http
GET /api/cloudinary/images?folder=notrace&limit=100 HTTP/1.1
Host: localhost:3000
```

#### 查询参数
| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| folder | string | 文件夹路径 | notrace |
| limit | number | 返回数量 | 100 |
| offset | number | 偏移量 | 0 |

#### 响应
```json
{
  "resources": [
    {
      "public_id": "notrace/sample",
      "format": "jpg",
      "width": 1920,
      "height": 1080,
      "secure_url": "https://res.cloudinary.com/.../sample.jpg",
      "created_at": "2025-01-12T00:00:00Z",
      "bytes": 245678
    }
  ],
  "total_count": 42
}
```

#### 数据类型
```typescript
interface CloudinaryImage {
  public_id: string
  format: string
  width: number
  height: number
  secure_url: string
  created_at: string
  bytes: number
}

interface CloudinaryResponse {
  resources: CloudinaryImage[]
  total_count: number
}
```

#### 实现 (计划)
```typescript
// app/api/cloudinary/images/route.ts
import cloudinary from '@/lib/cloudinary'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const folder = searchParams.get('folder') || 'notrace'
  const limit = parseInt(searchParams.get('limit') || '100')
  const offset = parseInt(searchParams.get('offset') || '0')

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: limit,
      next_cursor: offset > 0 ? 'cursor_string' : undefined,
    })

    return Response.json({
      resources: result.resources,
      total_count: result.total_count,
    })
  } catch (error) {
    console.error('Cloudinary API Error:', error)
    return Response.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}
```

### POST /api/cloudinary/upload

#### 说明
上传图片到Cloudinary

#### 状态
📝 计划中

#### 请求
```http
POST /api/cloudinary/upload HTTP/1.1
Host: localhost:3000
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="file"; filename="image.jpg"
Content-Type: image/jpeg

[binary data]
--boundary--
```

#### 响应
```json
{
  "public_id": "notrace/image_abc123",
  "secure_url": "https://res.cloudinary.com/.../image_abc123.jpg",
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "bytes": 245678
}
```

#### 实现 (计划)
```typescript
// app/api/cloudinary/upload/route.ts
import cloudinary from '@/lib/cloudinary'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'notrace' },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    return Response.json(result)
  } catch (error) {
    console.error('Upload error:', error)
    return Response.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
```

## Hero保存API

### POST /api/hero-config

#### 说明
保存Hero配置到文件

#### 状态
📝 计划中

#### 请求
```http
POST /api/hero-config HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "title": "新标题",
  "subtitle": "新副标题",
  "cta_text": "按钮文字",
  "cta_link": "/link"
}
```

#### 请求体
```typescript
interface HeroConfigUpdate {
  title: string
  subtitle: string
  cta_text: string
  cta_link: string
  background_image?: string
}
```

#### 响应
```json
{
  "success": true,
  "message": "Configuration saved successfully"
}
```

#### 实现 (计划)
```typescript
// app/api/hero-config/route.ts
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function POST(request: Request) {
  try {
    const config = await request.json()

    // 验证数据
    if (!config.title || !config.subtitle) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 构建Markdown内容
    const content = matter.stringify('', config)

    // 写入文件
    const filePath = path.join(
      process.cwd(),
      'content',
      'hero',
      'config.md'
    )
    await fs.writeFile(filePath, content, 'utf8')

    return Response.json({
      success: true,
      message: 'Configuration saved successfully',
    })
  } catch (error) {
    console.error('Failed to save config:', error)
    return Response.json(
      { error: 'Failed to save configuration' },
      { status: 500 }
    )
  }
}
```

## 外部API (Medusa)

### 商品列表

#### 端点
```
GET ${SHOP_API_URL}/store/products
```

#### 查询参数
| 参数 | 类型 | 说明 |
|------|------|------|
| limit | number | 返回数量 (默认10) |
| offset | number | 偏移量 (默认0) |
| collection_id[] | string | 分类ID筛选 |

#### 响应结构
```typescript
interface MedusaProductsResponse {
  products: MedusaProduct[]
  count: number
  limit: number
  offset: number
}
```

#### 详见
[外部集成文档](../02-architecture/integrations.md#medusa-商城集成)

## 数据验证

### Zod Schema示例

```typescript
import { z } from 'zod'

// Hero配置验证
export const HeroConfigSchema = z.object({
  title: z.string().min(1).max(100),
  subtitle: z.string().min(1).max(200),
  cta_text: z.string().min(1).max(50),
  cta_link: z.string().url(),
  background_image: z.string().url().optional(),
})

// 使用
export async function POST(request: Request) {
  const body = await request.json()
  const result = HeroConfigSchema.safeParse(body)

  if (!result.success) {
    return Response.json(
      { error: result.error.errors },
      { status: 400 }
    )
  }

  // 处理有效数据
  const config = result.data
}
```

## 错误处理

### 标准错误格式

```typescript
interface APIError {
  error: string
  details?: any
  code?: string
}
```

### HTTP状态码

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未认证 |
| 403 | Forbidden | 无权限 |
| 404 | Not Found | 资源不存在 |
| 500 | Internal Server Error | 服务器错误 |

### 错误处理示例

```typescript
export async function GET() {
  try {
    // 业务逻辑
    const data = await fetchData()
    return Response.json(data)
  } catch (error) {
    console.error('API Error:', error)

    // 区分错误类型
    if (error instanceof ValidationError) {
      return Response.json(
        { error: 'Invalid input', details: error.message },
        { status: 400 }
      )
    }

    if (error instanceof NotFoundError) {
      return Response.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    // 默认服务器错误
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## 缓存策略

### Next.js缓存

```typescript
// 静态数据,构建时生成
export const dynamic = 'force-static'

// 动态数据,每次请求
export const dynamic = 'force-dynamic'

// 定时重新验证 (60秒)
export const revalidate = 60

// fetch级别缓存
fetch(url, {
  next: { revalidate: 60 }
})
```

### 缓存头

```typescript
export async function GET() {
  const data = await fetchData()

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  })
}
```

## 测试示例

### API测试 (curl)

```bash
# GET请求
curl http://localhost:3000/api/hero-config

# POST请求
curl -X POST http://localhost:3000/api/hero-config \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Title",
    "subtitle": "Test Subtitle",
    "cta_text": "Click",
    "cta_link": "/test"
  }'
```

### 集成测试 (计划)

```typescript
// __tests__/api/hero-config.test.ts
import { GET, POST } from '@/app/api/hero-config/route'

describe('/api/hero-config', () => {
  describe('GET', () => {
    it('returns hero configuration', async () => {
      const response = await GET()
      const data = await response.json()

      expect(data).toHaveProperty('title')
      expect(data).toHaveProperty('subtitle')
    })
  })

  describe('POST', () => {
    it('saves hero configuration', async () => {
      const request = new Request('http://localhost/api/hero-config', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test',
          subtitle: 'Test',
          cta_text: 'Click',
          cta_link: '/test',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.success).toBe(true)
    })
  })
})
```

---

**最后更新**: 2025-01-12
