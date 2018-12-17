const CONFIG_WEBPACK = require('./internals/webpack.config.js');

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // Optional: Replace `eslint:recommended` with `eslint-config-infield` and run
  // `npm install --save-dev eslint-config-infield` for stricter linting rules
  extends: "eslint:recommended",
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

  // If you want to define variables that are available across various processed JavaScript
  // files, define them here. More details: http://eslint.org/docs/user-guide/configuring#specifying-globals
  globals: {
    $: true,
    Granite: true,
  },

  rules: {
    "no-console" : 1, // 0 = off, 1 = warn, 2 = error
  }
}
