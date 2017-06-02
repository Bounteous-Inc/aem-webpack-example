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
      loader: 'babel-loader', // the -loader suffix is no longer optional in Webpack 2 (so you can't use just 'babel')
      options: {
        presets: [
          // 'require.resolve' is a workaround, see https://github.com/babel/babel-loader/issues/166#issuecomment-160866946
          require.resolve('babel-preset-latest')
        ]
      }
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'css-loader?sourceMap'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: extractCSS.extract({
        fallback: 'style-loader?sourceMap',
        use: 'css-loader?importLoaders=1!sass-loader?sourceMap'
        //// We COULD use postcss-loader but that would increase CSS file size significantly
        // loader: 'css-loader?importLoaders=1!postcss-loader?sourceMap=inline!sass-loader?sourceMap'
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
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('postcss-smart-import'),
          require('autoprefixer')
        ],
        context: '/'
      }
    })
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
