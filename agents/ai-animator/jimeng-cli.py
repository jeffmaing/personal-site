#!/usr/bin/env python3
"""
即梦 AI 命令行工具

使用:
python3 jimeng-cli.py generate --prompt "提示词" --output scene-01.jpg
"""

import click
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout


@click.group()
def cli():
    """即梦 AI 命令行工具 - 自动生成图片"""
    pass


@cli.command()
@click.option('--prompt', required=True, help='图片生成提示词')
@click.option('--output', required=True, help='输出文件路径')
@click.option('--ratio', default='16:9', help='图片比例')
@click.option('--headless', is_flag=True, help='无头模式 (不显示浏览器)')
@click.option('--timeout', default=60, help='超时时间 (秒)')
def generate(prompt, output, ratio, headless, timeout):
    """生成图片"""
    click.echo(f"🎨 开始生成图片...")
    click.echo(f"   提示词：{prompt[:50]}...")
    click.echo(f"   输出：{output}")
    
    try:
        with sync_playwright() as p:
            # 启动浏览器
            browser = p.chromium.launch(headless=headless)
            context = browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            )
            page = context.new_page()
            
            # 访问即梦 AI
            click.echo("   正在访问即梦 AI...")
            page.goto("https://jimeng.jianying.com", timeout=timeout * 1000)
            
            # 等待页面加载
            page.wait_for_load_state('networkidle', timeout=timeout * 1000)
            time.sleep(2)  # 额外等待
            
            # 检查是否登录
            if 'login' in page.url.lower():
                click.echo("   ⚠️  需要登录！请先在浏览器中登录")
                click.echo("   提示：登录后重新运行命令")
                browser.close()
                return
            
            # 找到 AI 绘画入口
            click.echo("   正在进入 AI 绘画...")
            try:
                # 尝试点击 AI 绘画按钮
                page.click('text=AI 绘画', timeout=5000)
                time.sleep(1)
            except:
                click.echo("   ⚠️  未找到 AI 绘画按钮，可能在主页")
            
            # 找到输入框并输入提示词
            click.echo("   正在输入提示词...")
            try:
                # 尝试多种选择器
                textarea = None
                selectors = [
                    'textarea[placeholder*="提示词"]',
                    'textarea[placeholder*="描述"]',
                    'textarea',
                    'div[contenteditable="true"]'
                ]
                
                for selector in selectors:
                    try:
                        textarea = page.query_selector(selector)
                        if textarea:
                            break
                    except:
                        continue
                
                if textarea:
                    textarea.fill(prompt)
                    click.echo("   ✅ 提示词已输入")
                else:
                    click.echo("   ❌ 未找到输入框")
                    browser.close()
                    return
                
            except Exception as e:
                click.echo(f"   ❌ 输入失败：{e}")
                browser.close()
                return
            
            # 选择比例
            click.echo(f"   正在设置比例 {ratio}...")
            try:
                page.click(f'text={ratio}')
                time.sleep(0.5)
            except:
                click.echo("   ⚠️  未找到比例设置，使用默认")
            
            # 点击生成按钮
            click.echo("   正在点击生成...")
            try:
                generate_btn = page.get_by_role("button", name="生成")
                if generate_btn.is_visible():
                    generate_btn.click()
                    click.echo("   ✅ 生成已启动")
                else:
                    # 尝试其他按钮
                    page.click('button:has-text("开始生成")')
                    click.echo("   ✅ 生成已启动 (备用按钮)")
            except Exception as e:
                click.echo(f"   ❌ 点击生成失败：{e}")
                browser.close()
                return
            
            # 等待生成完成
            click.echo("   正在等待生成完成...")
            try:
                # 等待结果出现
                page.wait_for_selector('.result-image, .generated-image, img[src*="result"]', timeout=timeout * 1000 * 2)
                click.echo("   ✅ 生成完成")
            except PlaywrightTimeout:
                click.echo("   ⚠️  等待超时，可能还在生成中")
            
            # 等待图片加载
            time.sleep(3)
            
            # 下载图片
            click.echo(f"   正在下载图片到 {output}...")
            try:
                # 找到生成的图片
                img = page.query_selector('.result-image, .generated-image, img[src*="result"]')
                if img:
                    # 获取图片 URL
                    img_url = img.get_attribute('src')
                    
                    # 下载
                    if img_url.startswith('http'):
                        response = page.request.get(img_url)
                        if response.ok:
                            output_path = Path(output)
                            output_path.parent.mkdir(parents=True, exist_ok=True)
                            with open(output_path, 'wb') as f:
                                f.write(response.body())
                            click.echo(f"   ✅ 图片已保存：{output}")
                        else:
                            click.echo("   ❌ 下载失败")
                    else:
                        click.echo("   ⚠️  图片 URL 无效")
                else:
                    # 尝试截图
                    click.echo("   ⚠️  未找到图片，尝试截图...")
                    page.screenshot(path=output)
                    click.echo(f"   ✅ 截图已保存：{output}")
                    
            except Exception as e:
                click.echo(f"   ❌ 下载失败：{e}")
                # 尝试截图作为后备
                try:
                    page.screenshot(path=output)
                    click.echo(f"   ✅ 截图已保存：{output}")
                except:
                    pass
            
            # 关闭浏览器
            browser.close()
            click.echo("   ✅ 完成！")
            
    except Exception as e:
        click.echo(f"❌ 错误：{e}")
        raise


@cli.command()
@click.option('--prompts', multiple=True, help='多个提示词 (可重复)')
@click.option('--output-dir', default='./output', help='输出目录')
def batch(prompts, output_dir):
    """批量生成图片"""
    click.echo(f"🎨 批量生成 {len(prompts)} 张图片...")
    
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    for i, prompt in enumerate(prompts, 1):
        click.echo(f"\n[{i}/{len(prompts)}]")
        output_file = output_path / f"scene-{i:02d}.jpg"
        
        # 调用 generate 命令
        ctx = cli.make_context('generate', ['--prompt', prompt, '--output', str(output_file)])
        cli.invoke(ctx)
    
    click.echo("\n✅ 批量生成完成！")


if __name__ == '__main__':
    cli()
