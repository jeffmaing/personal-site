#!/usr/bin/env python3
"""
AI 动画 - 自动配音剪辑脚本

功能:
- 自动生成 6 段配音 (Edge TTS)
- 自动合成视频 + 配音
- 自动添加 BGM
- 自动添加转场
- 自动导出

使用:
python3 auto-edit.py spring-flower
"""

import os
import subprocess
import asyncio
import edge_tts
from pathlib import Path
from datetime import datetime

# 配置
WORKSPACE = Path.home() / ".openclaw" / "workspace-main"
INPUT_DIR = WORKSPACE / "runtime" / "ai-animations"
OUTPUT_DIR = INPUT_DIR
SCRIPTS_DIR = WORKSPACE / "memory" / "scripts"

# 确保目录存在
INPUT_DIR.mkdir(parents=True, exist_ok=True)


# 旁白文案
NARRATIONS = [
    "每一个清晨，都是新的开始",
    "深呼吸，感受生活的美好",
    "美好，藏在每一个细节里",
    "慢下来，你会发现更多",
    "生活，本该如此温柔",
    "春日花开，你也值得被温柔以待"
]


async def generate_tts(text, output_path):
    """生成 TTS 配音"""
    print(f"  生成配音：{text}")
    communicate = edge_tts.Communicate(text, "zh-CN-XiaoxiaoNeural")
    await communicate.save(output_path)


def generate_all_narrations():
    """生成所有配音"""
    print("\n🎙️ 生成配音...")
    
    audio_files = []
    for i, narration in enumerate(NARRATIONS, 1):
        audio_path = INPUT_DIR / f"narration-{i:02d}.mp3"
        asyncio.run(generate_tts(narration, audio_path))
        audio_files.append(str(audio_path))
    
    return audio_files


def merge_video_audio(video_path, audio_path, output_path):
    """合并视频和配音"""
    cmd = [
        'ffmpeg',
        '-i', str(video_path),
        '-i', str(audio_path),
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-map', '0:v',
        '-map', '1:a',
        '-shortest',
        '-y',
        str(output_path)
    ]
    subprocess.run(cmd, capture_output=True)


def add_bgm(input_path, bgm_path, output_path):
    """添加背景音乐"""
    cmd = [
        'ffmpeg',
        '-i', str(input_path),
        '-i', str(bgm_path),
        '-filter_complex', '[0:a]volume=1[a];[1:a]volume=0.3[b];[a][b]amix=2[c]',
        '-c:v', 'copy',
        '-map', '0:v',
        '-map', '[c]',
        '-y',
        str(output_path)
    ]
    subprocess.run(cmd, capture_output=True)


def concat_videos(video_files, output_path):
    """拼接多个视频"""
    # 创建文件列表
    list_file = INPUT_DIR / "video_list.txt"
    with open(list_file, 'w') as f:
        for video in video_files:
            f.write(f"file '{video}'\n")
    
    # 拼接
    cmd = [
        'ffmpeg',
        '-f', 'concat',
        '-safe', '0',
        '-i', str(list_file),
        '-c', 'copy',
        '-y',
        str(output_path)
    ]
    subprocess.run(cmd, capture_output=True)


def auto_edit(script_name: str):
    """自动剪辑"""
    print(f"\n🎬 开始自动剪辑 - {script_name}")
    print("=" * 60)
    
    # Step 1: 检查输入文件
    print("\n📂 检查输入文件...")
    video_files = []
    for i in range(1, 7):
        video_path = INPUT_DIR / f"video-{i:02d}.mp4"
        if video_path.exists():
            video_files.append(str(video_path))
            print(f"  ✅ video-{i:02d}.mp4")
        else:
            print(f"  ❌ video-{i:02d}.mp4 不存在")
    
    if len(video_files) < 6:
        print("\n⚠️  视频文件不全，请先完成 Step 1 和 Step 2")
        return None
    
    # Step 2: 生成配音
    audio_files = generate_all_narrations()
    
    # Step 3: 合并视频 + 配音
    print("\n🎞️  合并视频和配音...")
    merged_files = []
    for i, (video, audio) in enumerate(zip(video_files, audio_files), 1):
        merged_path = INPUT_DIR / f"merged-{i:02d}.mp4"
        merge_video_audio(video, audio, merged_path)
        merged_files.append(str(merged_path))
        print(f"  ✅ 场景{i} 合并完成")
    
    # Step 4: 拼接所有场景
    print("\n🔗 拼接所有场景...")
    final_path = OUTPUT_DIR / f"final-{script_name}-{datetime.now().strftime('%Y%m%d-%H%M%S')}.mp4"
    concat_videos(merged_files, final_path)
    print(f"  ✅ 拼接完成：{final_path}")
    
    # Step 5: 添加 BGM (可选)
    # 需要有 BGM 文件
    bgm_file = WORKSPACE / "assets" / "bgm-spring.mp3"
    if bgm_file.exists():
        print("\n🎵 添加 BGM...")
        bgm_output = OUTPUT_DIR / f"with-music-{script_name}.mp4"
        add_bgm(final_path, bgm_file, bgm_output)
        print(f"  ✅ BGM 添加完成：{bgm_output}")
        final_path = bgm_output
    
    print("\n" + "=" * 60)
    print(f"✅ 自动剪辑完成！")
    print(f"📁 输出：{final_path}")
    
    return str(final_path)


if __name__ == '__main__':
    import sys
    
    script_name = 'spring-flower'
    if len(sys.argv) > 1:
        script_name = sys.argv[1]
    
    output = auto_edit(script_name)
    
    if output:
        print(f"\n🎉 完成！视频位置：{output}")
    else:
        print("\n❌ 失败，请检查输入文件")
