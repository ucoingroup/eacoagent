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
