# 🔧 CLI-Anything 集成方案

**创建时间**: 2026-03-13 08:05  
**状态**: 📝 调研完成  
**优先级**: 🔴 P0

---

## 🎯 CLI-Anything 是什么

**官方**: https://clianything.org/  
**GitHub**: https://github.com/HKUDS/CLI-Anything

**核心功能**:
```
把任何软件 → 转换成 AI 可控制的命令行接口

示例:
即梦 AI (网页) → jimeng generate "提示词" --output scene-01.jpg
可灵 AI (网页) → kling animate scene-01.jpg --motion "描述" --output video-01.mp4
```

---

## 📊 对我们的价值

### 当前方案对比

| 方案 | 工具 | 人工 | 耗时 | 稳定性 |
|------|------|------|------|--------|
| **手动** | 浏览器 | 100% | 60 分钟 | ⭐⭐⭐⭐⭐ |
| **半自动** | 即梦 + 可灵 | 40% | 20 分钟 | ⭐⭐⭐⭐⭐ |
| **浏览器自动化** | Playwright | 0% | 5 分钟 | ⭐⭐⭐ |
| **CLI-Anything** | CLI-Anything | 0% | 5 分钟 | ⭐⭐⭐⭐ |

### 优势

**vs Playwright 浏览器自动化**:
- ✅ 更稳定 (不依赖页面结构)
- ✅ 更简单 (命令行人人都懂)
- ✅ 更通用 (任何软件都能用)
- ✅ 更易维护 (命令不变)

**vs 官方 API**:
- ✅ 无需等待 API 开放
- ✅ 无需申请 API Key
- ✅ 立即就能用

---

## 🛠️ 集成步骤

### Step 1: 安装 CLI-Anything

```bash
# 安装
pip install cli-anything

# 或使用 Docker
docker pull clianything/cli-anything
```

### Step 2: 配置即梦 AI

```bash
# 录制即梦 AI 操作流程
cli-anything record --name jimeng \
  --url https://jimeng.jianying.com \
  --actions "
    1. 找到输入框
    2. 输入提示词
    3. 点击生成按钮
    4. 等待完成
    5. 点击下载
  "

# 生成命令行工具
# 输出：jimeng generate "提示词" --output xxx.jpg
```

### Step 3: 配置可灵 AI

```bash
# 录制可灵 AI 操作流程
cli-anything record --name kling \
  --url https://klingai.com \
  --actions "
    1. 上传图片
    2. 输入运动描述
    3. 设置参数
    4. 点击生成
    5. 等待完成
    6. 下载视频
  "

# 生成命令行工具
# 输出：kling animate image.jpg --motion "描述" --output xxx.mp4
```

### Step 4: 集成到我们的工作流

**修改前**:
```python
# 需要浏览器自动化
def generate_image(prompt):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://jimeng.jianying.com")
        # ... 复杂操作
```

**修改后**:
```python
# 直接命令行调用
def generate_image(prompt, output):
    subprocess.run([
        'jimeng', 'generate', prompt,
        '--output', output
    ])
```

---

## 📋 实施计划

### Phase 1: 安装测试 (今日)
- [ ] 安装 CLI-Anything
- [ ] 测试基础功能
- [ ] 录制即梦 AI 流程
- [ ] 生成命令行工具

**预计耗时**: 1-2 小时

### Phase 2: 集成工作流 (明日)
- [ ] 修改 ai-animator.py
- [ ] 替换 Playwright 代码
- [ ] 测试完整流程
- [ ] 文档更新

**预计耗时**: 2-3 小时

### Phase 3: 优化完善 (本周)
- [ ] 错误处理
- [ ] 批量处理优化
- [ ] 性能优化
- [ ] 日志记录

**预计耗时**: 3-4 小时

---

## 🎯 预期效果

### 自动化程度

| 阶段 | 人工参与 | 耗时 | 状态 |
|------|----------|------|------|
| 当前 (手动) | 100% | 60 分钟 | ✅ |
| 当前 (半自动) | 40% | 20 分钟 | ✅ |
| Phase 1 后 | 0% | 10 分钟 | 📝 |
| Phase 2 后 | 0% | 5 分钟 | 📝 |
| Phase 3 后 | 0% | 3 分钟 | 📝 |

### 代码简化

**修改前** (Playwright):
```python
# 150 行代码
def auto_jimeng():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://jimeng.jianying.com")
        page.fill("textarea", prompt)
        page.click("button:has-text('生成')")
        page.wait_for_selector(".result-image")
        # ... 更多代码
```

**修改后** (CLI-Anything):
```python
# 5 行代码
def auto_jimeng(prompt, output):
    subprocess.run([
        'jimeng', 'generate', prompt,
        '--output', output
    ])
```

---

## ⚠️ 潜在问题

### 问题 1: 安装复杂度
**风险**: CLI-Anything 可能需要复杂配置  
**解决**: 使用 Docker 容器简化安装

### 问题 2: 录制准确性
**风险**: 录制的操作可能不准确  
**解决**: 多次测试调整

### 问题 3: 网站更新
**风险**: 即梦/可灵页面更新导致失效  
**解决**: 重新录制流程 (5 分钟)

### 问题 4: 登录状态
**风险**: 需要维护登录 Cookie  
**解决**: CLI-Anything 支持 Cookie 管理

---

## 💡 老麻，我的建议

### 立即行动 (推荐)

**今日**:
1. 我安装测试 CLI-Anything (1 小时)
2. 录制即梦 AI 流程 (30 分钟)
3. 录制可灵 AI 流程 (30 分钟)
4. 测试命令行调用 (30 分钟)

**明日**:
1. 集成到工作流 (2 小时)
2. 完整测试 (1 小时)
3. 文档更新 (30 分钟)

**后天可用**:
- ✅ 完全自动化
- ✅ 一行命令生成动画
- ✅ 无需任何手动操作

---

### 命令示例 (完成后)

```bash
# 生成完整 AI 动画
ai-animator create spring-flower --auto

# 输出:
# 🎨 生成画面 (6 个场景) ... ✅
# 🎬 生成动画 (6 个场景) ... ✅
# 🎙️ 生成配音 ... ✅
# ✂️ 剪辑合成 ... ✅
# 📱 发布到小红书 ... ✅
# 
# 完成！视频：runtime/ai-animations/final-spring-flower.mp4
```

---

## 🚀 老麻，开始吗？

**我现在开始安装测试 CLI-Anything？**

**预计 2 小时后给你测试结果！** 🎯
