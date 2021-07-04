/* eslint-disable sort-keys */
/**
 * Configure ESLint
 *
 * https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:import/warnings',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    globals: {
        document: true,
        window: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: [
        'prettier',
        'react',
        'react-hooks',
        'import',
        'sort-destructure-keys',
        '@typescript-eslint',
    ],
    root: true,
    rules: {
        // Enforce React Hooks rules
        // https://www.npmjs.com/package/eslint-plugin-react-hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        'sort-destructure-keys/sort-destructure-keys': [
            'error',
            { caseSensitive: false },
        ],
        'sort-keys': ['error', 'asc', { caseSensitive: false, natural: false }],
        'sort-vars': [
            'error',
            {
                ignoreCase: true,
            },
        ],
        'react/jsx-sort-props': ['error', { ignoreCase: true }],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: {
                    order: 'alphabetically',
                },
                classes: {
                    order: 'as-written',
                },
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: true,
            'eslint-import-resolver-typescript': true,
        },
        react: {
            version: 'detect',
        },
    },
};
