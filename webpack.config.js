const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const BowerWebpackPlugin = require("bower-webpack-plugin");
const path = require('path');
module.exports = {

  entry: {
    index: path.resolve('./src/js/index.js')
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./dest/js/'),
    library:['name']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0']
      }
    }
      ]
  },
  watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: NODE_ENV == 'development' ? "inline-module-source-map" : null,
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new BowerWebpackPlugin({
      modulesDirectories: ['src/libraries/bower'],
      manifestFiles: ['bower.json'],
      includes: /.*/,
      excludes: /.*\.less$/
    })
  ]
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}