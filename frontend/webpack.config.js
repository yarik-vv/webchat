'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
var jQuery = require("jquery");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  context: __dirname + '/',

  entry: {
    login :'./login',
    webchat: './webchat/js'
  },

  output: {
    path: __dirname + '/build',
    publicPath: '/js/',
    filename: '[name].js'
  },
  externals: {
    "jquery": "jQuery"
  },

  watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  },

  resolveLoader: {
    modules: ['node_modules'],
    moduleExtensions: ['-loader'],
    extensions: ['.js']
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      include: __dirname + '/',
      use: [{
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      }]
    }],
  },
    
  plugins: [
    //new BundleAnalyzerPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ]
};
  

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  );
};