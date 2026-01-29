import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
  // 指定文件匹配模式 和语言选项
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },

  // 指定全局变量和环境
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Vue 3 编译器宏
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        defineSlots: 'readonly',
        useSlots: 'readonly',
        useAttrs: 'readonly'
      },
      // 使用最新的 ECMAScript 语法
      ecmaVersion: 12,
      // 代码是 ECMAScript 模块
      sourceType: 'module',
      // Vue文件用vue-eslint-parser解析
      parser: 'vue-eslint-parser',
      // 解析器选项
      parserOptions: {
        // Vue文件中的TS代码用typescript-eslint解析
        parser: tseslint.parser,
        ecmaVersion: 12,
        sourceType: 'module'
      }
    }
  },

  // 使用的扩展配置 解析器选项
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // 自定义规则
  {
    rules: {
      // 核心规则：强制Vue模板属性使用中划线（kebab-case），并开启自动修复
      'vue/attribute-hyphenation': [
        'error',
        'always',
        {
          ignore: [] // 如需忽略某些属性，可添加到这里，比如 ["data-*"]
        }
      ],
      // 生产环境中警告 console 使用，开发环境中关闭规则
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 生产环境中警告 debugger 使用，开发环境中关闭规则
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 禁用ESLint的indent规则，让Prettier处理缩进
      indent: 'off',
      // 禁用ESLint的引号规则，让Prettier处理
      quotes: 'off',
      // 禁用ESLint的分号规则，让Prettier处理
      semi: 'off',
      // 关闭未使用变量警告
      'no-unused-vars': 'off',
      // 关闭未使用变量警告
      '@typescript-eslint/no-unused-vars': 'off',
      // 允许使用any类型
      '@typescript-eslint/no-explicit-any': 'off',
      //Vue 组件的名称应该是多词的，以提高可读性和维护性
      'vue/multi-word-component-names': 'off'
    }
  },
  // 忽略文件
  {
    ignores: [
      '**/dist',
      './src/main.ts',
      '.vscode',
      '.idea',
      '*.sh',
      '**/node_modules',
      '*.md',
      '*.woff',
      '*.woff',
      '*.ttf',
      'yarn.lock',
      'package-lock.json',
      '/public',
      '/docs',
      '**/output',
      '.husky',
      '.local',
      '/bin',
      'Dockerfile',
      '.prettierrc.cjs'
    ]
  }
]
