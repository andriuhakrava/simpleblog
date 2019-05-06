module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 0,
    'max-len': ['error', { code: 1222 }],
    'import/no-cycle': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-shadow': ['error', { allow: ['state', 'error'] }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
