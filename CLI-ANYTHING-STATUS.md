# 🔧 CLI-Anything 安装进度

**时间**: 2026-03-13 08:07  
**状态**: 📝 调研完成，准备安装

---

## 📊 CLI-Anything 真相

**不是 Python 包**，而是**Claude Code 插件**！

**安装方式**:
```bash
# 在 Claude Code 中安装
/plugin marketplace add HKUDS/CLI-Anything
/plugin install cli-anything
```

**使用方式**:
```bash
# 在 Claude Code 会话中使用
claude
> /cli-anything jimeng generate "提示词" --output scene-01.jpg
```

---

## 🎯 对我们的价值

### 优势
- ✅ 专为 AI Agent 设计
- ✅ 结构化 JSON 输出
- ✅ 支持 11 个软件 (GIMP/Blender/LibreOffice 等)
- ✅ 单元测试 1508 个通过

### 限制
- ⚠️ 需要 Claude Code 环境
- ⚠️ 目前支持的软件有限
- ⚠️ 即梦 AI/可灵 AI 不在支持列表

---

## 💡 替代方案

### 方案 A: 自己实现简易版 CLI-Anything
```python
# 我们用 Playwright 实现命令行包装器
# 文件：agents/ai-animator/jimeng-cli.py

import click
from playwright.sync_api import sync_playwright

@click.group()
def cli():
    """即梦 AI 命令行工具"""
    pass

@cli.command()
@click.option('--prompt', required=True, help='提示词')
@click.option('--output', required=True, help='输出文件')
def generate(prompt, output):
    """生成图片"""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://jimeng.jianying.com")
        # ... 操作
        browser.close()

if __name__ == '__main__':
    cli()

# 使用:
# python jimeng-cli.py generate --prompt "xxx" --output scene-01.jpg
```

**优点**:
- ✅ 完全控制
- ✅ 针对即梦/可灵优化
- ✅ 无需依赖外部工具

**缺点**:
- ⚠️ 需要开发时间 (2-3 小时)
- ⚠️ 需要维护

---

### 方案 B: 继续用半自动 (今日)
- ✅ 立即可用
- ✅ 验证方向
- ⚠️ 需要人工操作

---

### 方案 C: Playwright 自动化 (明日)
- ✅ 完全自动化
- ✅ 代码已准备好
- ⚠️ 需要调试

---

## 🚀 建议

**今日**: 先用半自动出第一条内容  
**明日**: 实现 Playwright 自动化  
**长期**: 关注 CLI-Anything 是否支持即梦/可灵

---

**老麻，我们继续半自动方案，还是直接上 Playwright 自动化？**
