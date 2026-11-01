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
