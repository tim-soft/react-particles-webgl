/**
 * Configure ESLint
 *
 * https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:import/warnings'],
  env: {
    es6: true
  },
  plugins: ['prettier', 'import'],
  globals: {
    document: true,
    window: true,
    process: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'class-methods-use-this': 0,
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
    'react/no-unused-prop-types': 0,
    'consistent-return': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'import/no-extraneous-dependencies': 0,
    'prettier/prettier': 'error',
    'react/destructuring-assignment': 0
  }
};
