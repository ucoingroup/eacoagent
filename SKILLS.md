# EACO Agent 技能库 · 30 个最常用 Skill 技术文档

> 版本：v2026.11 ｜ 维护：ucoingroup ｜ 适用：任何支持 SKILL.md 约定的 AI Agent（Claude / WorkBuddy / 自建 Agent）
>
> **使用方式**：每个技能 = 一个文件夹 `skills/<slug>/SKILL.md`。把下面对应代码块保存为该文件即可被 Agent 加载。
> **三层结构**：`name`（调用名）→ `description`（何时触发）→ 正文（执行步骤与约束）。

---

## 总览

| # | Skill | 类别 | 用途 | 触发词示例 |
|---|---|---|---|---|
| 01 | repo-init | 站点仓库 | 初始化标准静态仓库 | 「新建一个站点仓库」 |
| 02 | page-scaffold | 站点仓库 | 生成新页面脚手架 | 「加一个新页面」 |
| 03 | check-links | 站点仓库 | 内部链接自检 | 「检查链接」 |
| 04 | pages-deploy | 站点仓库 | Pages 部署体检 | 「部署上线」 |
| 05 | changelog-gen | 站点仓库 | 生成变更日志 | 「写 changelog」 |
| 06 | topic-miner | 内容生产 | 选题挖掘 | 「帮我找选题」 |
| 07 | article-draft | 内容生产 | 五段式文章 | 「写篇文章」 |
| 08 | thread-writer | 内容生产 | 社媒帖子/串 | 「发推/写帖子」 |
| 09 | i18n-parity | 内容生产 | 中英双语对齐 | 「翻成英文并对照」 |
| 10 | seo-meta | 内容生产 | SEO 元信息 | 「补 SEO」 |
| 11 | og-image-spec | 内容生产 | 分享图规格 | 「做 OG 图」 |
| 12 | rss-builder | 内容生产 | RSS 生成 | 「加 RSS」 |
| 13 | content-recycle | 内容生产 | 内容回收复用 | 「旧文新用」 |
| 14 | city-score | 研究数据 | 城市三维评分 | 「给这个城市打分」 |
| 15 | quota-calc | 研究数据 | EACO 配额计算 | 「算配额」 |
| 16 | market-scan | 研究数据 | 市场扫描 | 「扫一下市场」 |
| 17 | competitor-matrix | 研究数据 | 竞品矩阵 | 「拆解竞品」 |
| 18 | policy-watch | 研究数据 | 政策监控 | 「政策变了吗」 |
| 19 | fact-check | 研究数据 | 事实核查 | 「核实这段话」 |
| 20 | social-calendar | 运营增长 | 内容日历 | 「排下月内容」 |
| 21 | faq-keeper | 运营增长 | FAQ 库维护 | 「更新 FAQ」 |
| 22 | lead-pipeline | 运营增长 | 线索管道 | 「整理客户」 |
| 23 | email-drip | 运营增长 | 邮件序列 | 「写跟进邮件」 |
| 24 | metrics-weekly | 运营增长 | 周指标报告 | 「本周数据」 |
| 25 | ledger-keep | 财务合规 | 记账与损益 | 「记一笔账」 |
| 26 | invoice-gen | 财务合规 | 报价单/发票 | 「开个报价」 |
| 27 | compliance-redline | 财务合规 | 合规红线检查 | 「这样合规吗」 |
| 28 | meeting-minutes | 协作治理 | 会议纪要 | 「整理会议」 |
| 29 | weekly-review | 协作治理 | 每周复盘 | 「复盘本周」 |
| 30 | dao-proposal | 协作治理 | DAO 提案起草 | 「写个提案」 |

---

## A · 站点与仓库（01–05）

### 01 · repo-init

**用途**：按 eacoagent 标准初始化一个新静态仓库（目录、基础文件、检查脚本一步到位）。

```markdown
---
name: repo-init
description: 初始化一个符合 eacoagent 规范的静态站点仓库。当用户要求新建站点仓库、初始化项目结构时使用。
---

# 仓库初始化

按以下结构创建（已存在的文件跳过，不覆盖）：

1. `index.html`：含 <nav> 顶部导航、<main> 主区、<footer> 页脚，引用 assets/site.css
2. `assets/site.css`：设计令牌（--green:#2f8f43 --blue:#2f6fe4 --bg:#f6faf5 --radius:16px）
3. `assets/favicon.svg`：绿蓝渐变圆角方块 + 白色 "E"
4. `404.html`：带三个入口按钮，<meta name="robots" content="noindex">
5. `sitemap.xml` / `robots.txt` / `manifest.webmanifest` / `.nojekyll` / `LICENSE`(MIT)
6. `scripts/check-links.js`：内部链接自检
7. `.github/workflows/quality.yml`：push 时运行 node scripts/check-links.js

约束：
- 零依赖、零 CDN、系统字体栈
- 所有 canonical / og:url / sitemap 使用用户提供的最终域名
- 完成后运行 node scripts/check-links.js，必须通过才算完成
```

### 02 · page-scaffold

**用途**：为现有站点生成风格统一的新页面。

```markdown
---
name: page-scaffold
description: 生成与现有站点风格一致的新 HTML 页面。当用户要求添加新页面时使用。
---

# 新页面脚手架

步骤：
1. 确认三要素：文件名（kebab-case）、页面定位（一句话）、所属导航分组
2. 复制站点现有页面的 <head>（canonical/OG/JSON-LD 按新页面改写）
3. 正文骨架：hero（eyebrow + h1 + lead + 两个按钮）→ 2-4 个 section → footer
4. 仅使用 assets/site.css 已有类：.wrap .section .cards .pagecard .grid .card
   .ticks .tablewrap .note .stats .stat；禁止内联自定义样式
5. 更新所有页面的 <nav>，sitemap.xml 追加新 URL
6. 运行 node scripts/check-links.js

输出：新页面文件 + nav/sitemap 的 diff 说明。
```

### 03 · check-links

**用途**：跑通仓库自带的链接检查，并修复发现的问题。

```markdown
---
name: check-links
description: 检查站点内部链接与静态资源引用。当用户要求检查链接、发布前体检时使用。
---

# 链接体检

1. 运行 `node scripts/check-links.js`
2. 对每个问题分类处理：
   - 文件不存在 → 修正引用或创建文件
   - 绝对路径 `/xxx` → 改相对路径（项目站点根不是域名根）
   - sitemap 未收录 → 补充 <url> 条目
   - 模板字符串误报（含 ${ 的 href）→ 忽略
3. 重新运行直至「全部通过 ✓」，输出修复清单
```

### 04 · pages-deploy

**用途**：GitHub Pages 上线前检查 + 上线后验证。

```markdown
---
name: pages-deploy
description: 检查 GitHub Pages 部署条件并给出上线步骤。当用户要求部署、上线站点时使用。
---

# 部署体检

逐项确认并报告（是/否 + 修复命令）：
1. .nojekyll 存在
2. sitemap.xml 中 loc 与最终域名一致
3. 各页面 canonical / og:url 一致
4. 404.html 存在且 robots 为 noindex
5. README 是否写明 Settings → Pages → main / root 步骤
6. git 远端是否配置（git remote -v）

全部通过后输出一段可复制的部署指引；不代替用户执行 push。
```

### 05 · changelog-gen

**用途**：从 git 记录生成用户视角的变更日志。

```markdown
---
name: changelog-gen
description: 根据提交记录生成 CHANGELOG。当用户要求整理更新日志、发版说明时使用。
---

# 变更日志

1. 运行 git log --oneline --since="上一次发版" 收集提交
2. 按 Keep a Changelog 分类归并：Added / Changed / Fixed / Removed
3. 语言规则：面向使用者描述价值，不写技术黑话
   - ✗ "重构 renderAlloc 函数"
   - ✓ "配额表现在支持中英文自动切换"
4. 输出追加到 CHANGELOG.md 顶部，带日期与版本号（SemVer：内容站用 0.x.y）
```

---

## B · 内容生产（06–13）

### 06 · topic-miner

**用途**：从一个主题挖出 30 个可写选题，并按吸引力排序。

```markdown
---
name: topic-miner
description: 围绕给定主题生成选题库。当用户要求找选题、想不出写什么时使用。
---

# 选题挖掘

输入：主题 + 目标人群。
输出 30 个选题，分五类各 6 个：
1. 痛点型（他们的难题）
2. 反常识型（大家以为 A 其实是 B）
3. 清单型（N 个方法 / N 个工具）
4. 案例型（谁做成了 / 做砸了）
5. 趋势型（接下来 12 个月会怎样）

每个选题给出：标题 + 一句话钩子 + 预估搜索意图（信息/比较/购买）。
最后按「点击欲望 × 制作成本」排序，标出前 5 个建议先写。
禁止：编造数据、使用「震惊」「必看」类标题党。
```

### 07 · article-draft

**用途**：五段式结构快速成稿。

```markdown
---
name: article-draft
description: 按钩子-冲突-方法-证据-行动五段式写文章。当用户要求写文章、写长文时使用。
---

# 五段式成稿

输入：选题 + 目标读者 + 期望长度（默认 1200 字）。

结构：
1. 钩子：一个具体场景或反差事实，3 句内让读者决定继续读
2. 冲突：为什么这个问题难解，常见做法错在哪
3. 方法：2–4 个步骤，每步给「怎么做 + 怎么判断做对了」
4. 证据：案例或数据（没有可靠来源就明说「个人经验」）
5. 行动：今天就能做的一件事

约束：不用「首先/其次/总之」套话；每段 ≤ 5 行；专有名词首次出现给英文。
输出后追加 3 个备选标题。
```

### 08 · thread-writer

**用途**：把一篇文章压成社媒帖子或推文串。

```markdown
---
name: thread-writer
description: 将长文改写为社交媒体帖子或推文串。当用户要求发帖、写 thread 时使用。
---

# 帖子改写

输入：原文链接/文本 + 平台（X/Twitter、小红书、即刻、微信公众号）。

规则：
- 第一条必须独立成立：观点 + 悬念，不写「下面我讲讲」
- 每条 ≤ 平台字数上限的 80%，一条只说一件事
- 数字用阿拉伯数字，删所有「的」能删则删
- 最后一条：总结 + 一个可执行动作
- 中文平台不夹英文术语，必要时括号注释

输出：正文 + 3 个备选首条 + 建议发布时间。
```

### 09 · i18n-parity

**用途**：中英互译并保持双语页面对齐。

```markdown
---
name: i18n-parity
description: 中英双语内容互译与一致性检查。当用户要求翻译、做双语页面时使用。
---

# 双语对齐

翻译规则：
1. 术语表优先：EACO→EACO；地球村→Global Village；一人公司→One Person Company；
   虚拟地球→Virtual Earth；模拟地球→Simulation Earth；显化→manifestation
2. 数字与合约地址原样保留，不做本地化改写
3. 中文长句拆成英文短句，一段 ≤ 2 句
4. 免责声明必须完整翻译，不允许缩写

一致性检查：逐段比对，输出差异表（段落号 / 中文要点 / 英文要点 / 是否对齐）。
HTML 页面：zh 块与 en 块的键名和数据结构必须完全一致。
```

### 10 · seo-meta

**用途**：为页面生成/校验 SEO 元信息。

```markdown
---
name: seo-meta
description: 生成或校验页面的 SEO 元信息。当用户要求补 SEO、优化搜索收录时使用。
---

# SEO 元信息

为每个 HTML 页面校验并补齐：
1. <title> ≤ 60 字符，格式「页面名 · 站点名」
2. meta description ≤ 155 字符，含一个核心关键词
3. canonical 绝对 URL 与 sitemap.xml 一致
4. og:type / og:title / og:description / og:url / twitter:card
5. 恰好一个 <h1>；h2/h3 层级不跳级
6. 图片有 alt；外链有 rel="noopener"
7. JSON-LD：内容页用 Article，首页用 WebSite

输出：每个页面的「已符合 / 已修复 / 建议人工确认」三栏清单。
```

### 11 · og-image-spec

**用途**：生成 OG 分享图的规格与可执行制图提示。

```markdown
---
name: og-image-spec
description: 生成 1200x630 OG 分享图的规格与制图指令。当用户要求做分享图时使用。
---

# OG 分享图

固定规格：
- 尺寸 1200×630，PNG < 300KB
- 背景：浅绿白 #f6faf5，右下 40% 面积放绿→蓝渐变（120deg, #2f8f43→#2f6fe4）
- 左上：favicon 图标 + 站点名
- 中央：页面标题，≤ 2 行，字号 ≥ 64px，深墨绿 #16281a
- 左下角：ucoingroup.github.io/eacoagent

输出：每页一张的制图提示词（供图像模型）或 SVG 源码，文件名 og-<page>.png，
并在各页 <head> 加 <meta property="og:image">。
```

### 12 · rss-builder

**用途**：从内容清单生成 RSS 订阅。

```markdown
---
name: rss-builder
description: 生成站点的 RSS/Atom 订阅文件。当用户要求加 RSS、方便订阅时使用。
---

# RSS 生成

1. 新建 feed.xml（RSS 2.0），字段：
   title / link / description / lastBuildDate / item[](title,link,guid,pubDate)
2. 数据来源：站点的内容索引文件 content/index.json（若无则先创建，
   字段：slug, title, date, summary, tags）
3. pubDate 用 RFC 822 格式；guid 用永久链接
4. 各页面 <head> 加 <link rel="alternate" type="application/rss+xml">
5. sitemap.xml 不需要变；README 的 Roadmap 勾掉 RSS 项

校验：用 xmllint 或 node 的 DOMParser 确认 XML 合法。
```

### 13 · content-recycle

**用途**：把一篇旧内容改造成 5 种新形态。

```markdown
---
name: content-recycle
description: 将既有内容改写为多种形态复用。当用户要求旧文新用、一稿多发时使用。
---

# 内容回收

输入：一篇旧文。输出 5 种形态，每种附「改了什么」：
1. 图文清单 → 信息图大纲（≤ 8 个节点）
2. 长文 → 3 条独立短帖（各自成立）
3. 文章 → 5 分钟脚本（口播节奏，每 30 秒一个钩子）
4. 干货 → 故事版（换成第一人称经历，保留全部事实）
5. 中文 → 英文版（走 i18n-parity 术语表）

红线：改形态不改事实；数字与引用必须原样保留并重新核对来源。
```

---

## C · 研究与数据（14–19）

### 14 · city-score

**用途**：按三维模型给任何城市打分并给出评级。

```markdown
---
name: city-score
description: 按华人友好/Web3/低收入帮扶三维模型评估城市。当用户要求评估某城市时使用。
---

# 城市三维评分

输入：城市名（可含国家）。
评分维度（各 1–5 星）：
- S1 华人友好：华语生活便利度、华人占比、签证门槛
- S2 Web3 友好：监管清晰度、牌照体系、从业者密度
- S3 低收入帮扶：月生活成本、打工机会、社会兜底

流程：
1. 给出评分与依据（每维 ≤ 2 条事实，注明信息时效）
2. 综合权重 S1:0.5 / S2:0.3 / S3:0.2，加权得综合星数
3. 评级：≥4.5 文明枢纽 / ≥3.5 区域枢纽 / ≥2.5 成长节点 / 其余 新兴节点
4. 输出一行点评 + 「落地前必须核实的 3 件事」

禁止给出一星以下评价；信息不足时输出「待核实」而非猜测。
```

### 15 · quota-calc

**用途**：EACO 二十城配额方案的计算与调整。

```markdown
---
name: quota-calc
description: 计算或调整 EACO 城市配额。当用户要求算配额、调整分配时使用。
---

# 配额计算

常量：总量 SUPPLY = 1,350,000,000；单城区间 [10,000,000, 50,000,000]；
当前分层 S(5城,50M)/A(5城,40M)/B(5城,30M)/C(5城,20M) = 已分配 700M（51.85%）。

支持的操作：
1. 查询：给定城市名，返回层级、配额、占总量百分比
2. 调层：城市升降级后重算，输出新的已分配合计与储备池差额
3. 加城：新城市必须从 C 级 20M 起步，从未分配储备扣除
4. 校验：任何调整后必须满足
   Σ(城市配额) + 流动性 200M + DAO 基金 250M + 未来城市 200M = 1,350M

输出：调整前后对照表。附注：配额是协作框架建议，不构成投资或募资承诺。
```

```javascript
// scripts/quota-calc.js（skill 15 的可执行部分）
const SUPPLY = 1_350_000_000;
const TIER_SIZE = { S: 50_000_000, A: 40_000_000, B: 30_000_000, C: 20_000_000 };
const RESERVE = { liquidity: 200_000_000, daoFund: 250_000_000, futureCities: 200_000_000 };

function allocate(cities) { // cities: [{name, tier}]
  const rows = cities.map(c => {
    const amount = TIER_SIZE[c.tier];
    if (amount < 10_000_000 || amount > 50_000_000) throw new Error(`超出区间: ${c.name}`);
    return { ...c, amount, share: (amount / SUPPLY * 100).toFixed(2) + '%' };
  });
  const allocated = rows.reduce((s, r) => s + r.amount, 0);
  const reserved = Object.values(RESERVE).reduce((s, v) => s + v, 0);
  if (allocated + reserved !== SUPPLY) throw new Error(`总量校验失败: ${allocated + reserved}`);
  return { rows, allocated, reserved, allocatedPct: (allocated / SUPPLY * 100).toFixed(2) + '%' };
}
module.exports = { allocate, SUPPLY, RESERVE };
```

### 16 · market-scan

**用途**：对一个细分市场做结构化扫描。

```markdown
---
name: market-scan
description: 对细分市场做需求与供给扫描。当用户要求调研市场、评估方向时使用。
---

# 市场扫描

输出五栏（每栏 3–5 条，标注信息来源与时效）：
1. 人群：谁在花钱，规模量级
2. 痛点：他们现在怎么凑合（现方案 = 你的竞品）
3. 付费证据：已有的付费产品、价格带
4. 空隙：被忽略的细分或被嫌弃的体验
5. 风险：政策、巨头、需求伪命题

结论模板：一句话判断「这个市场对一人公司是否值得进入」+ 置信度（高/中/低）。
信息不足的栏目写「待核实」，禁止编造规模数字。
```

### 17 · competitor-matrix

**用途**：竞品拆解成一张可执行的矩阵。

```markdown
---
name: competitor-matrix
description: 拆解竞品生成对比矩阵。当用户要求分析竞品、做差异化时使用。
---

# 竞品矩阵

选 3–5 个竞品，每家填七列：
定位 / 核心功能 / 定价 / 获客渠道 / 明显短板 / 值得抄的点 / 绝对不抄的点

矩阵之后输出：
- 差异化机会：至少两条「他们都不做 or 都做不好」的空白
- 定位一句话：「比 __ 更 __，比 __ 更 __」
- 三个月内不碰的领域（巨头主场）

来源要求：定价与功能以官方页面为准，注明抓取日期。
```

### 18 · policy-watch

**用途**：追踪签证/加密/税务政策变化对落地城市的影响。

```markdown
---
name: policy-watch
description: 追踪政策变化并评估影响。当用户问政策是否变化、更新城市指南时使用。
---

# 政策监控

针对关注城市清单（默认：新加坡、吉隆坡、曼谷、迪拜、清迈、中国香港）：
1. 核对三类信息：签证政策 / 加密监管 / 税务申报
2. 每条给出：最近变化、生效时间、官方来源链接、对三类人群的影响
   （游客 / 长住 / 经营者）
3. 输出「需要更新页面」清单：城市指南的哪些评分/点评要改

原则：只采用官方或主流媒体来源；转述不确定性（「拟」「传闻」要标注）。
输出后建议 issue 标题，便于在 GitHub 上跟踪。
```

### 19 · fact-check

**用途**：对一段将要发布的内容做事实核查。

```markdown
---
name: fact-check
description: 核查待发布内容中的事实性声明。当用户要求核实内容时使用。
---

# 事实核查

把输入拆成原子声明，逐条标注：
- [核实] 有可靠来源 → 附来源与日期
- [待核] 无法验证 → 给出验证路径（问谁/查哪）
- [存疑] 与已知信息冲突 → 指出冲突点
- [观点] 主观判断 → 不需要来源，但要语气诚实

红线：合约地址、金额、百分比、法律条款四类必须逐字核对。
输出：修改建议版（只改必要处，保留作者语气）。
```

---

## D · 运营与增长（20–24）

### 20 · social-calendar

**用途**：生成下月内容日历。

```markdown
---
name: social-calendar
description: 生成月度内容排期。当用户要求排内容、做日历时使用。
---

# 内容日历

输入：主渠道 + 每周发布频次（默认 3）。
输出表格：日期 | 内容类型 | 选题 | 关联页面/产品 | 状态

排期原则：
1. 60% 干货 / 25% 案例 / 15% 产品相关，产品帖必须挂真实价值
2. 同一选题在不同形态间隔 ≥ 2 周（先长文后短帖）
3. 每周至少 1 条与「华人友好 Web3 / OPC / 地球纲要」页面互相引流
4. 预留 2 个「热点位」，不预填内容

输出后附本周要制作的 3 件事。
```

### 21 · faq-keeper

**用途**：维护 FAQ 库并输出给 Agent 值守。

```markdown
---
name: faq-keeper
description: 维护高频问答库。当用户要求更新 FAQ、整理客户问题时使用。
---

# FAQ 维护

1. 输入：本周对话/评论中的新问题
2. 归类：已有答案 → 引用并标记重复次数；新问题 → 起草答案
3. 答案格式：一句直接回答 + 最多三条补充 + 跳转链接
4. 更新 faq.json（question, answer, links, updated, count）
5. 删除连续 90 天零命中的条目，归档不删除

输出：新增 N 条 / 更新 M 条 / 归档 K 条 + diff。
红线：涉及合规、税务、医疗的答案必须带「请咨询专业人士」。
```

### 22 · lead-pipeline

**用途**：把联系人整理成管道视图。

```markdown
---
name: lead-pipeline
description: 整理与跟进销售线索。当用户要求整理客户、跟进线索时使用。
---

# 线索管道

阶段：新线索 → 已对话 → 已报价 → 已成交 → 复购 / 流失
每条线索记录：来源 / 需求一句话 / 下一步动作 / 跟进日期。

每周一输出：
1. 各阶段数量与转化率
2. 今天必须跟进的 3 条（超期未动优先）
3. 流失原因归类（价格 / 时机 / 需求消失）

数据存 leads.json / leads.csv；不含隐私敏感字段（身份证、住址）。
提醒：只跟进，不纠缠；两次未回复即转入「低成本培育」。
```

### 23 · email-drip

**用途**：设计自动化邮件/私信序列。

```markdown
---
name: email-drip
description: 设计跟进邮件序列。当用户要求写跟进、培育邮件时使用。
---

# 邮件序列

默认 5 封，节奏：D0 / D2 / D5 / D9 / D14。
- D0 交付承诺：确认对方要的东西 + 何时送达
- D2 超额交付：附一个没用过的小技巧/模板
- D5 案例：一个和你相似的人的结果（真实才可写）
- D9 邀请：一次低门槛互动（回复一个问题即可）
- D14 体面收尾：不再打扰 + 留一扇门

写作规则：标题 ≤ 12 字；每封只求一个动作；不发「just follow up」式空邮件。
合规：每封含退订方式；不发未订阅的冷群发。
```

### 24 · metrics-weekly

**用途**：三指标周报生成。

```markdown
---
name: metrics-weekly
description: 生成每周三个核心指标报告。当用户要求看数据、写周报时使用。
---

# 周指标

只跟踪三个：线索数、成交率、复购率（内容站：访客/订阅/转化）。

输出（≤ 15 行）：
1. 本周 vs 上周（三指标，箭头+百分比）
2. 一句话归因：变化来自哪个具体动作
3. 下周唯一重点：只允许一个
4. 数据缺口：哪个指标缺采集方式

禁止：堆图表、报 10 个以上指标、用「整体向好」这类无信息结论。
没有数据就明说，并给出最小埋点方案。
```

---

## E · 财务与合规（25–27）

### 25 · ledger-keep

**用途**：记账并生成三张表。

```markdown
---
name: ledger-keep
description: 记账并生成收入/成本/现金流三表。当用户要求记账、看损益时使用。
---

# 记账

数据文件 ledger.csv，字段：date, type(income/expense), category, amount_cny, note, evidence
分类固定：产品收入 / 服务收入 / 住房 / 网络设备 / Agent费用 / 域名托管 / 合规税务 / 其他

每月 1 号输出：
1. 上月损益表（收入-成本=净额）
2. 成本占比 top3
3. 现金流 runway：按当前月均净支出，现金可支撑几个月
4. 异常：单笔超月预算 20% 的支出

红线：所有数字保留凭证编号；不记无法提供凭证的「 Estimated 」收入。
```

### 26 · invoice-gen

**用途**：生成报价单/发票草稿。

```markdown
---
name: invoice-gen
description: 生成报价单或发票草稿。当用户要求报价、开票时使用。
---

# 报价单

必填：服务方/客户双方名称、日期、币种。
三档定价模板：
- 入门：核心交付 1 项，1 次修改，7 天
- 标准（推荐锚点）：核心交付 + 1 个增值项，2 次修改，14 天
- 深度：标准 + 专属支持 30 天

每档写清：交付物清单（可验收）、排除项、修改次数定义、付款节点（50% 预付）、终止条件。
输出 Markdown 表格 + 纯文本版。
红线：币种与收款主体必须一致；跨境注明「税费由付款方承担」是否适用，不确定就标注待确认。
```

### 27 · compliance-redline

**用途**：对任何方案/文案做合规红线扫描。

```markdown
---
name: compliance-redline
description: 扫描内容中的合规风险。当用户要求检查是否合规、发布前把关时使用。
---

# 合规红线扫描

逐条检查以下红线，命中即标记 [STOP]：
1. 收益承诺：「保本」「稳赚」「年化 X%」
2. 资金池：代客理财、集中收款再分配、拉人头返佣
3. 虚构资质：不存在的牌照、授权、合作方
4. 数据造假：无来源的精确数字、编造案例
5. 医疗/法律/税务断言：绝对化结论
6. 隐私：收集或展示他人身份信息

输出：风险清单（原文引用 → 风险类型 → 修改建议）。
原则：宁可保守。不确定的一律建议删除或加「不构成建议」。
```

---

## F · 协作与治理（28–30）

### 28 · meeting-minutes

**用途**：把会议录音转写/聊天记录变成可执行纪要。

```markdown
---
name: meeting-minutes
description: 整理会议纪要。当用户要求整理会议、出纪要时使用。
---

# 会议纪要

输出四段（≤ 半页）：
1. 决议：定了什么（每条一行，可执行）
2. 待办：事项 / 负责人 / 截止日
3. 未决：分歧点与各自的理由（如实记录，不和稀泥）
4. 下次会前必须准备的材料

规则：口头讨论的来龙去脉压缩为一行背景；谁承诺了什么就用谁的名字；
没有负责人的待办标 [UNASSIGNED] 并放最显眼位置。
```

### 29 · weekly-review

**用途**：OPC 每周复盘（配合手册模块 10）。

```markdown
---
name: weekly-review
description: 执行每周复盘流程。当用户要求复盘本周时使用。
---

# 每周复盘

依次回答，输出 ≤ 20 行：
1. 本周交付了什么？（对照上周计划，逐条打勾/说明）
2. 三个指标动了没有？（引 metrics-weekly 结论）
3. 哪件事该被 Agent 接管？（挑一件，写出交接步骤）
4. 哪件事应该停掉？（沉没成本警惕）
5. 下周唯一大事是什么？（一句话，可验收）

原则：复盘不解决情绪问题，只解决流程问题。
连续两周同一事项未完成 → 升级为「砍掉或外包」议题。
```

### 30 · dao-proposal

**用途**：起草标准化 DAO 提案（含 EACO 治理语境）。

```markdown
---
name: dao-proposal
description: 起草 DAO 治理提案。当用户要求写提案、发起投票时使用。
---

# DAO 提案

模板五段：
1. Summary：一句话说清要社区批准什么
2. Motivation：为什么现在做（问题 + 数据）
3. Specification：具体执行方案（谁/做什么/时间/预算与代币流向）
4. Risks：最坏情况 + 缓解措施
5. Vote：投票选项（For / Against / Abstain）+ 快照区块 + 投票期（≥ 7 天）

硬约束：
- 涉及 EACO 支出的，金额与「未分配储备 650M」科目挂钩，写明扣减后余量
- 必须包含免责声明：通过投票不改变「一切文明为人类文明服务」最高原则的适用
- 预算超过储备池单科目 5% 时，自动建议拆分为多期提案
```

---

## 安装与使用

```bash
# 1. 把 30 个技能落盘为目录结构（在仓库根目录执行）
node scripts/scaffold-skills.js

# 2. 校验
ls skills/   # 应看到 30 个目录，每个含 SKILL.md
```

```text
skills/
├── repo-init/SKILL.md
├── page-scaffold/SKILL.md
├── ...（共 30 个，slug 见总览表）
└── dao-proposal/SKILL.md
```

- **调用**：对 Agent 说触发词（见总览表最后一列），或直接说「用 city-score 评估里斯本」。
- **组合**：技能按 pipeline 串联，例如
  `topic-miner → article-draft → seo-meta → og-image-spec → social-calendar`。
- **更新**：改 SKILL.md 即生效，无需重启；提交时跑 `node scripts/check-links.js`。

## 闭环说明

```text
SKILLS.md（本文档，技能源）
   │  scaffold-skills.js 落盘
   ▼
skills/<slug>/SKILL.md（Agent 实际加载）
   │  日常触发执行
   ▼
产出（页面/数据/周报/提案）
   │  weekly-review 复盘
   ▼
回馈修订 SKILLS.md —— 下一版技能库
```

> 免责声明：技能 14/15/27/30 涉及评分、配额与合规判断，输出均为框架性建议，
> 不构成投资、法律或税务建议；最终决策请咨询专业人士并核实最新法规。
