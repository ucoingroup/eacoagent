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
