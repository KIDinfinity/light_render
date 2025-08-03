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
    '@typescript-eslint/no-this-alias': 'off',
    //'react/no-unknown-property': ['error', { ignore: ['args', 'position', 'rotation', 'intensity', 'castShadow', 'receiveShadow', 'metalness', 'roughness', 'shadow-mapSize-width', 'shadow-mapSize-height'] }],//针对threejs特有标签
    'react/no-unknown-property': 'off'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
