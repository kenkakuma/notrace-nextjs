# LAB页面升级文档

> 完成时间: 2025-01-15
> 升级类型: 设计统一 + 真实数据集成

## 📋 升级概述

将LAB页面从使用假数据的简单展示页面升级为：
- ✅ 与网站主风格统一的设计
- ✅ 接入商城真实API数据
- ✅ 支持分类筛选功能
- ✅ 完整的加载和错误状态处理

## 🎨 设计改进

### 之前的问题
- 风格与主站不一致（使用了不同的布局和颜色方案）
- 使用硬编码的假数据
- 没有分类筛选功能
- 缺少加载和错误状态

### 改进后的特性

#### 1. **统一的设计语言**
- 使用与主站相同的渐变背景 (`from-primary/5 via-bg-light to-primary/10`)
- 统一的圆角样式 (`rounded-2xl`)
- 一致的悬停效果和过渡动画
- 相同的颜色系统和间距规范

#### 2. **Hero区域重新设计**
```
components/lab/LabHeroSection.tsx
```
- 渐变背景替代纯色背景
- 图标化的特性展示（3个卡片）
- 明确的CTA按钮指向在线商城
- 响应式布局优化

#### 3. **产品展示区域升级**
```
components/lab/LabProductsSection.tsx
```
- 左侧分类筛选 + 右侧产品网格布局
- 实时调用Medusa API获取数据
- 支持按Collection筛选
- 优雅的加载骨架屏
- 完整的错误处理

## 🔌 API集成

### 接入的API端点

#### 1. 获取商品分类
```typescript
GET ${SHOP_API_URL}/store/collections
```
返回所有商品分类，用于侧边栏筛选。

#### 2. 获取商品列表
```typescript
GET ${SHOP_API_URL}/store/products?limit=50
GET ${SHOP_API_URL}/store/products?limit=50&collection_id[]={id}
```
- 默认获取50个商品
- 支持按分类ID筛选
- 返回完整的产品信息（标题、价格、图片、描述等）

### 数据处理

#### 价格格式化
```typescript
const formatPrice = (product: Product) => {
  const price = product.variants[0].prices[0]
  const amount = price.amount / 100  // Medusa以分为单位
  const currency = price.currency_code.toUpperCase()

  const symbols = { USD: '$', EUR: '€', CNY: '¥', JPY: '¥' }
  return `${symbols[currency] || currency} ${amount.toFixed(2)}`
}
```

#### 图片URL处理
```typescript
const getImageUrl = (thumbnail?: string) => {
  if (!thumbnail) return '/images/placeholder-product.svg'
  if (thumbnail.startsWith('http')) return thumbnail
  return `${SHOP_URL}${thumbnail}`
}
```

## 📁 新建文件

### 组件文件
```
components/lab/
├── LabHeroSection.tsx       # Hero区域组件
├── LabProductsSection.tsx   # 产品展示组件（含API集成）
└── index.ts                 # 统一导出
```

### 资源文件
```
public/images/
└── placeholder-product.svg  # 产品占位符图片
```

### 文档文件
```
LAB_PAGE_UPGRADE.md          # 本升级文档
```

## 🔄 修改的文件

### 1. app/lab/page.tsx
**改动**:
- 从导入 `ShopHeroSection` 和 `ShopProductsSection` 改为导入新的 `LabHeroSection` 和 `LabProductsSection`
- 更新中文注释

**之前**:
```tsx
import { ShopHeroSection } from '@/components/ShopHeroSection'
import { ShopProductsSection } from '@/components/ShopProductsSection'
```

**之后**:
```tsx
import { LabHeroSection, LabProductsSection } from '@/components/lab'
```

### 2. components/FeaturedProductsFromShop.tsx
**改动**:
- 更新占位符图片路径从 `.jpg` 到 `.svg`

## 🎯 功能特性

### 1. 分类筛选
- 左侧显示所有可用分类
- 点击分类实时筛选商品
- "すべての商品" 选项显示全部
- 当前选中分类高亮显示
- 显示当前筛选结果的商品数量

### 2. 响应式布局
- 桌面端: 侧边栏 + 3列产品网格
- 平板端: 侧边栏 + 2列产品网格
- 移动端: 堆叠布局 + 1列产品

### 3. 加载状态
```tsx
{loading ? (
  // 显示6个骨架屏卡片
  <LoadingSkeletons />
) : (
  // 显示真实产品
  <ProductGrid />
)}
```

### 4. 错误处理
- API调用失败时显示友好错误信息
- 提供"去在线商城查看"的备用选项
- 图片加载失败自动显示占位符

### 5. 外部链接
所有产品卡片点击后在新窗口打开商城产品详情页：
```tsx
href={`${SHOP_URL}/products/${product.handle}`}
target="_blank"
rel="noopener noreferrer"
```

## 🎨 设计细节

### 颜色系统
- **主色调**: `primary` (咖啡色 #8B4513)
- **背景**: 渐变 `from-primary/5 via-bg-light to-primary/10`
- **文本**: `text-dark` (深灰) + `text-secondary` (中灰)
- **悬停效果**: `hover:shadow-xl`, `hover:border-primary/20`

### 动画效果
- 图片缩放: `group-hover:scale-105 transition-transform duration-500`
- 阴影提升: `hover:shadow-xl`
- 边框高亮: `hover:border-primary/20`
- 图标显示: `opacity-0 group-hover:opacity-100`

### 间距规范
- Section padding: `py-16 md:py-24`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Grid gap: `gap-6` (产品网格), `gap-8` (主网格)

## 📊 性能优化

### 1. API调用优化
- 使用 `useEffect` 钩子管理API调用
- 依赖项数组确保只在必要时重新获取
- 取消不必要的重复请求

### 2. 图片优化
- 懒加载（浏览器原生）
- 错误回退机制
- SVG占位符（轻量级）

### 3. 状态管理
- 最小化状态更新
- 合理的加载状态显示
- 错误状态缓存

## 🧪 测试场景

### 成功场景
1. ✅ 页面首次加载 - 显示所有商品
2. ✅ 点击分类筛选 - 正确显示该分类商品
3. ✅ 点击"すべての商品" - 返回显示全部
4. ✅ 点击商品卡片 - 在新窗口打开商城详情页
5. ✅ 响应式布局 - 在不同屏幕尺寸正常显示

### 错误场景
1. ✅ API不可用 - 显示错误信息和备用链接
2. ✅ 图片加载失败 - 显示SVG占位符
3. ✅ 无商品数据 - 显示空状态提示
4. ✅ 筛选后无结果 - 提示切换回全部商品

## 🚀 部署注意事项

### 环境变量配置
确保在生产环境配置以下环境变量：

```bash
# .env.local 或 .env.production
NEXT_PUBLIC_SHOP_API_URL=https://api.shop.no-trace.jp
NEXT_PUBLIC_SHOP_URL=https://shop.no-trace.jp
```

### CORS配置
确保商城API配置了正确的CORS策略，允许主站域名访问：

```javascript
// nteshop backend 配置
const STORE_CORS = process.env.STORE_CORS || "https://no-trace.jp"
```

### 图片资源
确保以下文件在生产环境存在：
- `public/images/placeholder-product.svg`

## 📝 后续优化建议

### 短期优化
1. 添加搜索功能
2. 添加排序选项（价格、名称、新品）
3. 添加分页或无限滚动
4. 优化移动端分类筛选（折叠式抽屉）

### 长期优化
1. 添加商品收藏功能
2. 集成购物车预览
3. 添加商品对比功能
4. 实现更丰富的筛选条件（价格区间、评分等）

## 🎉 升级效果

### 用户体验提升
- ✅ 更统一专业的视觉体验
- ✅ 真实商品数据展示
- ✅ 流畅的交互体验
- ✅ 完善的错误处理

### 技术质量提升
- ✅ 代码结构更清晰
- ✅ 组件可复用性更高
- ✅ API集成更规范
- ✅ 错误处理更完善

### SEO优化
- ✅ 真实产品数据有利于搜索引擎收录
- ✅ 规范的HTML语义化标签
- ✅ 合理的meta信息

---

**升级完成！** 🎊

LAB页面现在已经与网站整体设计风格统一，并且成功接入了商城的真实数据API。用户可以浏览真实的商品信息，并通过分类筛选找到感兴趣的产品，点击后直接跳转到商城完成购买。
