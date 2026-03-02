# 快速开始 - 温暖问候小程序

## 🚀 项目初始化

### 1. 安装依赖

```bash
cd warm-wishes
npm install
```

### 2. 配置微信小程序 AppID

编辑 `manifest.json` 文件：

```json
{
  "mp-weixin": {
    "appid": "你的微信小程序AppID",
    ...
  }
}
```

获取 AppID：
1. 访问 https://mp.weixin.qq.com/
2. 登录后进入「开发」->「开发管理」
3. 复制你的 AppID

### 3. 使用 HBuilderX 开发（推荐）

1. 下载并安装 HBuilderX：https://www.dcloud.io/hbuilderx.html
2. 打开 HBuilderX，导入项目（选择 `warm-wishes` 目录）
3. 点击「运行」->「运行到小程序模拟器」->「微信开发者工具」

### 4. 或使用微信开发者工具

1. 下载并安装微信开发者工具：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. 编译项目：
   ```bash
   npm run dev:mp-weixin
   ```

3. 在微信开发者工具中，点击「导入项目」
4. 选择 `unpackage/dist/dev/mp-weixin` 目录

## 📱 功能预览

### 每日一语页
- 随机显示温馨问候语
- 点击「换一句」刷新
- 点击「收藏」保存喜欢的内容
- 点击「分享」转发给好友
- 选择标签筛选不同类型问候语

### 亲友管理页
- 添加亲友（点击「添加亲友」按钮）
- 搜索亲友
- 编辑/删除亲友
- 查看亲友数量统计

## 🎨 自定义主题

### 修改配色方案

编辑 `static/styles/common.css`，修改 CSS 变量：

```css
/* 主色调 */
--primary-color: #667eea;
--secondary-color: #764ba2;

/* 其他颜色 */
--success-color: #52c41a;
--warning-color: #faad14;
--error-color: #ff4d4f;
```

### 扩展问候语

编辑 `store/quote.js`，在 `PRESET_QUOTES` 数组中添加：

```javascript
{
  id: 100,
  content: '你的问候语文本',
  tag: QUOTE_TAGS.MORNING  // 或其他标签
}
```

## 🔧 开发命令

```bash
# 开发模式（微信小程序）
npm run dev:mp-weixin

# 开发模式（H5）
npm run dev:h5

# 构建生产版本（微信小程序）
npm run build:mp-weixin

# 构建生产版本（H5）
npm run build:h5
```

## 📊 数据存储

### 本地存储（当前方案）
- 亲友数据：`uni.setStorageSync('friends', data)`
- 发送统计：`uni.setStorageSync('sendCount_${date}', count)`

### 云开发（待集成）
未来可升级为 uniCloud，支持：
- 多端数据同步
- 用户系统
- 云函数
- 云数据库

## 🐛 常见问题

### Q: 模拟器无法显示？
A: 检查是否已正确配置 AppID，确保微信开发者工具已登录。

### Q: 收藏功能不生效？
A: 本地存储在小程序模拟器中可能会有限制，建议真机测试。

### Q: 如何添加更多功能？
A: 参考 `PROJECT_STATUS.md` 中的待完善功能清单。

## 📚 技术文档

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 文档](https://vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

---

**开始传递温暖吧！** 💝
