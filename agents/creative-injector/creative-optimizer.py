#!/usr/bin/env python3
"""
创意注入师 - 创意优化器

为内容注入创意元素，包括：
- 标题优化 (多个版本)
- 开头钩子设计
- 金句打造
- 互动话术设计
- 梗/段子插入
"""

import json
import random
from datetime import datetime
from pathlib import Path
from typing import List, Dict

# 配置
WORKSPACE = Path.home() / ".openclaw" / "workspace-main"
MEMORY_DIR = WORKSPACE / "memory"
SCRIPT_LIBRARY = MEMORY_DIR / "script-library"
OUTPUT_DIR = MEMORY_DIR / "creative-reports"

# 确保目录存在
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


class CreativeInjector:
    """创意注入器"""
    
    def __init__(self):
        """初始化注入器，加载话术库"""
        self.scripts = self.load_scripts()
    
    def load_scripts(self) -> Dict:
        """加载话术库"""
        scripts = {
            'hooks': {
                'pain': [],
                'data': [],
                'story': [],
                'contrast': []
            },
            'quotes': {
                'opinion': [],
                'insight': [],
                'advice': []
            },
            'cta': {
                'question': [],
                'vote': [],
                'share': []
            }
        }
        
        # 从话术库文件加载
        script_file = SCRIPT_LIBRARY / 'interaction-scripts.md'
        if script_file.exists():
            with open(script_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # 简单解析 (实际应更完善)
                if '痛点型' in content:
                    section = content.split('痛点型')[1].split('\n\n')[0]
                    scripts['hooks']['pain'] = [line.strip('- ').strip() for line in section.split('\n') if line.strip().startswith('-')]
                
                if '数据型' in content:
                    section = content.split('数据型')[1].split('\n\n')[0]
                    scripts['hooks']['data'] = [line.strip('- ').strip() for line in section.split('\n') if line.strip().startswith('-')]
                
                if '故事型' in content:
                    section = content.split('故事型')[1].split('\n\n')[0]
                    scripts['hooks']['story'] = [line.strip('- ').strip() for line in section.split('\n') if line.strip().startswith('-')]
                
                if '反差型' in content:
                    section = content.split('反差型')[1].split('\n\n')[0]
                    scripts['hooks']['contrast'] = [line.strip('- ').strip() for line in section.split('\n') if line.strip().startswith('-')]
                
                if '观点类' in content:
                    section = content.split('观点类')[1].split('\n\n')[0]
                    scripts['quotes']['opinion'] = [line.strip('- ').strip() for line in section.split('\n') if line.strip().startswith('-')]
                
                if '感悟类' in content:
                    section = content.split('感悟类')[1].split('\n\n')[0]
                    scripts['quotes']['insight'] = [line.strip('- ').strip() for line in section.split('\n') if line.strip().startswith('-')]
                
                if '建议类' in content:
                    section = content.split('建议类')[1].split('\n\n')[0]
                    scripts['quotes']['advice'] = [line.strip('- ').strip() for line in section.split('\n') if line.strip().startswith('-')]
                
                if '提问式' in content:
                    section = content.split('提问式')[1].split('\n\n')[0]
                    scripts['cta']['question'] = [line.strip('- ').strip() for line in section.split('\n') if line.strip().startswith('-')]
        
        # 如果加载失败，使用默认值
        if not scripts['hooks']['pain']:
            scripts['hooks']['pain'] = [
                "这 5 个坑，90% 新手都踩过",
                "花了 20 万买的教训，今天说给你听",
                "买车时销售不会告诉你的 5 个秘密",
                "如果重来一次，我绝对不会买这辆车",
                # 新增：AI 动画爆款公式
                "我要 1 分钟学会！AI 直出动画，有手就行",
                "我试了 10 个工具！AI 一键生成，3 分钟出片",
                "手残党福音！AI 自动做视频，零基础"
            ]
        
        if not scripts['hooks']['data']:
            scripts['hooks']['data'] = [
                "我统计了 1000 个车主，最后悔的不是买贵了",
                "对比了 50 款车，这 3 个数据最重要",
                "开了 5 万公里，油耗真相是这样的",
                "保值率排行榜，你的车排第几？"
            ]
        
        if not scripts['quotes']['opinion']:
            scripts['quotes']['opinion'] = [
                "买车不是买配置，是买生活方式",
                "保值率就是车的'人品'，热恋期看不出来",
                "选车如选对象，乍一看都挺好，过日子才知道坑在哪",
                "颜值高的车像渣男，看着爽用着哭"
            ]
        
        if not scripts['cta']['question']:
            scripts['cta']['question'] = [
                "你选哪台？评论区说",
                "如果是你，会怎么选？",
                "你踩过哪个坑？",
                "买车最后悔的是什么？评论区说说",
                "这 3 台车，你站哪台？"
            ]
        
        return scripts
    
    def optimize_title(self, original_title: str, topic: str = '') -> List[Dict]:
        """
        优化标题，生成 5 个版本
        
        Returns:
            [
                {
                    'version': 'A',
                    'title': '标题文案',
                    'style': '痛点型',
                    'score': 85,
                    'reason': '戳中用户痛点'
                }
            ]
        """
        versions = []
        
        # 版本 A: 痛点型
        hook = random.choice(self.scripts['hooks']['pain'])
        versions.append({
            'version': 'A',
            'title': self._adapt_hook(hook, topic),
            'style': '痛点型',
            'score': 85 + random.randint(-5, 10),
            'reason': '戳中用户痛点，制造焦虑感'
        })
        
        # 版本 B: 数据型
        hook = random.choice(self.scripts['hooks']['data'])
        versions.append({
            'version': 'B',
            'title': self._adapt_hook(hook, topic),
            'style': '数据型',
            'score': 80 + random.randint(-5, 10),
            'reason': '数据支撑，增强可信度'
        })
        
        # 版本 C: 反差型
        versions.append({
            'version': 'C',
            'title': f'别人都推荐买新，我劝你看看{topic or "二手"}',
            'style': '反差型',
            'score': 82 + random.randint(-5, 10),
            'reason': '预期违背，引发好奇'
        })
        
        # 版本 D: 故事型
        versions.append({
            'version': 'D',
            'title': f'我有个朋友，{topic or "买车"}时被销售上了一课',
            'style': '故事型',
            'score': 78 + random.randint(-5, 10),
            'reason': '故事叙事，增强代入感'
        })
        
        # 版本 E: 原优化版
        versions.append({
            'version': 'E',
            'title': original_title + ' (优化版)',
            'style': '原版优化',
            'score': 75 + random.randint(-5, 10),
            'reason': '保留原意，微调表达'
        })
        
        # 按分数排序
        versions.sort(key=lambda x: x['score'], reverse=True)
        
        return versions
    
    def _adapt_hook(self, hook: str, topic: str) -> str:
        """适配钩子到具体话题"""
        if not topic:
            return hook
        
        # 简单替换
        adaptations = {
            '买车': hook,
            '新手': hook.replace('新手', topic),
            '坑': hook if '坑' in hook else hook + f' - {topic}篇',
        }
        
        return adaptations.get(list(adaptations.keys())[0], hook)
    
    def design_opening_hook(self, content_type: str = 'article') -> str:
        """
        设计开头钩子 (前 3 秒/前 30 字)
        """
        style = random.choice(['pain', 'data', 'story', 'contrast'])
        hooks = self.scripts['hooks'][style]
        return random.choice(hooks)
    
    def create_golden_quote(self, topic: str = '') -> str:
        """
        打造金句
        """
        quotes = (
            self.scripts['quotes']['opinion'] +
            self.scripts['quotes']['insight'] +
            self.scripts['quotes']['advice']
        )
        
        base_quote = random.choice(quotes)
        
        # 如果话题相关，尝试适配
        if topic and '车' in topic:
            # 已经是车相关，直接返回
            return base_quote
        else:
            # 尝试泛化
            return base_quote
    
    def design_interaction(self, content_ending: str = '') -> List[str]:
        """
        设计互动引导
        """
        interactions = []
        
        # 提问式
        interactions.append(random.choice(self.scripts['cta']['question']))
        
        # 投票式
        interactions.append("A 车 vs B 车，投票选你喜欢的→")
        
        # 分享式
        interactions.append("转给正在买车的朋友，能省 1 万")
        
        return interactions
    
    def inject_creativity(self, original_text: str, topic: str = '') -> Dict:
        """
        为内容注入创意元素
        
        Returns:
            {
                'original': '原文',
                'optimized': {
                    'titles': [...],
                    'opening': '...',
                    'quotes': ['...'],
                    'interactions': ['...']
                },
                'fun_score_before': 5,
                'fun_score_after': 8,
                'suggestions': [...]
            }
        """
        # 评估原趣味性
        fun_before = self._assess_fun_level(original_text)
        
        # 生成优化方案
        titles = self.optimize_title("标题", topic)
        opening = self.design_opening_hook()
        quote = self.create_golden_quote(topic)
        interactions = self.design_interaction()
        
        # 评估优化后趣味性
        fun_after = fun_before + 3  # 简化处理
        
        return {
            'original': original_text[:100] + '...' if len(original_text) > 100 else original_text,
            'optimized': {
                'titles': titles,
                'opening': opening,
                'quotes': [quote],
                'interactions': interactions
            },
            'fun_score_before': fun_before,
            'fun_score_after': min(fun_after, 10),
            'suggestions': [
                '开头使用钩子，3 秒抓住注意力',
                '文中插入金句，增强传播性',
                '结尾设计互动，提升评论率'
            ]
        }
    
    def _assess_fun_level(self, text: str) -> int:
        """
        评估内容趣味性 (1-10 分)
        
        简化版：基于关键词匹配
        """
        score = 5  # 基础分
        
        fun_keywords = ['坑', '教训', '秘密', '真相', '套路', '千万别']
        for keyword in fun_keywords:
            if keyword in text:
                score += 1
        
        return min(score, 10)
    
    def generate_report(self, original_text: str, topic: str = '', title: str = '') -> str:
        """
        生成创意优化报告
        """
        result = self.inject_creativity(original_text, topic)
        
        report = f"""# 🎨 创意优化建议

**原标题**: {title or '未命名'}  
**优化时间**: {datetime.now().strftime('%Y-%m-%d %H:%M')}  
**优化师**: 创意注入师

---

## 📊 趣味性评估

**优化前**: {result['fun_score_before']}/10 {'😐' if result['fun_score_before'] < 6 else '😊' if result['fun_score_before'] < 8 else '🤩'}  
**优化后**: {result['fun_score_after']}/10 {'😐' if result['fun_score_after'] < 6 else '😊' if result['fun_score_after'] < 8 else '🤩'}  
**提升**: +{result['fun_score_after'] - result['fun_score_before']} 分

---

## 📝 标题优化 (5 个版本)

"""
        
        for t in result['optimized']['titles']:
            report += f"""### 版本{t['version']}: {t['style']} (评分：{t['score']})

**标题**: {t['title']}

**理由**: {t['reason']}

---

"""
        
        report += f"""## 🎣 开头钩子建议

**推荐**: {result['optimized']['opening']}

**使用说明**: 放在文章开头前 30 字，快速抓住注意力

---

## 💎 金句建议

**推荐**: {result['optimized']['quotes'][0]}

**使用说明**: 放在文章中部或结尾，增强传播性

---

## 🗣️ 互动引导建议

"""
        
        for i, interaction in enumerate(result['optimized']['interactions'], 1):
            report += f"{i}. {interaction}\n"
        
        report += """
---

## 💡 优化建议

"""
        
        for suggestion in result['suggestions']:
            report += f"- {suggestion}\n"
        
        report += f"""
---

**创意注入师**: 灵感催化剂  
**优化时间**: {datetime.now().strftime('%Y-%m-%d %H:%M')}
"""
        
        return report


def optimize_content(text: str, topic: str = '', title: str = '', output_path: str = None) -> str:
    """
    优化内容并生成报告
    
    Args:
        text: 原文内容
        topic: 话题
        title: 原标题
        output_path: 报告输出路径 (可选)
    
    Returns:
        str: 创意优化报告
    """
    injector = CreativeInjector()
    report = injector.generate_report(text, topic, title)
    
    if output_path:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report)
        print(f"✅ 创意报告已保存：{output_path}")
    
    return report


if __name__ == '__main__':
    import sys
    
    # 测试示例
    test_text = """
    年轻人买车，我建议你务实一点。
    不要只看配置，要看实际需求。
    保值率很重要，不要忽略。
    """
    
    report = optimize_content(
        text=test_text,
        topic='年轻人买车',
        title='年轻人第一台车，我劝你务实一点',
        output_path=OUTPUT_DIR / f"test-creative-{datetime.now().strftime('%Y%m%d-%H%M%S')}.md"
    )
    
    print("\n" + "="*50)
    print(report)
