# 环境配置

> 开发环境快速配置指南

## 系统要求

| 项目 | 要求 | 验证命令 |
|------|------|----------|
| Node.js | >= 18.x | `node --version` |
| npm | >= 9.x | `npm --version` |
| Git | 最新版 | `git --version` |

## 快速配置

### 1. 克隆项目
```bash
git clone <repository-url>
cd notrace-nextjs
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境变量配置
```bash
# 复制示例文件
cp .env.local.example .env.local

# 编辑配置
vim .env.local  # 或使用任意编辑器
```

### 4. 环境变量说明

#### 必需配置
```bash
# 商城API (必需)
NEXT_PUBLIC_SHOP_API_URL=http://localhost:9000
NEXT_PUBLIC_SHOP_URL=http://localhost:8000

# Cloudinary (必需)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

#### 可选配置
```bash
# Cloudinary完整配置 (图片上传功能)
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 其他环境变量
NODE_ENV=development
```

### 5. 启动开发服务器
```bash
npm run dev
# → http://localhost:3000
```

## 商城联调配置

### 项目关系
```
notrace-nextjs (主站) ← API调用 ← nteshop (商城)
Port: 3000                        Port: 9000
```

### 商城后端配置

#### 1. 克隆商城项目
```bash
cd ..
git clone <nteshop-repository-url>
cd nteshop
```

#### 2. 配置CORS
```javascript
// nteshop/medusa-config.js
module.exports = {
  projectConfig: {
    store_cors: "http://localhost:3000",  // 允许主站访问
  }
}
```

#### 3. 启动商城
```bash
npm run dev
# → http://localhost:9000
```

#### 4. 验证连接
```bash
# 测试API连接
curl http://localhost:9000/store/products

# 应返回商品数据JSON
```

## IDE配置建议

### VS Code

#### 推荐扩展
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "unifiedjs.vscode-mdx"
  ]
}
```

#### 设置
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### WebStorm

| 配置项 | 路径 | 设置 |
|--------|------|------|
| Node解释器 | Languages & Frameworks > Node.js | 选择v18+ |
| ESLint | Languages & Frameworks > JavaScript > Code Quality Tools > ESLint | 启用自动 |
| Prettier | Languages & Frameworks > JavaScript > Prettier | 保存时格式化 |

## 项目依赖说明

### 核心依赖
```json
{
  "next": "14.2.33",           // Next.js框架
  "react": "^18.3.1",          // React
  "typescript": "^5.0.0",      // TypeScript
  "tailwindcss": "^3.4.1"      // CSS框架
}
```

### 内容管理
```json
{
  "contentlayer": "^0.3.4",         // 内容处理
  "next-contentlayer": "^0.3.4",    // Next.js集成
  "gray-matter": "^4.0.3"           // YAML解析
}
```

### UI组件
```json
{
  "lucide-react": "^0.552.0",       // 图标
  "date-fns": "^4.1.0"              // 日期处理
}
```

### 图片管理
```json
{
  "cloudinary": "^2.8.0",           // Cloudinary SDK
  "next-cloudinary": "^6.17.3"      // Next.js集成
}
```

## 常见问题

### 端口被占用
```bash
# 查找进程
lsof -i :3000

# 终止进程
kill -9 <PID>

# 或使用其他端口
PORT=3001 npm run dev
```

### 依赖安装失败
```bash
# 清理缓存
rm -rf node_modules package-lock.json
npm cache clean --force

# 重新安装
npm install
```

### Contentlayer错误
```bash
# 删除缓存
rm -rf .contentlayer

# 重启服务器
npm run dev
```

### 环境变量不生效
```bash
# 确保文件名正确
ls -la .env.local

# 重启开发服务器
# Ctrl+C 然后 npm run dev
```

## 验证配置

### 检查清单

| 项目 | 验证方法 | 预期结果 |
|------|----------|----------|
| Node版本 | `node --version` | v18.x 或更高 |
| 依赖安装 | `ls node_modules` | 存在目录 |
| 环境变量 | `cat .env.local` | 包含必需配置 |
| 开发服务器 | `npm run dev` | 无报错启动 |
| 访问页面 | 浏览器打开 http://localhost:3000 | 页面正常显示 |
| 商城API | 访问 /lab 页面 | 商品数据显示 |

### 完整验证脚本
```bash
#!/bin/bash

echo "🔍 验证环境配置..."

# 1. Node版本
NODE_VERSION=$(node --version)
echo "✓ Node.js: $NODE_VERSION"

# 2. npm版本
NPM_VERSION=$(npm --version)
echo "✓ npm: $NPM_VERSION"

# 3. 依赖安装
if [ -d "node_modules" ]; then
  echo "✓ 依赖已安装"
else
  echo "✗ 依赖未安装,运行 npm install"
fi

# 4. 环境变量
if [ -f ".env.local" ]; then
  echo "✓ .env.local 存在"
else
  echo "✗ .env.local 缺失,复制 .env.local.example"
fi

# 5. 启动测试
npm run dev &
sleep 5
curl -s http://localhost:3000 > /dev/null
if [ $? -eq 0 ]; then
  echo "✓ 开发服务器正常"
else
  echo "✗ 开发服务器启动失败"
fi

pkill -f "next dev"
```

## 下一步

配置完成后:
1. 查看 [开发指南](./development.md)
2. 了解 [系统架构](../02-architecture/overview.md)
3. 开始开发

---

**最后更新**: 2025-01-12
