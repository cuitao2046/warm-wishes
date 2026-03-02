# 开发规范

## 分支管理策略

### 分支说明

| 分支 | 用途 | 说明 |
|-------|------|------|
| `master` | 生产分支 | 只合并可交付上线的内容，保持稳定 |
| `develop` | 开发分支 | 平时开发都在此分支进行 |
| `feature/*` | 功能分支 | 开发新功能时从 develop 创建 |
| `bugfix/*` | 修复分支 | 修复 bug 时从 develop 创建 |

### 工作流程

```
master (生产)
  ↑
  | (合并可交付功能)
  |
develop (开发)
  ↑
  | (创建功能/修复分支)
  |
  └─ feature/xxx
  └─ bugfix/xxx
```

### 开发流程

#### 1. 开发新功能

```bash
# 从 develop 创建功能分支
git checkout develop
git checkout -b feature/添加亲友表单

# 开发并提交
git add .
git commit -m "feat: 添加亲友表单页面"

# 合并回 develop
git checkout develop
git merge feature/添加亲友表单

# 删除功能分支（可选）
git branch -d feature/添加亲友表单
```

#### 2. 修复 Bug

```bash
# 从 develop 创建修复分支
git checkout develop
git checkout -b bugfix/修复收藏功能

# 修复并提交
git add .
git commit -m "fix: 修复收藏功能不生效的问题"

# 合并回 develop
git checkout develop
git merge bugfix/修复收藏功能

# 删除修复分支（可选）
git branch -d bugfix/修复收藏功能
```

#### 3. 合并到 master（可交付时）

```bash
# 确保 develop 分支测试通过
git checkout develop
# 运行测试...

# 合并到 master
git checkout master
git merge develop

# 推送到 GitHub
git push origin master
```

### 提交信息规范

使用 Conventional Commits 规范：

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档更新 |
| `style` | 代码格式调整 |
| `refactor` | 重构 |
| `test` | 测试相关 |
| `chore` | 构建/工具相关 |

**示例**：
```bash
git commit -m "feat: 添加亲友列表搜索功能"
git commit -m "fix: 修复下拉刷新不生效的问题"
git commit -m "docs: 更新开发文档"
```

### 重要原则

✅ **DO（应该做的）**
- 平时开发在 `develop` 分支进行
- 新功能或修复使用独立分支
- 功能测试通过后再合并到 `develop`
- 只有可交付上线的内容才合并到 `master`
- 合并前先拉取最新代码

❌ **DON'T（不应该做的）**
- 不要直接在 `master` 分支开发
- 不要合并未完成的功能到 `develop`
- 不要在 `master` 分支上测试
- 不要跳过 `develop` 直接合并到 `master`

### 推送规范

```bash
# 推送当前分支
git push -u origin 当前分支名

# 推送 develop 分支
git push -u origin develop

# 推送 master 分支（谨慎！）
git push origin master
```

### 查看分支状态

```bash
# 查看所有分支
git branch -a

# 查看当前分支
git branch --show-current

# 查看分支关系图
git log --graph --oneline --all
```
