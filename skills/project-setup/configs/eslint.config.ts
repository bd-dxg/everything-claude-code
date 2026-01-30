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
