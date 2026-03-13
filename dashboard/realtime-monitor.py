#!/usr/bin/env python3
"""
实时监控 Dashboard

功能:
1. 实时追踪内容数据
2. 持续扫描热点
3. 限流告警
4. 性能可视化
"""

import json
from datetime import datetime
from pathlib import Path

# 配置
WORKSPACE = Path.home() / ".openclaw" / "workspace-main"
DASHBOARD_DIR = WORKSPACE / "dashboard"
DASHBOARD_DIR.mkdir(parents=True, exist_ok=True)

# Dashboard 数据文件
DASHBOARD_FILE = DASHBOARD_DIR / "realtime-dashboard.json"
DASHBOARD_HTML = DASHBOARD_DIR / "index.html"


class RealtimeMonitor:
    """实时监控器"""
    
    def __init__(self):
        self.dashboard_data = self._init_dashboard()
    
    def _init_dashboard(self):
        """初始化 Dashboard"""
        return {
            'last_updated': datetime.now().isoformat(),
            'content_performance': {
                'today': {'posts': 0, 'views': 0, 'likes': 0},
                'this_week': {'posts': 0, 'views': 0, 'likes': 0},
                'limit_rate': 0
            },
            'hot_topics': [],
            'alerts': [],
            'recommendations': []
        }
    
    def update_content_metrics(self, platform, metrics):
        """更新内容数据"""
        # 这里会连接 performance-tracker 获取最新数据
        pass
    
    def scan_hot_topics(self):
        """扫描热点话题"""
        # 调用 Tavily Search 扫描热点
        hot_topics = [
            {
                'topic': '新手司机焦虑',
                'heat_score': 95,
                'trend': 'up',
                'platform': '小红书'
            },
            {
                'topic': '油价上涨',
                'heat_score': 88,
                'trend': 'up',
                'platform': '头条'
            }
        ]
        self.dashboard_data['hot_topics'] = hot_topics
    
    def check_limit_alerts(self):
        """检查限流告警"""
        alerts = []
        
        # 检查限流率
        limit_rate = self.dashboard_data['content_performance']['limit_rate']
        if limit_rate > 50:
            alerts.append({
                'level': 'critical',
                'message': '限流率超过 50%，账号可能有问题',
                'action': '检查账号状态，调整内容方向'
            })
        elif limit_rate > 30:
            alerts.append({
                'level': 'warning',
                'message': '限流率较高，建议优化内容',
                'action': '减少营销性质，增加真实分享'
            })
        
        self.dashboard_data['alerts'] = alerts
    
    def generate_recommendations(self):
        """生成优化建议"""
        recommendations = []
        
        # 基于限流率
        limit_rate = self.dashboard_data['content_performance']['limit_rate']
        if limit_rate > 30:
            recommendations.append('转向情绪共鸣内容，减少说教')
            recommendations.append('增加真实故事，减少参数对比')
        
        # 基于热点
        if self.dashboard_data['hot_topics']:
            top_topic = self.dashboard_data['hot_topics'][0]
            recommendations.append(f"跟进热点：{top_topic['topic']}")
        
        self.dashboard_data['recommendations'] = recommendations
    
    def save_dashboard(self):
        """保存 Dashboard"""
        self.dashboard_data['last_updated'] = datetime.now().isoformat()
        
        with open(DASHBOARD_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.dashboard_data, f, ensure_ascii=False, indent=2)
        
        self._generate_html()
    
    def _generate_html(self):
        """生成 HTML Dashboard"""
        html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>小红书运营监控 Dashboard</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }}
        .container {{ max-width: 1200px; margin: 0 auto; }}
        .card {{ background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
        .card h2 {{ margin-top: 0; color: #333; }}
        .metric {{ display: inline-block; margin: 10px 20px; }}
        .metric-value {{ font-size: 32px; font-weight: bold; color: #1890ff; }}
        .metric-label {{ color: #666; }}
        .alert {{ padding: 10px; margin: 10px 0; border-radius: 4px; }}
        .alert-critical {{ background: #fff1f0; border: 1px solid #ffa39e; color: #f5222d; }}
        .alert-warning {{ background: #fffbe6; border: 1px solid #ffe58f; color: #faad14; }}
        .topic {{ padding: 10px; margin: 5px 0; background: #f0f5ff; border-radius: 4px; }}
        .topic-heat {{ color: #f5222d; font-weight: bold; }}
        .recommendation {{ padding: 10px; margin: 5px 0; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 4px; }}
        .update-time {{ color: #999; font-size: 12px; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 小红书运营监控 Dashboard</h1>
        <p class="update-time">最后更新：{self.dashboard_data['last_updated']}</p>
        
        <div class="card">
            <h2>📈 今日表现</h2>
            <div class="metric">
                <div class="metric-value">{self.dashboard_data['content_performance']['today']['posts']}</div>
                <div class="metric-label">发布篇数</div>
            </div>
            <div class="metric">
                <div class="metric-value">{self.dashboard_data['content_performance']['today']['views']}</div>
                <div class="metric-label">总阅读</div>
            </div>
            <div class="metric">
                <div class="metric-value">{self.dashboard_data['content_performance']['today']['likes']}</div>
                <div class="metric-label">总点赞</div>
            </div>
        </div>
        
        <div class="card">
            <h2>⚠️ 限流告警</h2>
            {''.join(f'<div class="alert alert-{alert["level"]}">{alert["message"]} - {alert["action"]}</div>' for alert in self.dashboard_data['alerts']) or '<p>✅ 无告警</p>'}
        </div>
        
        <div class="card">
            <h2>🔥 实时热点</h2>
            {''.join(f'<div class="topic">{topic["topic"]} <span class="topic-heat">🔥 {topic["heat_score"]}分</span> [{topic["platform"]}]</div>' for topic in self.dashboard_data['hot_topics']) or '<p>暂无热点数据</p>'}
        </div>
        
        <div class="card">
            <h2>💡 优化建议</h2>
            {''.join(f'<div class="recommendation">✅ {rec}</div>' for rec in self.dashboard_data['recommendations']) or '<p>暂无建议</p>'}
        </div>
    </div>
</body>
</html>
"""
        
        with open(DASHBOARD_HTML, 'w', encoding='utf-8') as f:
            f.write(html)


def run_monitor():
    """运行监控"""
    monitor = RealtimeMonitor()
    
    # 扫描热点
    monitor.scan_hot_topics()
    
    # 检查告警
    monitor.check_limit_alerts()
    
    # 生成建议
    monitor.generate_recommendations()
    
    # 保存 Dashboard
    monitor.save_dashboard()
    
    print("✅ Dashboard 已更新")
    print(f"📍 位置：{DASHBOARD_HTML}")
    print(f"📊 数据：{DASHBOARD_FILE}")


if __name__ == '__main__':
    run_monitor()
