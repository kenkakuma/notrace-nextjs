# 项目记忆 - NO TRACE EXPLORER

> 最后更新: 2025-01-15
> 当前版本: v0.3.0

## 📋 项目概述

**项目名称**: NO TRACE EXPLORER
**项目类型**: 企业官网 (Next.js 14)
**主要业务**: 日中咖啡业务探索平台
**技术栈**: Next.js 14.2.33 + React 18 + TypeScript + Tailwind CSS

## 🎯 核心功能模块

### 1. 主站功能
- **首页**: Hero + 业务价值 + 理念 + LAB/CLUB入口 + 商城入口 + 精选商品 + 企业情报 + FAQ
- **LAB页面**: 商城商品展示（统一设计风格 + 真实API数据）
- **CLUB页面**: 会员活动和服务
- **关于页面**: 企业介绍
- **CMS集成**: Sveltia CMS + Contentlayer

### 2. 商城集成
- **架构**: 双项目独立运营
- **主站端口**: 3000
- **商城前端**: 8000 (nteshop-storefront)
- **商城API**: 9000 (Medusa Backend)
- **集成方式**: API调用 + 外部链接

### 3. 内容管理
- **Hero配置**: Markdown文件 + API端点
- **文章系统**: Contentlayer集成
- **图片管理**: Cloudinary CDN

## 🏗️ 项目架构

### 目录结构
```
notrace-nextjs/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # 首页
│   ├── lab/               # LAB页面（商品展示）
│   ├── club/              # CLUB页面
│   ├── api/               # API路由
│   └── error.tsx          # 全局错误页面
├── components/            # React组件
│   ├── ui/               # 共享UI组件
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── OptimizedImage.tsx
│   ├── lab/              # LAB专用组件
│   │   ├── LabHeroSection.tsx
│   │   └── LabProductsSection.tsx
│   ├── ShopEntranceSection.tsx
│   ├── FeaturedProductsFromShop.tsx
│   └── ErrorBoundary.tsx
├── content/              # Markdown内容
│   └── hero/
├── public/               # 静态资源
│   ├── images/
│   └── admin/           # Sveltia CMS
└── hooks/               # 自定义Hooks
```

### 关键组件说明

#### 共享UI组件
1. **Container** - 统一容器样式（3种尺寸）
2. **Section** - 统一区块样式（多种背景和间距）
3. **OptimizedImage** - Next.js Image封装
4. **ErrorBoundary** - React错误边界

#### 商城相关组件
1. **ShopEntranceSection** - 商城入口展示（首页）
2. **FeaturedProductsFromShop** - 精选商品展示（首页，6个商品）
3. **LabHeroSection** - LAB Hero区域
4. **LabProductsSection** - LAB商品展示（分类筛选 + 全部商品）

## 🔌 API集成

### Medusa Shop API

#### 端点列表
```typescript
// 获取商品列表
GET ${SHOP_API_URL}/store/products?limit=50
GET ${SHOP_API_URL}/store/products?limit=50&collection_id[]={id}

// 获取商品分类
GET ${SHOP_API_URL}/store/collections
```

#### 环境变量
```bash
# 开发环境
NEXT_PUBLIC_SHOP_API_URL=http://localhost:9000
NEXT_PUBLIC_SHOP_URL=http://localhost:8000

# 生产环境
NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp
```

### Hero配置API
```typescript
GET /api/hero-config
```
返回Hero区域的配置数据（从Markdown解析）

## 🎨 设计系统

### 颜色变量 (tailwind.config.ts)
```javascript
colors: {
  primary: '#8B4513',        // 咖啡色（主色调）
  'text-dark': '#1a1a1a',    // 深灰（主文本）
  'text-secondary': '#6b7280', // 中灰（次要文本）
  'bg-light': '#f9fafb',     // 浅灰（背景）
}
```

### 常用样式模式
```css
/* 渐变背景 */
bg-gradient-to-br from-primary/5 via-bg-light to-primary/10

/* 卡片样式 */
rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300

/* 容器间距 */
py-16 md:py-24           /* Section padding */
max-w-7xl mx-auto        /* Container width */
px-4 sm:px-6 lg:px-8     /* Container padding */

/* 悬停效果 */
group-hover:scale-105 transition-transform duration-500
```

## 📦 依赖管理

### 核心依赖
```json
{
  "next": "14.2.33",
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.1",
  "contentlayer": "^0.3.4",
  "lucide-react": "^0.263.1"
}
```

### 特殊配置
- **Contentlayer**: 内容管理和Markdown处理
- **Cloudinary**: 图片CDN和优化
- **Sveltia CMS**: Git-based CMS

## 📝 重要文件

### 配置文件
- `next.config.mjs` - Next.js配置 + Contentlayer集成
- `tailwind.config.ts` - Tailwind CSS配置
- `tsconfig.json` - TypeScript配置
- `contentlayer.config.ts` - Contentlayer配置
- `.env.local.example` - 环境变量示例

### 文档文件
- `RELEASE_NOTES_v0.3.0.md` - 版本发布说明
- `SHOP_INTEGRATION_GUIDE.md` - 商城集成指南（67KB）
- `LAB_PAGE_UPGRADE.md` - LAB页面升级文档
- `CODE_QUALITY_IMPROVEMENTS.md` - 代码质量改进文档
- `PROJECT_MEMORY.md` - 本文件（项目记忆）

## 🔄 版本历史

### v0.3.0 (2025-01-15) - 当前版本
**主要更新**:
- ✅ 商城集成系统（双项目独立运营）
- ✅ LAB页面升级（统一设计 + 真实数据）
- ✅ 代码质量改进（共享组件 + 错误处理）

**统计**:
- 59个文件修改
- 5488行新增代码
- 31个新文件

**关键功能**:
- Medusa API集成
- 分类筛选功能
- 多货币支持
- 响应式设计完善

### v0.2.x - 之前版本
- 基础页面结构
- Contentlayer集成
- 初始组件开发

## 🚨 已知问题和注意事项

### 非阻塞警告
1. **Contentlayer警告**: `compilerOptions.paths` 配置警告（不影响功能）
2. **Module Type警告**: `package.json` 缺少 `"type": "module"`（性能优化建议）

### 开发环境要求
- Node.js >= 18.x
- npm >= 9.x
- 需要同时运行商城后端（端口9000）才能看到真实商品数据

### CORS配置
商城后端必须配置允许主站域名访问：
```javascript
const STORE_CORS = process.env.STORE_CORS || "http://localhost:3000"
```

## 🎯 下一步开发计划

### v0.4.0 规划
- [ ] 商品搜索功能
- [ ] 购物车预览
- [ ] 商品收藏功能
- [ ] 移动端交互优化

### 技术债务
- [ ] 添加单元测试（Jest + React Testing Library）
- [ ] 添加E2E测试（Playwright）
- [ ] 性能监控集成
- [ ] SEO元数据优化

### 优化建议
- [ ] 实现图片懒加载优化
- [ ] 添加Redis缓存层
- [ ] API响应缓存
- [ ] 代码分割优化

## 💡 开发经验总结

### 成功实践
1. **双项目架构**: 主站与商城独立运营，降低耦合度
2. **API集成**: 通过API调用获取数据，保持灵活性
3. **共享组件**: 提取Container/Section等组件，减少重复代码
4. **错误处理**: 完善的加载、错误、空状态处理
5. **文档驱动**: 详细文档便于团队协作和后续维护

### 避免的坑
1. ❌ 不要将商城完全集成到主站（维护困难）
2. ❌ 不要在多处硬编码容器样式（使用Container组件）
3. ❌ 不要忽略图片加载失败处理（使用占位符）
4. ❌ 不要跳过环境变量配置（API调用失败）

### 设计原则
1. **组件化**: 单一职责，高复用
2. **类型安全**: TypeScript类型定义完整
3. **响应式优先**: 移动端优先设计
4. **用户体验**: 加载状态、错误提示、空状态
5. **性能优化**: 懒加载、代码分割、图片优化

## 📞 联系和资源

### 项目相关
- **主仓库**: notrace-nextjs
- **商城仓库**: nteshop
- **部署**: Vercel (主站) + 独立服务器 (商城)

### 外部服务
- **Cloudinary**: 图片CDN和管理
- **Medusa**: 电商后端服务
- **Sveltia CMS**: 内容管理系统

## 🎓 学习资源

### 技术文档
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Medusa Documentation](https://docs.medusajs.com)
- [Contentlayer Documentation](https://www.contentlayer.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### 项目文档
- 所有项目文档位于根目录的 `.md` 文件中
- 每次重大更新都有对应的 `RELEASE_NOTES_vX.X.X.md`

---

## 📊 项目统计（v0.3.0）

- **总文件数**: 100+ 文件
- **代码行数**: 10,000+ 行
- **组件数量**: 40+ 组件
- **页面数量**: 8个主要页面
- **API端点**: 3个端点
- **文档数量**: 10+ 文档文件

---

**最后更新**: 2025-01-15
**维护者**: Development Team
**版本**: v0.3.0
