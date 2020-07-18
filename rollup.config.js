import commonjs from 'rollup-plugin-commonjs';
// import purgeCss from '@fullhuman/postcss-purgecss';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import {terser} from 'rollup-plugin-terser';
import svelte_preprocess_postcss from 'svelte-preprocess-postcss';
import sass from 'node-sass';
import copy from 'rollup-plugin-copy';

const production = !process.env.ROLLUP_WATCH;

export default {
   input: 'src/main.js',
   output: {
      format: 'iife',
      sourcemap: true,
      name: 'app',
      file: './dist/js/main.bundle.js',
   },
   plugins: [
    //   copy({
    //      targets: [
    //        { src: './src/assets/fonts', dest: './olshop/www/css/' },
    //        { src: './src/assets/index.html', dest: './olshop/www/' },
    //        { src: './src/assets/material-components.css', dest: './olshop/www/css' },
    //        { src: './src/assets/running-circle-2.gif', dest: './olshop/www/img/' },
    //      ]
    //    }),
      svelte({
         hydratable: true,
         dev: !production,
         preprocess: {
            style: svelte_preprocess_postcss(),
         },
         css: css => {
            css.write('./dist/css/components.bundle.css');
         },
      }),
      resolve(),
      commonjs(),
      postcss({
         preprocessor: (content, id) => new Promise((resolve, reject) => {
            const result = sass.renderSync({ file: id })
            resolve({ code: result.css.toString() })
          }),
         extract: true,
         extensions: ['.sass','.css', '.pcss']
      }),
      !production && livereload('./src'),
      production && terser(),
   ],
   // watch: {
   //    clearScreen: false,
   // },
};
