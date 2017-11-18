/**
 * Basic configuration for Webpack 2, see https://webpack.js.org/configuration/.
 * Don't touch is file you want to stick with the standard.
 */

const webpack = require('webpack');
const path = require('path');

const CONFIG = require(path.resolve(__dirname, '../../config'));

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].bundle.css');
const NODE_MODULES = path.join(__dirname, '../node_modules');

const IS_PROD = (process.env.NODE_ENV === 'production');

// Create separate entry points
const entries = {};
CONFIG.aem.entries.forEach(function (fileData) {
  entries[fileData.id] = fileData.path;
});

module.exports = {
  entry: entries,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'eslint-loader',
        options: {
          configFile: path.resolve(__dirname, './eslint.config.js'),
          // This option makes ESLint automatically fix minor issues
          fix: !IS_PROD,
        },
      }],
    }, {
      // The "?" allows you use both file formats: .css and .scss
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => {
              const plugins = [
                require('autoprefixer')
              ];

              if (!IS_PROD) {
                plugins.push(require('stylelint')({
                  fix: true,
                }))
              }

              return plugins;
            },
          },
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              CONFIG.aem.jcrRoot + '/apps/' + CONFIG.aem.projectFolderName + '/components/webpack.resolve/'
            ],
          },
        }]
      })
    }]
  },
  output: {
    filename: '[name].bundle.js',
    library: CONFIG.aem.componentLibraryName,
    path: CONFIG.aem.jcrRoot + '/apps/' + CONFIG.aem.projectFolderName + '/clientlibs/webpack.bundles',
  },
  plugins: [
    extractCSS,
  ],
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      CONFIG.aem.jcrRoot + '/apps/' + CONFIG.aem.projectFolderName + '/components/webpack.resolve/',
      NODE_MODULES
    ]
  },
  watchOptions: {
    ignored: [
      /node_modules/,
      '**/*.bundle.css',
      '**/*.bundle.js',
      '**/*.html',
      '**/*.xml'
    ]
  }
}
