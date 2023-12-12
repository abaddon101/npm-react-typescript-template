const postcss = require('rollup-plugin-postcss');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const svgr = require('@svgr/rollup');

module.exports = {
  input: 'src/index.tsx', // Entry point for the bundle
  output: [
    {
      dir: 'dist', // Output directory for CommonJS modules
      format: 'cjs', // CommonJS module format
      sourcemap: true, // Generate source maps for debugging
    },
    {
      file: 'dist/index.js', // Output file for CommonJS module
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js', // Output file for ECMAScript module
      format: 'esm', // ECMAScript module format
    },
  ],
  plugins: [
    peerDepsExternal(), // Exclude peer dependencies from bundle
    resolve(), // Resolve node_modules dependencies
    typescript(), // Compile TypeScript code
    commonjs(), // Convert CommonJS modules to ES6
    postcss({
      modules: true, // Enable CSS modules if needed
      extract: true, // Extract CSS to a separate file
      minimize: true, // Minify CSS in production
      sourceMap: true, // Generate source maps for CSS
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: ['@babel/preset-react', '@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
    }),
    svgr(), // Convert SVG files to React components
    replace({
      preventAssignment: true,
      values: {
        'this && this.__assign': 'this.__assign', // Replace specific code pattern
      },
    }),
  ],
  onwarn: (warning, warn) => {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
};
