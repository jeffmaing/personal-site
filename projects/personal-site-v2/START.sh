#!/bin/bash

echo "🚀 启动麻明个人网站开发服务器..."
echo ""

cd "$(dirname "$0")"

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    npm install
    echo ""
fi

echo "🔧 启动开发服务器..."
echo ""
echo "✅ 服务器将在以下地址启动："
echo "   ➜  Local:   http://localhost:5173/"
echo "   ➜  Network: http://$(hostname -I | awk '{print $1}'):5173/"
echo ""
echo "💡 按 Ctrl+C 停止服务器"
echo ""

npm run dev
