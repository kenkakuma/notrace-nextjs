# 内容管理和图片托管集成指南

本项目已集成 **Contentlayer** (MDX内容管理) 和 **Cloudinary** (图片托管和优化)。

## 📋 已完成的集成

### 1. Contentlayer - MDX内容管理
- ✅ 配置文件：`contentlayer.config.ts`
- ✅ 两种文档类型：Article（文章）和 Product（产品）
- ✅ 自动生成类型定义：`.contentlayer/generated`
- ✅ 内容目录：`content/articles/` 和 `content/products/`
- ✅ Hook支持：`useArticles()` 用于文章查询

**特性：**
- MDX支持（Markdown + JSX）
- 自动slug生成
- Frontmatter元数据支持
- 全文搜索功能
- 分类和标签过滤

### 2. Cloudinary - 图片托管和优化
- ✅ 环境变量配置：`.env.local`
- ✅ 工具函数库：`lib/cloudinary.ts`
- ✅ API路由：删除和获取资源信息
- ✅ Next.js Image优化集成

**特性：**
- 自动格式转换（WebP、AVIF等）
- 尺寸自适应（responsive images）
- 质量自动优化
- CDN加速
- 文件夹组织

---

## 🔧 Cloudinary 配置步骤

### 第1步：注册Cloudinary账户
1. 访问 https://cloudinary.com
2. 创建免费账户
3. 验证邮箱

### 第2步：获取API凭证
1. 访问 https://dashboard.cloudinary.com/settings/general
2. 复制 **Cloud Name**
3. 访问 https://dashboard.cloudinary.com/settings/api-keys
4. 复制 **API Key** 和 **API Secret**

### 第3步：创建上传预设
1. 访问 https://cloudinary.com/console/settings/upload
2. 点击 "Add upload preset"
3. 设置以下内容：
   - **Name**: `notrace_upload` (或自定义名称)
   - **Signing Mode**: Unsigned (用于前端上传)
   - **Folder**: `notrace/` (可选，用于组织文件)
   - **Default tags**: `notrace, managed`

### 第4步：更新环境变量
编辑 `.env.local`：

```env
# Cloudinary配置
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=notrace_upload
```

### 第5步：验证配置
```bash
npm run dev
```
访问 `http://localhost:3000` 检查图片是否正确加载。

---

## 📝 Contentlayer 使用指南

### 创建新文章

在 `content/articles/` 目录下创建 `.mdx` 文件，例如 `my-article.mdx`：

```mdx
---
title: 文章标题
description: 文章描述
date: 2025-01-20
author: 作者名称
category: 企業ニュース
featured: true
readTime: 5分
tags:
  - 标签1
  - 标签2
---

## 章节标题

文章内容...

### 子章节

更多内容...
```

### 在React中使用文章

```typescript
import { useArticles } from '@/hooks/useArticles'

export function ArticleList() {
  const { getFeaturedArticles, getArticlesByCategory } = useArticles()

  // 获取特色文章
  const featured = getFeaturedArticles()

  // 按分类获取文章
  const newsArticles = getArticlesByCategory('企業ニュース')

  return (
    <div>
      {featured.map((article) => (
        <article key={article.slug}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </article>
      ))}
    </div>
  )
}
```

### useArticles Hook API

```typescript
const {
  getAllArticles(),           // 获取所有文章（按日期排序）
  getFeaturedArticles(),      // 获取特色文章
  getArticlesByCategory(),    // 按分类获取
  getArticlesByTag(),         // 按标签获取
  getRelatedArticles(),       // 获取相关文章
  getArticleBySlug(),         // 根据slug获取单篇
  searchArticles(),           // 搜索文章
} = useArticles()
```

---

## 🖼️ Cloudinary 使用指南

### 上传图片（客户端）

```typescript
import { uploadImageToCloudinary } from '@/lib/cloudinary'

async function handleImageUpload(file: File) {
  const result = await uploadImageToCloudinary(file, {
    folder: 'articles',
    tags: ['article', 'featured'],
    publicId: 'custom-image-name',
  })

  if (result) {
    console.log('Uploaded:', result.secureUrl)
  }
}
```

### 生成优化的图片URL

```typescript
import {
  getCloudinaryUrl,
  getHeroImageUrl,
  getThumbnailUrl
} from '@/lib/cloudinary'

// 通用URL生成
const url = getCloudinaryUrl('public-id', {
  width: 800,
  height: 600,
  quality: 'good',
  format: 'auto',
})

// Hero背景图片（自动优化为1920x1080）
const heroUrl = getHeroImageUrl('hero-image-id')

// 缩略图
const thumbUrl = getThumbnailUrl('image-id', 'md') // sm/md/lg
```

### 在Next.js Image组件中使用

```typescript
import Image from 'next/image'
import { getCloudinaryUrl } from '@/lib/cloudinary'

export function ArticleImage() {
  return (
    <Image
      src={getCloudinaryUrl('article-image-id', {
        width: 800,
        quality: 'good',
      })}
      alt="Article image"
      width={800}
      height={600}
    />
  )
}
```

### 删除图片

```typescript
import { deleteImageFromCloudinary } from '@/lib/cloudinary'

async function handleDelete(publicId: string) {
  const success = await deleteImageFromCloudinary(publicId)
  if (success) {
    console.log('Image deleted')
  }
}
```

---

## 📂 项目文件结构

```
notrace-nextjs/
├── content/
│   ├── articles/          # MDX文章文件
│   │   └── establishment-news.mdx
│   └── products/          # MDX产品文件
│
├── lib/
│   └── cloudinary.ts      # Cloudinary工具函数
│
├── hooks/
│   ├── useHeroData.ts     # Hero数据管理
│   └── useArticles.ts     # 文章数据查询
│
├── app/api/cloudinary/
│   ├── delete.ts          # 删除图片API
│   └── info.ts            # 获取图片信息API
│
├── contentlayer.config.ts # Contentlayer配置
├── next.config.js         # Next.js配置（已更新）
├── tsconfig.json          # TypeScript配置（已更新）
└── .env.local             # 环境变量（需填写）
```

---

## 🚀 下一步

### 立即可做：
1. ✅ 填写 `.env.local` 中的Cloudinary凭证
2. ✅ 创建更多MDX文章在 `content/articles/`
3. ✅ 使用 `useArticles()` hook在页面中显示文章
4. ✅ 上传图片到Cloudinary并使用优化的URL

### 后续改进：
- [ ] 创建文章详情页面
- [ ] 添加文章评论功能
- [ ] 集成图片管理后台
- [ ] 自动生成sitemap
- [ ] SEO优化

---

## 📚 常见问题

**Q: 如何从Markdown直接使用Cloudinary图片？**
A: 在MDX文件中设置 `image` frontmatter字段，然后在React组件中使用：
```mdx
---
image: "cloudinary_public_id"
---
```

**Q: 如何限制上传的文件大小？**
A: 在Cloudinary上传预设中设置 `max_file_size`，或在前端验证：
```typescript
const MAX_SIZE = 5 * 1024 * 1024 // 5MB
if (file.size > MAX_SIZE) {
  console.error('File too large')
}
```

**Q: 如何优化性能？**
A:
- 使用 `format: 'auto'` 自动选择最佳格式
- 使用 `quality: 'auto'` 自动优化质量
- 为不同设备尺寸生成srcset
- 启用CDN缓存

---

## 🔗 有用的资源

- [Contentlayer文档](https://contentlayer.dev)
- [Cloudinary文档](https://cloudinary.com/documentation)
- [Next.js Image优化](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [MDX文档](https://mdxjs.com)

---

**集成完成！现在开始创建内容和管理图片吧！** 🎉
