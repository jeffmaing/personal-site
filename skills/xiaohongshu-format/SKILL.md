# xiaohongshu-format - 小红书排版技能

## 功能

将 Markdown/文本转换为小红书风格的精美图片卡片：
- 自动分页（避免段落截断）
- 多种主题风格
- 3:4 竖图比例（1080x1440px）
- 支持 emoji 和特殊格式
- 导出高质量 PNG/JPEG

## 使用方式

### 自然语言
```
把这段文字排版成小红书风格：
[内容]

用"温暖柔和"主题排版这段内容
用"极简灰色"主题排版
把这篇文章分成 5 张卡片
```

### 脚本调用
```bash
python3 /Users/maming/.openclaw/tools/xiaohongshu-format/format-xhs.py \
  --input "content.md" \
  --theme warm \
  --output "output/"
```

### 参数选项
```bash
# 选择主题
--theme warm|minimal|gradient|business

# 指定输出
--output "./output/"

# 禁用分页
--no-paginate
```

## 输出规格

### 推荐尺寸
| 类型 | 尺寸 | 比例 | 用途 |
|------|------|------|------|
| 竖图 | 1080x1440px | 3:4 | 主推荐 |
| 方图 | 1080x1080px | 1:1 | 备选 |
| 横图 | 1440x1080px | 4:3 | 封面 |

### 文字限制
- 标题：< 20 字（避免截断）
- 正文：每页 200-300 字
- emoji：每页 5-10 个

## 主题风格

### 1. 温暖柔和 🌸
- 背景：淡粉色/米色渐变
- 字体：圆体/手写体
- 适合：美妆、穿搭、生活

### 2. 极简灰色 ⚪
- 背景：纯白/浅灰
- 字体：黑体
- 适合：职场、知识、干货

### 3. 渐变梦幻 🌈
- 背景：多彩渐变
- 字体：细体
- 适合：情感、旅行、美食

### 4. 商务深蓝 💼
- 背景：深蓝渐变
- 字体：思源黑体
- 适合：财经、职场、科技

## 排版原则

### ✅ 要做
- 段落清晰，留白充足
- 标题醒目，层次分明
- emoji 点缀，增加趣味
- 关键信息加粗/高亮
- 结尾引导互动（点赞/收藏/评论）

### ❌ 不做
- 大段文字堆砌
- 字体过小看不清
- 颜色超过 3 种
- 没有留白
- AI 痕迹明显

## 示例命令

```bash
# 使用脚本排版
python3 scripts/format-xhs.py \
  --input "content.md" \
  --theme "warm" \
  --size "1080x1440" \
  --output "output/"

# 多页排版
python3 scripts/format-xhs.py \
  --input "long-article.md" \
  --auto-paginate \
  --max-pages 9
```

## 与标题技能配合

**推荐工作流**：
1. `xiaohongshu-title` → 生成爆款标题
2. `xiaohongshu-format` → 排版正文内容
3. 发布到小红书

## 技术实现

基于 RedBookCards 项目：
- Markdown 解析
- 自动分页算法
- 主题渲染引擎
- 高质量图片导出

## 注意事项

- 中文字体需要系统支持
- 导出前预览确认
- 检查文字是否截断
- 确保 emoji 显示正常
