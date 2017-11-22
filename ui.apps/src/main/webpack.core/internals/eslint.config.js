const merge = require('merge');
const CONFIG = require('./../../webpack.project');
const CONFIG_WEBPACK = require('./webpack.config.js');

const ESLINT_DEFAULT = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  settings: {
    // This prevents `no-unused-vars` and `import/no-unresolved` from being thrown
    // when modules are imported that are defined in Webpack but not correctly
    // resolved by `eslint-plugin-import`. Note that `eslint-plugin-import` can
    // be defined directly in this project's package.json but it can also be an
    // dependency of an extended ESLint configuration.
    'import/resolver': {
      node: {
        paths: (CONFIG_WEBPACK.resolve && CONFIG_WEBPACK.resolve.modules) || [],
      },
    },
  },
};

module.exports = merge.recursive(true, ESLINT_DEFAULT, CONFIG.eslint);
