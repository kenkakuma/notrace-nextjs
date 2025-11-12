# 無迹探索株式会社 - 网站设计规范

## 设计理念

基于日式极简美学（和風ミニマリズム），融合传统与现代，营造优雅、克制、精致的品牌形象。

---

## 一、色彩系统 (Color Palette)

### 主色调
```css
--primary: #E17B47        /* 主题橙色 - 温暖、专业 */
--bg-light: #FAF9F7       /* 浅米白 - 柔和背景 */
--text-dark: #1A1A1A      /* 深灰黑 - 主要文字 */
--text-secondary: #666666 /* 中灰色 - 次要文字 */
--white: #FFFFFF          /* 纯白 - 强调区域 */
```

### 透明度使用规范
- `primary/80`: 主要元素（日期、标题悬停）
- `primary/60`: 次要元素（英文标签）
- `primary/30`: 装饰线条
- `primary/20`: 极淡装饰线
- `primary/10`: 标签背景
- `primary/5`: 悬停背景
- `text-secondary/80`: 正文描述
- `text-secondary/70`: 次要信息
- `text-secondary/60`: 辅助信息

---

## 二、排版系统 (Typography)

### 字体家族
```typescript
// 主要标题字体 - 优雅衬线体
font-family: 'Noto Serif JP', serif
variable: --font-noto-serif-jp

// 正文字体
font-family: 'Noto Sans JP', sans-serif
variable: --font-noto-sans-jp
```

### 字体大小层级
```css
/* 页面主标题 */
h1: text-2xl md:text-3xl lg:text-4xl  /* 24px/30px/36px */

/* 板块标题 */
h2: text-xl md:text-2xl               /* 20px/24px */

/* 子标题 */
h3: text-base md:text-lg              /* 16px/18px */

/* 正文 */
body: text-sm md:text-base            /* 14px/16px */

/* 小字 */
small: text-xs                        /* 12px */

/* 英文标签 */
label: text-xs tracking-[0.3em]       /* 12px + 字间距 */
```

### 字重 (Font Weight)
- `font-light`: 300 - 数据、日期
- `font-normal`: 400 - 正文
- `font-medium`: 500 - 标题（代替 bold）
- `font-bold`: 700 - 仅限 Hero 主标题

**核心原则**: 避免使用粗体，用 `font-medium` 代替，保持优雅克制

---

## 三、间距系统 (Spacing)

### 板块间距
```css
section padding: py-24 md:py-32      /* 96px/128px */
```

### 内部间距
```css
/* 板块内容区域 */
max-width: max-w-5xl ~ max-w-6xl
padding: px-4 sm:px-6 lg:px-8

/* 标题组间距 */
title-group margin-bottom: mb-16 ~ mb-20

/* 元素间距 */
gap-4   /* 16px - 小间距 */
gap-6   /* 24px - 中间距 */
gap-8   /* 32px - 大间距 */
gap-12  /* 48px - 特大间距 */
```

### 行高 (Line Height)
```css
leading-tight     /* 标题紧凑 */
leading-relaxed   /* 主标题舒展 */
leading-loose     /* 正文段落宽松 */
```

---

## 四、布局系统 (Layout)

### 板块标题结构（统一模板）
```jsx
<section className="py-24 md:py-32 bg-bg-light">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      {/* 英文标签 + 装饰线 */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-32 bg-primary/20"></div>
        <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">
          SECTION NAME
        </span>
        <div className="h-px w-32 bg-primary/20"></div>
      </div>
      
      {/* 日文主标题 */}
      <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
        日本語タイトル
      </h2>
      
      {/* 下划线 */}
      <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>
      
      {/* 描述文字 */}
      <p className="text-xs md:text-sm text-text-secondary/80 max-w-md mx-auto leading-loose">
        説明文
      </p>
    </div>
    
    {/* 内容区域 */}
  </div>
</section>
```

### 响应式断点
```css
sm: 640px   /* 小屏幕 */
md: 768px   /* 中等屏幕 */
lg: 1024px  /* 大屏幕 */
```

---

## 五、装饰元素 (Decorative Elements)

### 标题装饰线
```jsx
{/* 横向装饰线 - 标签两侧 */}
<div className="h-px w-32 bg-primary/20"></div>

{/* 下划线 - 标题下方 */}
<div className="w-12 h-px bg-primary/30 mx-auto"></div>
```

### 阴影效果
```css
drop-shadow-sm   /* 标题轻微阴影 */
drop-shadow-md   /* Hero 主标题阴影 */
```

### 边框
```css
border-gray-200/50    /* 极淡灰边框 */
border-primary/30     /* 淡主题色边框 */
border-text-dark/20   /* 淡文字色边框 */
```

---

## 六、交互效果 (Interactions)

### 过渡动画
```css
transition-all duration-300    /* 按钮 */
transition-all duration-500    /* 卡片、链接 */
transition-colors              /* 纯颜色变化 */
transition-opacity             /* 透明度变化 */
```

### 悬停状态 (Hover)
```jsx
{/* 文字链接 */}
className="group-hover:text-primary transition-colors"

{/* 背景变化 */}
className="hover:bg-primary/5"

{/* 边框强化 */}
className="hover:border-primary"

{/* 图标显示 */}
className="opacity-0 group-hover:opacity-100"

{/* 图标移动 */}
className="transform translate-x-0 group-hover:translate-x-2"
```

### 图标动效
```jsx
{/* 箭头图标 */}
<ArrowRight className="w-4 h-4" strokeWidth={1.5} />

{/* 悬停渐显 + 移动 */}
className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-0 group-hover:translate-x-2"
```

---

## 七、按钮系统 (Buttons)

### 主要按钮（Primary）
```jsx
<a className="inline-block px-10 py-3 bg-primary/90 text-white font-light text-sm tracking-wide hover:bg-primary transition-all duration-300">
  お問い合わせ
</a>
```

### 次要按钮（Secondary - 强调）
```jsx
<a className="inline-flex items-center gap-2 px-10 py-3 border border-primary/30 text-primary/80 font-light text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-300">
  企業文章を見る <span className="text-xs">→</span>
</a>
```

### 三级按钮（Tertiary - 常规）
```jsx
<a className="inline-block px-10 py-3 border border-text-dark/20 text-text-dark font-light text-sm tracking-wide hover:border-text-dark/40 hover:bg-text-dark/5 transition-all duration-300">
  企業情報
</a>
```

**核心原则**:
- 无圆角（保持方正）
- 细边框（1px）
- 轻字重（font-light）
- 字间距（tracking-wide）

---

## 八、卡片系统 (Cards)

### 无背景卡片（首页事业领域）
```jsx
<div className="p-8 transition-all duration-500 group">
  {/* 图标 */}
  <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
    <Icon className="w-8 h-8 text-primary/70" strokeWidth={1.5} />
  </div>
  
  {/* 标题 */}
  <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
    タイトル
  </h3>
  
  {/* 描述 */}
  <p className="text-xs text-text-secondary/80 leading-loose mb-6">
    説明文
  </p>
  
  {/* 链接 */}
  <a className="text-xs text-primary/80 hover:text-primary tracking-wide transition-colors inline-flex items-center gap-1">
    詳細 <span className="text-[10px]">→</span>
  </a>
</div>
```

**核心原则**:
- 无白色背景，融入页面
- 无边框、无圆角
- 悬停时图标不透明度提升
- 细腻的文字层级

---

## 九、特殊布局 (Special Layouts)

### 竖排文章列表（日式书卷）
```jsx
{/* 横向滚动容器 */}
<div className="max-w-6xl mx-auto mb-16 overflow-x-auto">
  <div className="flex flex-row-reverse justify-center gap-8 pb-4 px-4">
    {items.map(item => (
      <div className="group flex flex-col items-center py-6 px-4 border-r border-gray-200/50 last:border-r-0">
        {/* 日期和分类 - 竖排 */}
        <div className="flex flex-col items-center gap-3 mb-6 [writing-mode:vertical-rl]">
          <div className="flex items-center gap-2">
            <div className="font-noto-serif-jp text-base font-light text-primary/80">
              2025
            </div>
            <div className="font-noto-serif-jp text-base font-light text-primary/80">
              01.22
            </div>
          </div>
          <span className="inline-block py-2 px-1 bg-primary/10 text-primary/80 text-xs font-light">
            カテゴリ
          </span>
        </div>
        
        {/* 标题 - 竖排 */}
        <div className="[writing-mode:vertical-rl] text-right">
          <h3 className="font-noto-serif-jp text-base font-medium text-text-dark group-hover:text-primary transition-colors drop-shadow-sm">
            記事タイトル
          </h3>
        </div>
        
        {/* 箭头 */}
        <div className="mt-6 text-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-90">
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </div>
      </div>
    ))}
  </div>
</div>
```

**核心特点**:
- `flex-row-reverse`: 从右向左排列（日式阅读）
- `[writing-mode:vertical-rl]`: CSS 竖排文字
- `justify-center`: 整体居中
- `border-r`: 竖线分隔
- `rotate-90`: 箭头旋转配合竖排

---

## 十、图标系统 (Icons)

### 来源
使用 `lucide-react` 图标库

### 使用规范
```jsx
import { Compass, Lightbulb, Globe, Shield, ArrowRight, ExternalLink } from 'lucide-react'

{/* 尺寸 */}
className="w-4 h-4"   /* 小图标 */
className="w-8 h-8"   /* 中图标 */
className="w-10 h-10" /* 大图标 */

{/* 线条粗细 */}
strokeWidth={1.5}     /* 细线条，符合极简风格 */

{/* 颜色 */}
className="text-primary/70"      /* 主题色 */
className="text-primary/60"      /* 更淡 */
className="text-text-secondary"  /* 灰色 */
```

---

## 十一、Hero 区域特殊规范

### 背景
- 全屏黑色背景图
- 深色遮罩：`bg-black/40`

### 文字
```jsx
{/* 主标题 */}
<h1 className="font-noto-serif-jp text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight tracking-tight animate-fade-in-up drop-shadow-md">
  無迹探索株式会社
</h1>

{/* 英文副标题 */}
<p className="text-white/80 text-sm md:text-base mb-8">
  The Japan-China Coffee Business Bridge
</p>

{/* 价值主张 */}
<p className="text-white/70 text-sm md:text-base mb-12 leading-relaxed">
  北京焙煎専門技術 × 日本品質管理
</p>
```

### 按钮
```jsx
<button className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-[#E17B47] hover:border-[#E17B47] transition-all duration-300 min-w-[160px]">
  <div className="flex flex-col items-center gap-1">
    <span className="text-sm font-medium">企業のお客様</span>
    <span className="text-xs text-white/70 group-hover:text-white/90">Business</span>
  </div>
</button>
```

**核心特点**:
- 半透明玻璃态效果
- 圆角按钮（Hero 专属）
- 悬停变为主题色

---

## 十二、响应式设计原则

### 移动优先 (Mobile First)
- 基础样式适配移动端
- 使用 `md:` 和 `lg:` 断点增强桌面体验

### 断点使用示例
```jsx
{/* 文字大小 */}
className="text-sm md:text-base lg:text-lg"

{/* 间距 */}
className="py-24 md:py-32"
className="gap-4 md:gap-8"

{/* 布局 */}
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

{/* 换行控制 */}
<br className="hidden md:block" />
```

---

## 十三、设计原则总结 (Design Principles)

### 1. 极简主义 (Minimalism)
- 去除多余装饰
- 保留必要信息
- 大量留白

### 2. 克制优雅 (Restraint & Elegance)
- 避免粗体，用 `font-medium`
- 细线条图标 (`strokeWidth={1.5}`)
- 低饱和度颜色
- 透明度营造层次

### 3. 层次分明 (Clear Hierarchy)
- 英文标签（uppercase + tracking）
- 日文标题（Noto Serif JP + drop-shadow）
- 装饰线（横线 + 下划线）
- 描述文字（小字 + 灰色）

### 4. 和式美学 (Japanese Aesthetics)
- 竖排文字（writing-mode: vertical-rl）
- 从右向左阅读（flex-row-reverse）
- 细线分隔（border-r/border-b）
- 对称与平衡

### 5. 细腻交互 (Subtle Interactions)
- 长过渡时间（duration-500）
- 透明度变化（opacity）
- 位移动画（transform translate）
- 颜色过渡（transition-colors）

---

## 十四、禁止事项 (Don'ts)

❌ **避免使用**:
1. 粗体字（除 Hero 主标题）
2. 圆角（除 Hero 按钮）
3. 白色卡片背景（首页内容区）
4. 过度装饰
5. 高饱和度颜色
6. 硬性分隔线
7. 快速动画（< 300ms）
8. 大量 emoji

---

## 十五、代码规范 (Code Standards)

### 组件结构
```jsx
'use client' // 如需客户端交互

import { ... } from 'next/...'
import { ... } from 'contentlayer/generated'
import { ... } from 'lucide-react'

export function ComponentName() {
  // 数据处理逻辑
  
  return (
    <section className="py-24 md:py-32 bg-bg-light">
      {/* 统一的板块标题 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          {/* 标题组 */}
        </div>
        
        {/* 内容区域 */}
        <div className="...">
          {/* 内容 */}
        </div>
        
        {/* 按钮组 */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* CTA 按钮 */}
        </div>
      </div>
    </section>
  )
}
```

### CSS 类名顺序
1. 布局（flex, grid, position）
2. 尺寸（w-, h-, max-w-）
3. 间距（p-, m-, gap-）
4. 文字（font-, text-, leading-）
5. 颜色（bg-, text-, border-）
6. 效果（shadow-, opacity-, transform-）
7. 交互（hover:, group-hover:, transition-）

---

## 十六、应用到其他页面的步骤

### Step 1: 分析现有页面
- 识别板块结构
- 确定内容层级
- 评估交互需求

### Step 2: 应用标题模板
```jsx
{/* 复制标准标题结构 */}
<div className="flex items-center justify-center gap-4 mb-8">
  <div className="h-px w-32 bg-primary/20"></div>
  <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">
    ENGLISH LABEL
  </span>
  <div className="h-px w-32 bg-primary/20"></div>
</div>
```

### Step 3: 统一字体
- 标题改为 `font-noto-serif-jp`
- 字重改为 `font-medium`
- 添加 `drop-shadow-sm`

### Step 4: 调整间距
- 板块间距：`py-24 md:py-32`
- 标题组：`mb-16` 或 `mb-20`

### Step 5: 优化颜色
- 使用透明度代替纯色
- 主题色加 `/80`, `/60`, `/30` 等

### Step 6: 改进交互
- 添加 `transition-all duration-500`
- 悬停效果统一风格

---

## 附录：完整色板参考

```css
/* 主题色变体 */
bg-primary         /* #E17B47 */
bg-primary/90
bg-primary/80
bg-primary/70
bg-primary/60
bg-primary/30
bg-primary/20
bg-primary/10
bg-primary/5

/* 文字色变体 */
text-text-dark           /* #1A1A1A */
text-text-secondary      /* #666666 */
text-text-secondary/80
text-text-secondary/70
text-text-secondary/60

/* 背景色 */
bg-bg-light       /* #FAF9F7 */
bg-white          /* #FFFFFF */
bg-black          /* #000000 */

/* 边框色 */
border-gray-200/50
border-primary/30
border-text-dark/20
border-white/30
```

---

**最后更新**: 2025-01-22  
**版本**: v1.0  
**维护者**: Eric
