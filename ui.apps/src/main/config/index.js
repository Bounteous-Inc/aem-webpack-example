const path = require('path');

const AEM = {
  projectFolderName: '__appsFolderName__',
  libraryName: 'Project_Component_Library', // This string must represent a valid JavaScript variable name (e.g., don't start with a number, and don't use spaces)
  jcrRoot: path.resolve(__dirname, '../content/jcr_root/'),
};

const WEBPACK = {
  /*
   * Here we can add as many bundles files as we want. One entry results in one output file.
   * <id>: Defines how the target file is named, e.g. 'main' results in 'main.bundle.js'.
   * <path>: Defines the path to an entry file. Entry files can use require.context()
   * to search a directory and include multiple files matching a pattern.
   */
  entries: {
    components: path.resolve(__dirname, './bundles/components.js')
  }
}

const ESLINT = {
  // Optional: Replace `eslint:recommended` with `eslint-config-infield` and run `npm install --save-dev eslint-config-infield eslint` for stricter linting rules
  "extends": "eslint:recommended",

  "globals": {
    "$": true,
    "Granite": true
  },

  "rules": {
    "no-console": "off"
  }
};

module.exports = {
  aem: AEM,
  eslint: ESLINT,
  jest: {},
  webpack: WEBPACK,
};
