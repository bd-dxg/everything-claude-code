---
name: project-setup
description: Vue3+TypeScript项目初始化配置。当用户需要创建新项目、初始化ESLint配置或设置开发环境时使用
---

# 项目开局配置

帮助您快速初始化Vue3+TypeScript项目的开发环境，包括ESLint、Prettier等工具配置。

## 使用场景

- 新建Vue3+TypeScript项目时
- 项目需要初始化或重构ESLint配置时
- 需要统一开发团队代码规范时

## 使用方式

### 直接调用

```
Can you help me with project setup for Vue3+TypeScript?
```

### 触发方式

当用户请求涉及以下内容时自动触发：
- "创建Vue3项目"
- "初始化ESLint配置"
- "项目开局配置"
- "Vue3+TS项目规范"

## 操作步骤

### 第一步：项目初始化

使用Vite创建Vue3+TypeScript项目：

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
```

### 第二步：安装依赖

安装ESLint及相关插件：

```bash
pnpm add -D eslint eslint-plugin-perfectionist eslint-plugin-unused-imports eslint-plugin-vue globals prettier typescript @types/node jiti @vue/eslint-config-prettier @vue/eslint-config-typescript
```

### 第三步：创建ESLint配置

在项目根目录创建`eslint.config.ts`文件：

```typescript
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginVue from 'eslint-plugin-vue'
import unusedImports from 'eslint-plugin-unused-imports'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // 通用规则配置
  {
    plugins: { perfectionist },
    rules: {
      'perfectionist/sort-imports': [
        'warn',
        {
          groups: [
            // type import 自动放最上面
            'type',
            ['builtin', 'external'],
            'internal',
            'parent',
            'sibling',
            'index',
            'unknown',
          ],
        },
      ],
      'perfectionist/sort-exports': 'warn',
    },
  },

  // Vue 框架配置
  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  // 自定义规则调整
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Vue 相关放宽
      'vue/multi-word-component-names': 'off', // 允许单单词组件名

      // TypeScript 相关放宽
      '@typescript-eslint/no-explicit-any': 'warn', // any 类型作为警告
      '@typescript-eslint/no-non-null-assertion': 'warn', // 非空断言作为警告

      // 通用规则放宽
      'no-console': 'off', // 允许 console 调试

      // 自动清理未使用的导入
      'unused-imports/no-unused-imports': 'error',
    },
  },

  // 跳过格式化配置(放在最后避免冲突)
  skipFormatting,
)
```

### 第四步：配置TypeScript

在`tsconfig.node.json`中添加必要配置：

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts", "eslint.config.ts", "prettier.config.ts"]
}
```

### 第五步：配置编辑器

在VSCode中安装以下插件：
- ESLint
- Prettier
- Vue Language Features (Volar)

创建`.vscode/settings.json`文件：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "editor.formatOnSave": true,
  "prettier.enable": true
}
```

## 示例

### 示例一：新创建项目流程

```bash
# 创建项目
npm create vite@latest vue3-ts-app -- --template vue-ts
cd vue3-ts-app

# 安装依赖
pnpm install

# 初始化配置
pnpm add -D eslint eslint-plugin-perfectionist eslint-plugin-unused-imports eslint-plugin-vue globals prettier typescript @types/node jiti @vue/eslint-config-prettier @vue/eslint-config-typescript

# 创建配置文件
# （执行上述第三步和第四步）

# 运行项目
pnpm run dev
```

### 示例二：现有项目配置

```bash
# 安装依赖
pnpm add -D eslint eslint-plugin-perfectionist eslint-plugin-unused-imports eslint-plugin-vue globals prettier typescript @types/node jiti @vue/eslint-config-prettier @vue/eslint-config-typescript

# 创建配置文件
# （执行上述第三步和第四步）

# 检查代码规范
npx eslint . --fix
```

## 注意事项

- 确保使用 pnpm 作为包管理器，避免依赖冲突
- 配置文件需要放置在项目根目录
- 首次运行可能需要重启编辑器以确保插件生效
- 如果遇到类型错误，可能需要调整 TypeScript 配置

## 核心插件说明

| 插件名                          | 作用                                  |
|-------------------------------|---------------------------------------|
| eslint-plugin-vue              | Vue官方团队维护的ESLint规则            |
| @vue/eslint-config-prettier    | Vue项目Prettier规则封装                |
| @vue/eslint-config-typescript  | Vue项目TypeScript规则封装              |
| @types/node                    | Node.js TypeScript类型支持             |
| globals                        | 提供预定义的全局变量集合               |
| eslint-plugin-unused-imports   | 检测并自动删除未使用的import           |
| eslint-plugin-perfectionist    | 强大的import、export、对象属性排序插件  |

这些配置能够显著提高AI代码生成质量，同时确保团队代码规范统一。
