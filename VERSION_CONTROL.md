# Version Control Guidelines

## 版本号规则 (Semantic Versioning)

本项目采用语义化版本号：`MAJOR.MINOR.PATCH`

### 版本号含义

```
X.Y.Z
│ │ └─ PATCH：小修补、补丁 (从 .1 开始递增)
│ └─── MINOR：功能更新、新特性
└───── MAJOR：重大更新、破坏性变更
```

### 版本号示例

- **0.4.1** → 小修补（bug fixes, 小优化）
- **0.4.2** → 小修补（bug fixes, 小优化）
- **0.5.0** → 功能更新（新功能、新页面）
- **1.0.0** → 重大更新（架构变更、全面改版）

### 版本历史

| 版本 | 日期 | 类型 | 描述 |
|------|------|------|------|
| 0.4.2 | 2025-11-12 | PATCH | Vercel部署、DNS配置、滚动动画修复 |
| 0.4.1 | 2025-11-12 | PATCH | 内容管理、Bug修复、UX优化 |
| 0.4.0 | 2025-01-XX | MINOR | 网站重设计、内容整合 |
| 0.3.0 | 2024-XX-XX | MINOR | RSS自动收集系统 |

## Git Workflow

### 1. 开发流程

```bash
# 创建功能分支
git checkout -b feature/feature-name

# 开发完成后合并到 main
git checkout main
git merge feature/feature-name

# 创建版本标签
git tag -a v0.4.2 -m "Release v0.4.2"
git push origin main --tags
```

### 2. Commit Message 规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链配置

**示例：**
```
feat: Add scroll reveal animation to About page

- Import ScrollReveal component
- Improve user experience with animated content

Fixes: #123
```

### 3. 发布流程

1. **完成开发** → 本地测试
2. **Git提交** → 清晰的commit message
3. **推送GitHub** → 触发自动部署
4. **Vercel部署** → 自动构建和发布
5. **创建标签** → 标记版本
6. **更新文档** → Release notes

## Branch Strategy

- **main**: 生产环境分支（自动部署）
- **feature/\***: 功能开发分支
- **hotfix/\***: 紧急修复分支

## Release Notes

每个版本都需要创建对应的 Release Notes：

- `RELEASE_NOTES_v0.4.2.md`
- `RELEASE_NOTES_v0.4.1.md`
- 等等...

文件包含：
- 版本信息
- 新功能
- Bug修复
- 技术改进
- 部署说明
