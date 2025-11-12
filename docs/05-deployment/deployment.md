# 部署指南

> 生产环境部署流程和配置

## 部署架构

```
GitHub Repository
    ↓ Git Push
Vercel (自动部署)
    ↓ 构建
Production Site
    ↓ 访问
    ├── 主站 (notrace-nextjs)
    ├── 商城前端 (独立部署)
    └── 商城后端 (独立服务器)
```

## Vercel部署 (推荐)

### 准备工作

#### 1. 确保代码就绪
```bash
# 本地测试构建
npm run build

# 确认无错误
npm run start
```

#### 2. 环境变量准备
```bash
# 生产环境变量
NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 部署步骤

#### 方式1: Vercel CLI

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 首次部署
vercel

# 生产部署
vercel --prod
```

#### 方式2: GitHub集成

```bash
# 1. 推送到GitHub
git push origin main

# 2. Vercel自动检测并部署
# 访问 vercel.com/dashboard 查看部署状态

# 3. 配置环境变量
# Project Settings → Environment Variables
```

### Vercel配置

#### vercel.json
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["hnd1"],
  "env": {
    "NEXT_PUBLIC_SHOP_API_URL": "@shop-api-url",
    "NEXT_PUBLIC_SHOP_URL": "@shop-url"
  }
}
```

#### 自定义域名
```
1. Vercel Dashboard → Domains
2. 添加域名
3. 配置DNS记录 (按Vercel提示)
4. 等待SSL证书自动配置
```

## 自托管部署

### Docker部署

#### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# 依赖阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 生产阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### next.config.mjs (添加)
```javascript
export default {
  output: 'standalone',
  // ...其他配置
}
```

#### 构建和运行
```bash
# 构建镜像
docker build -t notrace-nextjs .

# 运行容器
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp \
  -e NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp \
  notrace-nextjs
```

### PM2部署

#### 构建
```bash
npm run build
```

#### ecosystem.config.js
```javascript
module.exports = {
  apps: [{
    name: 'notrace-nextjs',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
}
```

#### 启动
```bash
# 安装PM2
npm i -g pm2

# 启动应用
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs

# 重启
pm2 restart notrace-nextjs
```

## 环境配置

### 环境变量管理

#### 开发环境 (.env.local)
```bash
NEXT_PUBLIC_SHOP_API_URL=http://localhost:9000
NEXT_PUBLIC_SHOP_URL=http://localhost:8000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dev_cloud
```

#### 生产环境 (.env.production)
```bash
NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=prod_cloud
CLOUDINARY_API_KEY=prod_key
CLOUDINARY_API_SECRET=prod_secret
```

### 配置检查清单

| 配置项 | 必需 | 说明 |
|--------|------|------|
| NEXT_PUBLIC_SHOP_API_URL | ✅ | 商城API地址 |
| NEXT_PUBLIC_SHOP_URL | ✅ | 商城前端地址 |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | ✅ | Cloudinary云名称 |
| CLOUDINARY_API_KEY | ⚠️ | 图片上传功能需要 |
| CLOUDINARY_API_SECRET | ⚠️ | 图片上传功能需要 |

## CI/CD配置

### GitHub Actions

#### .github/workflows/deploy.yml
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SHOP_API_URL: ${{ secrets.SHOP_API_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 自动化测试

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run lint
```

## 性能优化

### 构建优化

```javascript
// next.config.mjs
export default {
  // SWC压缩
  swcMinify: true,

  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },

  // 压缩
  compress: true,

  // 实验性功能
  experimental: {
    optimizeCss: true,
  },
}
```

### CDN配置

```javascript
// next.config.mjs
export default {
  assetPrefix: process.env.CDN_URL || '',
}
```

## 监控和日志

### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 错误追踪 (Sentry)

```bash
npm install @sentry/nextjs
```

```javascript
// next.config.mjs
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  {
    // Next.js配置
  },
  {
    // Sentry配置
    silent: true,
  }
)
```

### 日志管理

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'production') {
      // 发送到日志服务
      console.log(JSON.stringify({ level: 'info', message, data }))
    } else {
      console.log(message, data)
    }
  },

  error: (message: string, error?: Error) => {
    console.error(message, error)
    // 发送到错误追踪服务
  },
}
```

## 备份和恢复

### 内容备份

```bash
# Git仓库即备份
git clone <repository-url> backup

# 定期推送
git push origin main
```

### 环境变量备份

```bash
# 导出Vercel环境变量
vercel env pull .env.production.local

# 安全存储
# 使用密码管理器或加密存储
```

## 回滚策略

### Vercel回滚

```bash
# 查看部署历史
vercel ls

# 回滚到指定部署
vercel rollback <deployment-url>
```

### Git回滚

```bash
# 回滚到上一个commit
git revert HEAD

# 回滚到指定commit
git revert <commit-hash>

# 推送
git push origin main
```

## 域名和SSL

### 域名配置

```
1. 购买域名
2. 配置DNS记录:
   A记录: @ → Vercel IP
   CNAME: www → cname.vercel-dns.com
3. Vercel自动配置SSL (Let's Encrypt)
```

### SSL证书

```
Vercel自动管理:
- 自动续期
- HTTP/2支持
- 强制HTTPS重定向
```

## 安全检查清单

### 部署前检查

- [ ] 环境变量正确配置
- [ ] 敏感信息未提交到Git
- [ ] 依赖项无安全漏洞 (`npm audit`)
- [ ] HTTPS强制开启
- [ ] CORS配置正确
- [ ] 管理后台添加认证

### 部署后验证

- [ ] 网站可访问
- [ ] 所有页面正常加载
- [ ] 商城API连接正常
- [ ] 图片CDN正常
- [ ] CMS功能正常
- [ ] 性能指标达标

## 故障排查

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 构建失败 | 依赖或代码错误 | 检查构建日志 |
| 环境变量不生效 | 配置错误 | 重新配置并重新部署 |
| 商城API不通 | CORS或网络 | 检查CORS配置 |
| 图片加载失败 | Cloudinary配置 | 验证环境变量 |

### 日志查看

```bash
# Vercel日志
vercel logs <deployment-url>

# PM2日志
pm2 logs notrace-nextjs

# Docker日志
docker logs <container-id>
```

---

**最后更新**: 2025-01-12
