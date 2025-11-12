# 版本变更日志

> 记录所有重要的版本变更

## v0.4.0 (2025-01-15) ✨ 当前版本

### 🎉 主要功能

#### CMS内容管理系统
- ✅ Sveltia CMS集成 (Git-based内容管理)
- ✅ Contentlayer MDX处理 (TypeScript类型自动生成)
- ✅ 企业文章系统 (6个分类)
- ✅ 新闻发布系统 (4个分类 + 外部链接支持)
- ✅ 文章/新闻列表页和详情页
- ✅ MDX内容渲染器

#### 管理后台
- ✅ 统一管理仪表板 (`/admin`)
- ✅ Tab式界面设计
- ✅ CMS管理面板 (iframe集成)
- ✅ Hero实时预览编辑
- ✅ Cloudinary图片管理界面

### 📊 统计数据
- **新增文件**: 24个
- **新增代码**: 约4,300行
- **新增组件**: 11个
- **新增页面**: 7个
- **文档**: 6个文档 (62KB)

### 🔧 技术更新
- Contentlayer v0.3.4
- Sveltia CMS最新版
- next-contentlayer集成
- Gray-matter YAML处理

### 📝 新增组件
1. `AdminTabs` - Tab导航
2. `CMSPanel` - CMS管理面板
3. `ImageManagementPanel` - 图片管理
4. `HeroManagementPanel` - Hero编辑器
5. `ArticleCard` - 文章卡片
6. `NewsCard` - 新闻卡片
7. `Mdx` - MDX渲染器
8. `FeaturedArticlesSection` - 精选内容

### 🛠️ 配置文件
- `contentlayer.config.ts` - Contentlayer配置
- `public/admin/config.yml` - Sveltia CMS配置
- `next.config.mjs` - 更新Contentlayer集成

### 📚 文档
- `CMS_USER_GUIDE.md` (10KB)
- `CMS_TECHNICAL_GUIDE.md` (16KB)
- `CMS_IMPLEMENTATION_SUMMARY.md` (9KB)
- `ADMIN_DASHBOARD_GUIDE.md` (10KB)
- `ADMIN_IMPLEMENTATION_SUMMARY.md` (11KB)
- `FINAL_IMPLEMENTATION_SUMMARY.md` (13KB)

---

## v0.3.0 (2025-01-15)

### 🎉 主要功能

#### 商城集成系统
- ✅ 双项目独立架构设计
- ✅ Medusa API集成 (商品、分类)
- ✅ 首页商城入口和精选商品展示 (6个商品)
- ✅ LAB页面升级 (统一设计 + 真实API数据)
- ✅ 商品分类筛选功能
- ✅ CORS配置和环境变量管理

#### 代码质量改进
- ✅ 共享UI组件 (`Container`, `Section`, `OptimizedImage`)
- ✅ 统一设计系统
- ✅ 完善的错误处理 (加载、错误、空状态)
- ✅ 全局错误边界
- ✅ TypeScript类型完善

### 📊 统计数据
- **修改文件**: 59个
- **新增代码**: 5,488行
- **新文件**: 31个

### 🔧 新增组件
1. `Container` - 统一容器 (3种尺寸)
2. `Section` - 统一区块 (4种变体)
3. `OptimizedImage` - 图片优化组件
4. `ErrorBoundary` - 错误边界
5. `ShopEntranceSection` - 商城入口
6. `FeaturedProductsFromShop` - 精选商品
7. `LabHeroSection` - LAB Hero
8. `LabProductsSection` - LAB商品展示

### 🛠️ 配置更新
- 环境变量: 商城API URL配置
- CORS: 商城后端允许主站访问
- TypeScript: 商品类型定义

### 📚 文档
- `SHOP_INTEGRATION_GUIDE.md` (20KB)
- `LAB_PAGE_UPGRADE.md` (7KB)
- `CODE_QUALITY_IMPROVEMENTS.md` (7KB)
- `COMPLETION_SUMMARY.md` (6KB)
- `RELEASE_NOTES_v0.3.0.md` (7KB)

### ⚠️ 已知问题
- Contentlayer `compilerOptions.paths` 警告 (不影响功能)
- `package.json` 缺少 `"type": "module"` (性能建议)

---

## v0.2.x (2025-01-09 及之前)

### 基础功能
- ✅ Next.js 14项目初始化
- ✅ TypeScript配置
- ✅ Tailwind CSS配置
- ✅ 基础页面结构 (首页、LAB、CLUB、关于)
- ✅ Contentlayer初步集成
- ✅ 导航栏和页脚
- ✅ Hero区域

### 技术栈
- Next.js 14.2.33
- React 18
- TypeScript 5.x
- Tailwind CSS 3.4.1

### 初始组件
- 基础Layout组件
- 页面组件
- Hero组件

### 配置文件
- `next.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`

---

## 版本规划

### v0.5.0 (计划中)

#### 功能增强
- [ ] 管理后台认证系统 (Basic Auth / GitHub OAuth)
- [ ] Cloudinary Upload Widget集成
- [ ] Hero保存API完整实现
- [ ] 文章/新闻统计数据实时获取
- [ ] 商品搜索功能
- [ ] 购物车预览

#### 技术优化
- [ ] 添加单元测试 (Jest + React Testing Library)
- [ ] 添加E2E测试 (Playwright)
- [ ] 性能监控集成
- [ ] SEO元数据优化
- [ ] 解决viewport metadata警告

#### 性能优化
- [ ] 图片懒加载优化
- [ ] Redis缓存层
- [ ] API响应缓存
- [ ] 代码分割优化

---

## 变更类型说明

### 功能变更
- **feat**: 新功能
- **fix**: Bug修复
- **refactor**: 代码重构
- **perf**: 性能优化

### 文档/配置变更
- **docs**: 文档更新
- **style**: 代码格式调整
- **build**: 构建系统变更
- **ci**: CI/CD变更

### 其他
- **test**: 测试相关
- **chore**: 杂项变更

---

**维护者**: Development Team
**文档版本**: v1.0
**最后更新**: 2025-01-12
