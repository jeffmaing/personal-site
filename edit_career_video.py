#!/usr/bin/env python3
"""
剪辑职业历程视频：将5段现有视频拼接成专业短片
添加：转场、片头片尾、统一节奏
"""

from moviepy import (
    VideoClip, CompositeVideoClip, concatenate_videoclips, ColorClip, ImageClip,
    TextClip
)
from moviepy.video.fx import FadeIn, FadeOut, CrossFadeIn, CrossFadeOut, SlideIn, SlideOut
import os
import numpy as np

# 路径
BASE = "/Users/maming/Desktop/03-AI项目与个人/personal-site"
VIDEOS = [
    os.path.join(BASE, "intro.mp4"),      # 0. 个人介绍
    os.path.join(BASE, "benz.mp4"),       # 1. 奔驰
    os.path.join(BASE, "infiniti.mp4"),   # 2. 英菲尼迪
    os.path.join(BASE, "ey.mp4"),         # 3. 安永
    os.path.join(BASE, "yiche.mp4"),      # 4. 易车
]
OUTPUT = os.path.join(BASE, "career-highlight.mp4")

def create_title_card(text, subtitle="", duration=3):
    """创建片头/片尾卡片"""
    from PIL import Image, ImageDraw, ImageFont
    
    WIDTH, HEIGHT = 1920, 1080
    img = Image.new('RGBA', (WIDTH, HEIGHT), (15, 25, 40, 255))
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/STHeiti Medium.ttc", 90)
        sub_font = ImageFont.truetype("/System/Library/Fonts/STHeiti Light.ttc", 50)
    except:
        font = ImageFont.load_default()
        sub_font = font
    
    # 主文字
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    draw.text(((WIDTH - w) // 2, 450), text, fill=(255, 255, 255), font=font)
    
    # 副标题
    if subtitle:
        sub_bbox = draw.textbbox((0, 0), subtitle, font=sub_font)
        sw = sub_bbox[2] - sub_bbox[0]
        draw.text(((WIDTH - sw) // 2, 580), subtitle, fill=(91, 125, 177), font=sub_font)
    
    return ImageClip(np.array(img)[:, :, :3]).with_duration(duration)

def main():
    print("加载视频...")
    clips = []
    for path in VIDEOS:
        from moviepy import VideoFileClip
        clip = VideoFileClip(path)
        # 统一裁剪到 12 秒，保持节奏
        if clip.duration > 12:
            clip = clip.subclipped(0, 12)
        clips.append(clip)
    
    print("创建片头...")
    title = create_title_card("麻明的职业旅程", "19年 · 5大品牌 · AI 赋能", duration=3)
    title = title.with_effects([FadeIn(1.0), FadeOut(1.0)])
    
    print("创建片尾...")
    outro = create_title_card("用 AI 放大自己", "jeffmaing.github.io/personal-site-v2", duration=4)
    outro = outro.with_effects([FadeIn(1.0), FadeOut(1.0)])
    
    print("添加转场并拼接...")
    # 给每个片段加淡入淡出
    processed_clips = []
    for i, clip in enumerate(clips):
        c = clip.with_effects([FadeIn(0.5), FadeOut(0.5)])
        processed_clips.append(c)
    
    # 拼接：片头 + 5段视频 + 片尾
    final = concatenate_videoclips(
        [title] + processed_clips + [outro],
        method="compose"
    )
    
    print(f"输出到 {OUTPUT}...")
    final.write_videofile(
        OUTPUT,
        fps=30,
        codec='libx264',
        preset='medium',
        bitrate='5000k',
        logger='bar'
    )
    print(f"✅ 完成: {OUTPUT}")

if __name__ == "__main__":
    main()
