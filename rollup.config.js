// NOTE: rollup.js is only used for building the server code for production

import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)

export default {
  input: './server/index.js',
  plugins: [
    json(),
    resolve({
      module: true,
      preferBuiltins: false
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'env', { modules: false } ] ],
      plugins: [
        // 'external-helpers',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    }),
    commonjs(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ],
  external,
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
      sourceMap: true
    }
  ]
};
