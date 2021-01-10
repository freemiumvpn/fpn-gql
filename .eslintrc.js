const config = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
  },
  extends: [
    'eslint:recommended',
    /**
     * Ts
     */
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    /**
     * Prettier
     */
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

module.exports = config
