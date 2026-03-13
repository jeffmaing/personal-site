#!/usr/bin/env python3
"""
内容性能追踪器

功能:
1. 追踪每篇发布内容的数据
2. 分析限流原因
3. 识别爆款元素
4. 自动调整内容策略
"""

import json
from datetime import datetime, timedelta
from pathlib import Path

# 配置
WORKSPACE = Path.home() / ".openclaw" / "workspace-main"
DATA_DIR = WORKSPACE / "data" / "performance"
DATA_DIR.mkdir(parents=True, exist_ok=True)

# 性能数据文件
PERFORMANCE_FILE = DATA_DIR / "content-performance.json"
LIMIT_ANALYSIS_FILE = DATA_DIR / "limit-analysis.json"


class PerformanceTracker:
    """内容性能追踪器"""
    
    def __init__(self):
        self.performance_data = self._load_data()
    
    def _load_data(self):
        """加载历史数据"""
        if PERFORMANCE_FILE.exists():
            with open(PERFORMANCE_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {
            'posts': [],
            'summary': {
                'total_posts': 0,
                'total_views': 0,
                'total_likes': 0,
                'total_comments': 0,
                'total_shares': 0,
                'limited_posts': 0
            }
        }
    
    def track_post(self, platform, title, content_type, metrics):
        """追踪单篇内容"""
        post = {
            'id': f"{platform}_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            'platform': platform,
            'title': title,
            'content_type': content_type,
            'publish_time': datetime.now().isoformat(),
            'metrics': metrics,
            'status': self._check_limit_status(metrics),
            'analysis': self._analyze_performance(metrics)
        }
        
        self.performance_data['posts'].append(post)
        self._update_summary()
        self._save_data()
        
        return post
    
    def _check_limit_status(self, metrics):
        """检查是否被限流"""
        views = metrics.get('views', 0)
        likes = metrics.get('likes', 0)
        
        # 小红书基准：新号首篇<100 阅读可能被限流
        if views < 100:
            return 'limited'
        elif views < 500:
            return 'low_traffic'
        else:
            return 'normal'
    
    def _analyze_performance(self, metrics):
        """分析内容表现"""
        analysis = {
            'score': 0,
            'issues': [],
            'suggestions': []
        }
        
        views = metrics.get('views', 0)
        likes = metrics.get('likes', 0)
        comments = metrics.get('comments', 0)
        shares = metrics.get('shares', 0)
        
        # 计算互动率
        if views > 0:
            engagement_rate = (likes + comments + shares) / views * 100
        else:
            engagement_rate = 0
        
        # 评分
        if views > 1000:
            analysis['score'] += 40
        elif views > 500:
            analysis['score'] += 20
        elif views > 100:
            analysis['score'] += 10
        
        if engagement_rate > 5:
            analysis['score'] += 30
        elif engagement_rate > 3:
            analysis['score'] += 20
        elif engagement_rate > 1:
            analysis['score'] += 10
        
        # 问题诊断
        if views < 100:
            analysis['issues'].append('阅读量过低，可能被限流')
            analysis['suggestions'].append('检查内容是否违规')
            analysis['suggestions'].append('优化标题和封面')
        
        if engagement_rate < 1:
            analysis['issues'].append('互动率过低')
            analysis['suggestions'].append'增加情绪共鸣内容')
            analysis['suggestions'].append('添加互动引导')
        
        if likes < comments:
            analysis['issues'].append('点赞少，内容价值感低')
            analysis['suggestions'].append'增加干货/实用价值')
        
        return analysis
    
    def _update_summary(self):
        """更新汇总数据"""
        posts = self.performance_data['posts']
        self.performance_data['summary'] = {
            'total_posts': len(posts),
            'total_views': sum(p['metrics'].get('views', 0) for p in posts),
            'total_likes': sum(p['metrics'].get('likes', 0) for p in posts),
            'total_comments': sum(p['metrics'].get('comments', 0) for p in posts),
            'total_shares': sum(p['metrics'].get('shares', 0) for p in posts),
            'limited_posts': sum(1 for p in posts if p['status'] == 'limited')
        }
    
    def _save_data(self):
        """保存数据"""
        with open(PERFORMANCE_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.performance_data, f, ensure_ascii=False, indent=2)
    
    def get_limit_analysis(self):
        """获取限流分析"""
        limited_posts = [p for p in self.performance_data['posts'] if p['status'] == 'limited']
        
        analysis = {
            'total_limited': len(limited_posts),
            'limit_rate': len(limited_posts) / max(len(self.performance_data['posts']), 1) * 100,
            'common_issues': [],
            'suggestions': []
        }
        
        # 统计常见问题
        issue_count = {}
        for post in limited_posts:
            for issue in post['analysis'].get('issues', []):
                issue_count[issue] = issue_count.get(issue, 0) + 1
        
        analysis['common_issues'] = sorted(issue_count.items(), key=lambda x: x[1], reverse=True)[:5]
        
        # 生成建议
        if analysis['limit_rate'] > 50:
            analysis['suggestions'].append('限流率过高，建议检查账号状态')
        if analysis['limit_rate'] > 30:
            analysis['suggestions'].append('调整内容方向，减少营销性质')
        
        return analysis
    
    def get_best_performing(self, limit=5):
        """获取表现最好的内容"""
        sorted_posts = sorted(
            self.performance_data['posts'],
            key=lambda x: x['analysis']['score'],
            reverse=True
        )
        return sorted_posts[:limit]
    
    def get_content_type_performance(self):
        """按内容类型分析表现"""
        type_stats = {}
        for post in self.performance_data['posts']:
            content_type = post['content_type']
            if content_type not in type_stats:
                type_stats[content_type] = {
                    'count': 0,
                    'total_views': 0,
                    'total_likes': 0,
                    'avg_score': 0
                }
            
            type_stats[content_type]['count'] += 1
            type_stats[content_type]['total_views'] += post['metrics'].get('views', 0)
            type_stats[content_type]['total_likes'] += post['metrics'].get('likes', 0)
        
        # 计算平均分
        for content_type, stats in type_stats.items():
            posts_of_type = [p for p in self.performance_data['posts'] if p['content_type'] == content_type]
            stats['avg_score'] = sum(p['analysis']['score'] for p in posts_of_type) / len(posts_of_type)
        
        return type_stats


def generate_performance_report():
    """生成性能报告"""
    tracker = PerformanceTracker()
    
    print("📊 内容性能追踪报告")
    print("=" * 60)
    print(f"生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print()
    
    # 汇总数据
    summary = tracker.performance_data['summary']
    print("📈 整体表现:")
    print(f"  总发布：{summary['total_posts']} 篇")
    print(f"  总阅读：{summary['total_views']}")
    print(f"  总点赞：{summary['total_likes']}")
    print(f"  总评论：{summary['total_comments']}")
    print(f"  被限流：{summary['limited_posts']} 篇")
    print()
    
    # 限流分析
    limit_analysis = tracker.get_limit_analysis()
    print("⚠️ 限流分析:")
    print(f"  限流率：{limit_analysis['limit_rate']:.1f}%")
    if limit_analysis['common_issues']:
        print("  常见问题:")
        for issue, count in limit_analysis['common_issues']:
            print(f"    - {issue} ({count}次)")
    if limit_analysis['suggestions']:
        print("  建议:")
        for suggestion in limit_analysis['suggestions']:
            print(f"    - {suggestion}")
    print()
    
    # 内容类型表现
    print("📝 内容类型表现:")
    type_stats = tracker.get_content_type_performance()
    for content_type, stats in sorted(type_stats.items(), key=lambda x: x[1]['avg_score'], reverse=True):
        print(f"  {content_type}:")
        print(f"    篇数：{stats['count']}")
        print(f"    平均阅读：{stats['total_views'] / max(stats['count'], 1):.0f}")
        print(f"    平均得分：{stats['avg_score']:.1f}")
    print()
    
    # 最佳内容
    print("🏆 表现最好的内容:")
    best_posts = tracker.get_best_performing(3)
    for i, post in enumerate(best_posts, 1):
        print(f"  {i}. {post['title']}")
        print(f"     类型：{post['content_type']}")
        print(f"     阅读：{post['metrics'].get('views', 0)}")
        print(f"     得分：{post['analysis']['score']}")
    print()
    
    return tracker


if __name__ == '__main__':
    generate_performance_report()
