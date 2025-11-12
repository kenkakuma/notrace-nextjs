# 代码规范

> 编码标准和最佳实践

## TypeScript规范

### 类型定义

#### 优先使用interface
```typescript
// ✅ 推荐
interface User {
  id: string
  name: string
}

// ❌ 避免 (简单对象)
type User = {
  id: string
  name: string
}

// ✅ 使用type (联合类型/工具类型)
type Status = 'pending' | 'success' | 'error'
type Readonly<T> = { readonly [K in keyof T]: T[K] }
```

#### 导出类型定义
```typescript
// types/index.ts
export interface Product {
  id: string
  title: string
}

// 使用
import type { Product } from '@/types'
```

#### 避免any
```typescript
// ❌ 避免
function process(data: any) {}

// ✅ 使用unknown
function process(data: unknown) {
  if (typeof data === 'string') {
    // 类型收窄
  }
}

// ✅ 使用泛型
function process<T>(data: T): T {
  return data
}
```

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量/函数 | camelCase | `getUserData` |
| 常量 | UPPER_SNAKE_CASE | `API_URL` |
| 类/接口 | PascalCase | `UserProfile` |
| 组件 | PascalCase | `ProductCard` |
| 文件 | kebab-case / PascalCase | `user-profile.ts` / `UserProfile.tsx` |
| 私有属性 | _camelCase | `_privateMethod` |

### 函数规范

```typescript
// ✅ 明确返回类型
function getUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json())
}

// ✅ 参数对象解构
function createUser({ name, email }: { name: string; email: string }) {
  // ...
}

// ✅ 可选参数在后
function log(message: string, level: 'info' | 'error' = 'info') {
  // ...
}

// ✅ 箭头函数简洁性
const double = (n: number) => n * 2
```

## React规范

### 组件结构

```typescript
// ✅ 标准组件结构
import { useState } from 'react'
import type { ReactNode } from 'react'

// 1. 类型定义
interface ComponentProps {
  title: string
  children?: ReactNode
}

// 2. 组件定义
export default function Component({ title, children }: ComponentProps) {
  // 3. Hooks
  const [state, setState] = useState(false)

  // 4. 事件处理
  function handleClick() {
    setState(true)
  }

  // 5. 渲染逻辑
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
```

### 组件命名

```typescript
// ✅ 组件名 = 文件名
// ProductCard.tsx
export default function ProductCard() {}

// ✅ 子组件
function ProductCardImage() {}
function ProductCardContent() {}

// ❌ 避免
function Card() {}  // 太通用
function card() {}  // 小写开头
```

### Props规范

```typescript
// ✅ 明确Props类型
interface ButtonProps {
  text: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

// ✅ 默认值
function Button({
  text,
  onClick,
  variant = 'primary',
  disabled = false
}: ButtonProps) {}

// ❌ 避免过多Props (>5个考虑拆分)
interface TooManyProps {
  prop1: string
  prop2: string
  // ... 10+ props
}
```

### 条件渲染

```typescript
// ✅ 布尔条件
{isVisible && <Component />}

// ✅ 三元运算
{loading ? <Spinner /> : <Content />}

// ✅ 多条件
{(() => {
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <Error />
  return <Content />
})()}

// ❌ 避免
{isVisible === true && <Component />}  // 冗余
```

### Hooks规范

```typescript
// ✅ 自定义Hook命名
function useProductData(id: string) {
  const [data, setData] = useState(null)
  // ...
  return { data, loading, error }
}

// ✅ 依赖数组明确
useEffect(() => {
  fetchData(id)
}, [id])  // 依赖明确

// ❌ 避免
useEffect(() => {
  fetchData(id)
}, [])  // 缺少依赖
```

### Server/Client组件

```typescript
// ✅ Server Component (默认)
// 数据获取
export default async function Page() {
  const data = await getData()
  return <div>{data}</div>
}

// ✅ Client Component (需要交互)
'use client'

import { useState } from 'react'

export default function Interactive() {
  const [state, setState] = useState()
  return <button onClick={() => setState(!state)}>Toggle</button>
}

// ❌ 避免不必要的'use client'
'use client'  // 如果不需要客户端特性,删除

export default function Static() {
  return <div>Static Content</div>
}
```

## 样式规范

### Tailwind CSS

```typescript
// ✅ 逻辑分组
className="
  // 布局
  flex items-center justify-between
  // 尺寸
  w-full h-12
  // 间距
  px-4 py-2
  // 样式
  bg-white rounded-lg shadow-md
  // 文本
  text-base font-medium text-gray-900
  // 交互
  hover:bg-gray-50 transition-colors
"

// ✅ 条件样式
className={`
  base-classes
  ${isActive ? 'active-classes' : 'inactive-classes'}
  ${isDisabled && 'disabled-classes'}
`}

// ✅ 使用clsx/cn工具
import { cn } from '@/lib/utils'

className={cn(
  'base-classes',
  isActive && 'active-classes',
  className  // 允许外部覆盖
)}

// ❌ 避免内联样式
style={{ color: 'red' }}  // 除非动态值
```

### 响应式

```typescript
// ✅ 移动端优先
className="
  text-base      // 移动端
  md:text-lg     // 平板
  lg:text-xl     // 桌面
"

// ✅ 常用断点
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

## 文件组织

### 目录结构

```
app/
  (feature)/         # 路由分组
    page.tsx
    layout.tsx

components/
  ui/               # 基础UI组件
    Button.tsx
    Input.tsx
  feature/          # 功能组件
    ProductCard.tsx

lib/                # 工具函数
  utils.ts
  api.ts

types/              # 类型定义
  index.ts
  models.ts

hooks/              # 自定义Hooks
  useProductData.ts
```

### 导入顺序

```typescript
// 1. React/Next.js
import { useState } from 'react'
import Image from 'next/image'

// 2. 第三方库
import { format } from 'date-fns'

// 3. 内部绝对路径
import { Button } from '@/components/ui/Button'
import { getProducts } from '@/lib/api'
import type { Product } from '@/types'

// 4. 相对路径
import { helper } from './utils'
import styles from './styles.module.css'
```

## 性能最佳实践

### 图片优化

```typescript
// ✅ 使用Next.js Image
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority  // 首屏图片
  placeholder="blur"
/>

// ❌ 避免
<img src="/image.jpg" alt="Description" />
```

### 数据获取

```typescript
// ✅ Server Component数据获取
export default async function Page() {
  const data = await fetch('...', {
    next: { revalidate: 60 }  // 缓存
  })
  return <div>{data}</div>
}

// ✅ 并行请求
const [products, categories] = await Promise.all([
  getProducts(),
  getCategories(),
])

// ❌ 避免串行请求
const products = await getProducts()    // 等待
const categories = await getCategories()  // 再等待
```

### 代码分割

```typescript
// ✅ 动态导入
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false,  // 仅客户端
})

// ✅ 路由级代码分割 (自动)
// app/page.tsx
// app/about/page.tsx  // 自动分割
```

## 错误处理

### 组件错误

```typescript
// error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### API错误

```typescript
// ✅ 完整错误处理
async function fetchData() {
  try {
    const response = await fetch('/api/data')

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    // 降级处理
    return null
  }
}
```

## Git规范

### Commit消息

```bash
# 格式
<type>(<scope>): <subject>

# 类型
feat:     新功能
fix:      Bug修复
refactor: 重构
style:    代码格式
docs:     文档
test:     测试
chore:    构建/工具

# 示例
feat(shop): add product filtering
fix(cms): resolve image upload issue
docs(api): update API reference
```

### 分支命名

```bash
# 功能分支
feature/product-filter
feature/user-auth

# 修复分支
fix/image-loading
fix/api-error

# 发布分支
release/v1.0.0
```

## 注释规范

### JSDoc

```typescript
/**
 * 获取商品列表
 * @param limit - 返回数量限制
 * @param offset - 偏移量
 * @returns 商品数组
 * @throws {Error} API请求失败时
 */
export async function getProducts(
  limit = 50,
  offset = 0
): Promise<Product[]> {
  // 实现
}
```

### 代码注释

```typescript
// ✅ 解释"为什么"
// 使用setTimeout避免React批量更新问题
setTimeout(() => setState(newState), 0)

// ✅ 复杂逻辑说明
// 计算折扣价格:
// 1. 获取基础价格
// 2. 应用会员折扣
// 3. 应用促销折扣
const discountedPrice = calculateDiscount(basePrice)

// ❌ 避免显而易见的注释
// 设置用户名
setUsername(name)  // 无意义
```

## 测试规范

### 文件命名

```
ComponentName.test.tsx
utils.test.ts
api.test.ts
```

### 测试结构

```typescript
describe('Component', () => {
  describe('when props change', () => {
    it('updates display', () => {
      // Arrange
      const props = { value: 1 }

      // Act
      const { rerender } = render(<Component {...props} />)
      rerender(<Component value={2} />)

      // Assert
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })
})
```

## ESLint配置

```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": ["warn", { "allow": ["error", "warn"] }],
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/exhaustive-deps": "error"
  }
}
```

## Prettier配置

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

---

**最后更新**: 2025-01-12
