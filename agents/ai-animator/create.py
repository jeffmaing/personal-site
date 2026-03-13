#!/usr/bin/env python3
"""
AI 动画全自动创建脚本

使用:
python3 create.py spring-flower --auto
"""

import click
import sys
import subprocess
from pathlib import Path

# 配置
WORKSPACE = Path.home() / ".openclaw" / "workspace-main"
SCRIPTS_DIR = WORKSPACE / "memory" / "scripts"
OUTPUT_DIR = WORKSPACE / "runtime" / "ai-animations"


def load_script(script_name: str) -> dict:
    """加载脚本"""
    script_path = SCRIPTS_DIR / f"{script_name}.md"
    
    if not script_path.exists():
        click.echo(f"❌ 脚本不存在：{script_path}")
        return None
    
    click.echo(f"📝 加载脚本：{script_name}")
    
    # 简化解析
    script = {
        'scenes': [],
        'prompts': [],
        'motions': []
    }
    
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取提示词 (简化版)
    import re
    prompts = re.findall(r'/imagine prompt: (.*?)--ar', content, re.DOTALL)
    script['prompts'] = [p.strip() for p in prompts[:6]]
    
    # 提取运动描述
    motions_section = content.split('Runway 动画提示词')
    if len(motions_section) > 1:
        motions = re.findall(r'```(.*?)```', motions_section[1], re.DOTALL)
        script['motions'] = [m.strip() for m in motions[:6]]
    
    click.echo(f"  ✅ 加载成功：{len(script['prompts'])} 个场景")
    
    return script


@click.command()
@click.argument('script_name')
@click.option('--auto', is_flag=True, help='全自动模式')
@click.option('--output-dir', default='runtime/ai-animations', help='输出目录')
def create(script_name, auto, output_dir):
    """创建 AI 动画"""
    
    click.echo(f"\n🎬 AI 动画创建 - {script_name}")
    click.echo("=" * 60)
    
    # Step 0: 加载脚本
    script = load_script(script_name)
    if not script:
        return
    
    # 确保输出目录存在
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Step 1: 生成画面
    click.echo(f"\n🎨 Step 1: 生成画面 ({len(script['prompts'])} 个场景)")
    
    if script['prompts']:
        prompts_args = []
        for prompt in script['prompts']:
            prompts_args.extend(['--prompts', prompt])
        
        cmd = [
            sys.executable,
            str(WORKSPACE / 'agents/ai-animator/jimeng-cli.py'),
            'batch',
            *prompts_args,
            '--output-dir', str(output_path / 'images')
        ]
        
        result = subprocess.run(cmd)
        
        if result.returncode == 0:
            click.echo("  ✅ 画面生成完成")
        else:
            click.echo("  ⚠️  画面生成失败，请检查")
            return
    else:
        click.echo("  ⚠️  未找到提示词")
    
    # Step 2: 生成动画
    click.echo(f"\n🎬 Step 2: 生成动画 ({len(script['motions'])} 个场景)")
    
    if script['motions']:
        cmd = [
            sys.executable,
            str(WORKSPACE / 'agents/ai-animator/kling-cli.py'),
            'batch',
            '--input-dir', str(output_path / 'images'),
            '--output-dir', str(output_path / 'videos'),
            '--motions', *script['motions']
        ]
        
        result = subprocess.run(cmd)
        
        if result.returncode == 0:
            click.echo("  ✅ 动画生成完成")
        else:
            click.echo("  ⚠️  动画生成失败，请检查")
            return
    else:
        click.echo("  ⚠️  未找到运动描述")
    
    # Step 3: 自动剪辑
    click.echo(f"\n✂️ Step 3: 自动配音剪辑")
    
    cmd = [
        sys.executable,
        str(WORKSPACE / 'agents/ai-animator/auto-edit.py'),
        script_name
    ]
    
    result = subprocess.run(cmd)
    
    if result.returncode == 0:
        click.echo("  ✅ 剪辑完成")
    else:
        click.echo("  ⚠️  剪辑失败，请检查")
    
    # 完成
    click.echo("\n" + "=" * 60)
    click.echo(f"✅ AI 动画创建完成！")
    click.echo(f"📁 输出目录：{output_path}")


if __name__ == '__main__':
    create()
