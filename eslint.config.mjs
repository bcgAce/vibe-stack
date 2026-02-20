// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.{js,ts,mjs}',
      '.*.js',
      'next-env.d.ts',
      'playwright-report/**',
      '.claude/**',
    ],
  },

  eslint.configs.recommended,

  ...compat.extends("next/core-web-vitals"),

  // Relaxed TypeScript — recommended instead of strict
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Relaxed — warn instead of error for common annoyances
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      // Keep these off — not useful for vibe coding
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Keep basic quality rules
      'prefer-const': 'error',
      'no-debugger': 'error',
      // Console is fine — vibe coders console.log freely
    },
  },

  // JavaScript files — no type checking
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Test files — relax even more
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
);
