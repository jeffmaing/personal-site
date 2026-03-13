# 🤖 AI 动画工作流自动化方案

**创建时间**: 2026-03-13 07:50  
**状态**: 🔄 进行中  
**目标**: 全自动生成 AI 动画短片

---

## 🎯 自动化程度分级

| 级别 | 说明 | 人工参与 | 耗时 |
|------|------|----------|------|
| **L0 手动** | 完全手动 | 100% | 60 分钟 |
| **L1 半自动** | 关键步骤自动 | 50% | 30 分钟 |
| **L2 高度自动** | 大部分自动 | 20% | 10 分钟 |
| **L3 全自动** | 完全自动 | 0% | 5 分钟 |

---

## 📊 当前状态

**自动化程度**: L0 → L1 (过渡中)

| 步骤 | 工具 | 当前状态 | 目标状态 |
|------|------|----------|----------|
| 1. 生成画面 | 即梦 AI | ❌ 手动 | ✅ 浏览器自动化 |
| 2. 生成动画 | 可灵 AI | ❌ 手动 | ✅ 浏览器自动化 |
| 3. 添加配音 | 剪映/Edge TTS | ❌ 手动 | ✅ Edge TTS 自动 |
| 4. 添加 BGM | ffmpeg | ❌ 手动 | ✅ ffmpeg 自动 |
| 5. 剪辑合成 | 剪映/ffmpeg | ❌ 手动 | ✅ ffmpeg 自动 |
| 6. 发布 | 平台 API | ❌ 手动 | ⏳ API 申请中 |

---

## 🛠️ 技术方案

### 方案 A: 浏览器自动化 (推荐)

**工具**: Playwright / Selenium

**原理**:
```python
from playwright.sync_api import sync_playwright

def auto_generate_image(prompt):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        # 访问即梦 AI
        page.goto("https://jimeng.jianying.com")
        
        # 登录 (需要 Cookie)
        page.add_cookies([...])
        
        # 输入提示词
        page.fill("textarea", prompt)
        
        # 点击生成
        page.click("button:has-text('生成')")
        
        # 等待完成
        page.wait_for_selector(".result-image")
        
        # 下载图片
        image = page.query_selector(".result-image")
        image.screenshot(path="output.jpg")
        
        browser.close()
```

**优点**:
- ✅ 无需官方 API
- ✅ 模拟真实用户操作
- ✅ 稳定可靠

**缺点**:
- ⚠️ 需要维护 Cookie
- ⚠️ 页面更新需要调整
- ⚠️ 可能被反爬

---

### 方案 B: 官方 API (等待中)

**即梦 AI API**:
- 状态：❌ 未开放
- 计划：联系官方申请

**可灵 AI API**:
- 状态：❌ 未开放
- 计划：联系官方申请

**小红书 API**:
- 状态：⚠️ 企业号可申请
- 计划：申请企业号

---

### 方案 C: 混合方案 (当前采用)

**配音**: Edge TTS (免费 API)
**剪辑**: ffmpeg (命令行)
**画面/动画**: 浏览器自动化 (开发中)
**发布**: 手动 (API 申请中)

---

## 📋 实现计划

### Phase 1: 配音自动化 (本周) ✅

**工具**: Edge TTS

**实现**:
```python
import edge_tts
import asyncio

async def generate_narration(text, output_path):
    communicate = edge_tts.Communicate(text, "zh-CN-XiaoxiaoNeural")
    await communicate.save(output_path)
```

**状态**: ⏳ 待实现

---

### Phase 2: 剪辑自动化 (本周)

**工具**: ffmpeg

**实现**:
```python
import subprocess

def merge_video_audio(video_path, audio_path, bgm_path, output_path):
    cmd = [
        'ffmpeg',
        '-i', video_path,
        '-i', audio_path,
        '-i', bgm_path,
        '-filter_complex', '[1:a]volume=1[a];[2:a]volume=0.3[b];[a][b]amix=2[c]',
        '-c:v', 'copy',
        '-map', '0:v',
        '-map', '[c]',
        output_path
    ]
    subprocess.run(cmd)
```

**状态**: ⏳ 待实现

---

### Phase 3: 画面生成自动化 (下周)

**工具**: Playwright

**实现**:
- 即梦 AI 自动登录
- 自动输入提示词
- 自动下载生成的图片
- 错误处理和重试

**状态**: 📝 设计阶段

---

### Phase 4: 动画生成自动化 (下周)

**工具**: Playwright

**实现**:
- 可灵 AI 自动登录
- 自动上传图片
- 自动输入运动描述
- 自动下载视频

**状态**: 📝 设计阶段

---

### Phase 5: 发布自动化 (下下周)

**方案 A**: 小红书企业号 API
**方案 B**: 浏览器自动化发布
**方案 C**: 使用第三方工具 (如蚁小二)

**状态**: ⏳ 等待 API 申请

---

## 🚀 立即可用的半自动方案

### 当前工作流

```
人工: 打开即梦 AI → 粘贴提示词 → 点击生成 → 下载图片
  ↓
Agent: 自动整理图片 → 准备下一步
  ↓
人工: 打开可灵 AI → 上传图片 → 输入运动描述 → 生成 → 下载
  ↓
Agent: 自动调用 Edge TTS 生成配音
  ↓
Agent: 自动调用 ffmpeg 合成视频
  ↓
人工: 上传到平台发布
```

**人工参与**: 40%  
**自动部分**: 60%  
**耗时**: 20-30 分钟

---

## 📊 时间线

| 时间 | 阶段 | 自动化程度 | 人工参与 |
|------|------|------------|----------|
| 03-13 (今日) | L0 手动 | 0% | 100% |
| 03-15 | L1 半自动 | 40% | 60% |
| 03-20 | L2 高度自动 | 80% | 20% |
| 03-27 | L3 全自动 | 100% | 0% |

---

## ⚠️ 技术难点

### 1. Cookie 维护
**问题**: 登录状态过期  
**解决**: 定期更新 Cookie / 实现自动登录

### 2. 页面变化
**问题**: 网站更新导致选择器失效  
**解决**: 使用更稳定的选择器 / 定期维护

### 3. 反爬机制
**问题**: 被识别为机器人  
**解决**: 添加随机延迟 / 使用真实 User-Agent

### 4. API 限制
**问题**: 免费额度有限  
**解决**: 多账号轮换 / 付费升级

---

## 🎯 老麻，你的选择

### 选项 A: 等待全自动 (推荐)
- **等待时间**: 1-2 周
- **人工参与**: 0%
- **优点**: 完全省心
- **缺点**: 需要等待

### 选项 B: 先用半自动 (折中)
- **立即可用**: 是
- **人工参与**: 40%
- **优点**: 现在就能用
- **缺点**: 还需要一些手动操作

### 选项 C: 继续手动 (不推荐)
- **立即可用**: 是
- **人工参与**: 100%
- **优点**: 无需开发
- **缺点**: 浪费时间

---

## 💡 我的建议

**短期 (本周)**: 选项 B - 半自动
- 配音和剪辑自动化
- 画面和动画手动生成
- 快速验证内容方向

**中期 (2 周)**: 选项 A - 全自动
- 浏览器自动化完成
- API 申请成功
- 完全自动化

---

**老麻，你选哪个？我立即开始实现！** 🚀
