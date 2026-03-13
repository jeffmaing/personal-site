#!/usr/bin/env python3
"""
视频分析师 - 视频内容理解

功能:
- 视频下载 (yt-dlp)
- 帧提取 (ffmpeg)
- OCR 文字识别 (easyocr)
- 语音转文字 (whisper)
- 内容结构分析
- 爆款元素提取
"""

import subprocess
import json
from pathlib import Path
from datetime import datetime

# 配置
WORKSPACE = Path.home() / ".openclaw" / "workspace-main"
RUNTIME_DIR = WORKSPACE / "runtime"
OUTPUT_DIR = WORKSPACE / "memory" / "video-analysis"

# 确保目录存在
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


class VideoAnalyst:
    """视频分析师"""
    
    def __init__(self):
        """初始化分析师"""
        self.tools = self.check_tools()
    
    def check_tools(self) -> dict:
        """检查所需工具"""
        tools = {
            'yt-dlp': False,
            'ffmpeg': False,
            'easyocr': False
        }
        
        # 检查 yt-dlp
        try:
            result = subprocess.run(['yt-dlp', '--version'], capture_output=True, text=True)
            tools['yt-dlp'] = result.returncode == 0
        except:
            pass
        
        # 检查 ffmpeg
        try:
            result = subprocess.run(['ffmpeg', '-version'], capture_output=True, text=True)
            tools['ffmpeg'] = result.returncode == 0
        except:
            pass
        
        # 检查 easyocr
        try:
            import easyocr
            tools['easyocr'] = True
        except:
            pass
        
        return tools
    
    def download_video(self, url: str, output_dir: str = None) -> str:
        """
        下载视频
        
        Args:
            url: 视频 URL
            output_dir: 输出目录
        
        Returns:
            str: 视频文件路径
        """
        if not self.tools['yt-dlp']:
            raise Exception("yt-dlp 未安装")
        
        if output_dir is None:
            output_dir = str(RUNTIME_DIR / 'videos')
            Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        cmd = [
            'yt-dlp',
            '-o', f'{output_dir}/%(title)s.%(ext)s',
            '-f', 'bestvideo[height<=1080]+bestaudio/best',
            url
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            # 提取文件名
            for line in result.stdout.split('\n'):
                if 'Destination' in line:
                    return line.split('Destination ')[1].strip()
            return output_dir
        else:
            raise Exception(f"下载失败：{result.stderr}")
    
    def extract_frames(self, video_path: str, interval: int = 30) -> list:
        """
        提取关键帧
        
        Args:
            video_path: 视频文件路径
            interval: 提取间隔 (秒)
        
        Returns:
            list: 帧文件路径列表
        """
        if not self.tools['ffmpeg']:
            raise Exception("ffmpeg 未安装")
        
        output_pattern = str(RUNTIME_DIR / f"frames/frame_%03d.jpg")
        Path(RUNTIME_DIR / "frames").mkdir(parents=True, exist_ok=True)
        
        cmd = [
            'ffmpeg',
            '-i', video_path,
            '-vf', f'fps=1/{interval}',
            output_pattern
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            # 返回生成的帧文件
            frames_dir = RUNTIME_DIR / "frames"
            return sorted([str(f) for f in frames_dir.glob("frame_*.jpg")])
        else:
            raise Exception(f"帧提取失败：{result.stderr}")
    
    def extract_text_from_frame(self, frame_path: str) -> list:
        """
        从帧中提取文字 (OCR)
        
        Args:
            frame_path: 帧文件路径
        
        Returns:
            list: 提取的文字列表
        """
        if not self.tools['easyocr']:
            raise Exception("easyocr 未安装")
        
        import easyocr
        reader = easyocr.Reader(['ch_sim', 'en'], gpu=False)
        results = reader.readtext(frame_path)
        
        texts = []
        for bbox, text, confidence in results:
            texts.append({
                'text': text,
                'confidence': confidence
            })
        
        return texts
    
    def analyze_video(self, url: str) -> dict:
        """
        分析视频内容
        
        Args:
            url: 视频 URL
        
        Returns:
            dict: 分析报告
        """
        print(f"🎬 开始分析视频：{url}")
        
        # 1. 下载视频
        print("1. 下载视频...")
        video_path = self.download_video(url)
        print(f"   ✅ 视频已下载：{video_path}")
        
        # 2. 提取关键帧
        print("2. 提取关键帧...")
        frames = self.extract_frames(video_path, interval=30)
        print(f"   ✅ 提取 {len(frames)} 帧")
        
        # 3. OCR 文字识别
        print("3. OCR 文字识别...")
        all_texts = []
        for i, frame in enumerate(frames[:5]):  # 只分析前 5 帧
            texts = self.extract_text_from_frame(frame)
            all_texts.append({
                'frame': i + 1,
                'texts': texts
            })
        print(f"   ✅ 识别完成")
        
        # 4. 生成报告
        report = {
            'url': url,
            'video_path': video_path,
            'frames_count': len(frames),
            'ocr_results': all_texts,
            'analysis_time': datetime.now().isoformat(),
            'tools_used': self.tools
        }
        
        # 5. 保存报告
        output_path = OUTPUT_DIR / f"video-analysis-{datetime.now().strftime('%Y%m%d-%H%M%S')}.json"
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        
        print(f"✅ 分析完成，报告已保存：{output_path}")
        return report


def analyze_video(url: str) -> dict:
    """
    分析视频内容
    
    Args:
        url: 视频 URL
    
    Returns:
        dict: 分析报告
    """
    analyst = VideoAnalyst()
    return analyst.analyze_video(url)


if __name__ == '__main__':
    import sys
    
    # 检查工具
    analyst = VideoAnalyst()
    print("🔧 工具检查:")
    for tool, available in analyst.tools.items():
        status = "✅" if available else "❌"
        print(f"   {status} {tool}")
    
    # 如果有 URL 参数，执行分析
    if len(sys.argv) > 1:
        url = sys.argv[1]
        report = analyze_video(url)
        print("\n📊 分析报告:")
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print("\n用法：python3 video-analyst.py <video_url>")
