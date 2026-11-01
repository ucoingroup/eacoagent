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
