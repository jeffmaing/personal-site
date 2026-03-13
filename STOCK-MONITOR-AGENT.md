# 炒股监控告警 Agent

**版本**: 1.0  
**创建时间**: 2026-03-13 00:10  
**目标**: 实时监控持仓股票，推送重要告警

---

## 🎯 核心功能

### 1. 涨跌幅告警
```
阈值配置:
- 🟢 正常：±3% 以内
- 🟡 关注：±3-5%
- 🟠 告警：±5-8%
- 🔴 紧急：±8% 以上

推送方式：飞书即时消息
```

### 2. 成交量异常
```
检测逻辑:
- 当前成交量 > 5 日均量 * 3
- 当前成交量 > 昨日成交量 * 5

推送方式：飞书即时消息
```

### 3. 公告提醒
```
监控范围:
- 持仓公司公告
- 重大资产重组
- 业绩预告
- 股东增减持

推送方式：飞书即时消息 + 摘要
```

### 4. 技术指标信号
```
买入信号:
- MACD 金叉
- RSI 超卖 (<20)
- 突破 20 日均线

卖出信号:
- MACD 死叉
- RSI 超买 (>80)
- 跌破 20 日均线

推送方式：飞书即时消息 + 技术图解
```

### 5. 资金流向
```
监控项:
- 北向资金净流入
- 主力大单净流入
- 龙虎榜数据

推送方式：盘后汇总报告
```

---

## ⚙️ 技术实现

### 数据源
```javascript
// 新浪财经 API (免费实时)
https://hq.sinajs.cn/list=s_sh600105

// 东方财富 API (公告/新闻)
https://push2.eastmoney.com/api/qt/stock/get

// 爬虫抓取 (Crawlee)
- 公司公告
- 行业新闻
- 研报摘要
```

### 推送配置
```json
{
  "channel": "feishu",
  "to": "ou_33adadf512c52c8e91c530fc9fe72b30",
  "urgent_threshold": 5,  // 涨跌幅>5% 立即推送
  "normal_interval": 300  // 正常情况 5 分钟汇总一次
}
```

### 告警规则
```javascript
// 示例：涨跌幅告警
if (Math.abs(changePct) >= 5) {
  sendUrgentAlert({
    symbol: '600105',
    name: '永鼎股份',
    changePct: 5.2,
    price: 28.45,
    volume: 1000000
  });
}
```

---

## 📋 每日推送时间

### 盘前 (09:00)
```
- 隔夜外盘回顾
- 重要新闻汇总
- 今日关注事项
```

### 盘中 (实时)
```
- 涨跌幅>5% 立即推送
- 成交量异常立即推送
- 技术指标信号立即推送
```

### 盘后 (15:30)
```
- 当日盈亏汇总
- 资金流向统计
- 龙虎榜分析
- 明日策略建议
```

### 周末 (周六 10:00)
```
- 周度复盘报告
- 持仓股基本面更新
- 下周关注事项
```

---

## 🚀 创建步骤

### Step 1: 创建 Agent 目录
```bash
mkdir -p /Users/maming/.openclaw/agents/stock-monitor/agent
```

### Step 2: 创建配置文件
```json
{
  "id": "stock-monitor",
  "name": "炒股监控师",
  "workspace": "/Users/maming/.openclaw/workspace-stock",
  "agentDir": "/Users/maming/.openclaw/agents/stock-monitor/agent",
  "model": "bailian/qwen3.5-plus",
  "tools": ["exec", "web_search", "cron", "message"],
  "reportTo": "supervisor"
}
```

### Step 3: 创建监控脚本
```javascript
// 监控持仓股票
const holdings = ['600105', '600410', '600785', ...];

// 每 5 分钟检查一次
setInterval(() => {
  checkPriceChange(holdings);
  checkVolumeAnomaly(holdings);
  checkTechnicalSignals(holdings);
}, 300000);
```

### Step 4: 配置 Cron 任务
```json
{
  "name": "炒股监控 - 盘中实时",
  "schedule": {"everyMs": 300000},  // 5 分钟
  "payload": {"kind": "agentTurn", "message": "检查持仓股票"},
  "delivery": {"mode": "announce", "to": "ou_33adadf512c52c8e91c530fc9fe72b30"}
}
```

---

## 📊 预期效果

| 指标 | 当前 | 目标 | 提升 |
|------|------|------|------|
| 信息获取速度 | 手动刷新 | 自动推送 | +90% |
| 决策响应时间 | 分钟级 | 秒级 | +95% |
| 风险控制 | 事后发现 | 实时告警 | +80% |
| 复盘质量 | 主观回忆 | 数据记录 | +70% |

---

## ⚠️ 风险提示

1. **数据延迟**: 免费 API 可能有 1-2 分钟延迟
2. **技术风险**: 系统故障可能漏报
3. **合规风险**: 仅提供数据，不构成投资建议
4. **投资风险**: 股市有风险，决策需谨慎

---

**创建时间**: 2026-03-13 00:10  
**预计上线**: 2026-03-13 18:00 (Phase 1)
