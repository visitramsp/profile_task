module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // general
    // "indent": ["error", 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    // semi: ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'no-duplicate-imports': ['error', { includeExports: true }],
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          // eslint-disable-next-line quotes
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(warn|error|info|trace|disableYellowBox|tron)$/]",
        message: 'Unexpected property on console object was called'
      }
    ],
    complexity: ['error', { max: 5 }],
    eqeqeq: ['error', 'always'],
    // react
    'react/no-unescaped-entities': ['error', { forbid: ['>', '"', '}'] }],
    // 'react/prop-types': [
    //   2,
    //   { ignore: ['action', 'dispatch', 'nav', 'navigation'] }
    // ],
    'react/display-name': 2,
    'react/jsx-boolean-value': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-key': [0],
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        noSortAlphabetically: true
      }
    ],
    'react/jsx-pascal-case': 2,
    // react-native specific rules
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2
  }
};
