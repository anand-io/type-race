/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const debug = process.env.NODE_ENV !== 'production';
const dir = dest => path.resolve(__dirname, dest);

const plugins = [new WebpackNotifierPlugin({ alwaysNotify: true })];
if (!debug) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true, sourcemap: false, comments: false,
    })
  );
}

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-cheap-source-map' : null,
  entry: './client-src/index.js',
  output: {
    path: dir('./public/javascripts/builds/'),
    filename: '/index.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      }
    ],
  },
  plugins,
};
