#!/bin/bash
# 温暖问候小程序 - 快速启动脚本

echo "🌱 温暖问候小程序 - 快速启动"
echo "================================"
echo ""

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 未检测到 npm，请先安装 Node.js"
    exit 1
fi

# 进入项目目录
cd "$(dirname "$0")"

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已安装"
fi

echo ""
echo "🚀 启动开发环境..."
echo ""
echo "📱 请使用以下方式之一预览小程序："
echo ""
echo "方式 1: HBuilderX（推荐）"
echo "  1. 打开 HBuilderX"
echo "  2. 导入此项目目录"
echo "  3. 运行 -> 运行到小程序模拟器 -> 微信开发者工具"
echo ""
echo "方式 2: 微信开发者工具"
echo "  1. 运行编译: npm run dev:mp-weixin"
echo "  2. 在微信开发者工具中导入 unpackage/dist/dev/mp-weixin"
echo ""
echo "💡 更多信息请查看 QUICK_START.md"
