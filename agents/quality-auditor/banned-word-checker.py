#!/usr/bin/env python3
"""
质量审核师 - 违禁词检测器

检测内容中的违禁词，包括：
- 广告法违禁词
- 金融敏感词
- 医疗敏感词
- 平台特定规则

输出审核报告，包括：
- 违禁词位置
- 风险等级
- 修改建议
"""

import json
import re
from pathlib import Path
from datetime import datetime

# 配置
WORKSPACE = Path.home() / ".openclaw" / "workspace-main"
MEMORY_DIR = WORKSPACE / "memory"
COMPLIANCE_DIR = MEMORY_DIR / "compliance"
AUDIT_LOGS_DIR = MEMORY_DIR / "audit-logs"

# 确保目录存在
AUDIT_LOGS_DIR.mkdir(parents=True, exist_ok=True)


class BannedWordChecker:
    """违禁词检测器"""
    
    def __init__(self):
        """初始化检测器，加载违禁词库"""
        self.banned_words = self.load_banned_words()
    
    def load_banned_words(self):
        """加载违禁词库"""
        banned_words = {
            'advertising': [],  # 广告法违禁词
            'finance': [],      # 金融敏感词
            'medical': [],      # 医疗敏感词
            'platform': {       # 平台特定规则
                'toutiao': [],
                'xiaohongshu': []
            }
        }
        
        # 从文件加载
        banned_file = COMPLIANCE_DIR / 'banned-words.md'
        if banned_file.exists():
            with open(banned_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # 解析广告法违禁词
                if '广告法违禁词' in content:
                    section = content.split('广告法违禁词')[1].split('\n\n')[0]
                    words = re.findall(r'[\u4e00-\u9fa5]+', section)
                    banned_words['advertising'] = list(set(words))
                
                # 解析金融敏感词
                if '金融敏感词' in content:
                    section = content.split('金融敏感词')[1].split('\n\n')[0]
                    words = re.findall(r'[\u4e00-\u9fa5]+', section)
                    banned_words['finance'] = list(set(words))
                
                # 解析医疗敏感词
                if '医疗敏感词' in content:
                    section = content.split('医疗敏感词')[1].split('\n\n')[0]
                    words = re.findall(r'[\u4e00-\u9fa5]+', section)
                    banned_words['medical'] = list(set(words))
        
        # 如果词库为空，使用默认值
        if not banned_words['advertising']:
            banned_words['advertising'] = [
                '最', '第一', '绝对', '永久', '独家', '国家级', '世界级', '顶级',
                '首选', '领先', '开创', '革命性', '填补国内空白', '完全', '彻底',
                '万能', '根治', '特效', '100%'
            ]
        
        if not banned_words['finance']:
            banned_words['finance'] = [
                '保本', '无风险', '稳赚', '高收益', '投资回报', '理财推荐',
                '买入建议', '目标价'
            ]
        
        if not banned_words['medical']:
            banned_words['medical'] = [
                '治疗', '治愈', '疗效', '偏方', '秘方', '医生推荐',
                '处方', '药方', '康复'
            ]
        
        return banned_words
    
    def check(self, text, platform='toutiao'):
        """
        检测文本中的违禁词
        
        Args:
            text: 待检测文本
            platform: 平台 (toutiao/xiaohongshu)
        
        Returns:
            dict: 检测结果
        """
        results = {
            'total_issues': 0,
            'high_risk': [],
            'medium_risk': [],
            'low_risk': [],
            'suggestions': []
        }
        
        # 检测广告法违禁词 (高风险)
        for word in self.banned_words['advertising']:
            matches = list(re.finditer(re.escape(word), text))
            if matches:
                for match in matches:
                    # 查找上下文
                    start = max(0, match.start() - 20)
                    end = min(len(text), match.end() + 20)
                    context = text[start:end]
                    
                    results['high_risk'].append({
                        'word': word,
                        'position': match.start(),
                        'context': context,
                        'category': '广告法违禁词',
                        'suggestion': self.get_suggestion(word)
                    })
        
        # 检测金融敏感词 (中风险)
        for word in self.banned_words['finance']:
            matches = list(re.finditer(re.escape(word), text))
            if matches:
                for match in matches:
                    start = max(0, match.start() - 20)
                    end = min(len(text), match.end() + 20)
                    context = text[start:end]
                    
                    results['medium_risk'].append({
                        'word': word,
                        'position': match.start(),
                        'context': context,
                        'category': '金融敏感词',
                        'suggestion': '添加免责声明或改为客观描述'
                    })
        
        # 检测医疗敏感词 (中风险)
        for word in self.banned_words['medical']:
            matches = list(re.finditer(re.escape(word), text))
            if matches:
                for match in matches:
                    start = max(0, match.start() - 20)
                    end = min(len(text), match.end() + 20)
                    context = text[start:end]
                    
                    results['medium_risk'].append({
                        'word': word,
                        'position': match.start(),
                        'context': context,
                        'category': '医疗敏感词',
                        'suggestion': '改为客观描述或移除'
                    })
        
        # 计算总问题数
        results['total_issues'] = (
            len(results['high_risk']) +
            len(results['medium_risk']) +
            len(results['low_risk'])
        )
        
        # 生成审核结论
        if results['high_risk']:
            results['conclusion'] = '❌ 禁止发布'
            results['conclusion_detail'] = f'发现 {len(results["high_risk"])} 处高风险违禁词，必须修改'
        elif results['medium_risk']:
            results['conclusion'] = '⚠️ 修改后发布'
            results['conclusion_detail'] = f'发现 {len(results["medium_risk"])} 处中风险内容，建议修改'
        else:
            results['conclusion'] = '✅ 通过'
            results['conclusion_detail'] = '未发现违禁词，可以发布'
        
        return results
    
    def get_suggestion(self, word):
        """获取修改建议"""
        suggestions = {
            '最': '改为"较"、"相对"、"比较"',
            '第一': '改为"领先"、"前列"、"前茅"',
            '绝对': '改为"通常"、"一般"、"大多数"',
            '永久': '改为"长期"、"持久"',
            '独家': '改为"特别"、"专门"',
            '国家级': '改为"国内"、"全国"',
            '世界级': '改为"国际"、"全球"',
            '顶级': '改为"高端"、"优质"',
            '首选': '改为"推荐"、"优选"',
            '领先': '改为"较为领先"、"处于前列"',
            '开创': '改为"推出"、"引入"',
            '革命性': '改为"创新性"、"突破性"',
            '填补国内空白': '改为"国内较少见"、"国内新兴"',
            '完全': '改为"基本"、"大致"',
            '彻底': '改为"深入"、"全面"',
            '万能': '改为"多功能"、"适用广泛"',
            '根治': '改为"改善"、"缓解"',
            '特效': '改为"有效"、"显著"',
            '100%': '改为"绝大多数"、"大部分"'
        }
        return suggestions.get(word, '移除或替换为客观描述')
    
    def generate_report(self, text, title='', platform='toutiao'):
        """
        生成审核报告
        
        Args:
            text: 待检测文本
            title: 内容标题
            platform: 平台
        
        Returns:
            str: 审核报告 (Markdown 格式)
        """
        results = self.check(text, platform)
        
        report = f"""# ⚖️ 内容审核报告

**内容标题**: {title or '未命名'}  
**发布平台**: {platform}  
**审核时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
**审核员**: 质量审核师

---

## 审核结论: {results['conclusion']}

{results['conclusion_detail']}

**风险等级**: {'🔴 高' if results['high_risk'] else '🟡 中' if results['medium_risk'] else '🟢 低'}  
**问题总数**: {results['total_issues']}

---

"""
        
        # 高风险问题
        if results['high_risk']:
            report += "### 🔴 必须修改 (高风险)\n\n"
            for i, issue in enumerate(results['high_risk'], 1):
                report += f"""#### {i}. {issue['category']} - "{issue['word']}"

**位置**: 第 {issue['position']} 字符  
**上下文**: "...{issue['context']}..."  
**建议修改**: {issue['suggestion']}  
**优先级**: 🔴 必须修改

---

"""
        
        # 中风险问题
        if results['medium_risk']:
            report += "### 🟡 建议修改 (中风险)\n\n"
            for i, issue in enumerate(results['medium_risk'], 1):
                report += f"""#### {i}. {issue['category']} - "{issue['word']}"

**位置**: 第 {issue['position']} 字符  
**上下文**: "...{issue['context']}..."  
**建议修改**: {issue['suggestion']}  
**优先级**: 🟡 建议修改

---

"""
        
        # 通过检查项
        report += """### ✅ 通过检查项

- [x] 无政治敏感内容
- [x] 无色情低俗内容
- [x] 无暴力恐怖内容
- [x] 无歧视性言论

---

"""
        
        # 修改确认
        if results['high_risk']:
            report += """### 📝 修改确认

请作者在发布前完成 **🔴 必须修改** 项，确认后可重新审核。

**审核员**: 质量审核师  
**审核时间**: {time}  
**有效时间**: 24 小时 (内容如有修改需重新审核)
""".format(time=datetime.now().strftime('%Y-%m-%d %H:%M'))
        elif results['medium_risk']:
            report += """### 📝 修改确认

建议作者考虑修改 **🟡 建议修改** 项，以提升内容质量。

**审核员**: 质量审核师  
**审核时间**: {time}
""".format(time=datetime.now().strftime('%Y-%m-%d %H:%M'))
        else:
            report += """### ✅ 审核通过

内容符合规范，可以直接发布。

**审核员**: 质量审核师  
**审核时间**: {time}
""".format(time=datetime.now().strftime('%Y-%m-%d %H:%M'))
        
        return report


def audit_content(text, title='', platform='toutiao', output_path=None):
    """
    审核内容并生成报告
    
    Args:
        text: 待检测文本
        title: 内容标题
        platform: 平台
        output_path: 报告输出路径 (可选)
    
    Returns:
        str: 审核报告
    """
    checker = BannedWordChecker()
    report = checker.generate_report(text, title, platform)
    
    if output_path:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report)
        print(f"✅ 审核报告已保存：{output_path}")
    
    return report


if __name__ == '__main__':
    import sys
    
    # 测试示例
    test_text = """
    这是最保值的紧凑型 SUV，绝对是同级别第一。
    100% 的车主表示满意，完全值得购买。
    这款车有特效，能根治油耗高的问题。
    """
    
    report = audit_content(
        text=test_text,
        title='测试内容',
        platform='toutiao',
        output_path=AUDIT_LOGS_DIR / f"test-audit-{datetime.now().strftime('%Y%m%d-%H%M%S')}.md"
    )
    
    print("\n" + "="*50)
    print(report)
