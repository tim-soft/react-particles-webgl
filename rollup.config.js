import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

import pkg from './package.json';

const root = process.platform === 'win32' ? path.resolve('/') : '/';

export default {
    external: (id) =>
        (!id.startsWith('.') && !id.startsWith(root)) ||
        id.includes('@babel/runtime'),
    input: './src/index.tsx',
    output: [
        {
            exports: 'named',
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            exports: 'named',
            file: pkg.module,
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        nodeResolve(),
        commonjs({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            include: 'node_modules/**',
        }),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        terser(),
        // filesize(),
    ],
};
