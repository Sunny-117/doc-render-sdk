#!/usr/bin/env sh

# abort on errors
set -e

echo "🚀 开始部署 playground..."

# 1. 构建 SDK
echo "📦 构建 SDK..."
npm run build

# 2. 构建 playground
echo "📦 构建 playground..."
cd playground
pnpm build
cd ..

# 3. 进入 playground 构建输出目录
cd playground/dist

# 如果部署到自定义域名，取消注释下面这行
# echo 'www.example.com' > CNAME

echo "📝 初始化 Git 仓库..."
git init
git add -A
git commit -m 'deploy playground'

# 部署到 GitHub Pages
# 替换为你的仓库地址
echo "🚢 推送到 GitHub Pages..."
git push -f https://github.com/Sunny-117/doc-render-sdk.git main:gh-pages

cd -

echo "✅ 部署完成！"