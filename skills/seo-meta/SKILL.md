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
