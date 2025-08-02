module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // 你可以在这里添加或覆盖规则
    'no-restricted-globals': ['error', 'event', 'fdescribe'], // 移除 'self'
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/react-in-jsx-scope': 'off', // CRA 不需要显式引入 React
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
