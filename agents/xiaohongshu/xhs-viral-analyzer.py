#!/usr/bin/env python3
"""
小红书爆款分析师

功能:
1. 分析小红书汽车爆款笔记
2. 提取爆款元素 (标题/封面/内容结构)
3. 生成爆款公式
4. 指导内容创作
"""

import json
from datetime import datetime

# 爆款元素库
VIRAL_ELEMENTS = {
    'title_patterns': [
        # 情绪共鸣型
        "开车 3 年，我悟了...",
        "后悔没早买！这配置真香",
        "女生开车，这 5 个点太真实了",
        
        # 场景化型
        "周末自驾，这 10 样东西必带",
        "下雨天开车，一定要注意这 3 点",
        "第一次跑高速，紧张到腿软...",
        
        # 干货型
        "老司机都不会告诉你的 5 个秘密",
        "4S 店销售最怕你知道的事",
        "买车不被坑，记住这 3 句话",
        
        # 对比型
        "开了电车后，我再也不想开油车了",
        "从 BBA 换到国产车，我后悔了吗？",
        "租车 vs 买车，哪个更划算？"
    ],
    
    'content_structures': [
        {
            'name': '故事 + 干货',
            'structure': [
                '1. 个人故事引入 (情绪共鸣)',
                '2. 遇到的问题/痛点',
                '3. 解决方案/建议 (3-5 条)',
                '4. 总结 + 互动引导'
            ]
        },
        {
            'name': '场景 + 清单',
            'structure': [
                '1. 场景描述 (时间/地点/人物)',
                '2. 需要的物品/准备 (清单体)',
                '3. 注意事项',
                '4. 互动提问'
            ]
        },
        {
            'name': '对比 + 结论',
            'structure': [
                '1. 对比对象介绍',
                '2. 多维度对比 (价格/性能/体验)',
                '3. 个人结论',
                '4. 适合人群'
            ]
        }
    ],
    
    'engagement_hooks': [
        "你们买车最后悔的是什么？评论区说说",
        "如果是你，会怎么选？",
        "收藏起来，买车时一定用得上",
        "关注我，每天一个用车小技巧",
        "第 3 个最重要，一定要看！",
        "最后一条颠覆你的认知"
    ],
    
    'trending_topics': [
        # 情绪共鸣类
        "新手开车焦虑",
        "女司机日常",
        "第一次上高速",
        "停车困难户",
        
        # 实用干货类
        "省油小技巧",
        "保险怎么买",
        "保养避坑指南",
        "二手车选购",
        
        # 场景生活类
        "周末自驾去哪玩",
        "车内好物推荐",
        "改装分享",
        "露营装备",
        
        # 热点话题类
        "油价又涨了",
        "新能源 vs 油车",
        "国产车崛起",
        "自动驾驶体验"
    ]
}


class XHSViralAnalyzer:
    """小红书爆款分析师"""
    
    def __init__(self):
        self.viral_elements = VIRAL_ELEMENTS
    
    def analyze_viral_post(self, title, content):
        """分析爆款笔记元素"""
        analysis = {
            'title_type': self._classify_title(title),
            'content_structure': self._analyze_structure(content),
            'engagement_elements': self._find_engagement(content),
            'emotional_triggers': self._find_emotions(content)
        }
        return analysis
    
    def _classify_title(self, title):
        """标题类型分类"""
        if any(word in title for word in ['后悔', '悟了', '真实']):
            return '情绪共鸣型'
        elif any(word in title for word in ['周末', '自驾', '第一次']):
            return '场景化型'
        elif any(word in title for word in ['秘密', '技巧', '指南']):
            return '干货型'
        elif any(word in title for word in ['vs', '对比', '换到']):
            return '对比型'
        else:
            return '其他型'
    
    def _analyze_structure(self, content):
        """分析内容结构"""
        # 简化分析
        if '清单' in content or any(i in content for i in ['1️⃣', '2️⃣', '3️⃣']):
            return '清单体'
        elif '故事' in content or '我' in content:
            return '故事体'
        elif '对比' in content:
            return '对比体'
        else:
            return '混合体'
    
    def _find_engagement(self, content):
        """找到互动元素"""
        engagements = []
        if '评论' in content:
            engagements.append('评论引导')
        if '收藏' in content:
            engagements.append('收藏引导')
        if '关注' in content:
            engagements.append('关注引导')
        if '?' in content or '？' in content:
            engagements.append('提问互动')
        return engagements
    
    def _find_emotions(self, content):
        """找到情绪触发点"""
        emotions = []
        if any(word in content for word in ['后悔', '哭死', '气死']):
            emotions.append('负面情绪')
        if any(word in content for word in ['真香', '爽', '开心']):
            emotions.append('正面情绪')
        if any(word in content for word in ['紧张', '害怕', '焦虑']):
            emotions.append('焦虑情绪')
        return emotions
    
    def generate_viral_template(self, topic):
        """生成爆款模板"""
        template = {
            'title_options': [
                f"{topic}，我悟了...",
                f"后悔没早{topic}！这方法真香",
                f"{topic}的 5 个坑，别踩！",
                f"第一次{topic}，紧张到...",
                f"{topic}后，我再也..."
            ],
            'content_structure': '故事 + 干货',
            'outline': [
                '1. 个人故事引入 (30 字)',
                '2. 遇到的问题/痛点 (50 字)',
                '3. 解决方案 3-5 条 (100 字)',
                '4. 总结 + 互动引导 (20 字)'
            ],
            'engagement_hook': '你们{topic}时遇到过什么坑？评论区说说',
            'tags': [f'#{topic}', '#用车知识', '#汽车', '#新手司机']
        }
        return template
    
    def get_trending_topics(self, category='汽车'):
        """获取热门话题"""
        return self.viral_elements['trending_topics']
    
    def generate_content_ideas(self, count=5):
        """生成内容创意"""
        ideas = []
        
        # 情绪共鸣类
        ideas.append({
            'type': '情绪共鸣',
            'title': '开车 3 年，我悟了...',
            'angle': '新手司机的成长故事',
            'viral_potential': '高'
        })
        
        # 实用干货类
        ideas.append({
            'type': '实用干货',
            'title': '4S 店销售最怕你知道的 5 件事',
            'angle': '行业内幕 + 避坑指南',
            'viral_potential': '高'
        })
        
        # 场景生活类
        ideas.append({
            'type': '场景生活',
            'title': '周末自驾，这 10 样东西必带！',
            'angle': '露营装备 + 路线推荐',
            'viral_potential': '中'
        })
        
        # 对比评测类
        ideas.append({
            'type': '对比评测',
            'title': '从 BBA 换到国产车，我后悔了吗？',
            'angle': '真实体验 + 心路历程',
            'viral_potential': '高'
        })
        
        # 热点话题类
        ideas.append({
            'type': '热点话题',
            'title': '油价又涨了，我算了一笔账...',
            'angle': '油车 vs 电车成本对比',
            'viral_potential': '中'
        })
        
        return ideas[:count]


def analyze_and_generate():
    """分析并生成内容创意"""
    analyzer = XHSViralAnalyzer()
    
    print("🔍 小红书爆款分析器")
    print("=" * 60)
    
    # 获取热门话题
    print("\n📊 当前热门话题:")
    topics = analyzer.get_trending_topics()
    for i, topic in enumerate(topics[:10], 1):
        print(f"  {i}. {topic}")
    
    # 生成内容创意
    print("\n💡 今日内容创意:")
    ideas = analyzer.generate_content_ideas(5)
    for i, idea in enumerate(ideas, 1):
        print(f"\n  创意{i}: {idea['title']}")
        print(f"  类型：{idea['type']}")
        print(f"  角度：{idea['angle']}")
        print(f"  爆款潜力：{idea['viral_potential']}")
    
    # 生成爆款模板
    print("\n📝 爆款内容模板:")
    template = analyzer.generate_viral_template("买车")
    print(f"\n  标题选项:")
    for title in template['title_options']:
        print(f"    - {title}")
    
    print(f"\n  内容结构：{template['content_structure']}")
    print(f"\n  大纲:")
    for line in template['outline']:
        print(f"    {line}")
    
    return analyzer


if __name__ == '__main__':
    analyze_and_generate()
