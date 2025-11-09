# Cloudinary + Sveltia CMS 快速入门

## 🚀 快速开始（5分钟设置）

### 步骤1：获取Cloudinary凭证
1. 访问 https://cloudinary.com/users/register/free
2. 注册免费账户
3. 登录后，从Dashboard复制：
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 步骤2：配置环境变量
```bash
# 1. 复制示例文件
cp .env.local.example .env.local

# 2. 编辑 .env.local，填入你的凭证
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=你的cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=你的api_key
CLOUDINARY_API_SECRET=你的api_secret
```

### 步骤3：启动开发服务器
```bash
npm run dev
```

### 步骤4：访问CMS
打开浏览器访问：
```
http://localhost:3000/admin
```

## 📸 更新Hero背景图片

### 方式A：通过CMS（推荐）
1. 访问 `http://localhost:3000/admin`
2. 点击左侧 **"Hero背景图片"**
3. 点击 **"main"** 配置
4. 点击 **"Edit"**
5. 在 **"背景图片"** 字段点击
6. **上传新图片** 或从Cloudinary媒体库选择
7. 点击 **"Save"**
8. 刷新主页查看效果

### 方式B：直接编辑文件
编辑 `content/hero/main.md`:
```markdown
---
backgroundImage: "https://res.cloudinary.com/你的cloud_name/image/upload/v1/图片ID.jpg"
---
```

## 🎯 目前已集成的功能

### ✅ Hero部分
- ✅ 背景图片通过Cloudinary管理
- ✅ 标题、描述文字可通过CMS编辑
- ✅ 按钮文字和链接可配置
- ✅ 自动从 `content/hero/main.md` 读取配置

### ✅ CMS配置
- ✅ Sveltia CMS已集成
- ✅ Cloudinary媒体库已配置
- ✅ Hero配置集合已创建
- ✅ 文章、FAQ集合已配置

### ✅ API端点
- ✅ GET `/api/hero-config` - 获取配置
- ✅ POST `/api/hero-config` - 更新配置

## 📁 关键文件说明

```
notrace-nextjs/
├── public/admin/
│   ├── index.html          ← CMS入口页面
│   └── config.yml          ← CMS配置（定义可管理的内容）
├── content/hero/
│   └── main.md             ← Hero配置文件（CMS编辑这个文件）
├── app/api/hero-config/
│   └── route.ts            ← API端点（读取/更新hero配置）
├── hooks/
│   └── useHeroData.ts      ← React Hook（前端获取hero数据）
└── .env.local              ← 环境变量（你的Cloudinary凭证）
```

## 🔄 数据流程

```
CMS编辑 → content/hero/main.md → API端点 → useHeroData Hook → HeroSection组件 → 显示
```

1. **编辑**：在CMS中编辑Hero配置
2. **保存**：CMS将更改写入 `content/hero/main.md`
3. **读取**：`useHeroData` Hook调用 `/api/hero-config` API
4. **解析**：API读取并解析 `.md` 文件
5. **显示**：HeroSection组件使用配置数据渲染

## 🖼️ 图片上传最佳实践

### 推荐尺寸
- **Hero背景**: 1920x1080px 或更高
- **文章特色图**: 1200x630px
- **格式**: JPG（风景照）或PNG（有透明度时）

### 上传步骤
1. 在CMS中点击图片字段
2. 点击 "Upload"
3. 选择图片文件
4. 等待上传完成
5. Cloudinary自动优化图片
6. 返回优化后的URL

### Cloudinary自动优化
- ✅ 自动WebP格式转换
- ✅ 响应式图片大小
- ✅ CDN加速分发
- ✅ 智能压缩

## 🐛 常见问题

### Q: CMS页面打不开？
**A**: 检查服务器是否运行：
```bash
# 如果没有运行，执行：
npm run dev

# 然后访问
http://localhost:3000/admin
```

### Q: 图片上传失败？
**A**: 检查环境变量：
```bash
# 确认 .env.local 文件存在
cat .env.local

# 确认包含正确的Cloudinary凭证
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Q: Hero图片不更新？
**A**: 尝试以下步骤：
```bash
# 1. 清除浏览器缓存（Cmd+Shift+R 或 Ctrl+Shift+R）
# 2. 检查配置文件
cat content/hero/main.md

# 3. 重启服务器
# 按 Ctrl+C 停止，然后：
npm run dev
```

### Q: API返回404？
**A**: 确认文件存在：
```bash
ls -la content/hero/main.md
```

## 📚 下一步

### 1. 上传你的Hero图片
- 准备一张高质量的咖啡相关图片
- 通过CMS上传到Cloudinary
- 更新Hero配置

### 2. 创建企业文章
- 在CMS中点击"企业文章"
- 点击"New 企业文章"
- 填写标题、内容、上传图片
- 发布文章

### 3. 管理FAQ
- 在CMS中点击"常见问题"
- 添加新的问答
- 设置显示顺序

## 🎉 完成！

现在你的Hero背景图片已通过Cloudinary管理！

访问 `http://localhost:3000/admin` 开始管理你的内容。

需要更详细的文档？查看 [CMS_SETUP.md](./CMS_SETUP.md)
