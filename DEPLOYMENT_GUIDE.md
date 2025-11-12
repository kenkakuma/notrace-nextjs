# Deployment Guide - Vercel 部署指南

**项目**: NO TRACE EXPLORATION Website
**生产环境**: https://no-trace.jp
**Vercel Dashboard**: https://vercel.com/dashboard

---

## 📋 目录

1. [初始部署设置](#初始部署设置)
2. [DNS 配置](#dns-配置)
3. [环境变量](#环境变量)
4. [自动部署流程](#自动部署流程)
5. [故障排查](#故障排查)

---

## 初始部署设置

### 1. GitHub 仓库

**仓库**: https://github.com/kenkakuma/notrace-nextjs
**分支**: `main` (生产环境)

### 2. Vercel 项目配置

| 配置项 | 值 |
|--------|-----|
| Project Name | notrace-nextjs |
| Framework | Next.js (自动检测) |
| Root Directory | `./ ` |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

### 3. 重要配置文件

**`.npmrc`** - NPM 配置
```
legacy-peer-deps=true
```
> 用于解决 next-contentlayer 的 peer dependency 冲突

**`next.config.js`** - Next.js 配置
- Contentlayer 集成
- 图片优化配置

---

## DNS 配置

### 域名注册商：MuuMuu Domains

**域名**: no-trace.jp
**控制面板**: https://muumuu-domain.com/

### DNS 管理方式：Vercel DNS

#### 优势
- ✅ 英文界面，易于管理
- ✅ 自动配置所有记录
- ✅ 全球 CDN 加速
- ✅ 自动 SSL 证书

#### Nameservers 配置

在 MuuMuu Domains 设置以下 Nameservers：

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**设置路径**：
1. 登录 MuuMuu Domains 控制面板
2. 进入 "ネームサーバ設定変更"
3. 选择 "GMOペパボ以外のネームサーバを使用する"
4. 填入上述两个 nameserver
5. 保存设置

#### DNS 传播时间

- **通常**: 10-30 分钟
- **最长**: 24-48 小时

#### 验证 DNS 配置

```bash
# 检查 Nameservers
dig no-trace.jp NS +short

# 检查 A 记录
dig no-trace.jp A +short

# 检查 CNAME (www)
dig www.no-trace.jp CNAME +short
```

或使用在线工具：https://dnschecker.org/

---

## 环境变量

### Vercel 环境变量配置

**位置**: Vercel Dashboard → Settings → Environment Variables

#### 必需变量

```bash
# Cloudinary 配置
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=295771887569985
CLOUDINARY_API_KEY=295771887569985
CLOUDINARY_API_SECRET=GebAgK4oIbuseF46La0F2Y2MAgc
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=notrace_upload

# API 配置（生产环境）
NEXT_PUBLIC_API_BASE_URL=https://no-trace.jp/api

# Node 环境
NODE_ENV=production
```

#### 环境区分

- **Production**: 用于 `main` 分支
- **Preview**: 用于 Pull Request 预览
- **Development**: 本地开发（`.env.local`）

---

## 自动部署流程

### 触发条件

1. **Push to main** → 自动部署到生产环境
2. **Pull Request** → 创建预览环境
3. **Merge PR** → 部署到生产环境

### 部署流程

```
1. Git Push
   ↓
2. Vercel 检测到变更
   ↓
3. 开始构建
   - npm install --legacy-peer-deps
   - npm run build
   ↓
4. 运行测试（如果有）
   ↓
5. 部署到 Edge Network
   ↓
6. 更新域名 DNS
   ↓
7. 部署完成 ✅
```

### 部署时间

- **平均**: 2-3 分钟
- **首次部署**: 5-7 分钟

### 部署状态查看

**Vercel Dashboard**:
- 项目页面 → Deployments 标签
- 实时查看构建日志
- 查看部署状态和错误

---

## 常见问题与故障排查

### 1. 依赖安装失败

**错误**:
```
npm error ERESOLVE could not resolve
```

**解决方案**:
- 确保 `.npmrc` 文件存在
- 内容包含 `legacy-peer-deps=true`

### 2. 构建失败

**检查项**:
- TypeScript 编译错误
- ESLint 错误
- 环境变量是否正确设置

**查看日志**:
```bash
# 本地构建测试
npm run build
```

### 3. DNS 未生效

**检查步骤**:
1. 确认 MuuMuu 已保存 nameserver 设置
2. 等待 DNS 传播（10-30分钟）
3. 在 Vercel 点击 "Refresh" 按钮
4. 使用 dnschecker.org 验证

### 4. 图片无法显示

**原因**: Cloudinary 环境变量未设置

**解决方案**:
- 在 Vercel 添加所有 Cloudinary 相关变量
- 重新部署项目

### 5. 404 错误

**可能原因**:
- 路由配置错误
- 静态文件生成失败
- Contentlayer 数据未生成

**检查**:
```bash
# 检查生成的路由
npm run build
# 查看 .next 文件夹
```

---

## 回滚部署

如果新部署出现问题，可以快速回滚：

1. 进入 Vercel Dashboard
2. 选择之前的成功部署
3. 点击 "Promote to Production"

或使用 Git 回滚：
```bash
git revert HEAD
git push origin main
```

---

## 性能优化

### Vercel Edge Network

- 自动 CDN 分发
- 全球 70+ 数据中心
- 自动缓存优化

### Next.js 优化

- 静态页面生成 (SSG)
- 增量静态再生 (ISR)
- 图片优化
- 代码分割

---

## 监控与分析

### Vercel Analytics

- 页面访问统计
- 性能指标
- Core Web Vitals

**启用方式**: Vercel Dashboard → Analytics 标签

### 部署通知

- **Email**: 部署状态邮件通知
- **Slack**: 集成 Slack 通知（可选）
- **GitHub**: PR 状态检查

---

## 安全建议

1. **环境变量**: 敏感信息只存储在 Vercel，不提交到 Git
2. **API 密钥**: 定期更换 Cloudinary API 密钥
3. **依赖更新**: 定期检查并更新依赖包
4. **HTTPS**: Vercel 自动配置 SSL 证书

---

## 联系与支持

- **Vercel Support**: https://vercel.com/support
- **项目仓库**: https://github.com/kenkakuma/notrace-nextjs
- **文档**: 查看项目 `docs/` 目录

---

**最后更新**: 2025-11-12
**版本**: v0.4.2
