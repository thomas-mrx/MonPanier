const commonConfiguration = require('./webpack.common.js');
const path = require('path');
const { merge } = require('webpack-merge');
const BundleTracker = require("webpack-bundle-tracker");

module.exports = merge(commonConfiguration, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './assets',
        hot: true,
        compress: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        port: 9000,
        devMiddleware: {
          writeToDisk: true,
        },
    }
});