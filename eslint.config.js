//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    ignores: [
      'e2e/**',
      '*.config.js',
      'prettier.config.js',
      'src/components/ui/sidebar.tsx',
      'src/components/ui/input-group.tsx',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
]
