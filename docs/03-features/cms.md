# CMS内容管理系统

> 基于 Sveltia CMS + Contentlayer 的 Git-based 内容管理方案

## 📋 系统概述

### 技术架构
```
Sveltia CMS (前端编辑器)
    ↓ 编辑
Markdown 文件 (Git仓库)
    ↓ 处理
Contentlayer (内容处理引擎)
    ↓ 生成
TypeScript 类型 + JSON数据
    ↓ 使用
React 组件渲染
```

### 核心特性
- ✅ **Git-based**: 所有内容变更有版本控制
- ✅ **实时预览**: 编辑时实时预览Markdown渲染效果
- ✅ **类型安全**: Contentlayer自动生成TypeScript类型
- ✅ **MDX支持**: 支持在Markdown中嵌入React组件
- ✅ **双语系统**: 企业文章(articles) + 新闻发布(news)

## 🎯 功能模块

### 1. 企业文章系统 (Articles)

#### 文章分类
```typescript
// 6个分类
"case-study"       // ケーススタディ (案例研究)
"market-insights"  // マーケットインサイト (市场洞察)
"innovation"       // イノベーション (创新)
"roasting-guide"   // 焙煎ガイド (烘焙指南)
"quality-control"  // 品質管理 (质量管理)
"business-tips"    // ビジネスヒント (商业技巧)
```

#### 文章字段
```yaml
title: "文章标题"
description: "文章描述摘要"
publishedAt: "2025-01-12"
category: "case-study"
author: "作者名"
tags: ["咖啡", "烘焙", "日本"]
image: "https://res.cloudinary.com/..."
featured: true  # 是否在首页展示
body: |
  文章正文内容 (Markdown/MDX)
```

#### 页面路由
- **列表页**: `/articles`
- **详情页**: `/articles/[slug]`
- **分类页**: `/articles/category/[category]`

### 2. 新闻发布系统 (News)

#### 新闻分类
```typescript
// 4个分类
"company"          // 企業ニュース (企业新闻)
"product"          // 製品発表 (产品发布)
"media"            // メディア掲載 (媒体报道)
"event"            // イベント情報 (活动信息)
```

#### 新闻字段
```yaml
title: "新闻标题"
description: "新闻摘要"
publishedAt: "2025-01-12"
category: "company"
image: "https://res.cloudinary.com/..."
featured: true
externalLink: "https://example.com"  # 外部链接(可选)
body: |
  新闻正文内容
```

#### 页面路由
- **列表页**: `/news`
- **详情页**: `/news/[slug]`

#### 外部链接支持
- 如果设置 `externalLink`,点击卡片直接跳转外部网站
- 适用场景: 媒体报道、合作伙伴新闻等

## 🛠️ 使用指南

### 访问CMS管理界面

#### 方式1: 直接访问
```
http://localhost:3000/admin/cms
```

#### 方式2: 通过管理后台
```
http://localhost:3000/admin
→ 点击 "CMS内容管理" Tab
```

### 创建新文章

#### 步骤1: 进入CMS
1. 访问 `/admin/cms`
2. 选择 "企業文章" (Articles) 或 "ニュース" (News)

#### 步骤2: 填写内容
```markdown
# 必填字段
title: 填写标题
description: 填写描述
publishedAt: 选择发布日期
category: 选择分类

# 可选字段
author: 作者名 (默认: "NO TRACE EXPLORER")
tags: ["标签1", "标签2"]
image: 上传或选择图片
featured: 是否在首页展示
externalLink: 外部链接 (仅News)

# 正文
body: |
  使用 Markdown 编写正文...

  支持:
  - **粗体** / *斜体*
  - 列表
  - 链接: [文本](URL)
  - 图片: ![alt](URL)
  - 代码块
  - 表格
```

#### 步骤3: 预览和发布
1. 点击 "预览" 查看渲染效果
2. 确认无误后点击 "保存"
3. CMS会自动提交到Git仓库

### 编辑现有内容

1. 在CMS中选择要编辑的文章/新闻
2. 修改内容
3. 保存 (自动Git commit)

### 删除内容

1. 在CMS中选择要删除的内容
2. 点击 "删除" 按钮
3. 确认删除 (Git commit)

## 📁 文件结构

### Content目录
```
content/
├── articles/                    # 企业文章
│   ├── example-article-1.md
│   ├── example-article-2.md
│   └── ...
│
└── news/                        # 新闻发布
    ├── example-news-1.md
    ├── example-news-2.md
    └── ...
```

### 生成文件 (.contentlayer/)
```
.contentlayer/
└── generated/
    ├── Article/                 # 文章类型定义
    ├── News/                    # 新闻类型定义
    ├── index.d.ts              # TypeScript类型
    └── index.mjs               # 数据导出
```

## 🔌 技术集成

### Contentlayer配置

#### 定义内容类型
```typescript
// contentlayer.config.ts
export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `articles/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
    category: { type: 'enum', options: [...], required: true },
    author: { type: 'string', default: 'NO TRACE EXPLORER' },
    tags: { type: 'list', of: { type: 'string' } },
    image: { type: 'string' },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/articles/${doc._raw.flattenedPath}`
    },
  },
}))
```

#### Next.js集成
```javascript
// next.config.mjs
import { withContentlayer } from 'next-contentlayer'

export default withContentlayer({
  // Next.js配置...
})
```

### 在组件中使用

#### 获取所有文章
```typescript
import { allArticles } from 'contentlayer/generated'

// 按日期排序
const sortedArticles = allArticles.sort((a, b) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
)
```

#### 获取精选文章
```typescript
const featuredArticles = allArticles.filter(article => article.featured)
```

#### 按分类筛选
```typescript
const caseStudies = allArticles.filter(
  article => article.category === 'case-study'
)
```

#### 渲染文章内容
```typescript
import { useMDXComponent } from 'next-contentlayer/hooks'

export function ArticleContent({ article }) {
  const MDXContent = useMDXComponent(article.body.code)

  return (
    <div className="prose">
      <MDXContent />
    </div>
  )
}
```

## 🎨 前端展示

### 文章列表页 (/articles)
- **布局**: 网格布局 (3列)
- **排序**: 按发布日期倒序
- **筛选**: 支持按分类筛选
- **组件**: `ArticleCard`

### 文章详情页 (/articles/[slug])
- **布局**: 单列居中
- **组件**: Hero + MDX内容 + 相关文章
- **特性**: 面包屑导航、社交分享

### 首页精选展示
- **数量**: 最新3篇 featured 文章
- **布局**: 横向卡片 (1列/2列)
- **组件**: `FeaturedArticlesSection`

## 🔧 高级功能

### MDX自定义组件

#### 定义组件
```typescript
// components/articles/Mdx.tsx
const components = {
  // 自定义标题
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-primary">
      {children}
    </h1>
  ),

  // 自定义代码块
  code: ({ children }) => (
    <code className="bg-gray-100 px-2 py-1 rounded">
      {children}
    </code>
  ),

  // 自定义图片
  img: ({ src, alt }) => (
    <OptimizedImage src={src} alt={alt} />
  ),
}
```

#### 在Markdown中使用
```markdown
# 标题会应用自定义样式

内联代码 `const x = 1` 会有特殊样式

![图片会自动优化](https://example.com/image.jpg)
```

### 图片优化

#### Cloudinary集成
```typescript
// 在Markdown中使用Cloudinary URL
image: "https://res.cloudinary.com/<cloud>/image/upload/v123/sample.jpg"

// 组件自动优化
<OptimizedImage
  src={article.image}
  alt={article.title}
  width={800}
  height={400}
/>
```

## 🚨 注意事项

### 文件命名规范
- **Slug**: 文件名即URL slug,使用英文小写和连字符
- **示例**: `coffee-roasting-guide.md` → `/articles/coffee-roasting-guide`

### Frontmatter验证
- **必填字段**: title, description, publishedAt, category
- **日期格式**: YYYY-MM-DD
- **分类值**: 必须匹配预定义的分类

### Git提交
- Sveltia CMS自动提交,commit message格式:
  ```
  Create articles/new-article.md
  Update news/existing-news.md
  Delete articles/old-article.md
  ```

### 内容安全
- **XSS防护**: MDX内容经过Contentlayer安全处理
- **图片安全**: 建议使用Cloudinary等CDN
- **外部链接**: 使用 `target="_blank" rel="noopener noreferrer"`

## 📊 数据统计

### 当前内容
- 企业文章: 2篇示例
- 新闻发布: 2篇示例

### 文件大小
- CMS配置: ~5KB (`public/admin/config.yml`)
- Contentlayer配置: ~4KB (`contentlayer.config.ts`)
- 生成类型: ~12KB (`.contentlayer/generated/`)

## 📚 相关文档

- **用户指南**: 查看原 `CMS_USER_GUIDE.md` (根目录)
- **技术细节**: 查看原 `CMS_TECHNICAL_GUIDE.md` (根目录)
- **实现总结**: 查看原 `CMS_IMPLEMENTATION_SUMMARY.md` (根目录)

---

**维护者**: Development Team
**最后更新**: 2025-01-12
