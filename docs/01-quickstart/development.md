# 开发指南

> 日常开发工作流程和常用命令

## 🚀 快速开始

### 启动开发服务器
```bash
cd /Users/eric/WebstormProjects/notrace-nextjs
npm run dev
```

访问 http://localhost:3000

### 启动商城联调 (可选)
```bash
# 在另一个终端
cd ../nteshop
npm run dev  # 端口9000
```

## 📋 常用命令

### 开发命令
```bash
# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 类型检查
npx tsc --noEmit
```

### 内容管理
```bash
# 访问CMS
open http://localhost:3000/admin/cms

# 访问管理后台
open http://localhost:3000/admin
```

### Git命令
```bash
# 查看状态
git status

# 提交代码
git add .
git commit -m "feat: 功能描述"
git push

# 查看分支
git branch

# 切换分支
git checkout -b feature/new-feature
```

## 📁 项目结构速查

### 页面开发
```bash
# 创建新页面
app/
  new-page/
    page.tsx        # 页面组件
    layout.tsx      # 页面布局(可选)
```

### 组件开发
```bash
# 创建新组件
components/
  MyComponent.tsx   # 组件文件
```

### 内容创建
```bash
# 方式1: 通过CMS创建 (推荐)
访问 /admin/cms → 创建内容

# 方式2: 手动创建Markdown
content/
  articles/
    my-article.md
  news/
    my-news.md
```

### API开发
```bash
# 创建API端点
app/
  api/
    my-endpoint/
      route.ts      # API路由
```

## 🛠️ 开发工作流

### 1. 功能开发流程
```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发代码
# 编辑文件...

# 3. 测试功能
npm run dev
# 浏览器测试...

# 4. 代码检查
npm run lint

# 5. 提交代码
git add .
git commit -m "feat: 新功能描述"

# 6. 推送到远程
git push origin feature/new-feature

# 7. 创建Pull Request
```

### 2. Bug修复流程
```bash
# 1. 创建修复分支
git checkout -b fix/bug-description

# 2. 定位问题
# 使用开发工具调试...

# 3. 修复代码
# 编辑文件...

# 4. 验证修复
npm run dev
# 测试修复效果...

# 5. 提交
git add .
git commit -m "fix: bug描述"
git push origin fix/bug-description
```

### 3. 内容更新流程
```bash
# 1. 访问CMS
open http://localhost:3000/admin/cms

# 2. 创建/编辑内容
# 在CMS界面操作...

# 3. 预览内容
# CMS内实时预览...

# 4. 保存发布
# CMS自动提交Git

# 5. 同步代码
git pull origin main
```

## 🎨 组件开发指南

### 创建新组件模板

#### 1. 基础组件
```typescript
// components/ui/MyComponent.tsx
import React from 'react'

interface MyComponentProps {
  title: string
  description?: string
  className?: string
}

export default function MyComponent({
  title,
  description,
  className = '',
}: MyComponentProps) {
  return (
    <div className={`/* 样式 */ ${className}`}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
```

#### 2. 带状态组件
```typescript
'use client'

import React, { useState } from 'react'

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

#### 3. 数据获取组件
```typescript
// Server Component (默认)
import { allArticles } from 'contentlayer/generated'

export default function ArticleList() {
  const articles = allArticles.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  )
}
```

## 📄 页面开发指南

### 创建新页面

#### 1. 静态页面
```typescript
// app/about/page.tsx
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

export default function AboutPage() {
  return (
    <main>
      <Section>
        <Container>
          <h1>关于我们</h1>
          <p>内容...</p>
        </Container>
      </Section>
    </main>
  )
}
```

#### 2. 动态页面
```typescript
// app/products/[id]/page.tsx
interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params

  return (
    <main>
      <h1>Product {id}</h1>
    </main>
  )
}
```

#### 3. 带元数据的页面
```typescript
// app/about/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于我们 - NO TRACE EXPLORER',
  description: '了解NO TRACE EXPLORER的故事',
}

export default function AboutPage() {
  return <main>...</main>
}
```

## 🔌 API开发指南

### 创建API端点

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'

// GET请求
export async function GET(request: NextRequest) {
  try {
    const data = { message: 'Success' }
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST请求
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // 处理数据...
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request' },
      { status: 400 }
    )
  }
}
```

## 🎯 常见任务

### 添加新文章分类

#### 1. 更新Contentlayer配置
```typescript
// contentlayer.config.ts
export const Article = defineDocumentType(() => ({
  fields: {
    category: {
      type: 'enum',
      options: [
        'case-study',
        'market-insights',
        'innovation',
        'roasting-guide',
        'quality-control',
        'business-tips',
        'new-category', // 添加新分类
      ],
      required: true,
    },
  },
}))
```

#### 2. 更新CMS配置
```yaml
# public/admin/config.yml
collections:
  - name: articles
    fields:
      - name: category
        widget: select
        options:
          - { label: "新分类", value: "new-category" }
```

#### 3. 重启开发服务器
```bash
# Ctrl+C 停止
npm run dev
```

### 添加新的共享组件

#### 1. 创建组件
```typescript
// components/ui/NewComponent.tsx
export default function NewComponent() {
  return <div>New Component</div>
}
```

#### 2. 在页面中使用
```typescript
import NewComponent from '@/components/ui/NewComponent'

export default function Page() {
  return <NewComponent />
}
```

### 修改Hero配置

#### 方式1: 通过管理后台
```bash
# 访问
open http://localhost:3000/admin

# 点击 "Hero管理" Tab
# 编辑内容
# 保存 (目前仅前端预览)
```

#### 方式2: 直接编辑文件
```bash
# 编辑
content/hero/config.md

# 修改frontmatter
---
title: "新标题"
subtitle: "新副标题"
cta_text: "新按钮文字"
cta_link: "/new-link"
---
```

## 🐛 调试技巧

### 1. 浏览器开发工具
```bash
# Chrome DevTools
F12 或 Cmd+Option+I

# 查看Console
# 查看Network
# 查看React Components (React DevTools插件)
```

### 2. Next.js调试
```typescript
// 使用console.log
console.log('调试信息:', data)

// Server Component调试
// 输出会在终端显示,不是浏览器

// Client Component调试
'use client'
// 输出在浏览器Console
```

### 3. TypeScript错误
```bash
# 运行类型检查
npx tsc --noEmit

# 查看错误详情
# 根据错误信息修复类型问题
```

### 4. 构建错误
```bash
# 运行构建查看错误
npm run build

# 常见问题:
# - 类型错误
# - 导入路径错误
# - 环境变量缺失
```

## ⚡ 性能优化技巧

### 1. 图片优化
```typescript
// 使用Next.js Image
import Image from 'next/image'

<Image
  src="/images/photo.jpg"
  alt="描述"
  width={800}
  height={600}
  priority  // 首屏图片
/>

// 使用Cloudinary
<OptimizedImage
  src="https://res.cloudinary.com/..."
  alt="描述"
  width={800}
  height={600}
/>
```

### 2. 代码分割
```typescript
// 动态导入大组件
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

### 3. 数据获取优化
```typescript
// 使用Server Components获取数据
// 默认即可,无需额外配置

// 客户端数据获取使用SWR或React Query
import useSWR from 'swr'

function Component() {
  const { data, error } = useSWR('/api/data', fetcher)
  // ...
}
```

## 🚨 常见问题解决

### 端口已被占用
```bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或使用其他端口
PORT=3001 npm run dev
```

### Contentlayer缓存问题
```bash
# 删除缓存重新生成
rm -rf .contentlayer
npm run dev
```

### 依赖安装问题
```bash
# 删除node_modules重新安装
rm -rf node_modules package-lock.json
npm install
```

### 环境变量不生效
```bash
# 确保.env.local存在
cp .env.local.example .env.local

# 重启开发服务器
# Ctrl+C
npm run dev
```

## 📚 相关文档

- [环境配置](./setup.md)
- [API参考](../04-development/api-reference.md)
- [设计系统](../04-development/design-system.md)

---

**维护者**: Development Team
**最后更新**: 2025-01-12
