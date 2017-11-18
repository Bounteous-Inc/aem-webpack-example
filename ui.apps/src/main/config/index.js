const webpackConfig = require('../webpack/internals/webpack.config.js');

module.exports = {
  eslint: {
    "extends": "eslint:recommended",
    // Optional: Replace `eslint:recommended` with `eslint-config-infield` and run `npm install --save-dev eslint-config-infield eslint` for stricter linting rules
    "env": {
      "browser": true,
      "es6": true,
      "node": true
    },
    settings: {
      // This prevents `no-unused-vars` and `import/no-unresolved` from being thrown
      // when modules are imported that are defined in Webpack but not correctly
      // resolved by `eslint-plugin-import`. Note that `eslint-plugin-import` can
      // be defined directly in this project's package.json but it can also be an
      // dependency of an extended ESLint configuration.
      'import/resolver': {
        node: {
          paths: (webpackConfig.resolve && webpackConfig.resolve.modules) || [],
        },
      },
    },
    "globals": {
      "$": true,
      "Granite": true
    },
    "parserOptions": {
      "ecmaVersion": 8,
      "sourceType": "module"
    },
    "rules": {
      "no-console": "off"
    }
  }
};
