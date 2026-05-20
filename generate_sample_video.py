#!/usr/bin/env python3
"""
个人品牌视频样例生成器
生成一个 20 秒的专业级视频样例，展示 AI 赋能汽车诊断的效果
"""

from moviepy import (
    VideoClip, AudioClip, CompositeVideoClip, ColorClip, TextClip, ImageClip,
    concatenate_videoclips
)
from moviepy.video.fx import FadeIn, FadeOut, SlideIn, SlideOut
from moviepy.audio.io.AudioFileClip import AudioFileClip
from moviepy.audio.AudioClip import AudioClip
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import os

# 配置
WIDTH, HEIGHT = 1920, 1080
FPS = 30
OUTPUT_PATH = os.path.expanduser("~/Desktop/ai-demo-sample.mp4")

# 颜色方案（咨询风）
BG_COLOR = (15, 25, 40)  # 深蓝黑
TEXT_COLOR = (255, 255, 255)
ACCENT_BLUE = (91, 125, 177)
ACCENT_GREEN = (82, 183, 136)
ACCENT_RED = (224, 112, 112)

def create_text_frame(text, font_size=72, color=TEXT_COLOR, bg_color=BG_COLOR, 
                      font_path=None, subtitle=None, subtitle_color=(180, 180, 180)):
    """创建文字帧"""
    img = Image.new('RGBA', (WIDTH, HEIGHT), (*bg_color, 255))
    draw = ImageDraw.Draw(img)
    
    # 尝试加载字体
    try:
        if font_path and os.path.exists(font_path):
            font = ImageFont.truetype(font_path, font_size)
        else:
            font = ImageFont.load_default()
            font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", font_size)
    except:
        font = ImageFont.load_default()
    
    # 绘制主文字
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (WIDTH - text_width) // 2
    y = (HEIGHT - text_height) // 2
    
    if subtitle:
        y = (HEIGHT - text_height) // 2 - 40
    
    draw.text((x, y), text, fill=color, font=font)
    
    # 绘制副标题
    if subtitle:
        sub_font_size = font_size // 2
        try:
            sub_font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", sub_font_size)
        except:
            sub_font = font
        sub_bbox = draw.textbbox((0, 0), subtitle, font=sub_font)
        sub_width = sub_bbox[2] - sub_bbox[0]
        sub_x = (WIDTH - sub_width) // 2
        sub_y = y + text_height + 30
        draw.text((sub_x, sub_y), subtitle, fill=subtitle_color, font=sub_font)
    
    return img

def create_bar_chart_frame(progress, bar_color=ACCENT_GREEN):
    """创建进度条动画帧"""
    img = Image.new('RGBA', (WIDTH, HEIGHT), (*BG_COLOR, 255))
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 60)
        title_font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 48)
        num_font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 120)
    except:
        font = ImageFont.load_default()
        title_font = font
        num_font = font
    
    # 标题
    title = "AI 处理进度"
    draw.text(((WIDTH - 300) // 2, 200), title, fill=TEXT_COLOR, font=title_font)
    
    # 进度条背景
    bar_x, bar_y = 300, 500
    bar_width, bar_height = 1320, 80
    
    # 绘制背景条
    draw.rounded_rectangle(
        [bar_x, bar_y, bar_x + bar_width, bar_y + bar_height],
        radius=40,
        fill=(40, 50, 70)
    )
    
    # 绘制进度条
    filled_width = int(bar_width * progress)
    if filled_width > 0:
        draw.rounded_rectangle(
            [bar_x, bar_y, bar_x + filled_width, bar_y + bar_height],
            radius=40,
            fill=bar_color
        )
    
    # 百分比数字
    pct_text = f"{int(progress * 100)}%"
    num_bbox = draw.textbbox((0, 0), pct_text, font=num_font)
    num_width = num_bbox[2] - num_bbox[0]
    draw.text(((WIDTH - num_width) // 2, 650), pct_text, fill=bar_color, font=num_font)
    
    return img

def create_comparison_frame():
    """创建对比画面：2 天 vs 10 分钟"""
    img = Image.new('RGBA', (WIDTH, HEIGHT), (*BG_COLOR, 255))
    draw = ImageDraw.Draw(img)
    
    try:
        big_font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 160)
        title_font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 56)
        label_font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 40)
    except:
        big_font = ImageFont.load_default()
        title_font = big_font
        label_font = big_font
    
    # 标题
    title = "效率对比"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    draw.text(((WIDTH - title_bbox[2]) // 2, 150), title, fill=TEXT_COLOR, font=title_font)
    
    # 左边：2 天（划掉）
    old_text = "2 天"
    old_bbox = draw.textbbox((0, 0), old_text, font=big_font)
    old_x = WIDTH // 4 - old_bbox[2] // 2
    old_y = 400
    draw.text((old_x, old_y), old_text, fill=ACCENT_RED, font=big_font)
    
    # 划线
    line_y = old_y + old_bbox[3] // 2
    draw.line(
        [(old_x - 20, line_y), (old_x + old_bbox[2] + 20, line_y)],
        fill=ACCENT_RED, width=8
    )
    
    # 左边标签
    draw.text((WIDTH // 4 - 100, old_y + 180), "传统方式", fill=(150, 150, 150), font=label_font)
    
    # 右边：10 分钟
    new_text = "10 分钟"
    new_bbox = draw.textbbox((0, 0), new_text, font=big_font)
    new_x = WIDTH * 3 // 4 - new_bbox[2] // 2
    new_y = 400
    draw.text((new_x, new_y), new_text, fill=ACCENT_GREEN, font=big_font)
    
    # 右边标签
    draw.text((WIDTH * 3 // 4 - 100, new_y + 180), "AI 赋能", fill=ACCENT_GREEN, font=label_font)
    
    # 中间箭头
    arrow_x = WIDTH // 2
    arrow_y = 450
    draw.polygon([
        (arrow_x - 30, arrow_y - 40),
        (arrow_x + 30, arrow_y),
        (arrow_x - 30, arrow_y + 40)
    ], fill=ACCENT_BLUE)
    
    return img

def create_final_frame():
    """创建结尾画面"""
    img = Image.new('RGBA', (WIDTH, HEIGHT), (*BG_COLOR, 255))
    draw = ImageDraw.Draw(img)
    
    try:
        name_font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 120)
        slogan_font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 56)
        url_font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 40)
    except:
        name_font = ImageFont.load_default()
        slogan_font = name_font
        url_font = name_font
    
    # 名字
    name = "麻明"
    name_bbox = draw.textbbox((0, 0), name, font=name_font)
    draw.text(((WIDTH - name_bbox[2]) // 2, 350), name, fill=TEXT_COLOR, font=name_font)
    
    # 标语
    slogan = "用 AI 放大自己"
    slogan_bbox = draw.textbbox((0, 0), slogan, font=slogan_font)
    draw.text(((WIDTH - slogan_bbox[2]) // 2, 500), slogan, fill=ACCENT_BLUE, font=slogan_font)
    
    # 分隔线
    line_y = 600
    draw.line([(WIDTH // 2 - 200, line_y), (WIDTH // 2 + 200, line_y)], 
              fill=ACCENT_BLUE, width=3)
    
    # 网站
    url = "jeffmaing.github.io/personal-site-v2"
    url_bbox = draw.textbbox((0, 0), url, font=url_font)
    draw.text(((WIDTH - url_bbox[2]) // 2, 650), url, fill=(150, 150, 150), font=url_font)
    
    return img

def make_frame(t, frame_func):
    """将 PIL 图像转换为 numpy 数组帧"""
    img = frame_func(t) if callable(frame_func) else frame_func
    # 转换为 RGB（去掉 alpha 通道）
    if img.shape[2] == 4:
        img = img[:, :, :3]
    return img

def generate_sample_video():
    """生成完整视频"""
    clips = []
    
    # 场景 1: 开场文字（0-4s）
    print("生成场景 1: 开场文字...")
    img1 = create_text_frame(
        "传统汽车诊断需要 2 天",
        subtitle="数据分散 · 人工核对 · 报告滞后",
        font_size=80
    )
    arr1 = np.array(img1)[:, :, :3]  # 转 RGB
    clip1 = ImageClip(arr1).with_duration(4)
    clip1 = clip1.with_effects([FadeIn(1.0)])
    clips.append(clip1)
    
    # 场景 2: AI 处理进度条（4-10s）
    print("生成场景 2: AI 处理进度...")
    def progress_frame(t):
        progress = min(1.0, t / 4.0)  # 4 秒内完成
        return create_bar_chart_frame(progress)
    
    clip2 = VideoClip(frame_function=lambda t: np.array(progress_frame(t))[:, :, :3], duration=6)
    clip2 = clip2.with_effects([FadeIn(0.5)])
    clips.append(clip2)
    
    # 场景 3: 效率对比（10-15s）
    print("生成场景 3: 效率对比...")
    img3 = create_comparison_frame()
    arr3 = np.array(img3)[:, :, :3]
    clip3 = ImageClip(arr3).with_duration(5)
    clip3 = clip3.with_effects([FadeIn(0.8)])
    clips.append(clip3)
    
    # 场景 4: 成果数据（15-19s）
    print("生成场景 4: 成果数据...")
    img4 = create_text_frame(
        "150+ 家店 · 10 分钟出报告",
        subtitle="效率提升 10 倍",
        font_size=72
    )
    arr4 = np.array(img4)[:, :, :3]
    clip4 = ImageClip(arr4).with_duration(4)
    clip4 = clip4.with_effects([FadeIn(0.5)])
    clips.append(clip4)
    
    # 场景 5: 结尾（19-23s）
    print("生成场景 5: 结尾...")
    img5 = create_final_frame()
    arr5 = np.array(img5)[:, :, :3]
    clip5 = ImageClip(arr5).with_duration(4)
    clip5 = clip5.with_effects([FadeIn(1.0)])
    clips.append(clip5)
    
    # 合并所有片段
    print("合并视频...")
    final_clip = concatenate_videoclips(clips, method="compose")
    
    # 添加背景音乐（简单的正弦波作为占位）
    print("添加背景音...")
    def audio_frame(t):
        # 440Hz 正弦波，音量很低
        return 0.1 * np.sin(2 * np.pi * 440 * t)
    
    audio_clip = AudioClip(frame_function=audio_frame, duration=final_clip.duration, fps=44100)
    final_clip = final_clip.with_audio(audio_clip)
    
    # 输出视频
    print(f"输出到 {OUTPUT_PATH}...")
    final_clip.write_videofile(
        OUTPUT_PATH,
        fps=FPS,
        codec='libx264',
        audio_codec='aac',
        preset='medium',
        bitrate='5000k'
    )
    
    print(f"✅ 视频已生成: {OUTPUT_PATH}")
    return OUTPUT_PATH

if __name__ == "__main__":
    generate_sample_video()
