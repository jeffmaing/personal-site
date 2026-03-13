# 🤖 AI 动画全自动创建工作流

**版本**: 2.0 (自动化版)  
**创建时间**: 2026-03-13 08:10  
**状态**: 🔄 开发中

---

## 🎯 完整自动化流程

```
Step 1: 即梦生成画面 (自动)
   ↓ python3 jimeng-cli.py batch --prompts "提示词 1" "提示词 2"...
   
Step 2: 可灵生成动画 (自动)
   ↓ python3 kling-cli.py batch --input-dir ./images --output-dir ./videos
   
Step 3: 自动配音剪辑 (自动)
   ↓ python3 auto-edit.py spring-flower
   
Step 4: 发布 (可选自动)
   ↓ python3 publish.py --platform xiaohongshu
```

---

## 📋 使用指南

### 方式 1: 一键生成 (推荐)

```bash
cd /Users/maming/.openclaw/workspace-main

# 运行完整工作流
python3 agents/ai-animator/create.py spring-flower --auto
```

**输出**:
```
🎬 AI 动画创建 - spring-flower
====================================

📝 Step 0: 加载脚本...
  ✅ 脚本加载成功，6 个场景

🎨 Step 1: 生成画面 (自动)...
  正在生成场景 1/6...
  ✅ 场景 1 完成
  ...
  ✅ 6 个场景全部完成

🎬 Step 2: 生成动画 (自动)...
  正在生成动画 1/6...
  ✅ 动画 1 完成
  ...
  ✅ 6 个动画全部完成

🎙️ Step 3: 自动配音剪辑...
  ✅ 配音生成完成
  ✅ 视频合成完成

📱 Step 4: 发布...
  ✅ 发布成功

====================================
完成！视频：runtime/ai-animations/final-spring-flower.mp4
```

---

### 方式 2: 分步执行

#### Step 1: 生成画面

```bash
python3 agents/ai-animator/jimeng-cli.py batch \
  --prompts \
    "清晨阳光透过窗帘缝隙，洒在窗台的多肉植物上，一颗小芽慢慢探出头，治愈风格，温暖光线，柔和粉彩颜色，吉卜力风格" \
    "年轻女孩推开窗户，微风吹起窗帘，阳光洒在脸上，她深吸一口气，治愈风格，温暖晨光" \
    "窗台的花苞慢慢绽放，花瓣层层展开，露珠在阳光下闪烁，微距拍摄，治愈风格" \
    "花瓣随风飘落，落在书桌上摊开的书页上，女孩微笑着拿起书，治愈风格" \
    "女孩坐在窗边看书，阳光洒在身上，猫咪在旁边打盹，宁静午后，治愈风格" \
    "镜头拉远，整个房间沐浴在阳光中，窗外是蓝天白云，柔和阴影，治愈风格" \
  --output-dir runtime/ai-animations/images
```

#### Step 2: 生成动画

```bash
python3 agents/ai-animator/kling-cli.py batch \
  --input-dir runtime/ai-animations/images \
  --output-dir runtime/ai-animations/videos \
  --motions \
    "gentle sunlight moving, sprout growing slowly" \
    "curtain blowing, hair moving slightly" \
    "petals unfolding, dewdrops glistening" \
    "petals falling, pages turning" \
    "gentle breathing, cat sleeping" \
    "camera pull back, clouds moving"
```

#### Step 3: 自动剪辑

```bash
python3 agents/ai-animator/auto-edit.py spring-flower
```

---

## ⚙️ 配置选项

### 即梦 AI 配置

编辑 `agents/ai-animator/jimeng-config.json`:

```json
{
  "ratio": "16:9",
  "style": "治愈风格",
  "timeout": 60,
  "headless": false
}
```

### 可灵 AI 配置

编辑 `agents/ai-animator/kling-config.json`:

```json
{
  "duration": 5,
  "strength": 3,
  "timeout": 120,
  "headless": false
}
```

---

## ⚠️ 注意事项

### 1. 登录状态

**首次运行前**:
1. 手动打开即梦 AI: https://jimeng.jianying.com
2. 登录账号
3. 保持登录状态

**可灵 AI 同理**:
1. 打开 https://klingai.com
2. 登录账号

### 2. 浏览器

**已自动安装**: Chromium (Playwright 内置)

**如需手动安装**:
```bash
playwright install chromium
```

### 3. 免费额度

**即梦 AI**: 每日赠送免费积分  
**可灵 AI**: 新用户赠送免费积分

**查看额度**: 登录官网查看

---

## 🐛 故障排查

### 问题 1: 找不到输入框

**原因**: 页面结构变化  
**解决**: 
```bash
# 手动打开浏览器查看
python3 jimeng-cli.py generate --prompt "test" --output test.jpg
```

### 问题 2: 登录状态失效

**解决**:
1. 手动打开浏览器登录
2. 重新运行命令

### 问题 3: 生成超时

**解决**:
```bash
# 增加超时时间
python3 jimeng-cli.py generate --prompt "xxx" --output xxx.jpg --timeout 120
```

### 问题 4: 下载失败

**解决**:
```bash
# 检查输出目录权限
chmod 755 runtime/ai-animations
```

---

## 📊 预期效果

| 步骤 | 手动 | 自动 | 提升 |
|------|------|------|------|
| 生成画面 | 5 分钟 | 3 分钟 | -40% |
| 生成动画 | 5 分钟 | 3 分钟 | -40% |
| 配音剪辑 | 5 分钟 | 3 分钟 | -40% |
| **总计** | **15 分钟** | **9 分钟** | **-40%** |

---

## 🚀 下一步

**Phase 1 (今日)**:
- [x] 创建 jimeng-cli.py
- [x] 创建 kling-cli.py
- [ ] 测试即梦 AI 生成
- [ ] 测试可灵 AI 生成

**Phase 2 (明日)**:
- [ ] 集成完整工作流
- [ ] 错误处理优化
- [ ] 性能优化

**Phase 3 (本周)**:
- [ ] 自动发布功能
- [ ] 批量处理优化
- [ ] 日志记录

---

**老麻，工具已准备好，现在测试吗？** 🎯
