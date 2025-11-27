# Vercel 部署故障排查指南

**问题**: 生产环境未显示最新代码更改
**项目**: NO TRACE EXPLORATION Website
**日期**: 2025-11-27

---

## 🔍 问题诊断

### 现状对比

| 位置 | 布局方式 | 文章数量 | 文字方向 | 日期显示 |
|------|---------|---------|---------|---------|
| **GitHub 代码** | `flex-row-reverse` | 7篇 | `vertical-rl` | 2025-01-15, 2025-01-20 |
| **生产环境** | `grid` | 5篇 | 横向 | 2025-11-01 (旧) |
| **本地开发** | `flex-row-reverse` | 7篇 | `vertical-rl` | 2025-01-15, 2025-01-20 |

### 问题确认
- ✅ GitHub 代码是最新的
- ✅ 本地开发环境正常显示新样式
- ❌ 生产环境 (https://no-trace.jp) 显示旧样式
- ❌ Vercel 未部署最新代码

---

## 🎯 验证步骤

### 1. 检查部署版本

访问生产环境页面后，打开浏览器开发者工具：

```javascript
// 在 Console 中执行
document.querySelector('[data-component="FeaturedArticlesSection"]')?.dataset.version
// 应该返回: "0.6.1"
```

或查看页面源代码，搜索：
- `data-version="0.6.1"`
- `flex-row-reverse`
- `writing-mode:vertical-rl`

### 2. 检查 Vercel 部署历史

1. 登录 Vercel Dashboard: https://vercel.com/dashboard
2. 选择项目: `notrace-nextjs`
3. 点击 "Deployments" 标签
4. 查看最新部署：
   - **时间**: 应该是最近几分钟
   - **状态**: 应该是 "Ready" 或 "Building"
   - **Commit**: 应该是 `d8931e7` 或更新

### 3. 检查构建日志

在 Vercel Deployments 页面：
1. 点击最新的部署
2. 查看 "Building" 标签下的日志
3. 检查是否有错误：
   - Contentlayer 生成错误
   - 依赖安装失败
   - 构建超时

---

## 🔧 解决方案

### 方案 1: 清除构建缓存并重新部署

#### 步骤 1.1: 在 Vercel Dashboard 操作

1. 进入项目设置: Settings → General
2. 找到 "Build & Development Settings"
3. 添加环境变量触发重建：
   ```
   FORCE_REBUILD=1
   ```
4. 返回 Deployments 页面
5. 点击最新部署的 "..." → "Redeploy"
6. 选择 "Redeploy with Force"

#### 步骤 1.2: 或使用 Git 触发

```bash
# 本地执行
git commit --allow-empty -m "chore: Force rebuild"
git push origin main
```

### 方案 2: 检查 Vercel 配置

#### 步骤 2.1: 确认部署分支

1. Settings → Git
2. 确认 "Production Branch" 设置为 `main`
3. 确认 "Deploy Hooks" 没有冲突配置

#### 步骤 2.2: 检查构建命令

1. Settings → General → Build & Development Settings
2. 确认配置：
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

#### 步骤 2.3: 检查环境变量

1. Settings → Environment Variables
2. 确认以下变量存在且正确：
   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=295771887569985
   CLOUDINARY_API_KEY=295771887569985
   CLOUDINARY_API_SECRET=GebAgK4oIbuseF46La0F2Y2MAgc
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=notrace_upload
   NEXT_PUBLIC_API_BASE_URL=https://no-trace.jp/api
   NODE_ENV=production
   ```

### 方案 3: 检查 package.json 和依赖

#### 步骤 3.1: 验证 .npmrc 文件

确保项目根目录的 `.npmrc` 文件存在且包含：
```
legacy-peer-deps=true
```

#### 步骤 3.2: 检查 Contentlayer 配置

1. 查看 `contentlayer.config.ts`
2. 确认 `documentTypes` 包含 `Article` 和 `News`
3. 确认 `contentDirPath` 正确

### 方案 4: 手动触发完整重建

如果以上方案都不work，执行完整清理重建：

#### 本地操作

```bash
# 1. 清理本地构建文件
rm -rf .next
rm -rf .contentlayer
rm -rf node_modules
npm cache clean --force

# 2. 重新安装依赖
npm install

# 3. 本地测试构建
npm run build

# 4. 如果成功，创建新的部署标记
git commit --allow-empty -m "chore: Trigger clean rebuild - $(date '+%Y-%m-%d %H:%M')"
git push origin main
```

#### Vercel 操作

1. Settings → General
2. 删除所有缓存相关的环境变量
3. Deployments → 选择最新成功的部署
4. Redeploy → "Redeploy from scratch"

---

## 🎨 预期效果（部署成功后）

### 企業情報区域应该显示

1. **布局**:
   - 横向滚动容器
   - 文章从右到左排列（日式书籍风格）
   - 可左右滚动查看所有文章

2. **文章数量**: 7 篇（不是 5 篇）

3. **文字方向**:
   - 日期垂直显示（年份在上，月日在下）
   - 标题垂直显示（从右到左阅读）

4. **最新文章顺序** (从左到右):
   ```
   2025-01-20 | 2025-01-15 | 2025-11-01 | 2025-11-01 | ...
   ```

5. **动画效果**:
   - 滚动到视图时，文章依次从右侧淡入
   - 每篇文章延迟 100ms

### 视觉参考

```
┌─────────────────────────────────────────────┐
│   企業情報                                    │
│  ═══════════════════════════════════════   │
│                                             │
│  [滚动条] ←←←←←←←←←←←←←←←←←←←←←←←←←←      │
│                                             │
│  ┃  ┃  ┃  ┃  ┃  ┃  ┃  ← 7篇文章          │
│  ┃  ┃  ┃  ┃  ┃  ┃  ┃                    │
│  2  2  2  2  2  2  2                     │
│  0  0  0  0  0  0  0                     │
│  2  2  2  2  2  2  2                     │
│  5  5  5  5  5  5  5                     │
│  -  -  -  -  -  -  -                     │
│  0  0  1  1  1  1  1                     │
│  1  1  1  1  1  1  1                     │
│  -  -  -  -  -  -  -                     │
│  2  1  0  0  0  0  0                     │
│  0  5  1  1  1  1  1                     │
│                                             │
│  東 2  日 ス コ 無 無                      │
│  京 0  中 ペ ー 迹 迹                      │
│  コ 2  コ シ ヒ 探 探                      │
│  ー 5  ー ャ ー 索 索                      │
│  ヒ 東  ヒ ル 事 株 株                      │
│  ー 京  ー テ 業 式 式                      │
│  ...                                       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📊 Vercel 部署时间线

| 时间 | 操作 | 预期结果 |
|------|------|---------|
| T+0min | Git push | Vercel 检测到新 commit |
| T+1min | Building | 安装依赖、运行 Contentlayer |
| T+2min | Deploying | 部署到 Edge Network |
| T+3min | Ready | 生产环境更新完成 |

---

## ⚠️ 常见陷阱

### 1. Contentlayer 缓存问题

**症状**: 文章内容没有更新
**原因**: Contentlayer 缓存了旧的生成文件
**解决**:
```bash
rm -rf .contentlayer
npm run build
```

### 2. Next.js 增量构建

**症状**: 组件代码更新但页面没变
**原因**: Next.js ISR 缓存
**解决**: 在 Vercel 使用 "Redeploy from scratch"

### 3. 浏览器缓存

**症状**: 本地看起来没更新
**原因**: 浏览器缓存了旧的静态资源
**解决**:
- 硬刷新: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
- 无痕模式浏览
- 清除浏览器缓存

### 4. CDN 缓存

**症状**: 某些地区用户看到旧版本
**原因**: Vercel Edge Network CDN 缓存
**解决**: 通常 2-5 分钟后自动更新

---

## 🔍 调试工具

### 检查部署的实际代码

```bash
# 使用 curl 获取页面源代码
curl https://no-trace.jp | grep -A 5 "FeaturedArticlesSection"

# 检查特定的类名
curl https://no-trace.jp | grep "flex-row-reverse"

# 检查版本标记
curl https://no-trace.jp | grep "data-version"
```

### Vercel CLI（可选）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 查看部署列表
vercel ls

# 查看部署详情
vercel inspect <deployment-url>

# 手动触发部署
vercel --prod
```

---

## 📝 问题追踪 Checklist

部署后请检查以下项目：

- [ ] Vercel Deployment 状态为 "Ready"
- [ ] 构建日志没有错误
- [ ] 页面源代码包含 `data-version="0.6.1"`
- [ ] 页面源代码包含 `flex-row-reverse`
- [ ] 页面源代码包含 `writing-mode:vertical-rl`
- [ ] 生产环境显示 7 篇文章（不是 5 篇）
- [ ] 文章横向滚动布局（不是 grid）
- [ ] 文字垂直显示
- [ ] 最新文章（2025-01-15, 2025-01-20）排在前面
- [ ] 动画效果正常工作

---

## 💡 如果问题仍未解决

### 联系 Vercel 支持

1. 访问: https://vercel.com/support
2. 提供以下信息：
   - Project: `notrace-nextjs`
   - Issue: "Production deployment not reflecting latest code changes"
   - Latest commit: `d8931e7`
   - Expected behavior: Japanese book style layout with 7 articles
   - Actual behavior: Grid layout with 5 articles

### 替代方案：本地构建 + 手动部署

如果 Vercel 持续有问题，可以考虑：
1. 本地运行 `npm run build`
2. 将 `.next` 文件夹上传到 Vercel
3. 或考虑其他托管平台（Netlify, Cloudflare Pages）

---

## 📚 相关文档

- [Vercel Deployment Documentation](https://vercel.com/docs/deployments/overview)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Contentlayer Documentation](https://contentlayer.dev/)
- [项目部署指南](./DEPLOYMENT_GUIDE.md)

---

**最后更新**: 2025-11-27
**版本**: v1.0
**相关 Commits**: `484a05b`, `aab735a`, `3381516`, `d8931e7`
