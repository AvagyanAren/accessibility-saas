import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';

const compat = new FlatCompat({ baseDirectory: path.resolve() });

export default [
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: ['.next/**', 'node_modules/**', 'backup/**'],
  },
];


