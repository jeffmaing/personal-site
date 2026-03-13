# 小红书技能包安装总结

## 已安装技能

### ✅ xiaohongshu-title (标题优化)
**安装位置**: `/Users/maming/.openclaw/workspace/skills/xiaohongshu-title/`

**功能**:
- 生成爆款标题（8 大分类）
- 情感钩子 + 算法优化
- CTR 最大化
- 符合广告法规范

**使用**:
```
为这篇笔记生成 5 个爆款标题
优化这个标题，增加点击率
```

**分类支持**:
1. 美妆护肤
2. 穿搭时尚
3. 减肥健身
4. 学习教育
5. 生活日常
6. 情感心理
7. 职场搞钱
8. 旅行出游

---

### ✅ xiaohongshu-format (排版工具)
**安装位置**: 
- 技能文档：`/Users/maming/.openclaw/workspace-main/skills/xiaohongshu-format/`
- 工具脚本：`/Users/maming/.openclaw/tools/xiaohongshu-format/`

**功能**:
- Markdown → 精美图片卡片
- 自动分页（避免截断）
- 4 种主题风格
- 3:4 竖图比例 (1080x1440px)
- 高质量 PNG 导出

**主题**:
| 主题 | 参数 | 适用 |
|------|------|------|
| 温暖柔和 | warm | 美妆、穿搭、生活 |
| 极简灰色 | minimal | 职场、知识、干货 |
| 渐变梦幻 | gradient | 情感、旅行、美食 |
| 商务深蓝 | business | 财经、科技、职场 |

**使用**:
```bash
# 排版文件
python3 /Users/maming/.openclaw/tools/xiaohongshu-format/format-xhs.py \
  --input "article.md" \
  --theme warm \
  --output "output/"

# 自然语言
把这段文字排版成小红书风格
用温暖主题排版这篇文章
自动分页，分成 5 张卡片
```

---

## 完整工作流

### 小红书内容生产流程

```
1. 选题确定
   ↓
2. xiaohongshu-title → 生成 5 个爆款标题
   ↓
3. 撰写内容
   ↓
4. xiaohongshu-format → 排版成精美卡片
   ↓
5. 发布到小红书
   ↓
6. 跟踪数据表现
```

### 示例命令

```bash
# 步骤 1: 生成标题
# (通过 OpenClaw 自然语言调用)
"为"职场人选车建议"生成 5 个小红书爆款标题"

# 步骤 2: 排版内容
python3 /Users/maming/.openclaw/tools/xiaohongshu-format/format-xhs.py \
  --input "职场人选车建议.md" \
  --theme minimal \
  --output "output/"

# 输出:
# ✅ output/xhs-card-01.png
# ✅ output/xhs-card-02.png
# ✅ output/xhs-card-03.png
```

---

## 依赖检查

### xiaohongshu-title
- ✅ 无需额外依赖
- ✅ Python 脚本验证器

### xiaohongshu-format
- ✅ Pillow (图片处理)
- ✅ markdown (Markdown 解析)
- ✅ 中文字体 (PingFang/文泉驿)

**安装命令**:
```bash
pip3 install Pillow markdown --break-system-packages
```

---

## 文件结构

```
/Users/maming/.openclaw/
├── workspace/skills/
│   └── xiaohongshu-title/
│       ├── SKILL.md
│       ├── examples.md
│       ├── references.md
│       └── validator.py
│
├── workspace-main/skills/
│   └── xiaohongshu-format/
│       └── SKILL.md
│
└── tools/xiaohongshu-format/
    ├── format-xhs.py        # 主脚本
    ├── README.md            # 使用文档
    ├── test.md              # 测试文件
    └── output/              # 输出目录
        └── xhs-card-01.png  # 生成的卡片
```

---

## 最佳实践

### 标题优化
- ✅ 使用 8 大分类匹配
- ✅ 包含情感钩子
- ✅ 添加 emoji (2-4 个)
- ✅ 控制长度 < 20 字
- ❌ 避免 AI 腔调

### 排版优化
- ✅ 每页 200-300 字
- ✅ 段落清晰，留白充足
- ✅ 每页 5-10 个 emoji
- ✅ 关键信息加粗
- ✅ 结尾引导互动
- ❌ 大段文字堆砌
- ❌ 颜色超过 3 种

---

## 测试验证

### 标题技能测试
```
为"新能源汽车选购指南"生成 5 个标题
```

**预期输出**:
1. 🔥 2026 买电车必看！这 5 个坑别踩
2. 💰 预算 20 万，新能源这样选最值
3. ⚡ 试驾 10 款电车后，我只推荐这 3 款
4. 🚗 首台电车选购，血泪经验总结
5. 💡 内行人告诉你：电车真相

### 排版技能测试
```bash
python3 /Users/maming/.openclaw/tools/xiaohongshu-format/format-xhs.py \
  --test
```

**预期输出**:
```
🎨 开始排版 - 主题：温暖柔和
📄 自动分页：1 页
✅ 已保存：output/xhs-card-01.png
✅ 排版完成！共 1 张卡片
```

---

## 下一步

### 可选增强
1. **更多主题** - 添加用户自定义主题
2. **模板系统** - 预设排版模板
3. **emoji 优化** - 智能 emoji 推荐
4. **批量处理** - 一次排版多篇文章

### 集成计划
- [ ] 与 xiaohongshu-mcp 集成
- [ ] 自动发布流程
- [ ] 数据反馈优化

---

**安装完成时间**: 2026-03-11 19:45  
**状态**: ✅ 可用
