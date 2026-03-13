# Skills 集成指南

**更新时间**: 2026-03-11 23:26  
**状态**: 已安装 26 个 skills，全部集成到工作流

---

## 已安装 Skills 列表

### 核心技能（总控调度官专用）

| Skill | 用途 | 集成状态 |
|-------|------|---------|
| `agent-memory` | 持久化记忆存储 | ✅ 已集成 |
| `github` | GitHub 操作 | ✅ 已集成 |
| `nano-banana-pro` | 图像生成 | ✅ 已集成 |
| `summarize` | 内容摘要 | ✅ 已集成 |
| `weather` | 天气查询 | ✅ 已集成 |
| `image-downloader` | 图片下载 | ✅ 已集成 |
| `openai-image-gen` | OpenAI 图像生成 | ✅ 已集成 |

### 平台专用技能

| Skill | 用途 | 集成状态 |
|-------|------|---------|
| `xiaohongshu-title` | 小红书标题优化 | ✅ 已集成到 xiaohongshu agent |
| `xiaohongshu-format` | 小红书格式优化 | ✅ 已集成到 xiaohongshu agent |
| `image-search` | 图片搜索 | ✅ 已集成 |
| `multi-image-search` | 多图搜索 | ✅ 已集成 |
| `baidu-search` | 百度搜索 | ✅ 已集成 |

### 通信技能

| Skill | 用途 | 集成状态 |
|-------|------|---------|
| `discord` | Discord 集成 | ⚠️ 未配置 |
| `slack` | Slack 集成 | ⚠️ 未配置 |
| `bluebubbles` | iMessage 集成 | ⚠️ 未配置 |

### 生产力技能

| Skill | 用途 | 集成状态 |
|-------|------|---------|
| `notion` | Notion 集成 | ⚠️ 未配置 |
| `obsidian` | Obsidian 集成 | ⚠️ 未配置 |
| `trello` | Trello 集成 | ⚠️ 未配置 |
| `things-mac` | Things 任务管理 | ⚠️ 未配置 |
| `apple-reminders` | Apple 提醒事项 | ⚠️ 未配置 |

### 媒体技能

| Skill | 用途 | 集成状态 |
|-------|------|---------|
| `himalaya` | 播客客户端 | ⚠️ 未配置 |
| `sonoscli` | Sonos 音响控制 | ⚠️ 未配置 |
| `gifgrep` | GIF 搜索 | ⚠️ 未配置 |

### 开发技能

| Skill | 用途 | 集成状态 |
|-------|------|---------|
| `playwright-mcp` | 浏览器自动化 | ⚠️ 未配置 |
| `composio` | 工具集成平台 | ⚠️ 未配置 |
| `blogwatcher` | 博客监控 | ⚠️ 未配置 |
| `self-improving-agent` | 自我改进 agent | ⚠️ 未配置 |

---

## 集成方式

### 1. 自动加载（当前模式）

配置：`tools.profile: "full"` + `tools.allow: ["*"]`

所有 skills 自动对所有 agent 可用，无需额外配置。

**优点**: 简单，无需维护  
**缺点**: 所有 agent 都能看到所有技能

### 2. 按需加载（推荐优化）

为每个 agent 配置专用技能子集：

```json
// agents/supervisor/agent/tools.json
{
  "profile": "custom",
  "allow": [
    "agent-memory",
    "github",
    "feishu_*",
    "cron",
    "sessions_*"
  ]
}
```

---

## 使用示例

### agent-memory（新安装）

```python
# 会话开始时加载上下文
mem = AgentMemory()
facts = mem.recall("发布流程")
lessons = mem.get_lessons(context="小红书发布")

# 会话结束时记录
mem.learn(
    action="发布检查",
    context="2026-03-11 心跳",
    outcome="negative",
    insight="小红书 agent 需要人工确认才能发布"
)
```

### 在 HEARTBEAT.md 中集成

```markdown
## 记忆协议

每次心跳后：
1. 记录异常到 agent-memory
2. 检索相关历史问题
3. 更新实体状态（agent 存活/失败）
```

---

## 下一步优化

- [ ] 为每个 agent 配置专用 skill 子集
- [ ] 配置未启用的技能（Notion/Slack/Discord 等）
- [ ] 建立 skill 使用监控（哪些技能常用/从未使用）
- [ ] 定期清理未使用的技能

---

## 技能路径

- **全局技能**: `/Users/maming/.openclaw/workspace/skills/`
- **主工作区技能**: `/Users/maming/.openclaw/workspace-main/skills/`
- **Agent 专用技能**: `/Users/maming/.openclaw/agents/{agentId}/skills/`
