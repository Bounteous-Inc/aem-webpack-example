const path = require('path');

/**
 * AEM
 *
 * This configuration is used by different tools, such as Webpack and Jest.
 */
const AEM = {
  projectFolderName: '__appsFolderName__',
  libraryName: 'Project_Component_Library',
  jcrRoot: path.resolve(__dirname, '../content/jcr_root/'),
};

/**
 * WEBPACK
 */
const WEBPACK = {
  /**
   * Optional: You can base this config on another Webpack config.
   * More details: https://github.com/webpack-contrib/config-loader/blob/master/docs/EXTENDS.md
   * NOTE: We haven't thoroughly tested this feature yet.
   * It's unclear how other Webpack configs will behave when combined with our base configuration.
   */
  // extends: [
  //   path.join(__dirname, '../webpack.config.shared.js'),
  // ],

  /*
   * Here we can add specify as many entries as we want. One entry results in one output file.
   * The property name ("components") defines how the target file is named, e.g. 'main' results in 'main.bundle.js'.
   * The property's value ("path.resolve...") is the path to an entry file.
   * More details: https://webpack.js.org/concepts/entry-points/
   */
  entry: {
    components: path.resolve(__dirname, './entries/components.js'),
    // 'other-components': path.resolve(__dirname, './entries/other-components.js'),
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
  // `npm install --save-dev eslint-config-infield` for stricter linting rules
  extends: "eslint:recommended",

  // If you want to define variables that are available across various processed JavaScript
  // files, define them here. More details: http://eslint.org/docs/user-guide/configuring#specifying-globals
  globals: {
    $: true,
    Granite: true,
  },

  rules: {
    "no-console": "off",
    options: {
      emitError: true,
      emitWarning: true
    }
  },
};

/**
 * STYLELINT
 */
const STYLELINT = {
  // Optional: Base you configuration on a different one such as `stylelint-config-infield`
  // and run `npm install --save-dev stylelint-config-infield`

  // extends: "stylelint-config-infield",
  rules: {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": ["always", {
      "ignore": ["after-comment"]
    }],
    "declaration-colon-space-after": "always",
    indentation: ["tab", {
      except: ["value"]
    }],
    "max-empty-lines": 2,
    "rule-empty-line-before": ["always", {
      except: ["first-nested"],
      ignore: ["after-comment"]
    }],
    "unit-whitelist": ["px", "em", "rem", "%", "s"],
  },
};

/**
 * BABEL
 *
 * You can override or extend the default BABEL configuration using options from
 * https://babeljs.io/docs/usage/api/#options
 */
const BABEL = {
  // You can set a path to your project-specific .babelrc file as follows:
  // extends: path.resolve(__dirname, '../.babelrc'),
};

/**
 * JEST
 *
 * You can override or extend JEST, but you don't have to.
 */
const JEST = {};

module.exports = {
  aem: AEM,
  babel: BABEL,
  eslint: ESLINT,
  jest: JEST,
  stylelint: STYLELINT,
  webpack: WEBPACK,
};
