const path = require('path');

const CONFIG = require('./../../webpack.project');
const WEBPACK_CONFIG_BASE = path.resolve(__dirname, './webpack.config.base.js');

if (typeof CONFIG.webpack.extends === 'string') {
  // Convert string into array so we can apply our base config
  CONFIG.webpack.extends = [CONFIG.webpack.extends];
}

CONFIG.webpack.extends = CONFIG.webpack.extends || [];
CONFIG.webpack.extends.push(WEBPACK_CONFIG_BASE);

module.exports = CONFIG.webpack;
