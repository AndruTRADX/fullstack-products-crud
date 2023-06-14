module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'jsx-quotes': ['warn', 'prefer-double'],
    'semi': ['warn', 'never'],
  },
}