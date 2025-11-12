# AI上下文加载指南

> Claude/AI工具快速加载项目上下文的最佳实践

## 🎯 快速开始

### 开发会话启动流程

```bash
# 用户输入 (推荐格式):
"进入项目,加载上下文"

# 或具体任务:
"加载项目上下文,我要开发CMS相关功能"
"加载项目上下文,需要修复商城集成问题"
```

### AI标准响应流程

#### 阶段1: 核心上下文 (必读)
```typescript
// 按顺序读取这3个文件
1. Read: docs/00-README.md          // 项目概览 (126行)
2. Read: docs/02-architecture/overview.md  // 架构 (333行)
3. Read: package.json               // 依赖版本

总计: ~500行,提供80%核心上下文
```

#### 阶段2: 任务相关 (按需)
```typescript
// 根据任务类型读取对应文档

任务: "开发CMS功能"
→ Read: docs/03-features/cms.md

任务: "商城集成问题"
→ Read: docs/03-features/shop.md
→ Read: docs/02-architecture/integrations.md

任务: "修改样式"
→ Read: docs/04-development/design-system.md

任务: "添加API"
→ Read: docs/04-development/api-reference.md

任务: "部署问题"
→ Read: docs/05-deployment/deployment.md
```

#### 阶段3: 代码检查 (必要时)
```typescript
// 仅在需要具体实现时读取源码
Glob: "app/**/*.tsx"            // 查找相关页面
Read: specific files            // 读取具体文件
```

## 📋 上下文加载模板

### 模板1: 通用开发任务

```markdown
# AI执行序列
1. Read: docs/00-README.md
2. Read: docs/02-architecture/overview.md
3. [等待用户具体任务描述]
4. Read: [任务相关文档]
5. [开始开发]
```

### 模板2: Bug修复

```markdown
1. Read: docs/00-README.md
2. [用户描述Bug]
3. Glob: 查找相关文件
4. Read: 具体文件
5. Read: 相关功能文档 (如需要)
6. [修复Bug]
```

### 模板3: 新功能开发

```markdown
1. Read: docs/00-README.md
2. Read: docs/02-architecture/overview.md
3. Read: docs/04-development/design-system.md
4. Read: docs/04-development/code-standards.md
5. [开始开发]
```

## 🎨 分层加载策略

### Level 1: 最小上下文 (~500行)
```yaml
目的: 快速理解项目
文件:
  - docs/00-README.md
  - docs/02-architecture/overview.md
适用: 简单问答、快速查询
```

### Level 2: 功能上下文 (~1000行)
```yaml
目的: 开发特定功能
文件:
  - Level 1
  - 对应功能文档 (cms/shop/admin)
  - design-system.md
适用: 功能开发、样式调整
```

### Level 3: 完整上下文 (~1500行)
```yaml
目的: 架构调整、重构
文件:
  - Level 2
  - tech-stack.md
  - integrations.md
  - code-standards.md
适用: 架构变更、技术升级
```

## 🚀 按任务类型的加载清单

### CMS内容管理
```
✅ docs/00-README.md
✅ docs/03-features/cms.md
📝 contentlayer.config.ts (如需修改配置)
📝 content/articles/*.md (如需查看示例)
```

### 商城集成
```
✅ docs/00-README.md
✅ docs/03-features/shop.md
✅ docs/02-architecture/integrations.md (Medusa部分)
📝 lib/medusa.ts (如需修改API调用)
```

### 管理后台
```
✅ docs/00-README.md
✅ docs/03-features/admin.md
📝 components/admin/*.tsx (如需修改组件)
```

### UI/样式开发
```
✅ docs/00-README.md
✅ docs/04-development/design-system.md
📝 tailwind.config.ts (如需查看配置)
📝 components/ui/*.tsx (如需查看组件)
```

### API开发
```
✅ docs/00-README.md
✅ docs/04-development/api-reference.md
✅ docs/02-architecture/integrations.md (外部API)
📝 app/api/**/route.ts (如需查看现有API)
```

### 部署/配置
```
✅ docs/00-README.md
✅ docs/05-deployment/deployment.md
📝 next.config.mjs
📝 .env.local.example
```

## 📊 上下文使用优化

### 避免过度加载
```typescript
// ❌ 不推荐
Read: docs/DOCUMENTATION_INDEX.md (375行,仅索引)
Read: docs/SUMMARY.md (总结,非开发必需)
Read: 所有功能文档 (如果只需要一个功能)

// ✅ 推荐
Read: 仅任务相关的文档
按需逐步加载
```

### 使用Glob而非全文读取
```typescript
// ❌ 低效
Read: app/**/*.tsx (读取所有文件)

// ✅ 高效
Glob: "app/**/*product*.tsx" (查找相关文件)
Read: [匹配的1-2个文件]
```

### 缓存上下文
```typescript
// 会话开始时加载核心上下文
初始加载: docs/00-README.md + overview.md

// 后续任务复用
任务1: + cms.md
任务2: 复用已加载 + shop.md
任务3: 复用已加载 + design-system.md
```

## 🎯 典型会话示例

### 示例1: 新功能开发
```
User: "加载项目,我要给首页添加新的Section"

AI:
1. Read: docs/00-README.md
2. Read: docs/02-architecture/overview.md
3. Read: docs/04-development/design-system.md
4. "了解需求:新Section的内容是什么?"

User: "显示最新3篇博客文章"

AI:
5. Read: docs/03-features/cms.md
6. Read: app/page.tsx
7. 开始开发...
```

### 示例2: Bug修复
```
User: "商品图片加载失败"

AI:
1. Read: docs/00-README.md
2. "请提供更多信息:哪个页面?错误信息?"

User: "LAB页面,控制台404错误"

AI:
3. Read: docs/03-features/shop.md
4. Read: app/lab/page.tsx
5. Read: components/lab/LabProductsSection.tsx
6. 发现问题,修复...
```

### 示例3: 配置调整
```
User: "修改Tailwind颜色配置"

AI:
1. Read: docs/04-development/design-system.md
2. Read: tailwind.config.ts
3. 建议修改方案...
```

## 📖 文档优先级参考

### 必读 (P0)
```
docs/00-README.md               # 项目概览
docs/02-architecture/overview.md # 系统架构
```

### 高优先级 (P1)
```
docs/03-features/[任务相关].md  # 功能文档
docs/04-development/design-system.md # 设计系统
```

### 中优先级 (P2)
```
docs/02-architecture/tech-stack.md # 技术栈
docs/02-architecture/integrations.md # 外部集成
docs/04-development/code-standards.md # 代码规范
```

### 低优先级 (P3)
```
docs/01-quickstart/setup.md     # 环境配置 (开发时无需)
docs/05-deployment/deployment.md # 部署 (非部署任务)
docs/DOCUMENTATION_INDEX.md     # 索引 (仅查找用)
docs/SUMMARY.md                 # 总结 (非开发必需)
```

## 🔧 实战技巧

### 技巧1: 渐进式加载
```
开始: 最小上下文
需要时: +功能文档
复杂时: +架构文档
```

### 技巧2: 关键词触发
```
"CMS" → 自动加载 cms.md
"商城" → 自动加载 shop.md
"样式" → 自动加载 design-system.md
"API" → 自动加载 api-reference.md
```

### 技巧3: 避免重复加载
```
会话中已读取的文档无需重复读取
使用记忆中的信息即可
```

## 📝 推荐启动命令

### 用户可以使用的快捷命令

```bash
# 通用开发
"进入notrace项目,加载开发上下文"

# 特定功能
"加载notrace项目,开发CMS功能"
"加载notrace项目,修复商城集成"
"加载notrace项目,调整UI样式"

# 快速问答
"notrace项目:CMS如何添加新分类?"
"notrace项目:商城API地址是什么?"
```

### AI标准响应

```typescript
收到命令 →
  Read: docs/00-README.md →
  Read: docs/02-architecture/overview.md →
  [根据任务类型] Read: 相关文档 →
  "已加载上下文,请描述具体任务"
```

## ⚡ 性能指标

### 目标加载时间
```
最小上下文 (P0): <10秒
功能上下文 (P1): <20秒
完整上下文 (P2): <30秒
```

### Token使用估算
```
P0文档: ~2,000 tokens
P1文档: ~5,000 tokens
P2文档: ~10,000 tokens
完整文档: ~50,000 tokens (避免)
```

---

## 总结

**核心原则**:
1. ⚡ **最小必需**: 只读必要文档
2. 📊 **按需加载**: 根据任务渐进
3. 🎯 **任务导向**: 文档服务任务
4. 💾 **复用上下文**: 避免重复加载

**标准流程**:
```
00-README.md → overview.md → [任务文档] → 开始工作
```

---

**创建日期**: 2025-01-12
**适用于**: Claude, GPT-4, 其他AI助手
