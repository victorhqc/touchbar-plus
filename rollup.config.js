import autoExternal from 'rollup-plugin-auto-external';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const config = {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    autoExternal(),
    peerDepsExternal(),
    json(),
    typescript({
      typescript: require('typescript'),
    }),
    localResolve(),
    resolve(),
    commonjs({
      namedExports: {
        './node_modules/react/index.js': [
          'Component',
          'PureComponent',
          'Fragment',
          'Children',
          'createElement',
        ],
      },
    }),
    filesize(),
  ],
};

export default config;
