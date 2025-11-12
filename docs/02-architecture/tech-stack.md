# 技术栈

> 核心技术选型和依赖说明

## 技术栈总览

### 架构图
```
┌─────────────────────────────────────────┐
│  Frontend (用户界面)                     │
│  - Next.js 14 App Router                │
│  - React 18 Server Components            │
│  - Tailwind CSS                          │
└──────────────┬──────────────────────────┘
               │
┌──────────────┴──────────────────────────┐
│  Content Layer (内容管理)                │
│  - Contentlayer (MDX处理)                │
│  - Sveltia CMS (可视化编辑)              │
│  - Gray-matter (YAML解析)                │
└──────────────┬──────────────────────────┘
               │
┌──────────────┴──────────────────────────┐
│  External Services (外部服务)            │
│  - Medusa (商城后端)                     │
│  - Cloudinary (图片CDN)                  │
│  - GitHub (Git仓库)                      │
└─────────────────────────────────────────┘
```

## 核心框架

### Next.js 14.2.33

| 特性 | 说明 | 使用场景 |
|------|------|----------|
| App Router | 文件系统路由 | 所有页面 |
| Server Components | 默认服务端渲染 | 数据获取组件 |
| Image Optimization | 自动图片优化 | 所有图片 |
| API Routes | 后端API端点 | `/api/hero-config` |
| Metadata API | SEO元数据 | 所有页面 |

**选型理由**:
- 最新稳定版,性能最优
- Server Components减少客户端JS
- 内置图片/字体优化
- 部署简单(Vercel)

**配置**:
```javascript
// next.config.mjs
import { withContentlayer } from 'next-contentlayer'

export default withContentlayer({
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
})
```

### React 18.3.1

| 特性 | 说明 | 使用 |
|------|------|------|
| Server Components | 服务端渲染组件 | 默认所有组件 |
| Client Components | 客户端交互组件 | `'use client'` 标记 |
| Suspense | 异步渲染 | 数据加载边界 |
| Hooks | 状态管理 | `useState`, `useEffect` |

**Client Component标记**:
```typescript
// 需要客户端交互时
'use client'

import { useState } from 'react'

export default function InteractiveComponent() {
  const [state, setState] = useState()
  // ...
}
```

### TypeScript 5.x

| 配置 | 值 | 说明 |
|------|----|----|
| strict | true | 严格模式 |
| target | ES2017 | 编译目标 |
| module | ESNext | 模块系统 |
| jsx | preserve | JSX处理(Next.js) |

**类型定义**:
```typescript
// Contentlayer自动生成
import { Article, News } from 'contentlayer/generated'

// 手动定义
interface Product {
  id: string
  title: string
  price: number
}
```

## 样式系统

### Tailwind CSS 3.4.1

**配置**:
```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        'text-dark': '#1a1a1a',
      },
    },
  },
}
```

**优势**:
- 原子化CSS,按需生成
- 响应式优先
- 开发效率高
- 生产包体积小

**PostCSS插件**:
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 内容管理

### Contentlayer 0.3.4

| 功能 | 说明 |
|------|------|
| Markdown处理 | 自动解析MDX文件 |
| 类型生成 | TypeScript类型自动生成 |
| 实时更新 | 开发时热更新 |
| 数据验证 | Schema验证 |

**配置**:
```typescript
// contentlayer.config.ts
export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `articles/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/articles/${doc._raw.flattenedPath}`,
    },
  },
}))
```

**使用**:
```typescript
import { allArticles } from 'contentlayer/generated'

// 自动类型推导
const articles: Article[] = allArticles
```

### Sveltia CMS

| 特性 | 说明 |
|------|------|
| Git-based | 直接提交到Git仓库 |
| 无后端 | 纯前端CMS |
| 实时预览 | 编辑时预览Markdown |
| 多语言 | 支持日文/英文 |

**配置**:
```yaml
# public/admin/config.yml
backend:
  name: github
  repo: owner/repo
  branch: main

collections:
  - name: articles
    label: 企業文章
    folder: content/articles
    create: true
    fields:
      - { name: title, label: タイトル }
      - { name: body, label: 本文, widget: markdown }
```

### Gray-matter 4.0.3

**用途**: 解析Markdown frontmatter

```typescript
import matter from 'gray-matter'

const { data, content } = matter(fileContent)
// data: YAML frontmatter对象
// content: Markdown内容
```

## UI组件库

### Lucide React 0.552.0

**用途**: 图标库

```typescript
import { Coffee, Menu, X, ChevronRight } from 'lucide-react'

<Coffee className="w-6 h-6 text-primary" />
```

**优势**:
- Tree-shaking,按需导入
- 一致的设计风格
- TypeScript支持

### Date-fns 4.1.0

**用途**: 日期格式化

```typescript
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

format(parseISO(article.publishedAt), 'yyyy年MM月dd日', { locale: ja })
```

## 图片管理

### Cloudinary 2.8.0

**SDK功能**:
- 图片上传
- 变换处理
- 优化压缩

```typescript
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
```

### Next Cloudinary 6.17.3

**组件封装**:
```typescript
import { CldImage } from 'next-cloudinary'

<CldImage
  src="sample"
  width={800}
  height={600}
  alt="描述"
/>
```

## 外部API集成

### Medusa商城后端

**端点**:
| 路径 | 方法 | 说明 |
|------|------|------|
| `/store/products` | GET | 获取商品列表 |
| `/store/collections` | GET | 获取分类 |
| `/store/products/:id` | GET | 商品详情 |

**数据类型**:
```typescript
interface MedusaProduct {
  id: string
  title: string
  description: string
  thumbnail: string
  variants: Array<{
    id: string
    title: string
    prices: Array<{
      amount: number
      currency_code: string
    }>
  }>
  collection?: {
    id: string
    title: string
  }
}
```

**API调用**:
```typescript
const response = await fetch(
  `${process.env.NEXT_PUBLIC_SHOP_API_URL}/store/products`
)
const { products } = await response.json()
```

## 开发工具

### ESLint

**配置**:
```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended"
  ],
  "rules": {
    "no-unused-vars": "warn"
  }
}
```

### Prettier (推荐)

**配置**:
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## 依赖树

### 生产依赖 (package.json)
```
next@14.2.33
├── react@18.3.1
└── react-dom@18.3.1

contentlayer@0.3.4
├── next-contentlayer@0.3.4
└── gray-matter@4.0.3

tailwindcss@3.4.1
├── postcss@8.x
└── autoprefixer@10.x

cloudinary@2.8.0
└── next-cloudinary@6.17.3

lucide-react@0.552.0
date-fns@4.1.0
```

### 开发依赖
```
typescript@5.x
@types/node@20.x
@types/react@18.x
@types/react-dom@18.x

eslint@8.x
eslint-config-next@14.x
```

## 版本管理策略

### 主要版本锁定
```json
{
  "next": "14.2.33",        // 锁定小版本
  "react": "^18.3.1",       // 允许补丁更新
  "typescript": "^5.0.0"    // 允许次要更新
}
```

### 更新策略
| 类型 | 频率 | 命令 |
|------|------|------|
| 补丁更新 | 每周 | `npm update` |
| 次要更新 | 每月 | `npm update --save` |
| 主要更新 | 评估后 | 手动更新 |

## 性能优化

### 构建优化
```javascript
// next.config.mjs
export default {
  // 启用SWC压缩
  swcMinify: true,

  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // 实验性功能
  experimental: {
    optimizeCss: true,
  },
}
```

### 运行时优化
- Server Components (默认)
- 图片懒加载 (Next.js Image)
- 代码分割 (自动)
- 字体优化 (next/font)

## 浏览器支持

### 目标浏览器
```
> 0.5%
last 2 versions
not dead
```

### 核心支持
- Chrome/Edge (最新2版本)
- Safari (最新2版本)
- Firefox (最新2版本)
- iOS Safari (最新2版本)

---

**最后更新**: 2025-01-12
