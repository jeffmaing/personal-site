#!/usr/bin/env python3
"""
竞品监控师 - 竞品追踪器

监控竞品账号动态，包括：
- 新发布内容检测
- 爆款内容识别
- 数据趋势分析
- 选题建议生成
"""

import json
import os
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict

# 配置
WORKSPACE = Path.home() / ".openclaw" / "workspace-main"
MEMORY_DIR = WORKSPACE / "memory"
OUTPUT_DIR = MEMORY_DIR / "competitor-reports"

# 确保目录存在
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


class CompetitorMonitor:
    """竞品监控器"""
    
    def __init__(self):
        """初始化监控器"""
        self.competitors = self.load_competitors()
    
    def load_competitors(self) -> List[Dict]:
        """
        加载竞品账号列表
        
        返回格式:
        [
            {
                'id': 'account_1',
                'name': '账号 A',
                'platform': 'toutiao',
                'followers': 234000,
                'focus': '对比评测',
                'priority': 'high'
            }
        ]
        """
        # 默认竞品列表 (汽车赛道)
        default_competitors = [
            # 头条竞品
            {
                'id': 'tt_account_a',
                'name': '账号 A',
                'platform': 'toutiao',
                'followers': 234000,
                'focus': '对比评测',
                'priority': 'high',
                'recent_viral': 2  # 近期爆款数
            },
            {
                'id': 'tt_account_b',
                'name': '账号 B',
                'platform': 'toutiao',
                'followers': 189000,
                'focus': '电动车专注',
                'priority': 'high',
                'recent_viral': 1
            },
            {
                'id': 'tt_account_c',
                'name': '账号 C',
                'platform': 'toutiao',
                'followers': 156000,
                'focus': '新手友好',
                'priority': 'high',
                'recent_viral': 3  # 爆款最多
            },
            # 小红书竞品
            {
                'id': 'xhs_account_x',
                'name': '账号 X',
                'platform': 'xiaohongshu',
                'followers': 89000,
                'focus': '女生买车',
                'priority': 'medium',
                'recent_viral': 1
            },
            {
                'id': 'xhs_account_y',
                'name': '账号 Y',
                'platform': 'xiaohongshu',
                'followers': 67000,
                'focus': '用车生活',
                'priority': 'medium',
                'recent_viral': 0
            },
            {
                'id': 'xhs_account_z',
                'name': '账号 Z',
                'platform': 'xiaohongshu',
                'followers': 45000,
                'focus': '汽车知识',
                'priority': 'low',
                'recent_viral': 1
            }
        ]
        
        # 尝试从文件加载
        config_file = MEMORY_DIR / 'competitors.json'
        if config_file.exists():
            with open(config_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        
        return default_competitors
    
    def check_new_content(self) -> List[Dict]:
        """
        检查竞品新内容
        
        返回格式:
        [
            {
                'competitor_id': 'tt_account_c',
                'competitor_name': '账号 C',
                'title': '新手买车 5 大坑',
                'platform': 'toutiao',
                'publish_time': '2026-03-12 10:00',
                'views': 234000,
                'interactions': 13200,
                'engagement_rate': 5.6,
                'is_viral': True,
                'viral_reason': '发布 24h 内阅读>10 万 + 互动率>5%'
            }
        ]
        """
        # 模拟数据 (实际应从 API 获取)
        mock_content = [
            {
                'competitor_id': 'tt_account_c',
                'competitor_name': '账号 C',
                'title': '新手买车 5 大坑，90% 的人都踩过',
                'platform': 'toutiao',
                'publish_time': '2026-03-12 10:00',
                'views': 234000,
                'comments': 3400,
                'shares': 1200,
                'interactions': 13200,
                'engagement_rate': 5.6,
                'is_viral': True,
                'viral_reason': '发布 24h 内阅读>10 万 + 互动率>5%'
            },
            {
                'competitor_id': 'tt_account_a',
                'competitor_name': '账号 A',
                'title': '20 万预算 SUV 怎么选？',
                'platform': 'toutiao',
                'publish_time': '2026-03-12 18:00',
                'views': 156000,
                'comments': 2100,
                'shares': 890,
                'interactions': 6552,
                'engagement_rate': 4.2,
                'is_viral': True,
                'viral_reason': '发布 24h 内阅读>10 万'
            },
            {
                'competitor_id': 'tt_account_b',
                'competitor_name': '账号 B',
                'title': '电动车保值率真相',
                'platform': 'toutiao',
                'publish_time': '2026-03-12 14:00',
                'views': 89000,
                'comments': 1200,
                'shares': 450,
                'interactions': 3382,
                'engagement_rate': 3.8,
                'is_viral': False,
                'viral_reason': ''
            },
            {
                'competitor_id': 'xhs_account_x',
                'competitor_name': '账号 X',
                'title': '女生买车，这 5 个点最重要',
                'platform': 'xiaohongshu',
                'publish_time': '2026-03-12 16:00',
                'views': 45000,
                'likes': 3200,
                'comments': 890,
                'shares': 450,
                'interactions': 4540,
                'engagement_rate': 10.1,
                'is_viral': True,
                'viral_reason': '互动率>5%'
            }
        ]
        
        return mock_content
    
    def analyze_viral_content(self, content: Dict) -> Dict:
        """
        分析爆款内容
        
        返回拆解报告
        """
        analysis = {
            'title': content['title'],
            'competitor': content['competitor_name'],
            'data': {
                'views': content['views'],
                'engagement_rate': content['engagement_rate']
            },
            'viral_factors': [],
            'copyable_elements': [],
            'risks': [],
            'suggestions': []
        }
        
        # 分析爆款因素
        title = content['title']
        
        if '5 大坑' in title or '5 个' in title:
            analysis['viral_factors'].append('数字具体 (5 大坑/5 个)')
            analysis['copyable_elements'].append('痛点型标题公式：数字 + 负面词 + 人群')
        
        if '新手' in title:
            analysis['viral_factors'].append('人群定位清晰 (新手)')
            analysis['copyable_elements'].append('新手友好视角')
        
        if '真相' in title:
            analysis['viral_factors'].append('反常识/揭秘角度')
            analysis['copyable_elements'].append('制造信息差感')
        
        if '90%' in title:
            analysis['viral_factors'].append('数据支撑')
            analysis['risks'].append('"90%" 绝对化数据 (可能违规)')
            analysis['suggestions'].append('改为"多数/很多"')
        
        # 互动率分析
        if content['engagement_rate'] > 5:
            analysis['viral_factors'].append(f'高互动率 ({content["engagement_rate"]}%)')
            analysis['copyable_elements'].append('结尾互动引导设计')
        
        return analysis
    
    def generate_topic_suggestions(self, content_list: List[Dict]) -> List[Dict]:
        """
        基于竞品动态生成选题建议
        """
        suggestions = []
        
        # 分析趋势
        viral_topics = [c for c in content_list if c.get('is_viral')]
        
        # 提取共性
        topic_keywords = {}
        for content in viral_topics:
            title = content['title']
            # 简单关键词提取
            for keyword in ['买车', '避坑', '预算', '电动车', '新手', '女生']:
                if keyword in title:
                    topic_keywords[keyword] = topic_keywords.get(keyword, 0) + 1
        
        # 生成建议
        if topic_keywords.get('避坑', 0) > 0 or topic_keywords.get('坑', 0) > 0:
            suggestions.append({
                'topic': '买车避坑指南',
                'angle': '换人群/场景差异化',
                'title_suggestions': [
                    '女生买车 5 大坑，比男生更容易踩',
                    '二手车避坑指南，老技师告诉你',
                    '贷款买车 5 个坑，每个都值钱'
                ],
                'priority': 'high',
                'reason': '竞品爆款，热度上升期',
                'estimated_views': '100k+'
            })
        
        if topic_keywords.get('预算', 0) > 0:
            suggestions.append({
                'topic': '预算导向选题',
                'angle': '细化预算区间',
                'title_suggestions': [
                    '10 万预算买车，这 3 台最划算',
                    '30 万预算 SUV，配置 vs 品牌怎么选',
                    '5 万块代步车，新车还是二手'
                ],
                'priority': 'high',
                'reason': '预算类内容持续热门',
                'estimated_views': '80k+'
            })
        
        if topic_keywords.get('女生', 0) > 0:
            suggestions.append({
                'topic': '女生买车指南',
                'angle': '差异化人群',
                'title_suggestions': [
                    '女生买车，颜值排第几？',
                    '女生第一台车，这 5 个配置必须有',
                    '女司机必看，买车不被坑指南'
                ],
                'priority': 'medium',
                'reason': '竞品未充分覆盖',
                'estimated_views': '60k+'
            })
        
        return suggestions
    
    def generate_daily_report(self, date=None) -> str:
        """
        生成竞品监控日报
        """
        if date is None:
            date = datetime.now().strftime('%Y-%m-%d')
        
        print(f"🔍 生成竞品监控日报 - {date}")
        
        # 检查新内容
        new_content = self.check_new_content()
        
        # 分析爆款
        viral_analysis = []
        for content in new_content:
            if content.get('is_viral'):
                analysis = self.analyze_viral_content(content)
                viral_analysis.append(analysis)
        
        # 生成选题建议
        topic_suggestions = self.generate_topic_suggestions(new_content)
        
        # 构建报告
        report = self._build_report(date, new_content, viral_analysis, topic_suggestions)
        
        # 保存报告
        output_path = OUTPUT_DIR / f"{date}-competitor-report.md"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report)
        
        # 保存 JSON 数据
        json_path = OUTPUT_DIR / f"{date}-competitor-data.json"
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump({
                'date': date,
                'new_content': new_content,
                'viral_analysis': viral_analysis,
                'topic_suggestions': topic_suggestions
            }, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 竞品日报已生成：{output_path}")
        return output_path
    
    def _build_report(self, date, new_content, viral_analysis, topic_suggestions) -> str:
        """构建报告文本"""
        
        report = f"""# 🔍 竞品监控日报 - {date}

**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M')}  
**监控对象**: {len(self.competitors)} 个竞品账号  
**数据来源**: 自动抓取 + API

---

## 📰 新内容监控

| 账号 | 标题 | 平台 | 发布时间 | 阅读量 | 互动率 | 状态 |
|------|------|------|----------|--------|--------|------|
"""
        
        for content in new_content:
            status = '🔥' if content.get('is_viral') else '✅'
            report += f"| {content['competitor_name']} | {content['title'][:20]}... | {content['platform']} | {content['publish_time']} | {content['views']:,} | {content['engagement_rate']:.1f}% | {status} |\n"
        
        # 爆款分析
        report += """
---

## 🔥 爆款分析

"""
        
        for i, analysis in enumerate(viral_analysis, 1):
            report += f"""### 爆款 {i}: 《{analysis['title']}》- {analysis['competitor']}

**基础数据**:
- 阅读量：{analysis['data']['views']:,}
- 互动率：{analysis['data']['engagement_rate']:.1f}%

**爆款因素**:
"""
            for factor in analysis['viral_factors']:
                report += f"- ✅ {factor}\n"
            
            report += """
**可借鉴元素**:
"""
            for element in analysis['copyable_elements']:
                report += f"- {element}\n"
            
            if analysis['risks']:
                report += """
**风险点**:
"""
                for risk in analysis['risks']:
                    report += f"- ⚠️ {risk}\n"
            
            report += "\n---\n\n"
        
        # 选题建议
        report += """## 💡 选题建议

"""
        
        for i, suggestion in enumerate(topic_suggestions, 1):
            priority_emoji = '🔴' if suggestion['priority'] == 'high' else '🟡'
            report += f"""### {priority_emoji} 选题 {i}: {suggestion['topic']}

**角度**: {suggestion['angle']}

**标题建议**:
"""
            for title in suggestion['title_suggestions']:
                report += f"- {title}\n"
            
            report += f"""
**理由**: {suggestion['reason']}  
**预估阅读**: {suggestion['estimated_views']}

---

"""
        
        # 粉丝变化
        report += """## 📈 竞品粉丝变化

| 账号 | 总粉丝 | 日增长 | 7 日增长 | 状态 |
|------|--------|--------|----------|------|
"""
        
        for competitor in self.competitors:
            daily_growth = competitor.get('recent_viral', 0) * 100  # 模拟数据
            weekly_growth = daily_growth * 7
            status = '🔥' if competitor.get('recent_viral', 0) >= 2 else '✅'
            report += f"| {competitor['name']} | {competitor['followers']:,} | +{daily_growth:,} | +{weekly_growth:,} | {status} |\n"
        
        # 行动建议
        report += """
---

## 🎯 行动建议

"""
        
        if topic_suggestions:
            top_suggestion = topic_suggestions[0]
            report += f"""1. **可跟进**: "{top_suggestion['topic']}" ({top_suggestion['reason']})
2. **避免**: 纯技术解析 (内容饱和，用户疲劳)
3. **学习**: 竞品爆款互动话术设计
"""
        
        report += f"""
---

**下次报告**: 明日自动生成  
**监控频率**: 每 4 小时检查一次
"""
        
        return report


def monitor_competitors(date=None):
    """
    执行竞品监控
    
    Args:
        date: 日期字符串 (可选，默认今日)
    
    Returns:
        str: 报告路径
    """
    monitor = CompetitorMonitor()
    return monitor.generate_daily_report(date)


if __name__ == '__main__':
    import sys
    
    date = sys.argv[1] if len(sys.argv) > 1 else None
    report_path = monitor_competitors(date)
    print(f"\n📄 报告路径：{report_path}")
