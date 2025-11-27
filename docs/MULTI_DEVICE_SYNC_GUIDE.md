# 多设备开发同步指南
**项目**: NO TRACE EXPLORATION Website
**适用场景**: Mac + Windows 双设备开发

---

## 📋 目录

1. [Windows 环境准备](#windows-环境准备)
2. [克隆项目到 Windows](#克隆项目到-windows)
3. [多设备同步工作流程](#多设备同步工作流程)
4. [最佳实践](#最佳实践)
5. [常见问题解决](#常见问题解决)

---

## Windows 环境准备

### 1. 安装必需工具

#### Git for Windows
**下载地址**: https://git-scm.com/download/win

**安装选项**:
- ✅ 选择 "Git Bash" 和 "Git GUI"
- ✅ 默认编辑器选择 VS Code 或你喜欢的编辑器
- ✅ 路径环境: "Git from the command line and also from 3rd-party software"
- ✅ HTTPS 传输: "Use the OpenSSL library"
- ✅ 换行符转换: "Checkout as-is, commit Unix-style line endings"

**验证安装**:
```bash
git --version
# 应显示: git version 2.x.x
```

#### Node.js
**下载地址**: https://nodejs.org/

**推荐版本**: LTS (长期支持版本，当前推荐 18.x 或 20.x)

**验证安装**:
```bash
node --version
# 应显示: v18.x.x 或 v20.x.x

npm --version
# 应显示: 9.x.x 或更高
```

#### 代码编辑器 (推荐)

**WebStorm** (你在 Mac 上使用的):
- 下载: https://www.jetbrains.com/webstorm/
- 支持跨平台同步设置

**VS Code** (免费替代):
- 下载: https://code.visualstudio.com/
- 推荐插件:
  - ESLint
  - Prettier
  - GitLens
  - Next.js snippets

### 2. 配置 Git 用户信息

```bash
# 设置用户名（与 Mac 上保持一致）
git config --global user.name "Your Name"

# 设置邮箱（与 Mac 上保持一致）
git config --global user.email "your.email@example.com"

# 验证配置
git config --global --list
```

### 3. SSH 密钥配置 (推荐)

#### 检查是否已有 SSH 密钥
```bash
ls -la ~/.ssh
# 查看是否有 id_rsa.pub 或 id_ed25519.pub
```

#### 生成新的 SSH 密钥（如果没有）
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# 按 Enter 使用默认路径
# 设置密码（可选，但推荐）
```

#### 添加 SSH 密钥到 GitHub

1. 复制公钥内容:
```bash
cat ~/.ssh/id_ed25519.pub
# 复制输出的全部内容
```

2. 在 GitHub 添加:
   - 访问: https://github.com/settings/keys
   - 点击 "New SSH key"
   - 标题: "Windows PC"
   - 粘贴公钥内容
   - 保存

#### 测试 SSH 连接
```bash
ssh -T git@github.com
# 应显示: Hi username! You've successfully authenticated...
```

---

## 克隆项目到 Windows

### 1. 选择工作目录

在 Windows 上选择一个合适的位置，比如：
```bash
# 使用 Git Bash
cd C:/Users/YourUsername/Projects
# 或
cd D:/Development
```

### 2. 克隆仓库

```bash
# 使用 SSH (推荐)
git clone git@github.com:kenkakuma/notrace-nextjs.git

# 或使用 HTTPS
git clone https://github.com/kenkakuma/notrace-nextjs.git
```

### 3. 进入项目目录

```bash
cd notrace-nextjs
```

### 4. 安装依赖

```bash
# 使用 npm
npm install

# 项目使用了 --legacy-peer-deps，.npmrc 已配置好
```

**安装时间**: 首次安装约 3-5 分钟

### 5. 配置环境变量

创建本地环境变量文件:
```bash
# Windows 使用 type 或编辑器创建
notepad .env.local
```

添加以下内容:
```env
# Cloudinary 配置
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=295771887569985
CLOUDINARY_API_KEY=295771887569985
CLOUDINARY_API_SECRET=GebAgK4oIbuseF46La0F2Y2MAgc
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=notrace_upload

# API 配置（本地开发）
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Node 环境
NODE_ENV=development
```

### 6. 验证项目运行

```bash
npm run dev
```

访问: http://localhost:3000

应该看到与 Mac 上相同的网站。

---

## 多设备同步工作流程

### 🔄 日常工作流程

#### 开始工作前（在任何设备上）

```bash
# 1. 拉取最新代码
git pull origin main

# 如果有错误，先查看状态
git status
```

#### 工作过程中

```bash
# 1. 查看当前更改
git status

# 2. 查看具体修改内容
git diff

# 3. 添加更改到暂存区
git add .
# 或选择性添加
git add src/components/Hero.tsx

# 4. 提交更改（写清楚的提交信息）
git commit -m "feat: 添加新功能描述"
# 或
git commit -m "fix: 修复某个问题"
```

#### 完成工作后

```bash
# 1. 推送到远程仓库
git push origin main

# 2. Vercel 会自动部署更新
```

### 📱 设备切换场景

#### 场景 1: Mac → Windows

**在 Mac 上**:
```bash
# 完成工作
git add .
git commit -m "feat: 完成某功能"
git push origin main
```

**在 Windows 上**:
```bash
# 开始工作前
git pull origin main

# 现在可以继续开发了
npm run dev
```

#### 场景 2: Windows → Mac

**在 Windows 上**:
```bash
# 完成工作
git add .
git commit -m "fix: 修复某问题"
git push origin main
```

**在 Mac 上**:
```bash
# 开始工作前
git pull origin main

# 继续开发
npm run dev
```

### ⚠️ 处理未完成的工作

如果需要切换设备，但工作还没完成，有两种方法：

#### 方法 1: 使用 Git Stash (推荐)

```bash
# 在当前设备上暂存更改
git stash save "工作进度描述"

# 推送代码（如果有已提交的更改）
git push origin main

# 切换到另一台设备
git pull origin main

# 如果需要恢复暂存的更改（可选）
git stash list      # 查看暂存列表
git stash pop       # 恢复最近的暂存
```

#### 方法 2: 创建临时分支

```bash
# 在当前设备上
git checkout -b wip/temp-work
git add .
git commit -m "WIP: 临时保存工作进度"
git push origin wip/temp-work

# 切换到另一台设备
git fetch origin
git checkout wip/temp-work

# 继续开发...

# 完成后合并回 main
git checkout main
git merge wip/temp-work
git push origin main

# 删除临时分支
git branch -d wip/temp-work
git push origin --delete wip/temp-work
```

---

## 最佳实践

### ✅ DO - 推荐做法

1. **开始工作前必拉取**
   ```bash
   git pull origin main
   ```
   - 避免代码冲突
   - 确保在最新代码基础上开发

2. **频繁提交**
   ```bash
   git add .
   git commit -m "clear message"
   ```
   - 小步提交，问题容易定位
   - 提交信息要清晰

3. **完成工作后必推送**
   ```bash
   git push origin main
   ```
   - 确保代码同步到远程
   - 触发 Vercel 自动部署

4. **使用清晰的提交信息**
   ```bash
   # 好的示例
   git commit -m "feat: 添加用户认证功能"
   git commit -m "fix: 修复登录按钮样式问题"
   git commit -m "docs: 更新 README 文档"

   # 提交类型前缀
   # feat: 新功能
   # fix: 修复
   # docs: 文档
   # style: 样式调整
   # refactor: 重构
   # test: 测试
   # chore: 构建/工具配置
   ```

5. **定期同步依赖**
   ```bash
   # 如果 package.json 有更新
   npm install
   ```

6. **保持 .env.local 文件同步**
   - 在两台设备上保持相同的环境变量配置
   - **注意**: `.env.local` 不会被 git 追踪（在 .gitignore 中）
   - 需要手动在两台设备上创建相同内容

### ❌ DON'T - 避免做法

1. **不要在多个设备同时编辑**
   - 会导致冲突
   - 难以合并

2. **不要忘记 push**
   ```bash
   # ❌ 错误流程
   git commit -m "some work"
   # 忘记 push，直接关机

   # ✅ 正确流程
   git commit -m "some work"
   git push origin main
   ```

3. **不要直接编辑生产环境**
   - 总是在本地开发测试
   - 通过 git 推送到生产

4. **不要提交敏感信息**
   - API 密钥
   - 密码
   - 个人信息
   - 这些应该在 `.env.local` 中

5. **不要忽略冲突**
   ```bash
   # 如果出现冲突，必须解决
   git status              # 查看冲突文件
   # 编辑冲突文件
   git add .
   git commit -m "resolve conflicts"
   git push origin main
   ```

---

## 常见问题解决

### 问题 1: Pull 时提示有本地更改

```bash
error: Your local changes to the following files would be overwritten by merge:
        src/components/Hero.tsx
Please commit your changes or stash them before you merge.
```

**解决方案**:
```bash
# 选项 A: 提交本地更改
git add .
git commit -m "save local changes"
git pull origin main

# 选项 B: 暂存本地更改
git stash
git pull origin main
git stash pop  # 恢复暂存的更改
```

### 问题 2: Push 被拒绝

```bash
error: failed to push some refs to 'github.com:kenkakuma/notrace-nextjs.git'
hint: Updates were rejected because the remote contains work that you do not have locally.
```

**解决方案**:
```bash
# 先拉取远程更改
git pull origin main

# 如果有冲突，解决冲突后
git add .
git commit -m "resolve merge conflicts"

# 再推送
git push origin main
```

### 问题 3: 合并冲突

```bash
Auto-merging src/components/Hero.tsx
CONFLICT (content): Merge conflict in src/components/Hero.tsx
Automatic merge failed; fix conflicts and then commit the result.
```

**解决步骤**:

1. 查看冲突文件:
```bash
git status
```

2. 打开冲突文件，会看到:
```jsx
<<<<<<< HEAD
// 你的本地更改
const title = "本地标题";
=======
// 远程的更改
const title = "远程标题";
>>>>>>> origin/main
```

3. 手动编辑，保留需要的内容:
```jsx
const title = "最终决定的标题";
```

4. 标记为已解决:
```bash
git add src/components/Hero.tsx
git commit -m "resolve: 解决合并冲突"
git push origin main
```

### 问题 4: 依赖安装失败

```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
```

**解决方案**:
```bash
# 确保 .npmrc 文件存在
cat .npmrc
# 应该包含: legacy-peer-deps=true

# 清除缓存后重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 问题 5: 端口被占用

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Windows 解决方案**:
```bash
# 查找占用端口的进程
netstat -ano | findstr :3000

# 结束进程（替换 PID）
taskkill /PID <PID> /F

# 或使用不同端口
npm run dev -- -p 3001
```

### 问题 6: 换行符问题

**现象**: 文件在 Windows 和 Mac 间切换后显示大量更改

**解决方案**:
```bash
# 在两台设备上都执行
git config --global core.autocrlf false

# 如果已经出现问题
git rm --cached -r .
git reset --hard
```

---

## 快速参考命令表

### 日常工作流

| 操作 | 命令 |
|------|------|
| 开始工作前 | `git pull origin main` |
| 查看状态 | `git status` |
| 查看更改 | `git diff` |
| 添加更改 | `git add .` |
| 提交更改 | `git commit -m "message"` |
| 推送更改 | `git push origin main` |
| 查看日志 | `git log --oneline -10` |

### 紧急操作

| 操作 | 命令 |
|------|------|
| 暂存工作 | `git stash save "description"` |
| 恢复暂存 | `git stash pop` |
| 放弃本地更改 | `git reset --hard HEAD` |
| 查看远程状态 | `git fetch && git status` |
| 撤销最后一次提交 | `git reset --soft HEAD~1` |

### 项目命令

| 操作 | 命令 |
|------|------|
| 安装依赖 | `npm install` |
| 启动开发服务器 | `npm run dev` |
| 构建生产版本 | `npm run build` |
| 运行 Lint | `npm run lint` |

---

## WebStorm 跨平台设置同步

如果你在两台设备上都使用 WebStorm:

### 1. 启用设置同步

1. 打开 WebStorm
2. File → Manage IDE Settings → Settings Sync
3. 登录 JetBrains 账号
4. 选择要同步的设置:
   - ✅ Code style
   - ✅ Keymaps
   - ✅ Plugins
   - ✅ UI settings

### 2. 推荐插件

在两台设备上都安装:
- **GitToolBox**: Git 增强工具
- **Rainbow Brackets**: 括号高亮
- **Prettier**: 代码格式化
- **ESLint**: 代码检查

---

## 总结

### 核心原则

1. **开始工作前**: `git pull origin main`
2. **完成工作后**: `git commit` + `git push origin main`
3. **频繁同步**: 小步提交，经常推送
4. **清晰记录**: 写好提交信息

### 典型一天的工作流

**早上在 Mac 上**:
```bash
git pull origin main
npm run dev
# 开发...
git add .
git commit -m "feat: 完成早上的工作"
git push origin main
```

**晚上在 Windows 上**:
```bash
git pull origin main
npm run dev
# 继续开发...
git add .
git commit -m "feat: 完成晚上的工作"
git push origin main
```

### 遇到问题时

1. **先查看状态**: `git status`
2. **查看差异**: `git diff`
3. **参考本文档**: 查找对应问题的解决方案
4. **保持冷静**: Git 几乎所有操作都可以撤销

---

## 相关资源

- **项目仓库**: https://github.com/kenkakuma/notrace-nextjs
- **生产环境**: https://no-trace.jp
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Git 文档**: https://git-scm.com/doc
- **Node.js 下载**: https://nodejs.org/

---

**最后更新**: 2025-11-27
**版本**: v1.0

如有问题，请参考本文档或咨询技术支持。
