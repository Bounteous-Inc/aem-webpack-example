const merge = require('merge');
const CONFIG = require('./../../webpack.project');

const STYLELINT_DEFAULT = {};

module.exports = merge.recursive(true, STYLELINT_DEFAULT, CONFIG.stylelint);
