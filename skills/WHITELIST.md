# 技能安全白名单配置

## 审计时间
2026-03-11 16:38

---

## 已禁用技能 (高危)

```json
{
  "disabled": [
    "openai-whisper-api"  // 使用 curl，可能泄露数据
  ]
}
```

---

## 已验证安全技能 (白名单)

以下技能已人工审计，可以安全使用：

### 核心技能 (必须)
- ✅ `feishu-doc` - 飞书文档
- ✅ `feishu-chat` - 飞书聊天
- ✅ `feishu-drive` - 飞书云盘
- ✅ `feishu-wiki` - 飞书知识库
- ✅ `feishu-bitable` - 飞书多维表格

### 系统技能 (安全)
- ✅ `apple-reminders` - Apple 提醒事项
- ✅ `blogwatcher` - 博客监控
- ✅ `blucli` - BlueBubbles CLI
- ✅ `bluebubbles` - iMessage
- ✅ `camsnap` - 相机快照
- ✅ `canvas` - Canvas 渲染
- ✅ `eightctl` - Eight 睡眠仪
- ✅ `gemini` - Gemini CLI
- ✅ `github` - GitHub 操作
- ✅ `imsg` - iMessage
- ✅ `nano-pdf` - PDF 分析
- ✅ `obsidian` - Obsidian 笔记
- ✅ `openai-whisper` - 本地语音转文字
- ✅ `openhue` - Hue 灯光
- ✅ `songsee` - 歌曲搜索
- ✅ `spotify-player` - Spotify 播放
- ✅ `tmux` - Tmux 控制
- ✅ `video-frames` - 视频帧提取
- ✅ `weather` - 天气查询

### 条件使用技能 (需要配置)
- ⚠️ `notion` - 需要 Notion API Key
- ⚠️ `slack` - 需要 Slack Token
- ⚠️ `trello` - 需要 Trello API Key
- ⚠️ `himalaya` - 需要邮件账号
- ⚠️ `things-mac` - 需要 Things 3
- ⚠️ `discord` - 需要 Discord Bot Token
- ⚠️ `gh-issues` - 需要 GitHub Token
- ⚠️ `nano-banana-pro` - 需要 Gemini API Key
- ⚠️ `sag` - 需要 ElevenLabs API Key

### 暂停使用技能 (待审计)
- ⏸️ `1password` - 密码管理器（敏感）
- ⏸️ `clawhub` - 技能市场（供应链风险）
- ⏸️ `coding-agent` - 代码生成（可能执行代码）
- ⏸️ `gog` - GOG 游戏（不必要）
- ⏸️ `goplaces` - 位置服务（隐私）
- ⏸️ `healthcheck` - 系统检查（敏感权限）
- ⏸️ `mcporter` - MCP 端口（网络访问）
- ⏸️ `model-usage` - 模型使用统计
- ⏸️ `openai-image-gen` - 图片生成（API 调用）
- ⏸️ `oracle` - 神谕技能（不确定用途）
- ⏸️ `ordercli` - 订单 CLI（敏感数据）
- ⏸️ `peekaboo` - 隐藏技能（不确定用途）
- ⏸️ `session-logs` - 会话日志（隐私）
- ⏸️ `sherpa-onnx-tts` - TTS（API 调用）
- ⏸️ `skill-creator` - 技能创建（可能注入）
- ⏸️ `sonoscli` - Sonos 音响（本地网络）
- ⏸️ `summarize` - 摘要生成（外部 API）
- ⏸️ `voice-call` - 语音通话（敏感）
- ⏸️ `wacli` - WhatsApp CLI（敏感）
- ⏸️ `xurl` - URL 处理（网络访问）

---

## 配置建议

### 生产环境配置
```json
{
  "skills": {
    "whitelist": [
      "feishu-doc",
      "feishu-chat",
      "feishu-drive",
      "feishu-wiki",
      "apple-reminders",
      "blogwatcher",
      "github",
      "obsidian",
      "openai-whisper",
      "spotify-player",
      "tavily-search",
      "weather",
      "video-frames"
    ],
    "requireApproval": [
      "notion",
      "slack",
      "trello",
      "himalaya",
      "things-mac",
      "discord",
      "gh-issues"
    ],
    "blocked": [
      "openai-whisper-api",
      "clawhub",
      "coding-agent",
      "skill-creator"
    ]
  }
}
```

---

## 审计检查清单

安装新技能前检查：

- [ ] 技能来源可信（官方/知名作者）
- [ ] SKILL.md 无提示词注入模式
- [ ] 脚本无危险函数（eval, exec, curl 等）
- [ ] 权限最小化（只申请需要的权限）
- [ ] 有明确的功能说明和使用场景
- [ ] 无外部 API 调用或已说明
- [ ] 无文件系统写操作或已说明

---

## 更新日志

- 2026-03-11: 初始审计完成，禁用 1 个高危技能
