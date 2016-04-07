var path = require('path');
var webpack = require('webpack');

module.exports = {
  //devtool: 'source-map',
  devtool: 'eval',
  entry: [
    './src/containers/Root.react.js'
  ],
  output: { path: __dirname, filename: '../app/assets/javascript/bundle.js' },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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