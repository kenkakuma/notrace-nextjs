# NO TRACE EXPLORER - Next.js 版本

本项目是从 Nuxt 3 迁移到 Next.js 13 的企业网站项目。

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
npm run dev
```

访问 http://localhost:3000

### 生产构建
```bash
npm run build
npm run start
```

## 📊 项目结构

```
notrace-nextjs/
├── app/                  # App Router 路由和页面
│   ├── layout.tsx        # 根布局
│   ├── page.tsx          # 首页
│   ├── globals.css       # 全局样式
│   └── api/              # API 路由
├── components/           # React 组件
├── lib/                  # 工具函数
├── utils/                # 实用程序
├── public/               # 静态资源
├── next.config.ts        # Next.js 配置
├── tailwind.config.ts    # Tailwind CSS 配置
└── tsconfig.json         # TypeScript 配置
```

## 🎨 技术栈

- **框架**: Next.js 14+
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图片优化**: Next.js Image + Cloudinary
- **部署**: Vercel（计划）

## 📝 迁移进度

详见 `NEXT_MIGRATION_PROGRESS.md`

### 第一阶段：基础架构搭建 ✅
- ✅ Next.js 项目初始化
- ✅ TypeScript 配置
- ✅ Tailwind CSS 配置
- ✅ 基础目录结构

### 后续阶段：待开始

## 🔧 开发指南

### 添加新页面
```bash
# 创建 app/about/page.tsx
```

### 添加新组件
```bash
# 创建 components/MyComponent.tsx
```

### 环境变量
复制 `.env.local` 并填写必要的配置

## 📚 参考资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React 官方文档](https://react.dev/)

---

**最后更新**: 2025-11-07
