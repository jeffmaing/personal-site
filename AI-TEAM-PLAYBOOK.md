# AI 团队实战手册

**版本**: 2.0  
**更新时间**: 2026-03-13  
**适用对象**: 老麻的 AI 团队成员

---

## 🎛️ 快速开始

### 统一调用入口
```bash
cd ~/.openclaw/skills
node agent-hub.js [agent] [action] [args...]
```

---

## 📋 工作流

### 场景 1: 日常内容创作

```
1. 热点抓取 (Crawlee)
   → node agent-hub.js crawlee hot xiaohongshu

2. 标题优化 (标题优化师)
   → node agent-hub.js title "新能源汽车选购"

3. 内容审核 (质量审核师)
   → node agent-hub.js quality "文章内容..."

4. 封面设计 (封面设计师)
   → node agent-hub.js cover "新能源汽车" xiaohongshu

5. 发布后追踪 (效果优化师)
   → node agent-hub.js performance [URL] 24
```

---

### 场景 2: 竞品分析

```
1. 竞品监控 (竞品监控师)
   → node agent-hub.js competitor daily

2. 数据对比 (数据分析师)
   → node agent-hub.js data weekly xiaohongshu

3. 策略调整 (根据报告优化)
```

---

### 场景 3: 数据复盘

```
1. 日报生成 (数据分析师)
   → node agent-hub.js data daily

2. 效果分析 (效果优化师)
   → node agent-hub.js performance [URL] 24

3. 优化建议 (综合各报告)
```

---

## 👥 Agent 能力矩阵

| Agent | 核心能力 | 调用命令 | 输出 |
|-------|----------|----------|------|
| **标题优化师** | 生成 5 个标题版本 | `title "主题"` | 标题列表 + 推荐 |
| **质量审核师** | 敏感词检测 | `quality "内容"` | 风险评级 + 问题列表 |
| **Crawlee 抓取师** | 热榜/竞品抓取 | `crawlee hot xiaohongshu` | 热榜数据 |
| **数据分析师** | 日报/周报/月报 | `data daily` | 数据报表 |
| **竞品监控师** | 竞品追踪 | `competitor daily` | 竞品分析 |
| **效果优化师** | 发布效果分析 | `performance [URL] 24` | 效果报告 |
| **封面设计师** | 封面设计方案 | `cover "主题"` | 设计方案 + AI 提示词 |

---

## 🔧 配置说明

### Cookie 配置
文件：`~/.openclaw/tools/crawlee-skill/cookies.json`
```json
{
  "xiaohongshu": { "session_id": "...", "x-s": "..." },
  "toutiao": { "tt_scid": "...", "csrf_token": "..." }
}
```
**说明**: Cookie 已自动从浏览器获取，无需手动配置

### 敏感词库
文件：`~/.openclaw/skills/quality-auditor/sensitive-words.json`
- 6 大分类：广告法/引流词/医疗/政治/金融/虚假宣传
- 平台特定词库：小红书/头条
- 自动更新机制：待实现

### Crawlee 选择器
文件：`~/.openclaw/tools/crawlee-skill/selectors.json`
- 多套选择器备选
- 优先级自动切换
- 支持动态扩展

---

## 📊 数据指标

### 内容创作
| 指标 | 目标值 | 当前值 |
|------|--------|--------|
| 标题 CTR | >15% | 12% |
| 互动率 | >5% | 3.5% |
| 发布频率 | 2 篇/天 | 2 篇/天 |

### 竞品监控
| 指标 | 说明 |
|------|------|
| 监控账号数 | 1+ (可扩展) |
| 更新频率 | 每日 |
| 数据维度 | 粉丝/互动/爆款 |

### 数据复盘
| 报表类型 | 生成时间 | 内容 |
|----------|----------|------|
| 日报 | 每日 08:10 | 昨日数据 + 建议 |
| 周报 | 每周一 09:00 | 周趋势 + 策略 |
| 月报 | 每月 1 日 10:00 | 月度总结 + 规划 |

---

## 🚨 异常处理

### 常见问题

**Q1: Crawlee 抓取失败**
- 检查 Cookie 是否过期
- 尝试刷新选择器优先级
- 查看 `storage/` 目录日志

**Q2: 质量审核误判**
- 检查敏感词库是否准确
- 手动调整词库权重
- 添加白名单词汇

**Q3: Agent 无响应**
- 检查 Node.js 版本 (v22+)
- 确认依赖已安装 (`npm install`)
- 查看错误日志

---

## 📈 进阶用法

### 批量处理
```bash
# 批量生成标题
for topic in "选题 1" "选题 2" "选题 3"; do
  node agent-hub.js title "$topic"
done

# 批量审核内容
for file in drafts/*.txt; do
  node agent-hub.js quality "$(cat $file)"
done
```

### 定时任务
```bash
# 添加到 crontab
0 8 * * * node ~/.openclaw/skills/agent-hub.js data daily
0 9 * * 1 node ~/.openclaw/skills/agent-hub.js competitor weekly
```

### 数据导出
```bash
# 导出日报数据
node agent-hub.js data daily | jq '.' > daily-report.json

# 导出竞品分析
node agent-hub.js competitor daily | jq '.' > competitor-report.json
```

---

## 🎯 最佳实践

### 标题优化
- ✅ 使用数字式标题（数据最佳）
- ✅ 结合热点词汇
- ❌ 避免标题党（会被平台限流）

### 内容审核
- ✅ 发布前必审
- ✅ 重点关注引流词
- ❌ 不要依赖 100% 准确（需人工复核）

### 竞品分析
- ✅ 每日监控核心竞品
- ✅ 学习爆款结构
- ❌ 不要直接抄袭

### 数据复盘
- ✅ 关注趋势而非单点
- ✅ 记录异常数据
- ❌ 不要过度解读短期波动

---

## 📚 文档索引

| 文档 | 说明 |
|------|------|
| `AI-TEAM-2.0.md` | 完整架构设计 |
| `PHASE3-OPTIMIZATION.md` | Phase 3 优化计划 |
| `memory/2026-03-13.md` | 今日工作日志 |
| `skills/*/SKILL.md` | 各 Agent 详细说明 |

---

**最后更新**: 2026-03-13 17:30  
**维护者**: 总控调度官
