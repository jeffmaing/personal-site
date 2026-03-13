# multi-image-search - 多源图片搜索

## 功能

根据文章/笔记主题自动搜索并下载高质量免费图片。

支持图片源：
- **Pexels** ✅ - 高质量摄影（已配置）
- **Unsplash** ⏳ - 艺术感强（可选）
- **Pixabay** ⏳ - 免费商用（可选）

## 使用方式

### 自然语言
```
搜索"新能源汽车"的配图，要横图，下载 3 张
找"办公室"的高清图片
搜索"职场穿搭"竖图，用于小红书封面
```

### 脚本调用
```bash
python3 /Users/maming/.openclaw/tools/multi-image-search/search-images.py \
  --query "关键词" \
  --count 5 \
  --orientation landscape \
  --download
```

## 参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--query` | 搜索关键词 | 必需 |
| `--count` | 返回数量 | 10 |
| `--orientation` | landscape/portrait/square/all | all |
| `--download` | 下载搜索结果 | false |
| `--output` | 输出目录 | runtime/images/ |

## 输出

- **图片**: `runtime/images/{source}-{id}.jpg`
- **元数据**: `runtime/images/search-{timestamp}.json`

## 集成工作流

### 头条配图
1. 生成文章内容
2. 提取关键词搜索配图
3. 下载 3-5 张横图
4. 发布时附加

### 小红书封面
1. 生成笔记内容
2. 搜索竖图封面
3. 下载最佳匹配
4. 发布时附加
