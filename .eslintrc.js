/**
 * Configure ESLint
 *
 * https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    extends: [
        'airbnb',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
        'prettier/react'
    ],
    plugins: ['jsx-a11y', 'react-hooks', 'import'],
    globals: {
        document: true,
        window: true
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
        'prettier/prettier': 'error',
        'react/destructuring-assignment': 0,
        'react/static-property-placement': 0,
        'react/jsx-props-no-spreading': 0,
        // Enforce React Hooks rules
        // https://www.npmjs.com/package/eslint-plugin-react-hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    }
};
