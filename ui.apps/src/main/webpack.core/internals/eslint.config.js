const merge = require('merge');
const CONFIG = require('../../webpack.project');
const path = require('path');

const ESLINT_DEFAULT = {
  extends: path.resolve(__dirname, '../.eslintrc.js'),
};

module.exports = merge.recursive(true, ESLINT_DEFAULT, CONFIG.eslint);
