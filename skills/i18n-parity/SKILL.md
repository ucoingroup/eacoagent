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
