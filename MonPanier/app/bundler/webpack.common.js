const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  entry: '../src/index',
  module: {
    rules: [
     {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve('../../dist/'),
    publicPath: '/static/',
    filename: "[name]-[fullhash].js"
  },
  plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
         patterns: [
            { from: '../assets' }
         ]
      }),
      new webpack.EnvironmentPlugin(['SCANDIT_LICENSE_KEY']),
      new BundleTracker({filename: './webpack-stats.json'})
  ]
}