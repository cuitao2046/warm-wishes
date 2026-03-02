# 温暖问候小程序 🌱

一个增进亲友感情的温暖应用，激励用户每天给亲友发送温暖问候。

## ✨ 产品理念

> "每天一句问候，温暖彼此的心"

很多人不善于向亲友表达情感，这个应用通过简单的日常问候，增进人与人之间的互动和感情。

## 🎯 核心功能

### 每日一语
- 📝 每天推荐一句温馨问候语
- 🔄 手动刷新换一句
- 🏷️ 分类标签：早安、晚安、鼓励、感谢、祝福
- ⭐ 收藏喜欢的语录
- 📤 一键分享给亲友

### 亲友管理
- 👥 添加亲友（姓名 + 关系标签）
- 🏷️ 关系分类：家人、朋友、同事、其他
- 📝 简单备注
- 🔍 快速搜索

## 🛠️ 技术栈

- **框架**：uni-app（Vue 3）
- **状态管理**：Pinia
- **UI**：自定义组件 + 渐变主题
- **存储**：本地存储（可升级为 uniCloud）
- **平台**：微信小程序（可扩展至多端）

## 📱 预览

| 首页（每日一语） | 亲友管理 |
|---|---|
| 🌸 每日一语 | 👥 亲友列表 |

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd warm-wishes
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置微信小程序 AppID

编辑 `manifest.json`：

```json
{
  "mp-weixin": {
    "appid": "你的小程序AppID"
  }
}
```

### 4. 运行项目

使用 **HBuilderX**（推荐）：
1. 打开 HBuilderX
2. 导入项目目录
3. 运行 -> 运行到小程序模拟器 -> 微信开发者工具

或使用 **命令行**：
```bash
npm run dev:mp-weixin
```

然后在微信开发者工具中导入 `unpackage/dist/dev/mp-weixin`

详细说明请查看 [QUICK_START.md](./QUICK_START.md)

## 📁 项目结构

```
warm-wishes/
├── pages/              # 页面
│   ├── index/         # 首页（每日一语）
│   └── friends/       # 亲友管理
├── components/        # 组件
│   ├── quote-card/    # 问候语卡片
│   └── friend-card/   # 亲友卡片
├── store/             # 状态管理
│   ├── quote.js       # 问候语 Store
│   └── friend.js      # 亲友 Store
├── static/            # 静态资源
│   └── styles/        # 通用样式
├── uniservice/        # uniCloud 服务（待开发）
├── App.vue            # 应用入口
├── main.js            # 主入口
├── pages.json         # 页面配置
├── manifest.json      # 应用配置
└── package.json       # 依赖配置
```

## 🎨 自定义

### 修改配色

编辑 `static/styles/common.css` 修改渐变色和主题色。

### 扩展问候语

编辑 `store/quote.js` 在 `PRESET_QUOTES` 数组中添加新语录。

## 📊 开发进度

查看 [PROJECT_STATUS.md](./PROJECT_STATUS.md) 了解当前实现状态和待开发功能。

## 🔧 开发命令

```bash
# 开发模式（微信小程序）
npm run dev:mp-weixin

# 开发模式（H5）
npm run dev:h5

# 构建生产版本
npm run build:mp-weixin
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT

---

**开始传递温暖吧！** 💝
