# 管理システムガイド - Admin System Guide

**バージョン**: v0.6.0 (Beta)
**作成日**: 2025-11-13
**ステータス**: ローカルテスト準備完了 ✅

---

## 📋 概要

NO TRACE EXPLORATION ウェブサイト用の統合管理システムです。Sveltia CMS と Cloudinary を使用して、コンテンツと画像を一元管理できます。

---

## 🎯 主な機能

### 1. CMS管理 (Sveltia CMS)
- 📝 企業文章の作成・編集
- 📰 ニュースの投稿・管理
- 🔄 Git-based CMSでバージョン管理
- ✅ MDX形式のサポート

### 2. 画像管理 (Cloudinary)
- 📤 Cloudinary Upload Widgetによる画像アップロード
- 🖼️ 画像ライブラリの閲覧
- 🔍 画像検索機能
- 🗑️ 画像削除機能
- 📊 統計情報表示

### 3. Hero管理
- 🎨 トップページHeroセクションの編集
- 🖼️ 背景画像の設定
- ✏️ タイトル・説明文の編集
- 🔘 CTAボタンの管理

### 4. セキュリティ
- 🔐 パスワード認証
- 🍪 Cookieベースのセッション管理
- 🚪 ログイン・ログアウト機能
- 🛡️ Middlewareによるルート保護

---

## 🚀 アクセス方法

### ローカル開発環境

1. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

2. **管理画面にアクセス**
   ```
   URL: http://localhost:3000/admin
   ```

3. **ログイン**
   - デフォルトパスワード: `admin123`
   - `.env.local` で変更可能:
     ```bash
     ADMIN_PASSWORD=your-secure-password
     ```

---

## 📁 ファイル構造

### 管理画面コンポーネント
```
app/admin/
├── page.tsx              # メイン管理ダッシュボード
├── layout.tsx            # 管理画面レイアウト
├── login/
│   └── page.tsx         # ログインページ
└── cms/
    └── page.tsx         # Sveltia CMS ページ

components/admin/
├── AdminTabs.tsx         # タブナビゲーション
├── CMSPanel.tsx          # CMS管理パネル
├── ImageManagementPanel.tsx  # 画像管理パネル
└── HeroManagementPanel.tsx   # Hero管理パネル
```

### API エンドポイント
```
app/api/
├── admin/
│   └── auth/
│       └── route.ts     # 認証API (POST/DELETE)
├── cloudinary/
│   ├── upload/
│   │   └── route.ts     # アップロード署名生成
│   ├── list/
│   │   └── route.ts     # 画像リスト取得
│   ├── info.ts          # 画像情報取得
│   └── delete.ts        # 画像削除
└── hero-config/
    └── route.ts         # Hero設定 (GET/POST)
```

### セキュリティ
```
middleware.ts             # ルート保護Middleware
```

---

## 🔧 API エンドポイント詳細

### 認証 API

#### POST /api/admin/auth
**説明**: ログイン認証

**リクエスト**:
```json
{
  "password": "admin123"
}
```

**レスポンス**:
```json
{
  "success": true,
  "message": "Authentication successful"
}
```

#### DELETE /api/admin/auth
**説明**: ログアウト

**レスポンス**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Cloudinary API

#### POST /api/cloudinary/upload
**説明**: アップロード署名を生成

**リクエスト**:
```json
{
  "folder": "notrace",
  "tags": ["admin"]
}
```

**レスポンス**:
```json
{
  "signature": "...",
  "timestamp": 1234567890,
  "cloudName": "your-cloud-name",
  "apiKey": "your-api-key",
  "folder": "notrace",
  "tags": ["admin"]
}
```

#### GET /api/cloudinary/list
**説明**: 画像リストを取得

**クエリパラメータ**:
- `folder`: フォルダ名 (オプション)
- `max_results`: 最大取得数 (デフォルト: 50)

**レスポンス**:
```json
{
  "images": [
    {
      "id": "asset-id",
      "publicId": "notrace/image-name",
      "url": "https://...",
      "format": "jpg",
      "width": 1920,
      "height": 1080,
      "bytes": 245678,
      "createdAt": "2025-01-13T..."
    }
  ],
  "total": 15,
  "nextCursor": "..."
}
```

#### POST /api/cloudinary/info
**説明**: 画像情報を取得

**リクエスト**:
```json
{
  "publicId": "notrace/image-name"
}
```

#### DELETE /api/cloudinary/delete
**説明**: 画像を削除

**リクエスト**:
```json
{
  "publicId": "notrace/image-name"
}
```

---

### Hero設定 API

#### GET /api/hero-config
**説明**: Hero設定を取得

**レスポンス**:
```json
{
  "currentBackground": "https://...",
  "heroContent": {
    "title": "品質を極め、文化をつなぐ",
    "description": "...",
    "button1Text": "私たちについて",
    "button1Link": "/about",
    "button2Text": "サービス詳細",
    "button2Link": "/coffee"
  },
  "lastUpdated": "2025-01-13T..."
}
```

#### POST /api/hero-config
**説明**: Hero設定を更新

**リクエスト**:
```json
{
  "currentBackground": "https://...",
  "heroContent": {
    "title": "新しいタイトル",
    "subtitle": "サブタイトル",
    "description": "説明文",
    "button1Text": "ボタン1",
    "button1Link": "/link1",
    "button2Text": "ボタン2",
    "button2Link": "/link2"
  }
}
```

---

## 🔐 セキュリティ設定

### 環境変数

#### 必須環境変数
```bash
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset

# 管理者パスワード
ADMIN_PASSWORD=your-secure-password
```

### パスワード変更方法

1. `.env.local` ファイルを編集
2. `ADMIN_PASSWORD` の値を変更
3. 開発サーバーを再起動

```bash
# .env.local
ADMIN_PASSWORD=new-secure-password-123
```

---

## 📖 使用方法

### 1. CMS管理

1. 管理画面にログイン
2. **「CMS管理」** タブを選択
3. **「別タブでCMSを開く」** をクリック
4. Sveltia CMSで記事を作成・編集
5. 変更は自動的にGitにコミットされます

### 2. 画像管理

1. **「画像管理」** タブを選択
2. **「画像をアップロード」** をクリック
3. Cloudinary Upload Widgetで画像を選択
4. アップロード完了後、画像ライブラリに表示
5. 画像にカーソルを合わせて操作:
   - URLコピー
   - ダウンロード
   - 削除

### 3. Hero管理

1. **「Hero管理」** タブを選択
2. 各項目を編集:
   - 背景画像URL
   - メインタイトル
   - サブタイトル
   - 説明文
   - ボタンテキストとリンク
3. **「プレビュー」** で確認
4. **「変更を保存」** をクリック

---

## 🎨 機能詳細

### Cloudinary Upload Widget

#### 対応フォーマット
- JPG / JPEG
- PNG
- GIF
- SVG
- WebP

#### 最大ファイルサイズ
- 10 MB

#### アップロード先
- フォルダ: `notrace`
- タグ: `admin`

### Sveltia CMS

#### コレクション
- **hero**: Heroセクション設定
- **articles**: 企業文章 (MDX)
- **news**: ニュース (MDX)
- **business-value**: ビジネス価値
- **faq**: よくある質問

#### バックエンド
- Git-gateway
- ローカル開発: `local_backend: true`

---

## 🐛 トラブルシューティング

### ログインできない

**問題**: パスワードが正しいのにログインできない

**解決策**:
1. ブラウザのCookieをクリア
2. 開発サーバーを再起動
3. `.env.local` の `ADMIN_PASSWORD` を確認

### 画像がアップロードできない

**問題**: Cloudinary Upload Widgetが開かない

**解決策**:
1. Cloudinary環境変数を確認
2. ブラウザのコンソールでエラーを確認
3. Cloudinary API keyが正しいか確認

### CMSが表示されない

**問題**: Sveltia CMSのiframeが空白

**解決策**:
1. `/admin/cms` に直接アクセス
2. `public/admin/config.yml` の設定を確認
3. ブラウザのコンソールでエラーを確認

---

## 📊 統計情報

### 画像管理パネル
- **総画像数**: Cloudinaryに保存された全画像数
- **総容量**: 全画像の合計サイズ
- **表示中**: 現在のフィルター条件で表示中の画像数
- **最適化済み**: 100% (Cloudinaryが自動最適化)

---

## 🔄 バージョン履歴

### v0.6.0 (2025-11-13)
- ✅ 統合管理システムの実装
- ✅ Sveltia CMS統合
- ✅ Cloudinary画像管理
- ✅ Hero管理機能
- ✅ パスワード認証
- ✅ ローカルテスト完了

---

## 📝 今後の改善予定

### 短期 (v0.6.1)
- [ ] Platform Features画像管理
- [ ] 統計情報の詳細化
- [ ] エラーハンドリングの改善

### 中期 (v0.7.0)
- [ ] ユーザー管理機能
- [ ] アクセスログ
- [ ] バッチ操作機能

### 長期 (v1.0.0)
- [ ] 本番環境デプロイ
- [ ] パフォーマンス最適化
- [ ] 高度な検索機能

---

## 💡 開発者向けメモ

### ローカル開発

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start
```

### 主要技術スタック
- **フレームワーク**: Next.js 14.2.33 (App Router)
- **CMS**: Sveltia CMS (NetlifyCMS fork)
- **画像管理**: Cloudinary
- **認証**: Cookie-based simple auth
- **スタイル**: Tailwind CSS
- **アイコン**: Lucide React

---

## 📞 サポート

### 問題がある場合

- **Email**: dev@no-trace.jp
- **ドキュメント**: このガイドを参照
- **GitHub**: Issue を作成

---

## 🙏 謝辞

**Generated with**: [Claude Code](https://claude.com/claude-code)
**Co-Authored-By**: Claude <noreply@anthropic.com>

---

**最終更新**: 2025-11-13
**バージョン**: 0.6.0
**ステータス**: ローカルテスト準備完了 ✅
