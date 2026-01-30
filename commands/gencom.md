---
name: gencom
description: 根据 Git 历史生成提交信息。当用户提到"commit"、"提交"、"git 提交"等关键词，或在 git add 后准备提交时使用此命令
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git branch:*)
---

# 提交信息生成器

每次执行时**必须**实时获取暂存区最新状态，不要使用缓存或假设。

## 实时获取信息

```bash
# 暂存文件列表
STAGED_FILES=!`git diff --cached --name-only`

# 变更统计
STATS=!`git diff --cached --stat`

# 具体变更内容（全部显示）
DIFF=!`git diff --cached`

# 当前分支
BRANCH=!`git branch --show-current`

# 最近提交记录（分析风格）
RECENT_COMMITS=!`git log --oneline -10`
```

## 忽略规则

避免扫描以下锁文件：

- pnpm-lock.yaml
- package-lock.json
- yarn.lock
- bun.lockb

## 生成规则

基于实时获取的信息生成提交信息：

- 分析最近提交的风格和格式（emoji 前缀、中英文等）
- 根据暂存区实际变更（新增/修改/删除）选择合适的描述
- 简明扼要，突出核心改动

## GitMoji 规范

| 类型 | 图标 | 用途         |
| ---- | ---- | ------------ |
| 功能 | ✨   | 新特性       |
|      | 🚀   | 部署相关     |
|      | ⚡   | 性能优化     |
| Bug  | 🐛   | 修复 Bug     |
|      | 🚑️  | 紧急热修复   |
|      | 🔒   | 安全修复     |
| 文档 | 📝   | 写文档       |
|      | 📚   | 更新文档     |
| 样式 | 💄   | UI/样式更新  |
|      | 🎨   | 代码格式化   |
| 重构 | ♻️   | 代码重构     |
|      | 🔄   | 重构代码     |
| 测试 | ✅   | 更新测试     |
| 依赖 | ➕   | 添加依赖     |
|      | ➖   | 删除依赖     |
|      | ⬆️   | 升级依赖     |
| 构建 | 📦   | 构建/包更新  |
|      | 🔧   | 配置修改     |
| 清理 | 🔥   | 删除代码     |
|      | 🗑️   | 删除废弃代码 |

## 输出要求

**必须使用 markdown 代码块格式输出**，将提交信息包裹在 ```markdown 代码块中，不要直接输出渲染后的文本。

示例输出格式：
```markdown
✅ 新增 SelectColor 组件测试

- 添加渲染测试：验证 select 元素和 label 文本
- 添加用户交互测试：验证点击后显示 3 个选项
```

注意：
- 不要展示获取的 git 信息内容（STAGED_FILES、DIFF 等）
- 只输出最终的提交信息，且必须在代码块中
