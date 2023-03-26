const commonConfiguration = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const BundleTracker = require("webpack-bundle-tracker");

module.exports = merge(commonConfiguration, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ parallel: true })
        ]
    }
});