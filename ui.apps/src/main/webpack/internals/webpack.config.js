/**
 * Basic webpack configuration including Babel loader for preset 'latest'.
 *
 * Configuration for Webpack 2, see https://webpack.js.org/configuration/
 */

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].bundle.css');
const NODE_MODULES = path.join(__dirname, '../node_modules');

const libraryName = 'Project_Component_Library'; // Variable name (no white space)
const outputPath = path.resolve(__dirname, '../../content/jcr_root/etc/designs/webpack.bundles');

/*
 * Here we can add as many entry files as we want. One entry results in one output file.
 * <id>: Defines how the target file is named, e.g. 'main' results in 'main.bundle.js'.
 * <path>: Defines the path to an entry file. Entry files can use require.context()
 * to search a directory and include multiple files matching a pattern.
 */
const entryFiles = [{
  id: 'components',
  path: path.resolve(__dirname, '../bundles/components.js')
}];

// Create separate entry points
const entries = {};
entryFiles.forEach(function (fileData) {
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
          // This option makes ESLint automatically fix minor issues
          fix: true,
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
          loader: 'sass-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('stylelint')({
                fix: true,
              }),
              require('autoprefixer'),
            ],
          },
        }]
      })
    }]
  },
  output: {
    filename: '[name].bundle.js',
    library: libraryName,
    path: outputPath
  },
  plugins: [
    extractCSS,
  ],
  // If your node_modules folder is not in a parent folder of all source files, webpack cannot find the loader. That's shy we have to set an absolute path using the resolveLoader.root option.
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
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
