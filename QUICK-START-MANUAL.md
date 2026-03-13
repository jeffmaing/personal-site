# 🚀 AI 动画半自动快速指南

**版本**: 精简版  
**耗时**: 15 分钟  
**人工操作**: 4 次点击

---

## 📋 快速步骤

```
Step 1: 即梦生成 6 个场景 (5 分钟) ← 现在做
   ↓
Step 2: 可灵生成 6 个动画 (5 分钟)
   ↓
Step 3: 自动配音剪辑 (3 分钟) ← Agent 自动
   ↓
Step 4: 发布 (2 分钟)
```

---

## 🎨 Step 1: 即梦 AI (5 分钟)

### 1.1 打开即梦

**网址**: https://jimeng.jianying.com

**操作**:
1. 打开浏览器
2. 访问网址
3. 登录账号 (抖音/头条)

### 1.2 生成 6 个场景

**每个场景** (重复 6 次):

```
1. 点击"AI 绘画"
2. 粘贴提示词 (见下方)
3. 选择 16:9 比例
4. 点击"生成"
5. 等待 30 秒
6. 下载为 scene-01.jpg, scene-02.jpg...
```

### 1.3 提示词 (直接复制)

**场景 1**:
```
清晨阳光透过窗帘缝隙，洒在窗台的多肉植物上，一颗小芽慢慢探出头，治愈风格，温暖光线，柔和粉彩颜色，吉卜力风格，3D 渲染
```

**场景 2**:
```
年轻女孩推开窗户，微风吹起窗帘，阳光洒在脸上，她深吸一口气，治愈风格，温暖晨光，柔和颜色，吉卜力风格，3D 渲染
```

**场景 3**:
```
窗台的花苞慢慢绽放，花瓣层层展开，露珠在阳光下闪烁，微距拍摄，治愈风格，温暖光线，柔和粉彩颜色，吉卜力风格，3D 渲染
```

**场景 4**:
```
花瓣随风飘落，落在书桌上摊开的书页上，女孩微笑着拿起书，治愈风格，温暖室内光线，柔和颜色，舒适氛围，吉卜力风格
```

**场景 5**:
```
女孩坐在窗边看书，阳光洒在身上，猫咪在旁边打盹，宁静午后，治愈风格，温暖光线，柔和粉彩颜色，舒适房间，吉卜力风格，3D 渲染
```

**场景 6**:
```
镜头拉远，整个房间沐浴在阳光中，窗外是蓝天白云，柔和阴影，治愈风格，温暖黄金时段光线，宁静氛围，吉卜力风格，3D 渲染，电影构图
```

### 1.4 保存位置

```
创建文件夹：spring-flower/
├── scene-01.jpg
├── scene-02.jpg
├── scene-03.jpg
├── scene-04.jpg
├── scene-05.jpg
└── scene-06.jpg
```

**完成后告诉我**: "即梦完成"

---

## 🎬 Step 2: 可灵 AI (5 分钟)

### 2.1 打开可灵

**网址**: https://klingai.com

**操作**:
1. 访问网址
2. 登录账号

### 2.2 生成 6 个动画

**每个动画** (重复 6 次):

```
1. 点击"图片生成视频"
2. 上传 scene-XX.jpg
3. 粘贴运动描述 (见下方)
4. Motion: 3
5. Duration: 5 秒
6. 点击"生成"
7. 下载为 video-01.mp4...
```

### 2.3 运动描述 (直接复制)

**场景 1**: `gentle sunlight moving, sprout growing slowly`  
**场景 2**: `curtain blowing, hair moving slightly`  
**场景 3**: `petals unfolding, dewdrops glistening`  
**场景 4**: `petals falling, pages turning`  
**场景 5**: `gentle breathing, cat sleeping`  
**场景 6**: `camera pull back, clouds moving`

**完成后告诉我**: "可灵完成"

---

## 🤖 Step 3: 自动剪辑 (3 分钟)

**运行命令**:
```bash
cd /Users/maming/.openclaw/workspace-main

# 把图片放到正确位置
mkdir -p runtime/ai-animations/images
cp spring-flower/scene-*.jpg runtime/ai-animations/images/

# 把视频放到正确位置
mkdir -p runtime/ai-animations/videos
cp spring-flower/video-*.mp4 runtime/ai-animations/videos/

# 运行自动剪辑
python3 agents/ai-animator/auto-edit.py spring-flower
```

**自动完成**:
- ✅ 生成 6 段配音
- ✅ 合成视频
- ✅ 添加 BGM
- ✅ 添加转场
- ✅ 导出最终视频

**输出位置**:
```
runtime/ai-animations/final-spring-flower-20260313-XXXXXX.mp4
```

---

## 📱 Step 4: 发布 (2 分钟)

### 小红书发布

**标题**:
```
我要一个工作流 1 分钟学会！AI 直出治愈动画短片，有手就行
```

**正文**:
```
花 20 分钟做的 AI 动画，被问爆了！
打工人也能做的治愈系短片～

工具都列在图里啦👇
1️⃣ Kimi - 写脚本
2️⃣ 即梦 AI - 生成画面
3️⃣ 可灵 AI - 让画面动起来
4️⃣ 剪映 - 配音 + 剪辑

真的超简单！
有手就行！

#AI 动画 #AI 绘画 #治愈系 #工作流 #教程
```

**封面**: scene-03.jpg (花开)

---

## ⏱️ 时间统计

| 步骤 | 预计 | 实际 |
|------|------|------|
| 即梦 | 5 分钟 | ___ |
| 可灵 | 5 分钟 | ___ |
| 自动剪辑 | 3 分钟 | ___ |
| 发布 | 2 分钟 | ___ |
| **总计** | **15 分钟** | ___ |

---

## 🆘 遇到问题？

**随时问我**:
- 打不开网站？
- 登录失败？
- 生成失败？
- 找不到按钮？

**我在线指导！** 🚀

---

**老麻，现在打开即梦 AI 开始吗？** 🎨

**网址**: https://jimeng.jianying.com
