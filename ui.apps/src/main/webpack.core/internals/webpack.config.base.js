/**
 * Base configuration for AEM Webpack.
 * How to configure Webpack: https://webpack.js.org/configuration/.
 * Don't touch is file if you want to stick with the standard.
 * Use the configuration file in the webpack.project folder.
 */

const webpack = require('webpack');
const path = require('path');

const CONFIG = require('./../../webpack.project');

// Webpack v4: `MiniCssExtractPlugin` replaces `ExtractTextPlugin` and is specific to CSS
// https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractCSS = new MiniCssExtractPlugin({
  filename: '[name].bundle.css',
});

const NODE_MODULES = path.join(__dirname, '../node_modules');
const IS_PROD = (process.env.NODE_ENV === 'production');

const WEBPACK_CONFIG_BASE = {
  name: 'base',
  mode: IS_PROD ? 'production' : 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        query: require('./babel.config.js'),
      }, {
        loader: 'eslint-loader',
        query: {
          configFile: path.resolve(__dirname, './eslint.config.js'),
          // This option makes ESLint automatically fix minor issues
          fix: !IS_PROD,
          formatter: function(results) {
            if (!IS_PROD) {
              const output = require('eslint/lib/formatters/stylish')(results);
              // WORKAROUND because webpack-command's formatter doesn't format ESLint & Stylelint
              // errors well. Similar to https://github.com/webpack-contrib/webpack-stylish/issues/22
              console.log(output);
            }

            return '';
          },
        },
      }],
    }, {
      // The "?" allows you to use both file formats: .css and .scss
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          query: {
            plugins: (loader) => {
              const plugins = [];

              if (!IS_PROD) {
                plugins.push(require('stylelint')({
                  configFile: path.resolve(__dirname, './stylelint.config.js'),
                  fix: true,
                }));

                plugins.push(require('postcss-reporter'));
              }

              // Load Autoprefixer AFTER Stylelint to avoid failing on Stylelint's prefix rules
              plugins.push(require('autoprefixer'));

              return plugins;
            },
          },
        }, {
          loader: 'sass-loader',
          query: {
            includePaths: [
              CONFIG.aem.jcrRoot + '/apps/' + CONFIG.aem.projectFolderName + '/components/webpack.resolve/'
            ],
          },
        }
      ]
    }]
  },
  output: {
    filename: '[name].bundle.js',
    // We reduce the probability of getting an "Unexpected token" error from UglifyJS
    // Background: The library name must represent a valid JavaScript variable name (e.g., don't start with a number, and don't use spaces)
    library: CONFIG.aem.libraryName.replace(/[\s-]/, '_'),
    path: CONFIG.aem.jcrRoot + '/apps/' + CONFIG.aem.projectFolderName + '/clientlibs/webpack.bundles',
  },
  plugins: [
    extractCSS,
  ],
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      CONFIG.aem.jcrRoot + '/apps/' + CONFIG.aem.projectFolderName + '/components/webpack.resolve/',
      NODE_MODULES,
    ]
  },
  watchOptions: {
    ignored: [
      /node_modules/,
      '**/*.bundle.css',
      '**/*.bundle.js',
      '**/*.html',
      '**/*.xml',
    ],
  },
};

module.exports = WEBPACK_CONFIG_BASE;
