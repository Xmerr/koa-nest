module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest': true,
    'node': true,
  },
  'extends': ['eslint:recommended'],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'impliedStrict': true,
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'arrow-parens': ['error', 'as-needed'],
    'eqeqeq': ['error'],
    'indent': ['error', 2],
    'no-console': ['error'],
    'prefer-const': ['error'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error'],
    'sort-keys': ['error'],
    'sort-vars': ['error']
  }
};
