# eacoagent

eaco agent

Chinese-Friendly-Web3.html
https://ucoingroup.github.io/eacoagent/Chinese-Friendly-Web3.html

eacoagent-opc2026.html
https://ucoingroup.github.io/eacoagent/eacoagent-opc2026.html

Earth_Compendium.html
https://ucoingroup.github.io/eacoagent/Earth_Compendium.html

# EACO Agent · Earth's Best Agent

> 一个智能体，三个入口，一颗更好的地球。
> 纯静态、零依赖、可直接部署到 GitHub Pages 的资料站。

[![Pages](https://img.shields.io/badge/GitHub%20Pages-online-2f8f43)](https://ucoingroup.github.io/eacoagent/)
[![License](https://img.shields.io/badge/license-MIT-2f6fe4)](LICENSE)
[![Dependencies](https://img.shields.io/badge/dependencies-0-b98a3c)]()

---

## 这是什么

`eacoagent` 是 EACO 生态的**入口站**，把三件原本分散的事收进一个仓库：

| 页面 | 内容 | 适合谁 |
|---|---|---|
| [华人友好 Web3](https://ucoingroup.github.io/eacoagent/Chinese-Friendly-Web3.html) | 全球 20 个华语华人友好国家/城市，三维评分 + EACO 二十城配额 + 虚拟/模拟地球 | 正在考虑迁居、跨境生活、寻找落脚点的人 |
| [一人公司 OPC 2026](https://ucoingroup.github.io/eacoagent/eacoagent-opc2026.html) | 一个人 + 一个 Agent = 一家公司：十大模块、90 天路径、成本表、合规红线 | 独立开发者、自由职业者、想低成本创业的人 |
| [地球纲要](https://ucoingroup.github.io/eacoagent/Earth_Compendium.html) | 四卷结构：五个账本 → EACO 四要素 → 数字镜像 → 星际六级台阶 | 关心文明长期演化、需要框架感的人 |

首页 [`index.html`](index.html) 是统一入口，包含导航、三张页面卡片、EACO 核心数据与全部生态外链。

---

## 页面特性

- **纯静态**：HTML + CSS + 原生 JS，无框架、无构建、无 CDN，克隆即可打开。
- **中文优先、英文并置**：城市指南支持中/英整页切换；OPC 与纲要采用中英双语标题。
- **三套主题**：城市指南内置苹果绿 / 科技蓝 / 米黄古典，切换即时生效。
- **可交互**：城市表支持排序与维度筛选；配额表自动汇总；合约地址一键复制。
- **可打印 / 可归档**：每个页面自包含，适合导出 PDF 或离线分发。
- **SEO 完备**：canonical、OG、Twitter Card、JSON-LD、`sitemap.xml`、`robots.txt`。

---

## 仓库结构

```
eacoagent/
├── index.html                     # 入口页（导航 + 三张卡片 + 生态链接）
├── Chinese-Friendly-Web3.html     # 华人友好 Web3 · 20 城 + EACO
├── eacoagent-opc2026.html         # 一人公司 OPC 2026 操作手册
├── Earth_Compendium.html          # 地球纲要（四卷）
├── 404.html                       # 自定义 404
├── assets/
│   ├── site.css                   # 共享设计系统（配色/卡片/表格/页脚）
│   └── favicon.svg                # 站点图标
├── scripts/
│   └── check-links.js             # 内部链接自检脚本（无依赖）
├── .github/workflows/
│   └── quality.yml                # 推送时自动跑链接检查
├── sitemap.xml
├── robots.txt
├── manifest.webmanifest
├── .nojekyll                      # 关闭 Jekyll，保证静态文件原样发布
├── LICENSE                        # MIT
└── README.md
```

---

## 本地预览

```bash
git clone https://github.com/ucoingroup/eacoagent.git
cd eacoagent
python -m http.server 8000     # 或 npx serve
# 打开 http://localhost:8000
```

不启服务器也可以：直接双击 `index.html`（仅 `fetch` 类功能不可用，本仓库未使用）。

## 部署到 GitHub Pages

1. 仓库 **Settings → Pages**
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 选 `main`，目录选 `/ (root)`
4. 保存，约 1 分钟后访问 `https://ucoingroup.github.io/eacoagent/`

> 若绑定自定义域名，请在根目录添加 `CNAME` 文件，并把 `sitemap.xml`、`canonical` 中的域名同步替换。

---

## 质量检查

```bash
node scripts/check-links.js
```

脚本会扫描所有 HTML 的 `href`，校验：

- 内部页面与静态资源是否存在
- 是否存在空链接、`javascript:` 误用
- `sitemap.xml` 是否覆盖全部页面

CI 在每次 push 时自动执行（见 `.github/workflows/quality.yml`）。

---

## 设计约定

| 项目 | 取值 |
|---|---|
| 主色 | 绿 `#2f8f43` → 蓝 `#2f6fe4`（渐变） |
| 强调 | 沙金 `#b98a3c` |
| 背景 | 浅绿白 `#f6faf5` |
| 字体 | 系统字体栈（PingFang SC / Microsoft YaHei / Segoe UI） |
| 圆角 | 16px（卡片）/ 999px（按钮） |
| 断点 | 640px |

新增页面只需 `<link rel="stylesheet" href="assets/site.css">`，即可继承全部样式。

---

## 待完善清单（Roadmap）

已完成的放在 ✅，未完成的欢迎 PR：

- ✅ 统一入口页与导航
- ✅ 三个内容页 + 404 页
- ✅ 共享设计系统与图标
- ✅ sitemap / robots / manifest / .nojekyll
- ✅ 内部链接自检脚本 + CI
- ✅ SEO：canonical、OG、JSON-LD
- ⬜ **OG 分享图**：建议补一张 1200×630 的 PNG，替换各页 `og:image`
- ⬜ **完整英文版**：OPC 与纲要目前为双语标题，可扩为整页英文
- ⬜ **站内搜索**：可用纯前端 `index.json + 高亮`，无需服务端
- ⬜ **RSS / Atom**：便于聚合与分发
- ⬜ **打印样式**：`@media print` 优化 PDF 导出
- ⬜ **可访问性**：补充 `aria-label`、键盘焦点样式、对比度审计
- ⬜ **数据外置**：把城市与配额数据抽成 `data/*.json`，供其他项目复用
- ⬜ **版本页**：保留 2025 / 2026 两版内容，做时间轴对比

---

## 参与贡献

1. Fork 本仓库
2. 新建分支：`git checkout -b feat/your-topic`
3. 提交：`git commit -m "feat: 说明改了什么"`
4. 推送并开 PR，描述里写清「改了什么 / 为什么 / 如何验证」

内容类修订（城市评分、政策更新、链接失效）请附来源链接。

---

## 免责声明

本仓库内容为公开资料整理与观点表达，**不构成投资建议、证券发行或任何募资承诺**。
加密资产价格波动剧烈，参与任何交易前请自行核实合约地址与当地合规要求。
城市评分、配额方案均为主观评估框架，签证、税务与监管政策变动频繁，落地前请核实最新法规。

**最高原则**：一切文明为人类文明服务，包括 EACO。

---

## License

[MIT](LICENSE) © 2026 ucoingroup

