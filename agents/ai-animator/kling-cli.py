#!/usr/bin/env python3
"""
可灵 AI 命令行工具

使用:
python3 kling-cli.py animate --input scene-01.jpg --motion "描述" --output video-01.mp4
"""

import click
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout


@click.group()
def cli():
    """可灵 AI 命令行工具 - 图片生成动画"""
    pass


@cli.command()
@click.option('--input', 'input_file', required=True, help='输入图片路径')
@click.option('--motion', default='', help='运动描述')
@click.option('--output', required=True, help='输出视频路径')
@click.option('--duration', default=5, help='视频时长 (秒)')
@click.option('--strength', default=3, help='运动强度 (1-5)')
@click.option('--headless', is_flag=True, help='无头模式')
@click.option('--timeout', default=120, help='超时时间 (秒)')
def animate(input_file, motion, output, duration, strength, headless, timeout):
    """图片生成动画"""
    click.echo(f"🎬 开始生成动画...")
    click.echo(f"   输入：{input_file}")
    click.echo(f"   运动：{motion[:50] if motion else '默认'}...")
    click.echo(f"   输出：{output}")
    
    # 检查输入文件
    input_path = Path(input_file)
    if not input_path.exists():
        click.echo(f"   ❌ 输入文件不存在：{input_file}")
        return
    
    try:
        with sync_playwright() as p:
            # 启动浏览器
            browser = p.chromium.launch(headless=headless)
            context = browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            )
            page = context.new_page()
            
            # 访问可灵 AI
            click.echo("   正在访问可灵 AI...")
            page.goto("https://klingai.com", timeout=timeout * 1000)
            
            # 等待页面加载
            page.wait_for_load_state('networkidle', timeout=timeout * 1000)
            time.sleep(2)
            
            # 检查是否登录
            if 'login' in page.url.lower():
                click.echo("   ⚠️  需要登录！请先在浏览器中登录")
                click.echo("   提示：登录后重新运行命令")
                browser.close()
                return
            
            # 进入图片生成视频功能
            click.echo("   正在进入图片生成视频...")
            try:
                page.click('text=图片生成视频', timeout=5000)
                time.sleep(1)
            except:
                click.echo("   ⚠️  未找到入口，可能在主页")
            
            # 上传图片
            click.echo("   正在上传图片...")
            try:
                file_input = page.query_selector('input[type="file"]')
                if file_input:
                    file_input.set_input_files(str(input_path))
                    click.echo("   ✅ 图片已上传")
                    
                    # 等待上传完成
                    time.sleep(3)
                else:
                    click.echo("   ❌ 未找到上传按钮")
                    browser.close()
                    return
            except Exception as e:
                click.echo(f"   ❌ 上传失败：{e}")
                browser.close()
                return
            
            # 输入运动描述
            if motion:
                click.echo("   正在输入运动描述...")
                try:
                    textarea = page.query_selector('textarea[placeholder*="运动"], textarea[placeholder*="描述"]')
                    if textarea:
                        textarea.fill(motion)
                        click.echo("   ✅ 运动描述已输入")
                    else:
                        click.echo("   ⚠️  未找到输入框，使用默认")
                except Exception as e:
                    click.echo(f"   ❌ 输入失败：{e}")
            
            # 设置参数
            click.echo(f"   正在设置参数 (时长:{duration}s, 强度:{strength})...")
            try:
                # 这里可以根据实际页面调整
                # 例如选择时长、运动强度等
                pass
            except:
                click.echo("   ⚠️  参数设置失败，使用默认")
            
            # 点击生成
            click.echo("   正在点击生成...")
            try:
                generate_btn = page.get_by_role("button", name="生成")
                if generate_btn.is_visible():
                    generate_btn.click()
                    click.echo("   ✅ 生成已启动")
                else:
                    page.click('button:has-text("开始生成")')
                    click.echo("   ✅ 生成已启动 (备用按钮)")
            except Exception as e:
                click.echo(f"   ❌ 点击生成失败：{e}")
                browser.close()
                return
            
            # 等待生成完成
            click.echo("   正在等待生成完成 (这可能需要 2-3 分钟)...")
            try:
                # 等待视频出现
                page.wait_for_selector('video, .result-video', timeout=timeout * 1000)
                click.echo("   ✅ 生成完成")
            except PlaywrightTimeout:
                click.echo("   ⚠️  等待超时，可能还在生成中")
                click.echo("   提示：可以稍后手动下载")
            
            # 等待视频加载
            time.sleep(3)
            
            # 下载视频
            click.echo(f"   正在下载视频到 {output}...")
            try:
                # 找到下载按钮
                download_btn = page.get_by_role("button", name="下载")
                if download_btn.is_visible():
                    # 设置下载路径
                    download_path = Path(output)
                    download_path.parent.mkdir(parents=True, exist_ok=True)
                    
                    # 监听下载
                    with page.expect_download(timeout=60000) as download_info:
                        download_btn.click()
                    
                    download = download_info.value
                    download.save_as(str(output))
                    click.echo(f"   ✅ 视频已保存：{output}")
                else:
                    click.echo("   ⚠️  未找到下载按钮")
                    # 尝试截图作为后备
                    page.screenshot(path=output.replace('.mp4', '.png'))
                    click.echo(f"   ✅ 截图已保存：{output.replace('.mp4', '.png')}")
                    
            except Exception as e:
                click.echo(f"   ❌ 下载失败：{e}")
                # 尝试截图
                try:
                    page.screenshot(path=output.replace('.mp4', '.png'))
                    click.echo(f"   ✅ 截图已保存：{output.replace('.mp4', '.png')}")
                except:
                    pass
            
            # 关闭浏览器
            browser.close()
            click.echo("   ✅ 完成！")
            
    except Exception as e:
        click.echo(f"❌ 错误：{e}")
        raise


@cli.command()
@click.option('--input-dir', default='./input', help='输入图片目录')
@click.option('--output-dir', default='./output', help='输出视频目录')
@click.option('--motions', multiple=True, help='每个场景的运动描述')
def batch(input_dir, output_dir, motions):
    """批量生成动画"""
    click.echo(f"🎬 批量生成动画...")
    
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    # 找到所有图片
    images = sorted(input_path.glob('scene-*.jpg'))
    
    if not images:
        click.echo("   ❌ 未找到图片文件")
        return
    
    click.echo(f"   找到 {len(images)} 张图片")
    
    for i, image in enumerate(images, 1):
        click.echo(f"\n[{i}/{len(images)}]")
        
        # 获取对应的运动描述
        motion = motions[i-1] if i <= len(motions) else ""
        
        output_file = output_path / f"video-{i:02d}.mp4"
        
        # 调用 animate 命令
        ctx = cli.make_context('animate', [
            '--input', str(image),
            '--output', str(output_file),
            '--motion', motion
        ])
        cli.invoke(ctx)
    
    click.echo("\n✅ 批量生成完成！")


if __name__ == '__main__':
    cli()
