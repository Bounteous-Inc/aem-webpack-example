const path = require('path');

const CONFIG = require('./../../webpack.project');

CONFIG.webpack.extends = path.join(__dirname, './webpack.config.base.js');

module.exports = CONFIG.webpack;
