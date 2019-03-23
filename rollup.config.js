import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

import pkg from './package.json';

const root = process.platform === 'win32' ? path.resolve('/') : '/';
const external = id => !id.startsWith('.') && !id.startsWith(root);
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const getBabelOptions = ({ useESModules }, targets) => ({
  babelrc: false,
  extensions,
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  presets: [
    ['@babel/preset-env', { loose: true, modules: false, targets }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['transform-react-remove-prop-types', { removeImport: true }],
    ['@babel/plugin-transform-runtime', { regenerator: false, useESModules }]
  ]
});

function createConfig() {
  return [
    {
      input: 'src/index.js',
      output: {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      },
      external,
      plugins: [
        babel(
          getBabelOptions(
            { useESModules: true },
            '>1%, not dead, not ie 11, not op_mini all'
          )
        ),
        // sizeSnapshot(),
        resolve({ extensions })
      ]
    },
    {
      input: 'src/index.js',
      output: {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      external,
      plugins: [
        babel(getBabelOptions({ useESModules: false })),
        // sizeSnapshot(),
        resolve({ extensions })
      ]
    }
  ];
}

export default [...createConfig()];
