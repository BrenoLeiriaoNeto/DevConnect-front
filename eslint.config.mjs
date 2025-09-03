// No TypeScript type-checking in ESLint (fast, stable)
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist', 'node_modules', 'coverage'] },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      prettier,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          // so ESLint resolves @/* via your tsconfig
          project: ['./tsconfig.app.json', './tsconfig.node.json'],
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // TS base rules (no project)
      ...tseslint.configs.recommended[1].rules,

      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Imports
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            // keep React imports at the very top of externals
            { pattern: 'react', group: 'external', position: 'before' },
            // group Vite and its plugins together
            { pattern: 'vite', group: 'external', position: 'after' },
            { pattern: '@vitejs/**', group: 'external', position: 'after' },
            // treat your aliases as internal and place before relatives
            { pattern: '@/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          distinctGroup: true,
        },
      ],
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',

      // TS niceties
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],

      // Prettier as a rule
      'prettier/prettier': 'warn',
    },
  },

  // Relax rules for config files
  {
    files: ['vite.config.ts', 'vitest.config.ts', 'eslint.config.mjs', 'prettier.config.mjs'],
    languageOptions: {
      sourceType: 'module',
      parser: (await import('typescript-eslint')).default.parser,
      globals: (await import('globals')).default.node,
    },
    rules: {
      'import/order': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
