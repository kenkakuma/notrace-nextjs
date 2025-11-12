# 管理后台

> 统一管理仪表板使用指南

## 访问入口

```
URL: http://localhost:3000/admin
生产: https://your-domain.com/admin
```

## 功能模块

### 架构设计

```
/admin (管理后台入口)
  ├── CMS内容管理 (Tab 1)
  ├── 图片管理 (Tab 2)
  └── Hero管理 (Tab 3)
```

### Tab导航

| Tab | 功能 | 组件 |
|-----|------|------|
| CMS内容管理 | 编辑文章/新闻 | CMSPanel |
| 图片管理 | Cloudinary浏览 | ImageManagementPanel |
| Hero管理 | 首页Hero编辑 | HeroManagementPanel |

## 1. CMS内容管理

### 功能
- 创建/编辑/删除文章
- 创建/编辑/删除新闻
- Markdown实时预览
- Git版本控制

### 使用方法

#### 访问
```
/admin → 点击"CMS内容管理"Tab
```

#### 创建文章
```
1. 点击"企業文章"
2. 点击"新規作成"
3. 填写字段:
   - タイトル (必需)
   - 説明 (必需)
   - 公開日 (必需)
   - カテゴリ (选择)
   - 本文 (Markdown)
4. 点击"保存"
```

#### 编辑文章
```
1. 选择要编辑的文章
2. 修改内容
3. 预览效果
4. 保存 (自动Git commit)
```

#### 文章分类

| 值 | 日文 | 说明 |
|---|------|------|
| case-study | ケーススタディ | 案例研究 |
| market-insights | マーケットインサイト | 市场洞察 |
| innovation | イノベーション | 创新 |
| roasting-guide | 焙煎ガイド | 烘焙指南 |
| quality-control | 品質管理 | 质量管理 |
| business-tips | ビジネスヒント | 商业技巧 |

#### 新闻分类

| 值 | 日文 | 说明 |
|---|------|------|
| company | 企業ニュース | 企业新闻 |
| product | 製品発表 | 产品发布 |
| media | メディア掲載 | 媒体报道 |
| event | イベント情報 | 活动信息 |

### 技术实现

```typescript
// components/admin/CMSPanel.tsx
export default function CMSPanel() {
  return (
    <div className="h-[800px]">
      <iframe
        src="/admin/"
        className="w-full h-full border rounded-lg"
        title="Sveltia CMS"
      />
    </div>
  )
}
```

## 2. 图片管理

### 功能
- 浏览Cloudinary图片
- 查看图片URL
- 复制图片链接
- (计划) 上传新图片
- (计划) 删除图片

### 使用方法

#### 访问
```
/admin → 点击"图片管理"Tab
```

#### 浏览图片
```
1. 页面加载显示所有图片
2. 网格布局展示
3. 显示图片缩略图和信息
```

#### 复制图片URL
```
1. 找到需要的图片
2. 点击"Copy URL"按钮
3. URL复制到剪贴板
4. 粘贴到需要的地方
```

### 图片URL格式

```
https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}
```

### 技术实现

```typescript
// components/admin/ImageManagementPanel.tsx
'use client'

import { useEffect, useState } from 'react'

interface CloudinaryImage {
  public_id: string
  secure_url: string
  format: string
  width: number
  height: number
  created_at: string
}

export default function ImageManagementPanel() {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      // API调用获取图片列表
      const response = await fetch('/api/cloudinary/images')
      const data = await response.json()
      setImages(data.resources || [])
    } catch (error) {
      console.error('Failed to fetch images:', error)
    } finally {
      setLoading(false)
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    // 显示提示
  }

  if (loading) {
    return <div>読み込み中...</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map(image => (
        <div key={image.public_id} className="border rounded-lg p-4">
          <img
            src={image.secure_url}
            alt={image.public_id}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <p className="text-sm text-gray-600 truncate mb-2">
            {image.public_id}
          </p>
          <button
            onClick={() => copyUrl(image.secure_url)}
            className="w-full px-3 py-1 bg-primary text-white
                      rounded hover:bg-primary/90 transition-colors"
          >
            Copy URL
          </button>
        </div>
      ))}
    </div>
  )
}
```

### API端点 (计划)

```typescript
// app/api/cloudinary/images/route.ts
import cloudinary from '@/lib/cloudinary'

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'notrace',
      max_results: 100,
    })

    return Response.json({ resources: result.resources })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
```

## 3. Hero管理

### 功能
- 编辑Hero标题
- 编辑Hero副标题
- 编辑CTA按钮文字和链接
- 实时预览效果
- (计划) 保存到文件

### 使用方法

#### 访问
```
/admin → 点击"Hero管理"Tab
```

#### 编辑Hero
```
1. 页面加载当前Hero配置
2. 编辑表单字段:
   - タイトル (标题)
   - サブタイトル (副标题)
   - CTAボタンテキスト (按钮文字)
   - CTAボタンリンク (按钮链接)
3. 右侧实时预览效果
4. (当前) 点击"保存"仅前端预览
5. (计划) 保存到 content/hero/config.md
```

### Hero配置格式

```yaml
# content/hero/config.md
---
title: "日中間のコーヒービジネスを探索する"
subtitle: "品質と信頼で結ぶ、新しいコーヒー体験"
cta_text: "詳しく見る"
cta_link: "/about"
background_image: "/images/hero-bg.jpg"
---
```

### 技术实现

```typescript
// components/admin/HeroManagementPanel.tsx
'use client'

import { useState, useEffect } from 'react'

interface HeroConfig {
  title: string
  subtitle: string
  cta_text: string
  cta_link: string
  background_image?: string
}

export default function HeroManagementPanel() {
  const [config, setConfig] = useState<HeroConfig>({
    title: '',
    subtitle: '',
    cta_text: '',
    cta_link: '',
  })

  useEffect(() => {
    fetchHeroConfig()
  }, [])

  async function fetchHeroConfig() {
    const response = await fetch('/api/hero-config')
    const data = await response.json()
    setConfig(data)
  }

  async function handleSave() {
    // TODO: 实现保存到文件
    console.log('Saving config:', config)
    alert('保存機能は開発中です')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 编辑表单 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Hero設定編集</h3>

        <div>
          <label className="block text-sm font-medium mb-1">
            タイトル
          </label>
          <input
            type="text"
            value={config.title}
            onChange={e => setConfig({ ...config, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            サブタイトル
          </label>
          <input
            type="text"
            value={config.subtitle}
            onChange={e => setConfig({ ...config, subtitle: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            CTAボタンテキスト
          </label>
          <input
            type="text"
            value={config.cta_text}
            onChange={e => setConfig({ ...config, cta_text: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            CTAボタンリンク
          </label>
          <input
            type="text"
            value={config.cta_link}
            onChange={e => setConfig({ ...config, cta_link: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full px-6 py-3 bg-primary text-white
                    rounded-lg hover:bg-primary/90 transition-colors"
        >
          保存
        </button>
      </div>

      {/* 实时预览 */}
      <div>
        <h3 className="text-xl font-semibold mb-4">プレビュー</h3>
        <div className="border rounded-lg p-8 bg-gradient-to-br
                        from-primary/5 to-primary/10 text-center">
          <h1 className="text-4xl font-bold text-text-dark mb-4">
            {config.title || 'タイトル'}
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            {config.subtitle || 'サブタイトル'}
          </p>
          <a
            href={config.cta_link}
            className="inline-block px-6 py-3 bg-primary text-white
                      rounded-lg hover:bg-primary/90 transition-colors"
          >
            {config.cta_text || 'ボタン'}
          </a>
        </div>
      </div>
    </div>
  )
}
```

## 统一布局

### AdminTabs组件

```typescript
// components/admin/AdminTabs.tsx
'use client'

import { useState } from 'react'

type TabId = 'cms' | 'images' | 'hero'

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('cms')

  const tabs = [
    { id: 'cms' as TabId, label: 'CMS内容管理' },
    { id: 'images' as TabId, label: '図片管理' },
    { id: 'hero' as TabId, label: 'Hero管理' },
  ]

  return (
    <div>
      {/* Tab导航 */}
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab内容 */}
      <div>
        {activeTab === 'cms' && <CMSPanel />}
        {activeTab === 'images' && <ImageManagementPanel />}
        {activeTab === 'hero' && <HeroManagementPanel />}
      </div>
    </div>
  )
}
```

### 管理后台页面

```typescript
// app/admin/page.tsx
import AdminTabs from '@/components/admin/AdminTabs'
import Container from '@/components/ui/Container'

export const metadata = {
  title: '管理画面 - NO TRACE EXPLORER',
}

export default function AdminPage() {
  return (
    <main className="py-12">
      <Container size="large">
        <h1 className="text-3xl font-bold text-text-dark mb-8">
          管理画面
        </h1>
        <AdminTabs />
      </Container>
    </main>
  )
}
```

## 安全考虑

### 当前状态
```
⚠️ 无认证保护
任何人都可访问 /admin
```

### 计划实现

#### Basic Auth
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization')

    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      })
    }

    // 验证凭证
    const [username, password] = Buffer.from(
      authHeader.split(' ')[1],
      'base64'
    ).toString().split(':')

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.next()
    }

    return new NextResponse('Invalid credentials', { status: 401 })
  }
}

export const config = {
  matcher: '/admin/:path*',
}
```

#### 环境变量
```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password
```

## 待实现功能

### 优先级1 (高)
- [ ] 管理后台认证
- [ ] Hero保存API
- [ ] 图片上传功能

### 优先级2 (中)
- [ ] 图片删除功能
- [ ] 统计数据展示
- [ ] 操作日志

### 优先级3 (低)
- [ ] 用户权限管理
- [ ] 批量操作
- [ ] 数据导出

---

**最后更新**: 2025-01-12
