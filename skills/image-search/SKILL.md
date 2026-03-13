# image-search - 图片搜索技能

## 功能

通过 Pexels API 搜索高质量免费图片：
- 关键词搜索图片
- 按方向筛选（横图/竖图/方形）
- 按颜色筛选
- 按尺寸筛选
- 下载图片到本地

## 使用方式

### 搜索图片
```
搜索"汽车"的图片，找 10 张横图
帮我找"科技背景"的高清图片
搜索"办公室"的竖图，要红色的
```

### 下载图片
```
下载第 1、3、5 张图片到 runtime/images/
把所有搜索结果下载到本地
```

### 搜索参数
```
搜索"风景"，只要横向大图
找"人物"图片，橙色色调
搜索"食物"，最小 1920x1080
```

## API 配置

**Pexels API Key**: 从 https://www.pexels.com/api/ 获取

配置位置：`~/.openclaw/tools/image-search/.env`

```bash
PEXELS_API_KEY=your_api_key_here
```

## 输出格式

搜索结果包含：
- 图片 ID
- 摄影师信息
- 图片 URL（原图 + 缩略图）
- 尺寸信息
- 平均颜色
- 下载链接

## 使用场景

### 头条文章配图
```
搜索"新能源汽车"配图，要横图，下载 3 张
```

### 小红书封面
```
找"职场穿搭"竖图，要高清，下载最佳匹配
```

### 背景图片
```
搜索"渐变背景"方形图，用于 PPT
```

## 限制

- Pexels 免费账户：每日 20,000 次请求
- 图片均为 CC0 协议（可商用）
- 需要网络连接

## 示例命令

```bash
# 搜索并下载
node /Users/maming/.openclaw/tools/image-search/search-images.js \
  --query "electric car" \
  --orientation landscape \
  --size large \
  --count 5 \
  --download

# 仅搜索
node /Users/maming/.openclaw/tools/image-search/search-images.js \
  --query "office workspace" \
  --orientation portrait \
  --count 10
```
