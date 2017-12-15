/**
 * Basic configuration for Webpack 2, see https://webpack.js.org/configuration/.
 * Don't touch is file you want to stick with the standard.
 */

const webpack = require('webpack');
const path = require('path');

// Using `webpack-merge` we avoid issues with `ExtractTextPlugin` on
// entries defined in a file outside of the Webpack folder.
const mergeWebpack = require('webpack-merge');
const CONFIG = require('./../../webpack.project');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
  // `allChunks` must be true because we're using `.extract()` and otherwise
  // `extract-text-webpack-plugin` would run twice.
  allChunks: true,
  filename: '[name].bundle.css',
});

const NODE_MODULES = path.join(__dirname, '../node_modules');
const IS_PROD = (process.env.NODE_ENV === 'production');

const WEBPACK_DEFAULT = {
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
        options: {
          extends : path.resolve(__dirname, '../.babelrc'),
        },
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
}

module.exports = mergeWebpack(WEBPACK_DEFAULT, CONFIG.webpack);
