# Cloudinary + Sveltia CMS 设置指南

## 概述

本项目已集成 Cloudinary 图片管理和 Sveltia CMS 内容管理系统，用于管理：
- Hero背景图片
- 企业文章
- 业务价值部分
- FAQ常见问题

## 1. Cloudinary 设置

### 1.1 创建Cloudinary账户
1. 访问 [Cloudinary](https://cloudinary.com/) 并注册免费账户
2. 登录后，在Dashboard中找到你的配置信息：
   - Cloud Name
   - API Key
   - API Secret

### 1.2 配置环境变量
1. 复制 `.env.local.example` 为 `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. 填入你的Cloudinary凭证：
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key_here
   CLOUDINARY_API_SECRET=your_api_secret_here
   ```

## 2. Sveltia CMS 访问

### 2.1 本地开发
1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问CMS界面：
   ```
   http://localhost:3000/admin
   ```

### 2.2 CMS功能

#### Hero背景图片管理
- 路径：Hero背景图片 → main
- 可管理：
  - 背景图片（通过Cloudinary上传）
  - 主标题
  - 副标题
  - 描述文字
  - 按钮文字和链接

#### 企业文章管理
- 路径：企业文章
- 功能：
  - 创建新文章
  - 上传特色图片（Cloudinary）
  - Markdown编辑器
  - 分类管理
  - 发布状态控制

#### FAQ管理
- 路径：常见问题
- 功能：
  - 添加/编辑问答
  - 排序控制

## 3. 图片上传流程

### 3.1 通过CMS上传
1. 在CMS中点击图片字段
2. 选择"Upload"
3. 选择本地图片文件
4. 图片自动上传到Cloudinary
5. 返回Cloudinary URL

### 3.2 直接使用Cloudinary URL
- Hero背景图片会自动从 `content/hero/main.md` 文件读取
- Cloudinary URL格式：`https://res.cloudinary.com/[cloud_name]/image/upload/[version]/[public_id].[format]`

## 4. Hero图片更新流程

### 方式1：通过Sveltia CMS（推荐）
1. 访问 `http://localhost:3000/admin`
2. 进入"Hero背景图片"
3. 点击"main"配置
4. 点击"背景图片"字段
5. 上传新图片或选择Cloudinary媒体库中的图片
6. 保存更改

### 方式2：直接编辑文件
1. 打开 `content/hero/main.md`
2. 修改 `backgroundImage` 字段为新的Cloudinary URL
3. 保存文件
4. 页面自动重新加载新图片

## 5. API端点

### GET /api/hero-config
获取当前Hero配置

响应格式：
```json
{
  "currentBackground": "https://res.cloudinary.com/...",
  "heroContent": {
    "title": "品質を極め、文化をつなぐ",
    "description": "...",
    "button1Text": "私たちについて",
    "button1Link": "/about",
    "button2Text": "サービス詳細",
    "button2Link": "/coffee"
  },
  "lastUpdated": "2025-01-15T00:00:00.000Z"
}
```

### POST /api/hero-config
更新Hero配置

请求体：
```json
{
  "currentBackground": "https://res.cloudinary.com/...",
  "heroContent": {
    "title": "新标题",
    "description": "新描述",
    "button1Text": "按钮1",
    "button1Link": "/link1",
    "button2Text": "按钮2",
    "button2Link": "/link2"
  }
}
```

## 6. 文件结构

```
notrace-nextjs/
├── public/
│   ├── admin/
│   │   ├── index.html          # Sveltia CMS入口
│   │   └── config.yml          # CMS配置文件
│   └── uploads/                # 本地上传文件夹（可选）
├── content/
│   ├── hero/
│   │   └── main.md             # Hero配置文件
│   ├── articles/               # 企业文章
│   ├── business-value/         # 业务价值内容
│   └── faq/                    # FAQ内容
├── app/
│   └── api/
│       └── hero-config/
│           └── route.ts        # Hero API端点
├── hooks/
│   └── useHeroData.ts          # Hero数据Hook
└── .env.local                  # 环境变量（不要提交到Git）
```

## 7. 注意事项

1. **环境变量安全**
   - 永远不要将 `.env.local` 提交到Git
   - API Secret只在服务器端使用
   - Public keys可以在前端使用

2. **图片优化**
   - Cloudinary自动优化图片
   - 推荐上传高质量原图
   - CMS会自动处理压缩和格式转换

3. **内容备份**
   - 所有内容存储在 `content/` 目录的Markdown文件中
   - 定期备份该目录
   - 考虑使用Git进行版本控制

4. **性能优化**
   - Hero图片使用Cloudinary CDN
   - 自动格式转换（WebP等）
   - 响应式图片大小

## 8. 故障排除

### CMS无法访问
- 检查服务器是否运行：`npm run dev`
- 访问：`http://localhost:3000/admin`

### 图片上传失败
- 检查 `.env.local` 中的Cloudinary配置
- 确认API Key和Cloud Name正确
- 检查网络连接

### Hero图片不更新
- 清除浏览器缓存
- 检查 `content/hero/main.md` 文件内容
- 查看浏览器控制台错误信息

## 9. 生产环境部署

### Vercel/Netlify部署
1. 在平台设置中添加环境变量
2. 配置Git-gateway（用于CMS认证）
3. 部署后访问 `https://your-domain.com/admin`

### 环境变量配置
确保在生产环境中设置所有必要的环境变量：
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

## 10. 支持

如有问题，请检查：
1. [Cloudinary文档](https://cloudinary.com/documentation)
2. [Sveltia CMS文档](https://github.com/sveltia/sveltia-cms)
3. [Next.js文档](https://nextjs.org/docs)
