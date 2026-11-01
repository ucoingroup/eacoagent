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
