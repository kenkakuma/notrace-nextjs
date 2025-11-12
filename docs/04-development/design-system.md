# 设计系统

> NO TRACE EXPLORER 视觉和组件规范

## 🎨 设计理念

### 品牌定位
- **行业**: 咖啡进口和商务探索
- **风格**: 专业、温暖、国际化
- **色调**: 咖啡色为主,传达品质和温度

### 设计原则
1. **简洁专业**: 清晰的信息层级,避免过度装饰
2. **响应式优先**: 移动端优先,渐进增强
3. **一致性**: 统一的组件和交互模式
4. **性能**: 优化加载和动画性能

## 🌈 颜色系统

### 主题色
```css
/* Tailwind配置 */
colors: {
  primary: '#8B4513',        /* 咖啡棕 - 主品牌色 */
  'text-dark': '#1a1a1a',    /* 深灰 - 主标题和正文 */
  'text-secondary': '#6b7280', /* 中灰 - 次要文本 */
  'bg-light': '#f9fafb',     /* 浅灰 - 背景色 */
}
```

### 颜色使用规范

#### 文本颜色
```css
/* 主标题 */
text-text-dark

/* 次要文本、描述 */
text-text-secondary

/* 链接和强调 */
text-primary hover:text-primary/80

/* 反色文本 (深色背景) */
text-white
```

#### 背景颜色
```css
/* 主要背景 */
bg-white

/* 次要背景 */
bg-bg-light

/* 强调背景 */
bg-primary text-white

/* 渐变背景 */
bg-gradient-to-br from-primary/5 via-bg-light to-primary/10
```

#### 边框颜色
```css
/* 默认边框 */
border-gray-200

/* 悬停边框 */
hover:border-primary/30

/* 强调边框 */
border-primary
```

## 📏 间距系统

### Tailwind间距
```css
/* 小间距 */
space-y-2  /* 0.5rem = 8px */
space-y-4  /* 1rem = 16px */

/* 中间距 */
space-y-6  /* 1.5rem = 24px */
space-y-8  /* 2rem = 32px */

/* 大间距 */
space-y-12 /* 3rem = 48px */
space-y-16 /* 4rem = 64px */
```

### Section间距
```css
/* 小Section */
py-12 md:py-16

/* 标准Section */
py-16 md:py-24

/* 大Section */
py-20 md:py-32
```

### 容器Padding
```css
/* 响应式Padding */
px-4 sm:px-6 lg:px-8
```

## 📐 排版系统

### 字体大小
```css
/* 超大标题 (Hero) */
text-5xl md:text-6xl lg:text-7xl
font-bold

/* 大标题 (H1) */
text-4xl md:text-5xl
font-bold

/* 中标题 (H2) */
text-3xl md:text-4xl
font-bold

/* 小标题 (H3) */
text-2xl md:text-3xl
font-semibold

/* 正文大 */
text-lg md:text-xl

/* 正文标准 */
text-base

/* 正文小 */
text-sm
```

### 字体粗细
```css
font-light    /* 300 - 极少使用 */
font-normal   /* 400 - 正文 */
font-medium   /* 500 - 强调文本 */
font-semibold /* 600 - 小标题 */
font-bold     /* 700 - 主标题 */
```

### 行高
```css
leading-tight    /* 1.25 - 大标题 */
leading-snug     /* 1.375 - 小标题 */
leading-normal   /* 1.5 - 正文 */
leading-relaxed  /* 1.625 - 长文本 */
```

### 文本样式模式
```css
/* Hero标题 */
text-5xl md:text-7xl font-bold text-text-dark leading-tight

/* Section标题 */
text-3xl md:text-4xl font-bold text-text-dark mb-4

/* 描述文本 */
text-lg md:text-xl text-text-secondary leading-relaxed

/* 正文 */
text-base text-text-dark leading-normal

/* 标签/小文本 */
text-sm text-text-secondary
```

## 🧩 组件库

### 1. Container 容器组件

#### 用途
统一内容宽度和水平居中

#### 尺寸选项
```typescript
// small: 小容器 (max-w-4xl)
<Container size="small">...</Container>

// medium: 中容器 (max-w-6xl) - 默认
<Container>...</Container>

// large: 大容器 (max-w-7xl)
<Container size="large">...</Container>
```

#### 实现
```typescript
// components/ui/Container.tsx
export default function Container({
  children,
  size = 'medium',
  className = '',
}: ContainerProps) {
  const sizeClasses = {
    small: 'max-w-4xl',
    medium: 'max-w-6xl',
    large: 'max-w-7xl',
  }

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  )
}
```

### 2. Section 区块组件

#### 用途
统一区块间距和背景

#### 变体
```typescript
// 默认 (白色背景)
<Section>...</Section>

// 浅灰背景
<Section variant="light">...</Section>

// 咖啡色背景
<Section variant="primary">...</Section>

// 渐变背景
<Section variant="gradient">...</Section>

// 自定义间距
<Section spacing="small">...</Section>
<Section spacing="large">...</Section>
```

#### 实现
```typescript
// components/ui/Section.tsx
const variants = {
  default: 'bg-white',
  light: 'bg-bg-light',
  primary: 'bg-primary text-white',
  gradient: 'bg-gradient-to-br from-primary/5 via-bg-light to-primary/10',
}

const spacings = {
  small: 'py-12 md:py-16',
  medium: 'py-16 md:py-24',
  large: 'py-20 md:py-32',
}
```

### 3. OptimizedImage 图片组件

#### 用途
Next.js Image封装,统一图片优化

#### 使用
```typescript
<OptimizedImage
  src="/images/hero.jpg"
  alt="描述"
  width={1200}
  height={600}
  priority // 首屏图片
/>
```

#### 特性
- 自动格式优化 (WebP)
- 响应式图片
- 懒加载 (非priority)
- 占位符模糊

## 🎯 常用样式模式

### 卡片样式
```css
/* 基础卡片 */
bg-white rounded-xl shadow-md overflow-hidden

/* 悬停卡片 */
group bg-white rounded-xl shadow-md hover:shadow-xl
transition-all duration-300 overflow-hidden

/* 卡片内容 */
p-6 space-y-4
```

### 按钮样式
```css
/* 主按钮 */
bg-primary text-white px-6 py-3 rounded-lg
hover:bg-primary/90 transition-colors duration-200
font-medium

/* 次要按钮 */
bg-white text-primary border-2 border-primary
px-6 py-3 rounded-lg
hover:bg-primary hover:text-white
transition-all duration-200
font-medium

/* 文本按钮 */
text-primary hover:text-primary/80
font-medium underline-offset-4 hover:underline
transition-colors duration-200
```

### 输入框样式
```css
/* 文本输入 */
w-full px-4 py-2 border border-gray-300 rounded-lg
focus:outline-none focus:ring-2 focus:ring-primary/50
focus:border-primary
transition-colors duration-200

/* 错误状态 */
border-red-500 focus:ring-red-500/50
```

### 悬停效果
```css
/* 图片缩放 */
overflow-hidden
group-hover:scale-105 transition-transform duration-500

/* 阴影渐变 */
shadow-md hover:shadow-xl transition-shadow duration-300

/* 透明度变化 */
opacity-80 hover:opacity-100 transition-opacity duration-200
```

### 渐变样式
```css
/* 背景渐变 */
bg-gradient-to-br from-primary/5 via-bg-light to-primary/10

/* 文本渐变 */
bg-gradient-to-r from-primary to-primary/60
bg-clip-text text-transparent
```

## 📱 响应式设计

### 断点系统
```css
/* Tailwind 默认断点 */
sm: 640px   /* 小屏幕 (手机横屏/平板竖屏) */
md: 768px   /* 中屏幕 (平板) */
lg: 1024px  /* 大屏幕 (笔记本) */
xl: 1280px  /* 超大屏 (桌面) */
2xl: 1536px /* 超超大 (大显示器) */
```

### 响应式模式
```css
/* 移动端优先 */
text-base md:text-lg lg:text-xl

/* 隐藏/显示 */
hidden md:block  /* 移动端隐藏,桌面显示 */
block md:hidden  /* 移动端显示,桌面隐藏 */

/* 网格布局 */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

/* Flex方向 */
flex flex-col md:flex-row
```

### 常用响应式组合
```css
/* Section Padding */
py-16 md:py-24

/* 标题大小 */
text-3xl md:text-4xl lg:text-5xl

/* 容器Padding */
px-4 sm:px-6 lg:px-8

/* 间距 */
space-y-4 md:space-y-6 lg:space-y-8
```

## ✨ 动画效果

### 过渡动画
```css
/* 标准过渡 */
transition-all duration-300

/* 颜色过渡 */
transition-colors duration-200

/* 阴影过渡 */
transition-shadow duration-300

/* 变换过渡 */
transition-transform duration-500
```

### 悬停动画
```css
/* 卡片上浮 */
hover:-translate-y-1 transition-transform duration-200

/* 图片缩放 */
group-hover:scale-105 transition-transform duration-500

/* 按钮效果 */
hover:shadow-lg hover:shadow-primary/20
transition-all duration-200
```

## 🎨 图标系统

### Lucide React
```typescript
import { Coffee, Menu, X, ChevronRight } from 'lucide-react'

// 使用
<Coffee className="w-6 h-6 text-primary" />
<ChevronRight className="w-4 h-4" />
```

### 图标大小规范
```css
/* 小图标 */
w-4 h-4  /* 16px */

/* 中图标 */
w-6 h-6  /* 24px */

/* 大图标 */
w-8 h-8  /* 32px */

/* 超大图标 */
w-12 h-12 /* 48px */
```

## 📋 组件使用示例

### 完整区块示例
```typescript
<Section variant="gradient" spacing="large">
  <Container size="large">
    <div className="text-center space-y-4 mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-text-dark">
        Section标题
      </h2>
      <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
        描述文本,介绍Section内容
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 卡片内容 */}
    </div>
  </Container>
</Section>
```

### 卡片组件示例
```typescript
<div className="group bg-white rounded-xl shadow-md hover:shadow-xl
               transition-all duration-300 overflow-hidden">
  <div className="relative h-48 overflow-hidden">
    <OptimizedImage
      src={image}
      alt={title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  <div className="p-6 space-y-4">
    <h3 className="text-xl font-semibold text-text-dark line-clamp-2">
      {title}
    </h3>
    <p className="text-text-secondary line-clamp-3">
      {description}
    </p>
    <button className="text-primary hover:text-primary/80 font-medium
                      flex items-center gap-2 transition-colors duration-200">
      了解更多
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
</div>
```

## 📚 设计资源

### Figma设计文件
(计划中)

### 颜色工具
- [Coolors](https://coolors.co) - 配色方案
- [ColorSpace](https://mycolor.space) - 渐变生成

### 图标资源
- [Lucide Icons](https://lucide.dev) - 当前使用
- [Heroicons](https://heroicons.com) - 备选

---

**维护者**: Development Team
**最后更新**: 2025-01-12
