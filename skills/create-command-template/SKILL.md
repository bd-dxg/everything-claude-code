---
name: create-command-template
description: 创建自定义斜杠命令。当用户提到「创建命令」、「自定义命令」或需要制作新的斜杠命令时使用
---

# 创建斜杠命令模板

当需要为 Claude Code 创建新的自定义斜杠命令时，使用此 Skill。

## 命令创建规则

### 存放位置

| 作用域 | 路径 |
|--------|------|
| **项目级** | `.claude/commands/` |
| **全局（用户级）** | `~/.claude/commands/` |

### 命名规范

- **文件名**：kebab-case 格式（例如 `grammar-check.md`）
- **命令名**：从文件名提取，不含扩展名（例如 `/grammar-check`）
- **子目录**：用于命名空间（例如 `frontend/component.md` → `/component`，显示为「(project:frontend)」）

## Frontmatter 字段

```yaml
---
description: 在 /help 中显示的简短描述
argument-hint: [参数1] [参数2]        # 可选：命令参数提示
allowed-tools: Tool1, Tool2        # 可选：限制可用的工具
model: claude-3-5-haiku-20241022   # 可选：指定使用的模型
disable-model-invocation: false    # 可选：禁止 Skill 工具调用
---
```

## 命令结构模板

```markdown
---
description: 命令的简短描述
argument-hint: [必填] [可选]
---

# 命令标题

命令功能的简要描述。

## 使用场景

- 场景一
- 场景二

## 输入参数

- `$ARGUMENTS` - 传递给命令的所有参数
- `$1`、`$2` - 单独的位置参数
- `@文件名` - 引用文件内容

## 使用示例

```
/命令名 参数1 参数2
```

## 注意事项

- 重要约束一
- 重要约束二
```

## 步骤流程

### 第一步：确定作用域

- **全局命令**：使用 `~/.claude/commands/`
- **项目命令**：使用 `.claude/commands/`

### 第二步：创建目录（如需要）

```bash
mkdir -p ~/.claude/commands
mkdir -p .claude/commands
```

### 第三步：创建命令文件

创建 `命令名.md`，包含：

1. **Frontmatter**：描述和可选字段
2. **Markdown 内容**：
   - 命令标题
   - 功能描述
   - 使用场景
   - 参数说明
   - 使用示例
   - 注意事项

### 第四步：验证

- 检查文件是否存在于正确路径
- 命令是否在 `/help` 中显示描述
- 使用 `/命令名` 测试

## 常用模式

### 模式一：简单提示

```markdown
---
description: 检查代码问题
---

检查以下代码：
- 安全漏洞
- 性能问题
- 代码规范违规
```

### 模式二：带参数

```markdown
---
description: 创建 git 提交
argument-hint: [提交信息]
---

使用以下信息创建 git 提交：$ARGUMENTS
```

### 模式三：Bash 执行

```markdown
---
allowed-tools: Bash(git status:*), Bash(git diff:*)
description: 显示 git 状态和变更
---

当前 git 状态：!`git status`
当前变更：!`git diff HEAD`
```

### 模式四：多步骤工作流

```markdown
---
description: 部署应用到预发布环境
---

## 第一步：构建
运行 `pnpm build` 编译应用。

## 第二步：测试
执行测试套件验证变更。

## 第三步：部署
推送到预发布环境。
```

## 快速参考

| 元素 | 格式 |
|------|------|
| 所有参数 | `$ARGUMENTS` |
| 位置参数 | `$1`、`$2`、`$3` |
| 文件引用 | `@路径/文件` |
| Bash 输出 | ``!`命令` `` |
| Frontmatter | `---` 代码块 |

## 验证清单

- [ ] 路径正确（全局还是项目）
- [ ] 文件名为 kebab-case 格式
- [ ] 包含描述 frontmatter
- [ ] 命令用途清晰
- [ ] 有使用示例
- [ ] 参数有文档说明（如适用）
- [ ] 文件创建成功
