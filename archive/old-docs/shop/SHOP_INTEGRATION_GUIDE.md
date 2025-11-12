# 商城集成指南 - 双项目独立运营方案

> 完成时间: 2025-01-15
> 集成模式: 独立运营 + API集成

## 📋 方案概述

### 架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                    NO TRACE EXPLORER                         │
│                  (notrace-nextjs 主站)                        │
│                                                               │
│  端口: 3000                                                   │
│  域名: https://no-trace.jp                                    │
│                                                               │
│  ┌──────────────────────────────────────────────┐            │
│  │  首页                                        │            │
│  │  ├── Hero Section                           │            │
│  │  ├── Business Value                         │            │
│  │  ├── Philosophy                             │            │
│  │  ├── Services (LAB/CLUB)                    │            │
│  │  ├── ✨ Shop Entrance  ◄──────────┐        │            │
│  │  ├── ✨ Featured Products         │        │            │
│  │  │   (调用商城API)                 │        │            │
│  │  ├── Articles                     │        │            │
│  │  └── FAQ                          │        │            │
│  └───────────────────────────────────┼────────┘            │
│                                       │                      │
│  /lab 页面 (可选)                     │                      │
│  └── 商品展示 + 跳转链接               │                      │
│                                       │                      │
└───────────────────────────────────────┼──────────────────────┘
                                        │
                                        │ API调用
                                        │ /store/products
                                        ↓
┌─────────────────────────────────────────────────────────────┐
│                    MUSEKI Coffee Shop                        │
│                    (nteshop 商城)                            │
│                                                               │
│  前端端口: 8000                                               │
│  前端域名: https://shop.no-trace.jp                           │
│  后端端口: 9000                                               │
│  后端域名: https://api.shop.no-trace.jp                       │
│                                                               │
│  ┌──────────────────────────────────────────────┐            │
│  │  Storefront (Next.js 15)                    │            │
│  │  ├── 产品列表                                │            │
│  │  ├── 产品详情                                │            │
│  │  ├── 购物车                                  │            │
│  │  ├── 结账流程                                │            │
│  │  ├── 用户账户                                │            │
│  │  └── 订单管理                                │            │
│  └──────────────────────────────────────────────┘            │
│                          ↕                                    │
│  ┌──────────────────────────────────────────────┐            │
│  │  Backend (Medusa.js 2.8)                     │            │
│  │  ├── 产品管理                                │            │
│  │  ├── 订单处理                                │            │
│  │  ├── 库存管理                                │            │
│  │  ├── 支付集成 (Stripe)                       │            │
│  │  ├── 搜索引擎 (Meilisearch)                  │            │
│  │  └── 邮件服务 (Resend)                       │            │
│  └──────────────────────────────────────────────┘            │
│                                                               │
│  ┌──────────────────────────────────────────────┐            │
│  │  基础服务 (Docker)                           │            │
│  │  ├── PostgreSQL :5432                        │            │
│  │  ├── Redis :6379                             │            │
│  │  └── Meilisearch :7700                       │            │
│  └──────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 集成特性

### ✅ 已实现功能

1. **商城入口组件** (`ShopEntranceSection.tsx`)
   - 精美的商城介绍卡片
   - 3个主要特性展示(精选豆/专业器具/全球配送)
   - 明确的CTA按钮
   - 多语言/多货币提示

2. **精选商品展示** (`FeaturedProductsFromShop.tsx`)
   - 从Medusa API获取前6个产品
   - 实时价格显示(支持多货币)
   - 响应式产品卡片
   - 图片加载失败处理
   - 外部链接跳转到商城

3. **首页集成**
   - 在LAB/CLUB卡片后展示商城入口
   - 在商城入口后展示精选商品
   - 无缝的用户体验

4. **环境变量配置**
   - 开发/生产环境分离
   - API地址可配置
   - 前端地址可配置

---

## 🔧 技术细节

### 新增文件

```
notrace-nextjs/
├── components/
│   ├── ShopEntranceSection.tsx          # 商城入口组件
│   └── FeaturedProductsFromShop.tsx     # 精选商品展示
├── .env.local.example                    # 环境变量示例
└── SHOP_INTEGRATION_GUIDE.md            # 本文档
```

### 环境变量

**开发环境** (`.env.local`):
```bash
# 商城集成配置
NEXT_PUBLIC_SHOP_API_URL=http://localhost:9000
NEXT_PUBLIC_SHOP_URL=http://localhost:8000
```

**生产环境**:
```bash
# 商城集成配置
NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp
```

### API调用

**获取产品列表**:
```typescript
const response = await fetch(
  `${SHOP_API_URL}/store/products?limit=6`,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
)

const data = await response.json()
// data.products: Product[]
```

**产品数据结构**:
```typescript
interface Product {
  id: string
  title: string
  handle: string              // URL标识
  thumbnail?: string
  description?: string
  variants?: Array<{
    id: string
    prices?: Array<{
      amount: number          // 以分为单位
      currency_code: string   // "usd", "eur", "cny"
    }>
  }>
}
```

**价格格式化**:
```typescript
// 示例: amount=2500, currency_code="usd"
// 输出: "$25.00"

const amount = price.amount / 100
const symbols = { USD: '$', EUR: '€', CNY: '¥' }
const formatted = `${symbols[currency]} ${amount.toFixed(2)}`
```

---

## 🚀 部署指南

### 开发环境设置

#### 1. 启动nteshop商城

```bash
# 终端1: 启动基础服务
cd /Users/eric/WebstormProjects/nteshop
docker-compose up -d

# 等待服务启动...
# PostgreSQL :5432
# Redis :6379
# Meilisearch :7700

# 终端2: 启动Medusa后端
cd backend
yarn dev
# 后端运行在 http://localhost:9000

# 终端3: 启动商城前端
cd storefront
yarn dev -p 8000
# 前端运行在 http://localhost:8000
```

#### 2. 配置notrace-nextjs

```bash
cd /Users/eric/WebstormProjects/notrace-nextjs

# 复制环境变量示例
cp .env.local.example .env.local

# 编辑.env.local，添加:
NEXT_PUBLIC_SHOP_API_URL=http://localhost:9000
NEXT_PUBLIC_SHOP_URL=http://localhost:8000

# 启动开发服务器
npm run dev
# 运行在 http://localhost:3000
```

#### 3. 验证集成

访问 `http://localhost:3000`:
- ✅ 看到"MUSEKI Coffee Shop"入口区域
- ✅ 看到6个精选商品卡片
- ✅ 点击"オンラインストアへ"跳转到 http://localhost:8000
- ✅ 点击商品卡片跳转到商城产品详情页

### 生产环境部署

#### 域名配置建议

**方案A: 子域名** (推荐)
```
主站: https://no-trace.jp
商城前端: https://shop.no-trace.jp
商城API: https://api.shop.no-trace.jp
```

**DNS设置**:
```
A    no-trace.jp           → 主站服务器IP
A    shop.no-trace.jp      → 商城前端服务器IP
A    api.shop.no-trace.jp  → 商城后端服务器IP
```

**方案B: 子路径**
```
主站: https://no-trace.jp
商城: https://no-trace.jp/shop
```

**需要配置反向代理** (nginx):
```nginx
# 主站
location / {
    proxy_pass http://localhost:3000;
}

# 商城前端
location /shop {
    rewrite ^/shop(.*)$ $1 break;
    proxy_pass http://localhost:8000;
}

# 商城API
location /api/shop {
    rewrite ^/api/shop(.*)$ $1 break;
    proxy_pass http://localhost:9000;
}
```

#### 环境变量配置

**主站 (notrace-nextjs)**:
```bash
# Vercel/Netlify环境变量
NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp
```

**商城后端 (nteshop/backend)**:
```bash
# 数据库 (生产)
DATABASE_URL=postgresql://user:pass@prod-db:5432/medusa_store

# Redis (生产)
REDIS_URL=redis://prod-redis:6379

# Medusa配置
MEDUSA_BACKEND_URL=https://api.shop.no-trace.jp
PORT=9000

# CORS
STORE_CORS=https://shop.no-trace.jp,https://no-trace.jp
ADMIN_CORS=https://admin.shop.no-trace.jp

# Stripe (生产密钥)
STRIPE_API_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...
RESEND_FROM=noreply@musekicoffee.com
```

**商城前端 (nteshop/storefront)**:
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_BASE_URL=https://shop.no-trace.jp
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
```

---

## 📊 功能对比

| 功能 | 主站 (notrace-nextjs) | 商城 (nteshop) |
|------|----------------------|----------------|
| **展示** | ✅ 商城入口 + 精选商品 | ✅ 完整商城 |
| **浏览产品** | ✅ 前6个产品预览 | ✅ 全部产品 + 搜索 |
| **购物车** | ❌ 无 | ✅ 完整功能 |
| **结账** | ❌ 无 | ✅ 完整流程 |
| **支付** | ❌ 无 | ✅ Stripe集成 |
| **订单管理** | ❌ 无 | ✅ 完整功能 |
| **用户系统** | ❌ 无 | ✅ 注册/登录 |
| **多语言** | ✅ 部分 | ✅ 3语言完整 |
| **多货币** | ✅ 显示 | ✅ 完整支持 |

---

## 🔄 数据流

### 产品数据流

```
1. 用户访问主站首页
   ↓
2. FeaturedProductsFromShop组件挂载
   ↓
3. useEffect触发API调用
   fetch(`${SHOP_API_URL}/store/products?limit=6`)
   ↓
4. Medusa API处理请求
   - 查询PostgreSQL数据库
   - 获取前6个产品
   - 包含变体和价格信息
   ↓
5. 返回JSON数据
   ↓
6. React组件渲染产品卡片
   - 显示产品图片
   - 显示产品标题
   - 显示价格(自动格式化货币)
   ↓
7. 用户点击产品卡片
   ↓
8. 跳转到商城产品详情页
   `${SHOP_URL}/products/${product.handle}`
   ↓
9. 在商城完成购买流程
```

### 图片处理

**图片URL格式**:
```typescript
// 场景1: 绝对URL (Cloudinary等)
thumbnail: "https://res.cloudinary.com/.../image.jpg"
→ 直接使用

// 场景2: 相对路径
thumbnail: "/uploads/products/coffee-beans.jpg"
→ 拼接为: `${SHOP_URL}/uploads/products/coffee-beans.jpg`

// 场景3: 图片加载失败
→ 回退到占位图: "/images/placeholder-product.jpg"
```

---

## 🎨 UI组件说明

### ShopEntranceSection

**位置**: 首页SecondaryHeroSection之后

**结构**:
```
┌────────────────────────────────────────────┐
│        [Icon] MUSEKI Coffee Shop            │
│                                             │
│  厳選されたコーヒー豆と器具を、世界中に      │
│  お届けします                               │
│                                             │
│  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │ 精选豆│  │专业器具│  │全球配送│            │
│  └──────┘  └──────┘  └──────┘            │
│                                             │
│  [オンラインストアへ]  [商品を見る]          │
│                                             │
│  ℹ️ 多言語・多通貨対応                     │
└────────────────────────────────────────────┘
```

**功能**:
- ✅ 品牌介绍
- ✅ 核心特性展示
- ✅ 明确的CTA按钮
- ✅ 多语言/多货币说明

### FeaturedProductsFromShop

**位置**: ShopEntranceSection之后

**结构**:
```
┌────────────────────────────────────────────┐
│            厳選コーヒー                     │
│  世界各地から厳選されたプレミアムコーヒー   │
│                                             │
│  ┌────┐ ┌────┐ ┌────┐                     │
│  │图片│ │图片│ │图片│                     │
│  │标题│ │标题│ │标题│                     │
│  │描述│ │描述│ │描述│                     │
│  │价格│ │价格│ │价格│                     │
│  └────┘ └────┘ └────┘                     │
│                                             │
│  ┌────┐ ┌────┐ ┌────┐                     │
│  │图片│ │图片│ │图片│                     │
│  └────┘ └────┘ └────┘                     │
│                                             │
│       [すべての商品を見る]                  │
└────────────────────────────────────────────┘
```

**功能**:
- ✅ 实时API调用
- ✅ 加载状态显示
- ✅ 错误处理
- ✅ 图片懒加载
- ✅ 价格自动格式化
- ✅ 响应式布局
- ✅ Hover效果

---

## ⚠️ 注意事项

### CORS配置

商城后端需要允许主站跨域请求:

```javascript
// nteshop/backend/medusa-config.js
module.exports = {
  projectConfig: {
    store_cors: process.env.STORE_CORS ||
      "http://localhost:3000,http://localhost:8000,https://no-trace.jp,https://shop.no-trace.jp",
    admin_cors: process.env.ADMIN_CORS ||
      "http://localhost:3000,http://localhost:7001",
  }
}
```

### 性能优化

**1. API缓存**:
```typescript
// 使用React Query缓存产品数据
import { useQuery } from '@tanstack/react-query'

const { data, isLoading } = useQuery({
  queryKey: ['featured-products'],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000, // 5分钟缓存
})
```

**2. 图片优化**:
- 使用Next.js Image组件(可选)
- 配置图片CDN
- 懒加载非首屏图片

**3. 代码分割**:
```typescript
// 动态导入商品组件
const FeaturedProductsFromShop = dynamic(
  () => import('@/components/FeaturedProductsFromShop'),
  { loading: () => <p>Loading...</p> }
)
```

### 安全性

**1. 环境变量**:
- ✅ 公开的使用 `NEXT_PUBLIC_` 前缀
- ❌ 敏感信息不要暴露给前端

**2. API限流**:
```javascript
// Medusa后端配置限流
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制100个请求
})

app.use('/store/products', limiter)
```

**3. 错误处理**:
- ✅ API调用失败时显示友好提示
- ✅ 图片加载失败显示占位图
- ✅ 不暴露后端错误详情

---

## 🧪 测试清单

### 开发环境测试

- [ ] 商城后端正常运行 (http://localhost:9000)
- [ ] 商城前端正常运行 (http://localhost:8000)
- [ ] 主站正常运行 (http://localhost:3000)
- [ ] 主站首页显示商城入口
- [ ] 主站首页显示6个精选商品
- [ ] 产品价格正确格式化
- [ ] 产品图片正常显示
- [ ] 点击商品跳转到商城详情页
- [ ] 点击"オンラインストアへ"跳转到商城首页
- [ ] API调用失败时显示错误提示
- [ ] 图片加载失败显示占位图

### 生产环境测试

- [ ] 商城独立域名可访问
- [ ] HTTPS证书配置正确
- [ ] CORS配置正确
- [ ] API响应速度<2s
- [ ] 图片加载速度<1s
- [ ] 跨域跳转正常
- [ ] 多语言显示正确
- [ ] 多货币显示正确
- [ ] SEO元数据正确
- [ ] Google Analytics追踪正常

---

## 📈 未来扩展

### 可选功能

**1. 购物车共享**
- 在主站也显示购物车图标
- 跨域读取购物车数据
- 点击跳转到商城结账

**2. 用户统一认证**
- 使用JWT令牌
- 主站和商城共享登录状态
- Single Sign-On (SSO)

**3. 更多商品展示**
- 在/lab页面展示所有商品
- 添加分类筛选
- 添加搜索功能

**4. 商品推荐**
- 基于用户浏览历史
- AI驱动的商品推荐
- 个性化展示

**5. 数据分析**
- 追踪用户从主站到商城的转化率
- 热门商品统计
- A/B测试不同入口设计

---

## 🆘 故障排除

### 问题1: 商品不显示

**症状**: 首页精选商品区域空白

**检查**:
```bash
# 1. 检查商城后端是否运行
curl http://localhost:9000/store/products

# 2. 检查环境变量
echo $NEXT_PUBLIC_SHOP_API_URL

# 3. 检查浏览器控制台
# 查看是否有CORS错误或网络错误
```

**解决**:
- 启动商城后端
- 检查环境变量配置
- 检查CORS设置

### 问题2: 图片404

**症状**: 商品图片不显示

**原因**:
- 图片路径不正确
- Medusa静态文件服务未配置

**解决**:
```javascript
// 检查Medusa配置
// backend/medusa-config.js
module.exports = {
  projectConfig: {
    // 确保配置了静态文件服务
    uploads: {
      bucket: 'local', // 或 's3'
      prefix: 'uploads',
    }
  }
}
```

### 问题3: 价格显示异常

**症状**: 价格显示为"价格未定"

**原因**: 产品变体或价格数据不完整

**解决**:
```bash
# 检查产品数据
cd nteshop/backend
yarn medusa seed

# 确保产品有变体和价格
```

### 问题4: 跨域错误

**症状**: Console显示CORS错误

**解决**:
```bash
# 更新backend/.env
STORE_CORS=http://localhost:3000,http://localhost:8000

# 重启后端
cd backend && yarn dev
```

---

## 📚 相关文档

1. **nteshop项目文档**:
   - `/Users/eric/WebstormProjects/nteshop/README.md`
   - Medusa.js文档: https://docs.medusajs.com

2. **notrace-nextjs项目文档**:
   - `/Users/eric/WebstormProjects/notrace-nextjs/PROJECT_REVIEW.md`
   - `/Users/eric/WebstormProjects/notrace-nextjs/COMPLETION_SUMMARY.md`

3. **技术文档**:
   - Next.js: https://nextjs.org/docs
   - React: https://react.dev
   - TailwindCSS: https://tailwindcss.com/docs

---

## ✅ 集成完成检查清单

### 代码层面
- [x] 创建ShopEntranceSection组件
- [x] 创建FeaturedProductsFromShop组件
- [x] 更新首页添加新组件
- [x] 配置环境变量
- [x] 创建集成文档

### 部署层面
- [ ] 配置生产环境变量
- [ ] 配置域名DNS
- [ ] 配置HTTPS证书
- [ ] 配置CORS
- [ ] 部署商城后端
- [ ] 部署商城前端
- [ ] 部署主站
- [ ] 测试跨域跳转

---

**文档创建时间**: 2025-01-15
**维护者**: Claude AI Assistant
**版本**: v1.0.0
