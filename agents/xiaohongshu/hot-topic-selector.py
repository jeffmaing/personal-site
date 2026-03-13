#!/usr/bin/env python3
"""
小红书热点选题生成器

功能:
1. 搜索小红书热点话题
2. 分析竞品爆款
3. 生成每日选题
4. 推送选题建议
"""

import json
from datetime import datetime, timedelta

# 小红书汽车内容热点库
HOT_TOPICS = {
    '情绪共鸣': [
        {
            'topic': '新手司机焦虑',
            'title_template': '{}，我悟了...',
            'viral_score': 95,
            'competition': '低',
            'example': '开车 3 年，我悟了...'
        },
        {
            'topic': '女司机日常',
            'title_template': '{}的真实体验',
            'viral_score': 92,
            'competition': '中',
            'example': '女司机停车的真实体验'
        },
        {
            'topic': '第一次上高速',
            'title_template': '第一次{}，紧张到...',
            'viral_score': 90,
            'competition': '低',
            'example': '第一次上高速，紧张到腿软...'
        },
        {
            'topic': '停车困难户',
            'title_template': '{}的痛谁懂',
            'viral_score': 88,
            'competition': '中',
            'example': '停车困难户的痛谁懂'
        }
    ],
    
    '实用干货': [
        {
            'topic': '省油小技巧',
            'title_template': '{}的 5 个秘密',
            'viral_score': 85,
            'competition': '高',
            'example': '省油的 5 个秘密，4S 店不会告诉你'
        },
        {
            'topic': '保险怎么买',
            'title_template': '{}，我花了{}才懂',
            'viral_score': 87,
            'competition': '中',
            'example': '保险怎么买，我花了 3 万才懂'
        },
        {
            'topic': '保养避坑',
            'title_template': '{}里的坑，别踩',
            'viral_score': 89,
            'competition': '中',
            'example': '保养里的坑，我花了 5 万才懂'
        }
    ],
    
    '场景生活': [
        {
            'topic': '周末自驾',
            'title_template': '{}，这{}样东西必带',
            'viral_score': 82,
            'competition': '中',
            'example': '周末自驾，这 10 样东西必带'
        },
        {
            'topic': '车内好物',
            'title_template': '{}，提升幸福感',
            'viral_score': 80,
            'competition': '高',
            'example': '车内好物推荐，提升幸福感'
        },
        {
            'topic': '露营装备',
            'title_template': '{}清单，新手必看',
            'viral_score': 78,
            'competition': '高',
            'example': '露营装备清单，新手必看'
        }
    ],
    
    '热点话题': [
        {
            'topic': '油价上涨',
            'title_template': '{}，我算了一笔账',
            'viral_score': 75,
            'competition': '中',
            'example': '油价又涨了，我算了一笔账'
        },
        {
            'topic': '新能源 vs 油车',
            'title_template': '开了{}后，我再也不想开{}了',
            'viral_score': 83,
            'competition': '高',
            'example': '开了电车后，我再也不想开油车了'
        }
    ]
}


class HotTopicSelector:
    """热点选题生成器"""
    
    def __init__(self):
        self.hot_topics = HOT_TOPICS
        self.history = []
    
    def get_daily_topics(self, date=None, count=5):
        """生成每日选题"""
        if date is None:
            date = datetime.now().strftime('%Y-%m-%d')
        
        # 按爆款潜力排序
        all_topics = []
        for category, topics in self.hot_topics.items():
            for topic in topics:
                topic['category'] = category
                all_topics.append(topic)
        
        # 排序：爆款潜力 > 竞争度低
        all_topics.sort(key=lambda x: (x['viral_score'], x['competition'] == '低'), reverse=True)
        
        # 去重 (不推荐最近 7 天发过的)
        seven_days_ago = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
        recent_topics = [h['topic'] for h in self.history if h['date'] >= seven_days_ago]
        
        daily_topics = []
        for topic in all_topics:
            if topic['topic'] not in recent_topics and len(daily_topics) < count:
                daily_topics.append(topic)
                self.history.append({
                    'date': date,
                    'topic': topic['topic'],
                    'category': topic['category']
                })
        
        return daily_topics
    
    def generate_content_brief(self, topic_info):
        """生成内容简报"""
        brief = {
            'topic': topic_info['topic'],
            'category': topic_info['category'],
            'title_suggestions': [
                topic_info['title_template'].format(topic_info['topic']),
                topic_info['example'],
                f"{topic_info['topic']}，后悔了",
                f"关于{topic_info['topic']}，说点真话"
            ],
            'content_angle': self._get_content_angle(topic_info),
            'key_points': self._get_key_points(topic_info),
            'engagement_hook': self._get_engagement_hook(topic_info),
            'tags': self._get_tags(topic_info),
            'viral_potential': topic_info['viral_score'],
            'competition': topic_info['competition']
        }
        return brief
    
    def _get_content_angle(self, topic_info):
        """获取内容角度"""
        angles = {
            '情绪共鸣': '个人故事 + 真实体验 + 情感共鸣',
            '实用干货': '行业内幕 + 避坑指南 + 省钱技巧',
            '场景生活': '美好场景 + 装备清单 + 路线推荐',
            '热点话题': '热点解读 + 成本对比 + 个人观点'
        }
        return angles.get(topic_info['category'], '个人故事 + 实用建议')
    
    def _get_key_points(self, topic_info):
        """获取内容要点"""
        points = {
            '新手司机焦虑': [
                '新手时期的紧张和糗事',
                '从焦虑到熟练的过程',
                '给新手的 5 条建议'
            ],
            '女司机日常': [
                '女司机遇到的偏见',
                '真实驾驶体验分享',
                '给女司机的建议'
            ],
            '省油小技巧': [
                '驾驶习惯的影响',
                '保养对油耗的影响',
                '5 个实用省油技巧'
            ],
            '周末自驾': [
                '目的地推荐',
                '必备装备清单',
                '注意事项'
            ]
        }
        return points.get(topic_info['topic'], ['个人体验', '实用建议', '互动提问'])
    
    def _get_engagement_hook(self, topic_info):
        """获取互动引导"""
        hooks = {
            '情绪共鸣': '你们{}时遇到过什么囧事？评论区说说',
            '实用干货': '还有什么{}技巧？评论区补充',
            '场景生活': '你们{}都带什么？评论区聊聊',
            '热点话题': '你们怎么看？评论区讨论'
        }
        return hooks.get(topic_info['category'], '你们怎么看？评论区说说')
    
    def _get_tags(self, topic_info):
        """获取标签"""
        base_tags = ['#汽车', '#用车知识']
        category_tags = {
            '情绪共鸣': ['#新手司机', '#真实体验'],
            '实用干货': ['#用车技巧', '#避坑指南'],
            '场景生活': ['#自驾', '#车生活'],
            '热点话题': ['#热点', '#观点']
        }
        return base_tags + category_tags.get(topic_info['category'], [])


def generate_daily_topics():
    """生成每日选题"""
    selector = HotTopicSelector()
    
    print("🔥 小红书热点选题生成器")
    print("=" * 60)
    print(f"日期：{datetime.now().strftime('%Y-%m-%d')}")
    print()
    
    # 获取每日选题
    topics = selector.get_daily_topics(count=5)
    
    print("📊 今日推荐选题 (按爆款潜力排序):")
    print()
    
    for i, topic in enumerate(topics, 1):
        print(f"{i}. {topic['topic']}")
        print(f"   分类：{topic['category']}")
        print(f"   爆款潜力：⭐{'⭐' * int(topic['viral_score'] / 20)} ({topic['viral_score']}分)")
        print(f"   竞争程度：{'低' if topic['competition'] == '低' else '中' if topic['competition'] == '中' else '高'}")
        print(f"   标题示例：{topic['example']}")
        
        # 生成内容简报
        brief = selector.generate_content_brief(topic)
        print(f"   内容角度：{brief['content_angle']}")
        print(f"   互动引导：{brief['engagement_hook']}")
        print(f"   标签：{' '.join(brief['tags'])}")
        print()
    
    return selector


if __name__ == '__main__':
    generate_daily_topics()
