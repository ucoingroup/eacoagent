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
