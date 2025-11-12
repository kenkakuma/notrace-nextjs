# NO TRACE EXPLORER

> 日中咖啡业务探索平台 - Next.js 14企业官网

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 📚 完整文档

**新文档系统** (推荐):
```
📖 文档入口: docs/00-README.md
📋 完整索引: docs/DOCUMENTATION_INDEX.md
🤖 AI指南: docs/AI_CONTEXT_GUIDE.md
```

**历史文档归档**:
```
📦 归档目录: archive/old-docs/
📄 归档说明: archive/README.md
```

## 🎯 核心功能

- ✅ 企业官网内容展示
- ✅ LAB商品展示 (Medusa API集成)
- ✅ CLUB会员服务
- ✅ CMS内容管理 (Sveltia CMS + Contentlayer)
- ✅ 统一管理后台 (CMS + 图片 + Hero管理)
- ✅ 商城集成 (双项目独立架构)

## 🏗️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 14.2.33 |
| 语言 | TypeScript 5.x |
| 样式 | Tailwind CSS 3.4.1 |
| 内容 | Contentlayer 0.3.4 |
| CMS | Sveltia CMS |
| 图片 | Cloudinary |
| 商城 | Medusa (独立) |

## 📂 项目结构

```
notrace-nextjs/
├── app/              # Next.js App Router
├── components/       # React组件
├── content/          # Markdown内容 (文章/新闻)
├── docs/             # 📚 项目文档 (新系统)
├── archive/          # 📦 历史文档归档
├── public/           # 静态资源
└── hooks/            # 自定义Hooks
```

## 🔧 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 生产构建
npm run start            # 启动生产服务器
npm run lint             # 代码检查

# 访问管理后台
# http://localhost:3000/admin
```

## 🌐 环境变量

```bash
# 复制示例文件
cp .env.local.example .env.local

# 必需配置
NEXT_PUBLIC_SHOP_API_URL=http://localhost:9000
NEXT_PUBLIC_SHOP_URL=http://localhost:8000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

详见: [环境配置文档](docs/01-quickstart/setup.md)

## 📖 快速导航

### 新手入门
1. [环境配置](docs/01-quickstart/setup.md)
2. [开发指南](docs/01-quickstart/development.md)
3. [系统架构](docs/02-architecture/overview.md)

### 功能开发
- [CMS内容管理](docs/03-features/cms.md)
- [商城集成](docs/03-features/shop.md)
- [管理后台](docs/03-features/admin.md)

### 开发规范
- [设计系统](docs/04-development/design-system.md)
- [代码规范](docs/04-development/code-standards.md)
- [API文档](docs/04-development/api-reference.md)

### 部署运维
- [部署指南](docs/05-deployment/deployment.md)
- [版本历史](docs/05-deployment/changelog.md)

## 🤖 AI工具使用

推荐启动命令:
```
"进入notrace项目,加载开发上下文"
```

详见: [AI上下文指南](docs/AI_CONTEXT_GUIDE.md)

## 📊 项目状态

- **当前版本**: v0.4.0
- **最后更新**: 2025-01-12
- **总文件数**: 124+ 文件
- **代码行数**: 14,300+ 行

## 📞 支持与反馈

- 📖 查看[完整文档](docs/00-README.md)
- 🐛 提交[Issue](https://github.com/...)
- 💬 讨论区交流

---

**维护者**: Development Team
**许可证**: Private
