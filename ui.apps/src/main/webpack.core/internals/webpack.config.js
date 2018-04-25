/**
 * Basic configuration for Webpack, see https://webpack.js.org/configuration/.
 * Don't touch is file if you want to stick with the standard.
 * Use the configuration file in the webpack.project folder.
 */

const webpack = require('webpack');
const path = require('path');

// Using `webpack-merge` we avoid issues with `ExtractTextPlugin` on
// entries defined in a file outside of the Webpack folder.
const mergeWebpack = require('webpack-merge');
const CONFIG = require('./../../webpack.project');

// Webpack v4: `MiniCssExtractPlugin` replaces `ExtractTextPlugin` and is specific to CSS
// https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractCSS = new MiniCssExtractPlugin({
  filename: '[name].bundle.css',
});

const NODE_MODULES = path.join(__dirname, '../node_modules');
const IS_PROD = (process.env.NODE_ENV === 'production');

const WEBPACK_DEFAULT = {
  // Webpack v4 requires `mode` to be set
  mode: IS_PROD ? 'production' : 'development',
  stats: {
    children: false
  },
  // Entries are required
  entry: CONFIG.webpack.entry,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        // Webpack v4: `query` replaces `options`
        query: require('./babel.config.js'),
      }, {
        loader: 'eslint-loader',
        query: {
          configFile: path.resolve(__dirname, './eslint.config.js'),
          // This option makes ESLint automatically fix minor issues
          fix: !IS_PROD,
        },
      }],
    }, {
      // The "?" allows you use both file formats: .css and .scss
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
              plugins.push(require('autoprefixer')({
                // Options: https://github.com/postcss/autoprefixer#options
                browsers: [
                  '> 1%',
                  'last 3 versions',
                  'ie 10',
                ],
              }));

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

module.exports = mergeWebpack(WEBPACK_DEFAULT, CONFIG.webpack);
