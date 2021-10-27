module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
      },
    ],
    camelcase: [
      'warn',
      {
        properties: 'never',
        ignoreDestructuring: true,
      },
    ],
  },
};
