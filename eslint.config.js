import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierConfig from 'eslint-config-prettier'

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      '.vite-temp',
      'coverage',
      'e2e/**',
      'src/routeTree.gen.ts',
      'src/routeTree.gen.js',
      'scripts/**',
    ],
  },
  // React source files (excluding UI components with TS syntax)
  {
    files: ['src/**/*.{js,jsx}'],
    ignores: ['src/components/ui/**'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, process: 'readonly' },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'react-refresh/only-export-components': 'off',
      'no-unused-vars': 'off', // Turn off for development - components are work in progress
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-undef': 'error',
    },
  },
  // Config files (Node.js environment)
  {
    files: [
      '*.config.js',
      '*.config.mjs',
      'playwright.config.js',
      'vitest.config.js',
      'vite.config.js',
      'prettier.config.js',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.node, __dirname: 'readonly', process: 'readonly' },
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  // Test files
  {
    files: ['src/**/*.test.{js,jsx}', 'e2e/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'off',
      'no-console': 'off',
    },
  },
]
