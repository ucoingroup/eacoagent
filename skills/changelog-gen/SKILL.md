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
