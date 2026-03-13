# OpenClaw 安全加固配置

## 加固时间
2026-03-11 16:40

## 威胁模型
参考：字节安全团队 Jeddak AgentArmor + Snyk OpenClaw 安全报告

---

## 已实施防御

### 第一层：执行权限控制 ✅

**配置位置**: `openclaw.json` → `tools.exec`

```json
{
  "tools": {
    "exec": {
      "security": "full",
      "ask": "on-miss",
      "safeBins": ["ls", "cat", "echo", "pwd", "head", "tail"],
      "safeBinTrustedDirs": []
    }
  }
}
```

**防护效果**:
- ✅ 阻止任意命令执行
- ✅ 敏感操作需要人工审批
- ✅ 移除了可信目录（防止路径遍历）

---

### 第二层：技能加载控制 ✅

**工具**: `/Users/maming/.openclaw/tools/skill-loader/skill-loader.js`

**白名单技能** (14 个):
- feishu-doc, feishu-chat, feishu-drive, feishu-wiki
- apple-reminders, blogwatcher, github, obsidian
- openai-whisper, spotify-player, tavily-search, weather
- video-frames, tmux, nano-pdf, canvas, gemini

**黑名单技能** (4 个):
- openai-whisper-api (危险函数)
- clawhub (供应链风险)
- coding-agent (代码执行)
- skill-creator (提示词注入)

**防护效果**:
- ✅ 阻止恶意技能加载
- ✅ 检测提示词注入
- ✅ 检测危险函数

---

### 第三层：审计日志 ✅

**工具**: `/Users/maming/.openclaw/tools/skill-auditor/audit-skills.sh`

**功能**:
- 扫描所有技能的 SKILL.md
- 检测提示词注入模式
- 检测脚本危险函数
- 生成审计报告

**审计频率**: 每次安装新技能前

---

### 第四层：心跳监控 ✅

**配置**: `HEARTBEAT.md`

**监控项**:
- exec 审批队列
- cron 执行状态
- 后台服务状态
- 技能加载日志

---

## 待实施防御

### 第五层：凭证加密 ⏳

**目标**: 加密存储 API Key

**方案**:
```bash
# 使用 macOS Keychain
security add-generic-password -s openclaw -a tavily -w <API_KEY>
```

**配置修改**:
```json
{
  "env": {
    "TAVILY_API_KEY": "keychain:tavily",
    "GEMINI_API_KEY": "keychain:gemini"
  }
}
```

---

### 第六层：网络隔离 ⏳

**目标**: 限制技能网络访问

**方案**:
- 配置防火墙规则
- 限制出站连接
- 审计网络请求

---

### 第七层：行为分析 ⏳

**目标**: 检测异常行为

**方案**:
- 记录所有工具调用
- 机器学习异常检测
- 自动阻断可疑操作

---

## 应急响应

### 发现可疑行为

1. **立即停止**
   ```bash
   openclaw gateway stop
   ```

2. **查看日志**
   ```bash
   openclaw logs --follow
   ```

3. **审计技能**
   ```bash
   bash /Users/maming/.openclaw/tools/skill-auditor/audit-skills.sh
   ```

4. **恢复安全配置**
   ```bash
   # 重置为最小权限
   # 编辑 openclaw.json
   ```

---

## 安全更新流程

### 安装新技能

1. **审计**
   ```bash
   node /Users/maming/.openclaw/tools/skill-loader/skill-loader.js <技能路径>
   ```

2. **人工审核**
   - 检查 SKILL.md
   - 检查 scripts/
   - 验证来源

3. **加入白名单**
   - 编辑 `skills/WHITELIST.md`
   - 提交 git commit

4. **测试**
   - 隔离环境测试
   - 验证功能正常

---

## 参考资源

- [字节 Jeddak AgentArmor](https://bytedance.com/security/agent-armor)
- [Snyk OpenClaw 报告](https://snyk.io/research/openclaw-security)
- [慢雾安全实践](https://slowmist.com/security-best-practices)
- [OWASP AI Security](https://owasp.org/www-project-ai-security)

---

## 更新日志

| 日期 | 变更 | 影响 |
|------|------|------|
| 2026-03-11 16:35 | 收紧 exec 权限 | 自动化需要审批 |
| 2026-03-11 16:38 | 创建技能白名单 | 限制技能加载 |
| 2026-03-11 16:40 | 创建审计工具 | 可检测恶意技能 |
| 2026-03-11 16:42 | 更新心跳监控 | 增加安全检查 |
