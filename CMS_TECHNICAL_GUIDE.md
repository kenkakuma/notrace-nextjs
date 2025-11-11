# CMS技術ガイド - NO TRACE EXPLORER

> 開発者向けドキュメント
> 最終更新: 2025-01-15

## 📋 目次

- [アーキテクチャ概要](#アーキテクチャ概要)
- [技術スタック](#技術スタック)
- [ディレクトリ構造](#ディレクトリ構造)
- [Contentlayer設定](#contentlayer設定)
- [Sveltia CMS設定](#sveltia-cms設定)
- [コンポーネント](#コンポーネント)
- [API仕様](#api仕様)
- [開発ワークフロー](#開発ワークフロー)
- [デプロイメント](#デプロイメント)

---

## アーキテクチャ概要

### システム構成図

```
┌─────────────────────────────────────────────────────────┐
│                     Sveltia CMS                         │
│                  (管理画面 /admin)                       │
└─────────────────────────────────────────────────────────┘
                            ↓
                     Markdown (.mdx)
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Contentlayer                         │
│              (MDX → TypeScript変換)                     │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   Next.js Pages                         │
│        (/articles, /news, /articles/[slug])             │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  React Components                        │
│        (ArticleCard, NewsCard, etc.)                    │
└─────────────────────────────────────────────────────────┘
```

### データフロー

```
Content Author
    ↓
Sveltia CMS → Git Commit → GitHub Repository
    ↓
Webhook Trigger
    ↓
Vercel Build
    ↓
Contentlayer Processing
    ↓
Static Pages Generation
    ↓
CDN Distribution
```

---

## 技術スタック

### コア技術

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 14.2.33 | フレームワーク |
| React | 18.3.1 | UIライブラリ |
| TypeScript | ^5 | 型システム |
| Contentlayer | 0.3.4 | コンテンツ管理 |
| Tailwind CSS | ^3.4.1 | スタイリング |

### CMS関連

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Sveltia CMS | Latest | 管理画面 |
| Gray Matter | ^4.0.3 | Frontmatter解析 |
| Remark | ^15.0.1 | Markdown処理 |
| date-fns | Latest | 日付処理 |

### インフラ

- **ホスティング**: Vercel
- **画像CDN**: Cloudinary
- **バージョン管理**: GitHub
- **CI/CD**: Vercel自動デプロイ

---

## ディレクトリ構造

```
notrace-nextjs/
├── app/
│   ├── articles/              # 企業文章
│   │   ├── page.tsx          # 記事一覧
│   │   └── [slug]/
│   │       └── page.tsx      # 記事詳細
│   ├── news/                  # ニュース
│   │   ├── page.tsx          # ニュース一覧
│   │   └── [slug]/
│   │       └── page.tsx      # ニュース詳細
│   └── api/
│       └── hero-config/
│           └── route.ts       # Hero設定API
│
├── components/
│   ├── articles/              # 記事関連コンポーネント
│   │   ├── ArticleCard.tsx   # 記事カード
│   │   └── Mdx.tsx           # MDXレンダラー
│   ├── news/                  # ニュース関連コンポーネント
│   │   └── NewsCard.tsx      # ニュースカード
│   ├── ui/                    # 共有UIコンポーネント
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── OptimizedImage.tsx
│   └── FeaturedArticlesSection.tsx  # ホームページ統合
│
├── content/                   # コンテンツファイル
│   ├── articles/              # 企業文章 (.mdx)
│   ├── news/                  # ニュース (.mdx)
│   └── hero/                  # Hero設定 (.md)
│
├── public/
│   ├── admin/                 # Sveltia CMS
│   │   ├── config.yml        # CMS設定
│   │   └── index.html        # CMS エントリーポイント
│   └── uploads/               # アップロード画像
│
├── .contentlayer/             # 生成ファイル (Git無視)
├── contentlayer.config.ts     # Contentlayer設定
└── next.config.js             # Next.js設定
```

---

## Contentlayer設定

### 基本設定 (`contentlayer.config.ts`)

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

/** Article文档类型定义 - 企业文章 */
const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `articles/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    category: {
      type: 'enum',
      options: ['企業ニュース', 'サービス', 'コーヒー事業', '展示・イベント', '釣具・器具', 'その他'],
      required: true
    },
    image: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
    published: { type: 'boolean', default: true },
    readTime: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    excerpt: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('articles/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/articles/${doc._raw.flattenedPath.replace('articles/', '')}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Article, News, Product],
})
```

### 型定義

Contentlayerは自動的にTypeScript型を生成します：

```typescript
// .contentlayer/generated/index.d.ts
export interface Article {
  _id: string
  _raw: { ... }
  type: 'Article'
  title: string
  description: string
  date: string
  author: string
  category: string
  image?: string
  featured: boolean
  published: boolean
  readTime?: string
  tags?: string[]
  excerpt?: string
  slug: string
  url: string
  body: { code: string }
}

export const allArticles: Article[]
```

### データ取得

```typescript
import { allArticles, allNews } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

// 公開済み記事を日付順に取得
const publishedArticles = allArticles
  .filter((article) => article.published)
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

// カテゴリーでフィルタリング
const coffeeArticles = publishedArticles.filter(
  (article) => article.category === 'コーヒー事業'
)

// 注目記事のみ
const featuredArticles = publishedArticles.filter(
  (article) => article.featured
)
```

---

## Sveltia CMS設定

### 基本設定 (`public/admin/config.yml`)

```yaml
backend:
  name: git-gateway
  branch: main

# 本地開発モード
local_backend: true

media_folder: "public/uploads"
public_folder: "/uploads"

# Cloudinary集成
media_library:
  name: cloudinary
  config:
    cloud_name: ${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
    api_key: ${NEXT_PUBLIC_CLOUDINARY_API_KEY}

collections:
  - name: "articles"
    label: "企業文章"
    folder: "content/articles"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    extension: "mdx"
    format: "frontmatter"
    fields:
      - {label: "タイトル", name: "title", widget: "string"}
      - {label: "説明", name: "description", widget: "text"}
      - {label: "公開日", name: "date", widget: "datetime"}
      - {label: "カテゴリー", name: "category", widget: "select"}
      - {label: "本文", name: "body", widget: "markdown"}
```

### ローカル開発

```bash
# 1. 開発サーバー起動
npm run dev

# 2. CMS アクセス
http://localhost:3000/admin

# 3. ローカルモードで認証不要
```

### 本番環境

**必要な設定**:

1. **GitHub OAuth App作成**
   - Settings → Developer settings → OAuth Apps
   - Homepage URL: `https://no-trace.jp`
   - Callback URL: `https://api.netlify.com/auth/done`

2. **環境変数設定** (Vercel)
   ```
   GITHUB_TOKEN=your_github_token
   ```

3. **Git Gateway有効化**
   - Netlify Identity または GitHub OAuth

---

## コンポーネント

### ArticleCard

記事一覧で使用するカードコンポーネント。

**Props**:
```typescript
interface ArticleCardProps {
  article: Article
  featured?: boolean
}
```

**使用例**:
```tsx
import { ArticleCard } from '@/components/articles/ArticleCard'

<ArticleCard article={article} />
<ArticleCard article={article} featured /> // 注目記事
```

**特徴**:
- レスポンシブデザイン
- ホバーエフェクト
- 画像遅延読み込み
- カテゴリーバッジ
- 日付・タグ表示

### NewsCard

ニュース一覧で使用するカードコンポーネント。

**Props**:
```typescript
interface NewsCardProps {
  news: News
  featured?: boolean
  layout?: 'vertical' | 'horizontal'
}
```

**レイアウトオプション**:
- `vertical`: カード形式（デフォルト）
- `horizontal`: 横長リスト形式

**外部リンク対応**:
```tsx
// 外部リンクがある場合、新しいタブで開く
{news.externalLink && <ExternalLink className="w-4 h-4" />}
```

### Mdx

MDXコンテンツのレンダリング。

**使用例**:
```tsx
import { Mdx } from '@/components/articles/Mdx'

<article className="prose">
  <Mdx code={article.body.code} />
</article>
```

**スタイリング**:
```css
prose prose-lg
prose-headings:text-text-dark
prose-p:text-text-secondary
prose-a:text-primary
```

---

## API仕様

### 記事データ取得

Contentlayerが自動生成するデータを使用：

```typescript
import { allArticles } from 'contentlayer/generated'

// ビルド時に静的生成
export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }))
}

// メタデータ生成
export async function generateMetadata({ params }) {
  const article = allArticles.find((a) => a.slug === params.slug)

  return {
    title: `${article.title} | NO TRACE EXPLORER`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
    },
  }
}
```

### Hero設定API

```typescript
// app/api/hero-config/route.ts
export async function GET() {
  const heroContent = await fs.readFile('content/hero/main.md', 'utf-8')
  const { data } = matter(heroContent)

  return Response.json(data)
}
```

---

## 開発ワークフロー

### 新しいコンテンツタイプの追加

1. **Contentlayer設定更新**
   ```typescript
   // contentlayer.config.ts
   const NewType = defineDocumentType(() => ({
     name: 'NewType',
     filePathPattern: `new-type/**/*.mdx`,
     fields: { ... },
   }))
   ```

2. **コンテンツディレクトリ作成**
   ```bash
   mkdir -p content/new-type
   ```

3. **Sveltia CMS設定追加**
   ```yaml
   # public/admin/config.yml
   collections:
     - name: "new-type"
       label: "新しいタイプ"
       folder: "content/new-type"
   ```

4. **ページとコンポーネント作成**
   ```bash
   mkdir app/new-type
   touch app/new-type/page.tsx
   ```

### ローカル開発

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# CMS管理画面
http://localhost:3000/admin

# 型チェック
npm run type-check

# ビルド
npm run build
```

### 変更のテスト

1. **Contentlayerの再生成**
   - ファイル保存で自動実行
   - 手動: `npm run dev` 再起動

2. **型チェック**
   ```bash
   npx tsc --noEmit
   ```

3. **ビルドテスト**
   ```bash
   npm run build
   ```

---

## デプロイメント

### Vercelデプロイ設定

**ビルド設定**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

**環境変数**:
```
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret

# CMS
GITHUB_TOKEN=your_github_token

# Shop API
NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp
```

### デプロイフロー

```
Git Push → GitHub
    ↓
Webhook Trigger
    ↓
Vercel Build Start
    ↓
1. npm install
2. Contentlayer Processing
3. Next.js Build
4. Static Export
    ↓
CDN Distribution
    ↓
Live Site Update
```

### ビルド時の注意点

1. **Contentlayer警告**
   - Hero設定ファイル警告は無視可能
   - 実際の記事に影響なし

2. **パフォーマンス最適化**
   - 画像はCloudinaryで自動最適化
   - 静的生成で高速表示

3. **エラーハンドリング**
   - 必須項目チェック
   - 型安全性の確保

---

## トラブルシューティング

### Contentlayer エラー

**症状**: `Type 'Article' is not defined`

**解決**:
```bash
rm -rf .contentlayer
npm run dev
```

### CMS 認証エラー

**症状**: ローカルで認証が必要

**解決**:
```yaml
# config.yml
local_backend: true
```

### ビルドエラー

**症状**: Vercelデプロイ失敗

**確認**:
1. ローカルで `npm run build` 成功するか
2. 環境変数が正しく設定されているか
3. Contentlayerの型エラーがないか

---

## パフォーマンス最適化

### 静的生成

すべての記事ページはビルド時に静的生成:

```typescript
export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }))
}
```

### 画像最適化

```tsx
<OptimizedImage
  src={article.image}
  alt={article.title}
  fill
  className="object-cover"
  priority // ATF画像用
/>
```

### コード分割

Next.js App Routerの自動コード分割:
- ページごとに分割
- 共有コンポーネントは自動最適化

---

## セキュリティ

### XSS対策

- MDXコンテンツはサニタイズ済み
- ユーザー入力は検証

### 認証

- GitHub OAuth
- リポジトリアクセス制御

### 環境変数

- 機密情報は `.env.local`
- Git には含めない (`.gitignore`)

---

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Contentlayer Documentation](https://www.contentlayer.dev/docs)
- [Sveltia CMS Documentation](https://github.com/sveltia/sveltia-cms)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**このドキュメントは継続的に更新されます**

**最終更新**: 2025-01-15
**バージョン**: v0.4.0
