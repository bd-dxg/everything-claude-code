---
name: skill-template
description: 创建新的 Agent Skill。当用户提到「创建 Skill」、「创建技能」、「新建技能」或需要制作新的自定义命令时使用
---

# 创建技能模板

当需要为 Claude Code 创建新的自定义技能时，使用此模板。

## 技能目录结构

```
skills/
└── skill-name/
    ├── SKILL.md           # 必需：主说明文件
    ├── reference.md       # 可选：参考文档
    └── scripts/           # 可选：脚本目录
        └── util.sh        # 脚本文件
```

## Frontmatter 规范

```yaml
---
name: skill-name # 必需：技能名称（kebab-case，最大64字符）
description: 功能描述。当用户提到「关键词1」、「关键词2」或需要xxx时使用 # 必需：包含功能和触发场景
---
```

### name 字段要求

- 最大 64 字符
- 只能包含小写字母、数字和连字符
- 不能包含 XML 标签
- 不能使用保留词：`anthropic`、`claude`

### description 字段要求

- 非空
- 最大 1024 字符
- 应包含「做什么」和「何时使用」

## SKILL.md 内容模板

```markdown
---
name: skill-name
description: 技能的功能描述。当用户提到「关键词1」或需要xxx时使用
---

# 技能名称

简短描述这个技能的作用。

## 使用场景

- 场景一
- 场景二

## 使用方式

### 直接调用
```

Can you help me with [task]?

````

### 触发方式

当用户请求涉及 xxx 时自动触发。

## 操作步骤

### 第一步：xxx

详细说明...

### 第二步：xxx

详细说明...

## 示例

### 示例一

```typescript
// 示例代码
````

### 示例二

```typescript
// 示例代码
```

## 注意事项

- 约束一
- 约束二

````

## 创建步骤

### 第一步：确定技能名称

- 使用 kebab-case 格式
- 简短且具有描述性
- 最大 64 字符

### 第二步：创建目录结构

```bash
mkdir -p ~/.claude/skills/skill-name
mkdir -p ~/.claude/skills/skill-name/scripts
````

### 第三步：创建 SKILL.md

创建 `SKILL.md` 文件，包含：

1. **Frontmatter**：`name` 和 `description`
2. **技能标题**：H1 标题
3. **功能描述**：简短介绍
4. **使用场景**：列出适用情况
5. **使用方式**：直接调用和触发方式
6. **操作步骤**：详细流程
7. **示例**：代码示例
8. **注意事项**：约束和限制

### 第四步：创建辅助文件（如需要）

- `reference.md`：详细参考文档
- `scripts/`：可执行脚本

## 快速参考

| 元素        | 要求                                 |
| ----------- | ------------------------------------ |
| name        | 小写字母、数字、连字符，最大 64 字符 |
| description | 非空，最大 1024 字符                 |
| SKILL.md    | 必需，位于技能根目录                 |
| 目录名      | 与 name 字段一致                     |

## 验证清单

- [ ] 目录结构正确
- [ ] name 符合命名规范
- [ ] description 包含功能和场景
- [ ] SKILL.md 存在且格式正确
- [ ] 有清晰的使用示例
- [ ] 有操作步骤说明
