module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  ignorePatterns: ['vite.config.ts'],
  plugins: [
    'react'
  ],
  rules: {
    quotes: ['error', 'single'],
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    'react/jsx-wrap-multilines': [2, {
      declaration: 'parens-new-line',
      return: 'parens-new-line',
      prop: 'parens-new-line'
    }],
    'react/jsx-max-props-per-line': [2, {
      maximum: 1
    }],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-indent': [2, 2],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-one-expression-per-line': [2, {
      allow: 'single-child'
    }],
    'react/display-name': 'off'
  }
}
