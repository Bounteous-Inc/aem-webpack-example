const merge = require('merge');
const CONFIG = require('./../../webpack.project');

const JEST_DEFAULT = {
  "roots": [
    CONFIG.aem.jcrRoot,
  ],
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.js$",
  "transform": {
    "^.+\\.js$": "./jest.preprocessor.js"
  },
};

module.exports = merge.recursive(true, JEST_DEFAULT, CONFIG.jest);
