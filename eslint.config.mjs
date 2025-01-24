import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

const config = [
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'next/core-web-vitals',
            'next/typescript',
            'plugin:import/recommended',
            'plugin:jsx-a11y/recommended',
            'plugin:tailwindcss/recommended',
            'plugin:@typescript-eslint/strict',
            'plugin:@typescript-eslint/stylistic',
            'prettier',
        ),
    ),
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
                sourceType: 'module',
            },
        },
        rules: {
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
            'import/first': 'warn',
            'import/newline-after-import': 'warn',
            'import/no-duplicates': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-definitions': 'error',
            '@typescript-eslint/consistent-type-assertions': 'error',
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
];

export default config;
