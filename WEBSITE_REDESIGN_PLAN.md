# NO TRACE EXPLORER - Website Redesign Implementation Plan

## 执行概况

**目标**: 解决用户困惑,建立清晰的B2B/B2C双路径架构
**范围**: UI/UX改进 + 网站架构调整 (暂不包含内容制作)
**优先级**: Hero区域 + 首页重构 > 导航简化 > 细节优化

---

## Phase 1: 核心架构改造 (本阶段重点)

### 1.1 首页Hero区域重构 ⭐⭐⭐⭐⭐

**现状问题**:
- Hero展示公司标语,但没有引导用户分流
- 用户不知道"我应该看什么"
- B2B和B2C用户混在一起

**目标设计**:

```
┌─────────────────────────────────────────────────────────┐
│                    [背景图片 - 咖啡/烘焙场景]                  │
│                                                         │
│              日中咖啡商业桥梁                               │
│         The Japan-China Coffee Business Bridge         │
│                                                         │
│      北京烘焙专业技术 × 日本品质管控                          │
│   Beijing Roasting Expertise × Japanese Quality Control│
│                                                         │
│        ┌──────────────┐    ┌──────────────┐           │
│        │ 企業のお客様    │    │ コーヒー愛好者 │           │
│        │ For Business │    │ For Enthusiast│           │
│        │              │    │              │           │
│        │ 貿易・OEM    │    │ 設備・器具    │           │
│        │ 展示サービス  │    │ コミュニティ  │           │
│        │              │    │              │           │
│        │   詳しく見る  │    │   商品を見る  │           │
│        └──────────────┘    └──────────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**技术实现**:
- 修改 `components/HeroOptimized.vue` 或创建新的 `HeroSegmented.tsx`
- 添加两个CTA按钮,引导不同用户路径
- 保留背景图片动态配置能力

**成功标准**:
- 用户进入首页后3秒内能识别自己的路径
- 点击率: B2B按钮 vs B2C按钮 接近 50:50 (符合收入分布)

---

### 1.2 首页板块重组 ⭐⭐⭐⭐⭐

**现状板块** (8个):
1. HeroSection
2. BusinessValueSection (三个业务支柱)
3. PhilosophySection
4. SecondaryHeroSection (LAB/CLUB卡片)
5. ShopEntranceSection
6. FeaturedProductsFromShop
7. FeaturedArticlesSection
8. FAQSection

**问题**:
- 8个板块信息过载
- ShopEntrance + FeaturedProducts 重复
- BusinessValue、Philosophy、SecondaryHero 都在讲价值主张(分散)

**目标板块** (5个):

```
1. 【HeroSegmented】用户分流区
   - 核心信息: 日中桥梁定位
   - 两条路径: B2B | B2C

2. 【ValueProposition】价值主张区 (动态)
   根据用户hover/点击显示对应内容:

   B2B路径内容:
   ├── 北京烘焙专业技术传承
   ├── 日本品质管控标准
   └── 一站式贸易与展览服务

   B2C路径内容:
   ├── 精选专业咖啡设备
   ├── 活跃的咖啡社区
   └── 知识分享与活动

3. 【TrustSignals】信任信号区
   - 数据展示: 50+体验项目、15+合作企业
   - 占位符: 客户logo (未来添加)
   - 占位符: 认证徽章 (未来添加)

4. 【LatestInsights】最新动态 (新闻+文章混合)
   - 显示最新3条内容
   - 链接到 /about 页面

5. 【CTASection】行动号召区
   B2B: "お問い合わせ" (联系咨询)
   B2C: "商品を探す" (探索商店)
```

**技术实现**:
- 修改 `app/page.tsx`
- 合并 BusinessValueSection + PhilosophySection → 新的 ValueProposition 组件
- 删除 SecondaryHeroSection (LAB/CLUB卡片改为ValueProposition的一部分)
- 合并 ShopEntranceSection + FeaturedProductsFromShop → 移除,用CTA替代
- 保留 FeaturedArticlesSection → 重命名为 LatestInsights
- 保留 FAQSection

**文件修改清单**:
- `app/page.tsx` - 主页面结构
- `components/ValueProposition.tsx` - 新建动态价值主张组件
- `components/HeroSegmented.tsx` - 新建分流Hero
- `components/LatestInsights.tsx` - 重命名现有FeaturedArticles
- `components/CTASection.tsx` - 新建CTA组件

---

### 1.3 导航栏简化 ⭐⭐⭐⭐

**现状导航**:
```
[LOGO] ... [コーヒー] [エキシビション] [ショップ] [クラブ] [企業情報] [お問い合わせ] [管理システム▼]
```

**问题**:
- 7个顶级菜单项过多
- Coffee、Exhibition、Shop、Club 平等展示 (没有层级)
- 管理システム对普通用户无关

**目标导航**:

```
桌面版:
[LOGO] ... [コーヒー事業▼] [ショップ▼] [企業情報] [お問い合わせ]

下拉菜单:
コーヒー事業 ▼
  ├── 貿易・OEM
  ├── 品質管理
  └── 展示サービス

ショップ ▼
  ├── 設備・器具
  └── コミュニティ・クラブ

移动版:
[LOGO] [☰]

抽屉菜单:
企業のお客様 >
  ├── コーヒー貿易・OEM
  ├── 品質管理サービス
  └── 展示・イベント

コーヒー愛好者 >
  ├── 設備ショップ
  └── コミュニティ・クラブ

├── 企業情報
└── お問い合わせ
```

**技术实现**:
- 修改导航组件 (可能在 `components/` 中)
- 添加下拉菜单功能
- 移动端抽屉菜单重构,按用户类型分组

**文件修改清单**:
- `components/Navigation.tsx` 或类似的导航组件
- `components/MobileMenu.tsx` 或抽屉菜单组件

---

### 1.4 LAB/SHOP命名统一 ⭐⭐⭐

**现状问题**:
- URL: `/lab`
- 导航: "ショップ"
- 页面文件: `app/lab/page.tsx`
- 内容: 实际是电商,不是实验室

**解决方案**:

**选项A: 全部改为SHOP** (推荐)
```
URL: /shop
文件: app/shop/page.tsx
导航: ショップ
原因:
- 更直观(用户知道这是买东西的地方)
- 符合电商定位
- 日语"ショップ"通用
```

**选项B: 全部改为LAB** (不推荐)
```
原因: LAB暗示研发/实验,与电商功能不符
```

**技术实现** (选项A):
1. 重命名目录: `app/lab/` → `app/shop/`
2. 更新所有链接引用
3. 添加重定向: `/lab` → `/shop` (避免旧链接失效)
4. 更新 contentlayer 配置 (如果产品路径相关)
5. 更新导航文字(如果有不一致)

**文件修改清单**:
- `app/lab/page.tsx` → `app/shop/page.tsx`
- 所有包含 `/lab` 链接的组件
- `next.config.js` - 添加重定向规则

---

### 1.5 邮件注册功能 ⭐⭐⭐

**目标**: 捕获访客邮箱,建立再营销渠道

**实施位置**:

**位置1: Footer (全站)**
```
┌─────────────────────────────────────────┐
│  日中コーヒーの最新情報をお届け           │
│  Get latest Japan-China coffee insights │
│                                         │
│  [____________メールアドレス____________] [登録] │
│                                         │
│  □ 企業向け情報  □ 愛好者向け情報        │
└─────────────────────────────────────────┘
```

**位置2: 首页CTA区域**
```
在CTASection下方添加:
"最新のコーヒー情報やイベントをメールで受け取る"
```

**技术实现**:

**方案A: 简单实现 (纯前端,先不存储)**
- 表单组件收集邮箱
- 提示用户"功能开发中"或"已记录"
- 实际存储留待后续 (需要后端/数据库)

**方案B: 第三方服务集成**
- Mailchimp / Sendgrid / ConvertKit
- 需要API key配置
- 可以即时使用

**方案C: 本地存储**
- API route写入JSON文件或数据库
- 简单但需要管理后台查看

**推荐**: 先做方案A (占位符),后续再决定使用哪个服务

**文件修改清单**:
- `components/NewsletterSignup.tsx` - 新建组件
- `components/Footer.tsx` - 整合注册表单
- (可选) `app/api/newsletter/route.ts` - API endpoint

---

### 1.6 移动端优化 ⭐⭐⭐

**移动端首页板块精简**:

```
桌面版: 5个板块
移动版: 3个板块

保留:
1. HeroSegmented (必须 - 用户分流)
2. ValueProposition (核心价值)
3. CTASection (行动号召)

折叠/移除:
- TrustSignals → 移到About页面
- LatestInsights → 移到About页面或显示1条(而非3条)
- FAQSection → 移到独立FAQ页面
```

**移动端Hero简化**:
```
┌─────────────────────┐
│   [背景图片]         │
│                     │
│  日中咖啡商業桥梁    │
│  北京×日本品质      │
│                     │
│  ┌───────────┐     │
│  │ 企業客戶    │     │
│  │ Business   │     │
│  └───────────┘     │
│  ┌───────────┐     │
│  │ 咖啡愛好者  │     │
│  │ Enthusiast │     │
│  └───────────┘     │
└─────────────────────┘
```

**技术实现**:
- 使用Tailwind响应式类: `hidden md:block`, `md:hidden`
- Hero按钮垂直排列: `flex-col md:flex-row`
- ValueProposition使用手风琴/标签页

**文件修改清单**:
- 所有首页组件添加响应式类
- 测试移动端布局

---

## Phase 2: 页面级优化 (后续阶段)

### 2.1 Coffee页面 (B2B)

**添加元素**:
- [ ] 质量认证展示区 (占位符)
- [ ] 流程图: 采购 → 质检 → 交付
- [ ] 客户案例研究区 (占位符,3个卡片)
- [ ] "企业能力说明书" 下载按钮 (PDF)
- [ ] 联系表单优化

### 2.2 Exhibition页面 (B2B)

**添加元素**:
- [ ] 项目案例展示 (占位符)
- [ ] 服务流程图
- [ ] RFP提交表单

### 2.3 Shop页面 (B2C)

**添加元素**:
- [ ] 产品筛选器 (分类、价格)
- [ ] 产品评价占位符 (★★★★★)
- [ ] "新品" 和 "畅销" 标签
- [ ] 收藏夹功能占位符

### 2.4 Club页面 (B2C)

**添加元素**:
- [ ] 会员等级对比表
- [ ] 活动日历 (占位符)
- [ ] 会员感言区 (占位符)
- [ ] 申请表单

---

## 技术实施顺序

### Step 1: 准备工作
```bash
1. Git分支管理
   git checkout -b feature/website-redesign

2. 备份现有组件
   创建 components/backup/ 存放原始文件

3. 安装可能需要的依赖
   (暂时不需要新依赖)
```

### Step 2: Hero重构 (最优先)
```
1. 创建 components/HeroSegmented.tsx
2. 修改 app/page.tsx - 替换HeroOptimized为HeroSegmented
3. 测试响应式布局
4. 调整样式和动画
```

### Step 3: 首页板块重组
```
1. 创建 components/ValueProposition.tsx
2. 创建 components/TrustSignals.tsx
3. 重命名 FeaturedArticles → LatestInsights
4. 创建 components/CTASection.tsx
5. 修改 app/page.tsx - 新板块结构
6. 删除/注释旧组件
```

### Step 4: 导航简化
```
1. 识别现有导航组件位置
2. 添加下拉菜单逻辑
3. 重构移动端抽屉菜单
4. 测试所有链接
```

### Step 5: LAB→SHOP重命名
```
1. 重命名目录 app/lab → app/shop
2. 全局搜索替换 '/lab' → '/shop'
3. 添加重定向规则
4. 测试所有链接
```

### Step 6: 邮件注册
```
1. 创建 components/NewsletterSignup.tsx
2. 修改 Footer 整合表单
3. (可选) 创建API endpoint
```

### Step 7: 移动端优化
```
1. 为所有组件添加响应式类
2. 测试手机/平板/桌面
3. 调整断点和间距
```

### Step 8: 测试与部署
```
1. 本地测试所有页面
2. 检查控制台错误
3. 测试导航链接
4. 性能检查 (Lighthouse)
5. Git commit + push
6. 部署到生产环境
```

---

## 文件修改总览

### 新建文件:
```
components/
├── HeroSegmented.tsx          ⭐ 分流Hero
├── ValueProposition.tsx       ⭐ 动态价值主张
├── TrustSignals.tsx          信任信号区
├── LatestInsights.tsx        最新动态(重命名)
├── CTASection.tsx            CTA区域
└── NewsletterSignup.tsx      邮件注册
```

### 修改文件:
```
app/
├── page.tsx                   ⭐⭐⭐ 首页重构
├── shop/ (重命名自lab/)       ⭐ 目录重命名
├── coffee/page.tsx           后续优化
├── exhibition/page.tsx       后续优化
└── club/page.tsx            后续优化

components/
├── Navigation.tsx            ⭐⭐ 导航简化
├── MobileMenu.tsx           ⭐⭐ 移动菜单重构
└── Footer.tsx               添加邮件注册

next.config.js               添加重定向规则
```

### 删除/弃用文件:
```
components/
├── BusinessValueSection.tsx   → 合并到ValueProposition
├── PhilosophySection.tsx      → 合并到ValueProposition
├── SecondaryHeroSection.tsx   → 删除
├── ShopEntranceSection.tsx    → 删除
└── (保留原文件在backup/以防需要参考)
```

---

## 设计规范参考

### 颜色
```css
Primary: #E17B47 (橙色)
Background: #FAF9F7 (米色)
Text Dark: #1A1A1A
Text Secondary: #666666
```

### 间距
```
Section间距: py-16 md:py-24
Container: max-w-7xl mx-auto px-4
卡片间距: gap-6 md:gap-8
```

### 字体大小
```
Hero标题: text-4xl md:text-6xl
Section标题: text-3xl md:text-4xl
正文: text-base md:text-lg
```

### 按钮样式
```
主按钮: bg-[#E17B47] text-white hover:opacity-90
次按钮: border-2 border-[#E17B47] text-[#E17B47] hover:bg-[#E17B47] hover:text-white
```

---

## 成功标准

### 用户体验指标:
- [ ] 首屏加载后3秒内用户能识别自己的路径
- [ ] 首页跳出率降低 (目标: <60%)
- [ ] 页面停留时间增加 (目标: >2分钟)
- [ ] B2B和B2C点击分布接近50:50

### 技术指标:
- [ ] Lighthouse Performance > 90
- [ ] 移动端友好度 100%
- [ ] 无控制台错误
- [ ] 所有链接可用

### 业务指标:
- [ ] 联系表单提交量 (B2B)
- [ ] 商品浏览量 (B2C)
- [ ] 邮件注册量

---

## 风险与注意事项

### 技术风险:
1. **组件依赖**: 修改首页可能影响其他页面共享的组件
   - 缓解: 先创建新组件,测试后再替换

2. **路由变更**: /lab → /shop 可能有外部链接
   - 缓解: 添加301重定向,保留旧路由6-12个月

3. **内容CMS**: Contentlayer配置可能需要调整
   - 缓解: 检查产品路径,确保不受影响

### UX风险:
1. **用户习惯**: 现有用户可能习惯旧导航
   - 缓解: 保持核心功能位置不变,只优化层级

2. **信息丢失**: 删除板块可能隐藏重要信息
   - 缓解: 将删除内容移到About或其他页面

### 业务风险:
1. **SEO影响**: URL变更可能影响排名
   - 缓解: 正确配置301重定向,更新sitemap

---

## 后续规划

### Phase 3: 内容制作 (暂缓,待后续)
- 12篇核心文章
- 3个B2B案例研究
- 产品说明和评价
- 客户感言

### Phase 4: 功能增强
- 邮件营销系统集成
- 产品评价系统
- 会员系统
- 活动日历

### Phase 5: 数据分析
- Google Analytics 事件追踪
- A/B测试 (Hero版本、CTA文案)
- 用户行为热图
- 转化漏斗分析

---

## 问题决策记录

### Q1: Hero按钮文案?
**选项A**: "企業のお客様" / "コーヒー愛好者"
**选项B**: "ビジネス向け" / "個人向け"
**选项C**: "貿易・OEM" / "ショップ・コミュニティ"
**决策**: 待讨论

### Q2: ValueProposition动态切换方式?
**选项A**: Hover时显示对应内容
**选项B**: 点击按钮后切换
**选项C**: 两个并列显示(无切换)
**决策**: 待讨论

### Q3: Newsletter订阅服务选择?
**选项A**: 纯占位符,暂不功能
**选项B**: Mailchimp集成
**选项C**: 自建API + 本地存储
**决策**: 待讨论

### Q4: LAB→SHOP是否保留LAB概念?
**选项A**: 完全移除LAB,统一为SHOP
**选项B**: 保留LAB作为SHOP的子品牌(如"LAB Selection")
**决策**: 建议选项A (完全统一)

---

## 联系与反馈

如有疑问或需要调整优先级,随时沟通。

**文档版本**: v1.0
**创建日期**: 2025-01-11
**最后更新**: 2025-01-11
