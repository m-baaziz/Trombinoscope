var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/containers/Root.react.js'
  ],
  output: { path: __dirname, filename: '../app/assets/javascript/.bundle.js' },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.less$/,
      loader: "style!css!less"
    }
    ]
  }
};