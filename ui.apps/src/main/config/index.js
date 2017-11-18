const path = require('path');
const webpackConfig = require('../webpack/internals/webpack.config.js');

const AEM = {
  projectFolderName: '__appsFolderName__',
  libraryName: 'Project_Component_Library', // This string must represent a valid JavaScript variable name (e.g., don't start with a number, and don't use spaces)
  jcrRoot: path.resolve(__dirname, '../content/jcr_root/'),
};

/*
 * Here we can add as many bundles files as we want. One entry results in one output file.
 * <id>: Defines how the target file is named, e.g. 'main' results in 'main.bundle.js'.
 * <path>: Defines the path to an entry file. Entry files can use require.context()
 * to search a directory and include multiple files matching a pattern.
 */
AEM.entries = [{
  id: 'components',
  path: path.resolve(__dirname, './bundles/components.js')
}];

const ESLINT = {
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
};

module.exports = {
  aem: AEM,
  eslint: ESLINT,
};
