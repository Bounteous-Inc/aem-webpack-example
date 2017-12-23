const merge = require('merge');
const CONFIG = require('./../../webpack.project');
const path = require('path');

const BABEL_DEFAULT = {
  extends: path.resolve(__dirname, '../.babelrc'),
};

module.exports = merge.recursive(true, BABEL_DEFAULT, CONFIG.babel);
