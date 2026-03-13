# skill-finder - 技能查找助手

## 功能

帮你快速找到需要的 OpenClaw 技能：
- 按功能描述搜索（"找一个能发邮件的技能"）
- 按分类列出技能
- 显示已安装/可安装状态
- 一键安装推荐技能

## 使用方式

### 1. 语义搜索
```
找一个能管理待办事项的技能
有什么技能可以读取 PDF 文件？
推荐几个和笔记相关的技能
```

### 2. 分类浏览
```
列出所有通讯类技能
显示已安装的技能
还有哪些技能可以安装？
```

### 3. 安装技能
```
帮我安装 apple-reminders 技能
安装所有和 GitHub 相关的技能
```

## 技能分类

### 📝 笔记类
- `obsidian` - Obsidian 笔记管理
- `bear-notes` - Bear 笔记
- `apple-notes` - Apple Notes
- `notion` - Notion API

### ✅ 任务管理
- `apple-reminders` - Apple Reminders
- `things-mac` - Things 3
- `trello` - Trello 看板

### 💬 通讯
- `bluebubbles` - iMessage
- `discord` - Discord
- `slack` - Slack
- `himalaya` - 邮件 (IMAP/SMTP)

### 📅 日历
- `goplaces` - 位置相关
- `camsnap` - 相机快照

### 🎵 媒体
- `spotify-player` - Spotify 播放
- `sonoscli` - Sonos 音响

### 🛠️ 开发
- `github` - GitHub 操作
- `gh-issues` - GitHub Issues 自动修复
- `coding-agent` - 代码生成

### 🔍 搜索
- `tavily-search` - AI 优化搜索
- `gifgrep` - GIF 搜索

### 📊 数据
- `nano-pdf` - PDF 分析
- `openai-whisper` - 语音转文字

### 🏥 健康
- `healthcheck` - 系统安全检查

## 安装新技能

```bash
# 搜索技能
clawhub search <关键词>

# 安装技能
clawhub install <技能名>

# 列出已安装
clawhub list

# 更新技能
clawhub update <技能名>
```

## 推荐技能组合

### 🎯 内容创作者
- `tavily-search` - 热点搜索
- `nano-banana-pro` - 图片生成
- `openai-whisper` - 语音输入
- `obsidian` - 内容管理

### 💼 职场效率
- `apple-reminders` - 任务管理
- `notion` - 文档协作
- `himalaya` - 邮件管理
- `slack` - 团队沟通

### 🎮 游戏玩家
- `gog` - GOG 游戏
- `discord` - 游戏语音
- `spotify-player` - 背景音乐

### 🏠 智能家居
- `sonoscli` - 音响控制
- `bluebubbles` - 家庭 iMessage
- `camsnap` - 家庭监控

## 技能开发

想创建自己的技能？参考：
```bash
# 查看技能模板
clawhub skill-template

# 创建技能目录
mkdir -p my-skill/{scripts,references}
```
