const path = require('path');

/**
 * AEM
 *
 * This configuration is used by different tools, such as Webpack and Jest.
 */
const AEM = {
  projectFolderName: '__appsFolderName__',
  libraryName: 'Project_Component_Library', // This string must represent a valid JavaScript variable name (e.g., don't start with a number, and don't use spaces)
  jcrRoot: path.resolve(__dirname, '../content/jcr_root/'),
};

/**
 * WEBPACK
 */
const WEBPACK = {
  /*
   * Here we can add specify as many entries as we want. One entry results in one output file.
   * The property name ("components") defines how the target file is named, e.g. 'main' results in 'main.bundle.js'.
   * The property's value ("path.resolve...") is the path to an entry file.
   * More details: https://webpack.js.org/concepts/entry-points/
   */
  entry: {
    components: path.resolve(__dirname, './bundles/components.js'),
    // 'other-components': path.resolve(__dirname, './bundles/other-components.js'),
  },
};

/**
 * ESLINT
 *
 * The linting rules defined here are pretty loose, allowing you to integrate the Webpack setup
 * more easily into your existing project. However, we recommend to make the rules more strict –
 * as strict as possible.
 */
const ESLINT = {
  // Optional: Replace `eslint:recommended` with `eslint-config-infield` and run
  // `npm install --save-dev eslint-config-infield eslint` for stricter linting rules
  "extends": "eslint:recommended",

  // If you want to define variables that are available across various processed JavaScript
  // files, define them here. More details: http://eslint.org/docs/user-guide/configuring#specifying-globals
  "globals": {
    "$": true,
    "Granite": true,
  },

  "rules": {
    "no-console": "off",
  },
};

/**
 * JEST
 *
 * You can override or extend JEST, but you don't have to.
 */
const JEST = {};

module.exports = {
  aem: AEM,
  eslint: ESLINT,
  jest: JEST,
  webpack: WEBPACK,
};
