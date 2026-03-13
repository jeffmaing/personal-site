# 腾讯 SkillHub 配置指南

## 平台信息 ✅

| 项目 | 说明 |
|------|------|
| **平台名称** | 腾讯 SkillHub |
| **官网地址** | https://skillhub.cn |
| **发布时间** | 2026-03-11（今天！） |
| **技能数量** | 13,000+ |
| **精选技能** | TOP 50 |
| **状态** | ✅ 已上线 |

---

## 核心优势

### vs ClawHub（官方）

| 特性 | ClawHub | SkillHub |
|------|---------|----------|
| 服务器 | 海外 | 国内加速 ✅ |
| 中文搜索 | ❌ 体验差 | ✅ 优化 |
| 下载速度 | 慢 | 快 ✅ |
| 安全审计 | 无 | ✅ 有 |
| 精选榜单 | 无 | ✅ TOP50 |
| 技能数量 | 13,000+ | 13,000+（同步） |

---

## 配置方式

### 方式 1：修改 ClawHub 镜像（推荐）

```bash
# 设置腾讯镜像
export CLAWHUB_REGISTRY=https://skillhub.cn/api

# 永久配置（添加到 ~/.zshrc）
echo 'export CLAWHUB_REGISTRY=https://skillhub.cn/api' >> ~/.zshrc
source ~/.zshrc
```

### 方式 2：直接访问官网

访问 https://skillhub.cn 浏览和搜索技能

---

## 推荐技能（内容创作类）

### 头条相关 📰

| 技能 | 功能 | 状态 |
|------|------|------|
| `toutiao-auto-post` | 自动发布 | ✅ 已安装 |
| `toutiao-analytics` | 数据分析 | ⏳ 可选 |
| `toutiao-hot-search` | 热点监控 | ⏳ 可选 |

### 小红书相关 📕

| 技能 | 功能 | 状态 |
|------|------|------|
| `xiaohongshu-title` | 标题优化 | ✅ 已安装 |
| `xiaohongshu-format` | 排版工具 | ✅ 已创建 |
| `xiaohongshu-analytics` | 数据分析 | ⏳ 可选 |
| `xiaohongshu-publisher` | 自动发布 | ⏳ 可选 |

### 通用工具 🛠️

| 技能 | 功能 | 推荐度 |
|------|------|--------|
| `multi-image-search` | 图片搜索 | ✅ 已安装 |
| `baidu-search` | 百度搜索 | ✅ 已安装 |
| `self-improving-agent` | 自我改进 | ✅ 已安装 |
| `tavily-search` | AI 搜索 | ✅ 已安装 |

---

## 安装技能

### 通过腾讯镜像加速

```bash
# 设置镜像
export CLAWHUB_REGISTRY=https://skillhub.cn/api

# 安装技能
clawhub install <技能名>

# 示例：安装头条数据分析
clawhub install toutiao-analytics
```

### 直接从官网查找

1. 访问 https://skillhub.cn
2. 搜索技能名称
3. 复制安装命令
4. 终端执行

---

## 精选榜单 TOP50

腾讯从 13,000+ 技能中精选出 50 个优质技能，包括：

### 内容创作（预计）
- 头条发布系列
- 小红书运营系列
- 公众号排版
- 视频剪辑工具

### 开发辅助（预计）
- GitHub 集成
- 代码审查
- 文档生成

### 数据分析（预计）
- 竞品监控
- 趋势分析
- 报表生成

---

## 安全特性

### 腾讯安全扫描
- ✅ 恶意代码检测
- ✅ 隐私泄露排查
- ✅ 侵权内容过滤
- ✅ API Key 安全审计

### 官方认证
- ✅ 技能来源验证
- ✅ 作者身份认证
- ✅ 版本签名验证

---

## 与现有系统集成

### OpenClaw 集成

```bash
# 1. 配置镜像
export CLAWHUB_REGISTRY=https://skillhub.cn/api

# 2. 安装技能
clawhub install <技能名>

# 3. 自动加载
# 技能会自动出现在 ~/.openclaw/workspace/skills/
```

### 兼容性

- ✅ OpenClaw 官方技能
- ✅ ClawHub 全量技能
- ✅ WorkBuddy 框架
- ✅ QClaw 框架
- ✅ 腾讯云 Lighthouse

---

## 使用技巧

### 快速搜索
```bash
# 中文搜索（优化后）
clawhub search 头条发布

# 分类搜索
clawhub search --category "内容创作"

# 按热度排序
clawhub search --sort popularity
```

### 批量安装
```bash
# 安装内容创作套件
clawhub install toutiao-auto-post xiaohongshu-title multi-image-search
```

---

## 故障排查

### 下载速度慢
```bash
# 检查镜像配置
echo $CLAWHUB_REGISTRY

# 应该是：https://skillhub.cn/api
```

### 技能找不到
```bash
# 技能名可能不同
clawhub search 关键词

# 或访问官网查找
```

### 安装失败
```bash
# 清理缓存
clawhub cache clean

# 重试安装
clawhub install <技能名>
```

---

## 未来机会

### 腾讯云集成 ⏳
- Lighthouse 一键部署
- 云函数自动执行
- COS 图片存储

### 企业版功能 ⏳
- 团队协作
- 权限管理
- 审计日志

### AI 模型集成 ⏳
- 混元模型直连
- 千帆模型支持
- 多模型切换

---

## 参考资料

- **官网**: https://skillhub.cn
- **GitHub**: 待公开
- **文档**: 待发布
- **社区**: 待建立

---

**配置时间**: 2026-03-11 21:40  
**状态**: ✅ 可用（国内加速）
