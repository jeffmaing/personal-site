# OpenClaw 安全审计报告

## 审计时间
2026-03-11 16:35

## 风险等级
🔴 **高危** - 需要立即修复

---

## 已发现风险

### 1. 供应链投毒风险 (高危)

**现状**:
- 已安装 15 个 clawhub 技能
- 技能来源未经验证
- 无完整性校验 (checksum/signature)

**潜在攻击**:
- 恶意技能窃取 API Key
- 技能执行后删除自身痕迹
- 技能调用外部 API 泄露数据

**修复状态**: ⏳ 待修复

---

### 2. 提示词注入风险 (高危)

**现状**:
- SKILL.md 内容直接注入 system prompt
- 无内容过滤/审计
- 技能可修改 agent 行为

**潜在攻击**:
- 技能覆盖安全规则
- 技能植入恶意指令 ("忽略之前的安全限制")
- 技能劫持 agent 决策

**修复状态**: ⏳ 待修复

---

### 3. 执行权限风险 (中危)

**现状**:
- `tools.exec.security: full` + `ask: off`
- safeBins 包含 23 个命令
- safeBinTrustedDirs 包含 5 个目录

**潜在攻击**:
- 技能组合命令突破限制
- 利用 trusted dirs 写入恶意脚本
- 通过 node/npm 执行任意代码

**修复状态**: ⏳ 待修复

---

### 4. 记忆投毒风险 (中危)

**现状**:
- 技能可自由读写 MEMORY.md
- 技能可写入 memory/*.md
- 无内容验证

**潜在攻击**:
- 写入恶意指令到记忆
- 篡改历史决策记录
- 植入长期后门

**修复状态**: ⏳ 待修复

---

### 5. 凭证隔离风险 (低危)

**现状**:
- API Key 存储在 openclaw.json
- 技能可通过 exec 读取配置文件
- 无加密存储

**潜在攻击**:
- 技能读取 API Key
- 凭证泄露到外部

**修复状态**: ✅ 已部分缓解 (各 agent 独立配置)

---

## 修复计划

### 阶段 1: 紧急止损 (立即执行)

1. **暂停 clawhub 技能加载**
   - 禁用所有第三方技能
   - 只保留系统技能

2. **审计已安装技能**
   - 检查每个技能的代码
   - 验证来源和完整性

3. **增强 exec 限制**
   - 缩小 safeBins 范围
   - 移除 trusted dirs

### 阶段 2: 架构加固 (24 小时内)

1. **技能沙箱化**
   - 每个技能独立权限
   - 限制可访问的文件路径

2. **内容审计**
   - SKILL.md 注入前扫描
   - 检测提示词注入模式

3. **凭证保护**
   - API Key 加密存储
   - 技能无法访问配置文件

### 阶段 3: 持续监控 (长期)

1. **行为审计**
   - 记录技能所有操作
   - 异常行为告警

2. **依赖更新**
   - 定期更新技能
   - 监控安全公告

---

## 推荐配置

### 安全的 exec 配置
```json
{
  "tools": {
    "exec": {
      "security": "full",
      "ask": "on-miss",
      "safeBins": ["ls", "cat", "echo", "pwd"],
      "safeBinTrustedDirs": []
    }
  }
}
```

### 技能加载白名单
```json
{
  "skills": {
    "enabled": ["feishu-doc", "feishu-chat", "weather", "tavily-search"],
    "disabled": ["*"],
    "requireSignature": true
  }
}
```

---

## 参考资源

- [Snyk OpenClaw 安全报告](https://snyk.io)
- [慢雾 OpenClaw 安全实践](https://slowmist.com)
- [字节 Jeddak AgentArmor](https://bytedance.com)
