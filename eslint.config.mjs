import js from '@eslint/js';
import globals from 'globals';
export default [js.configs.recommended,{files:['**/*.js','**/*.jsx','**/*.mjs'],languageOptions:{globals:{...globals.browser,...globals.node},parserOptions:{ecmaFeatures:{jsx:true}}},rules:{'no-unused-vars':['error',{varsIgnorePattern:'^[A-Z]',argsIgnorePattern:'^_'}]}}];
