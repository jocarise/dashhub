const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const dotenv = require('dotenv');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

dotenv.config();

module.exports = (env = {}, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index',
    mode: isProduction ? 'production' : 'development',
    devServer: {
      static: {
        directory: path.join(__dirname),
      },
      compress: true,
      port: 3020,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
    },
    cache: isProduction, // Enable caching in production for better builds
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map', // Use different devtools for production and dev
    optimization: {
      minimize: isProduction,
      minimizer: [new CssMinimizerPlugin()],
    },
    target: 'web',
    output: {
      publicPath: 'auto',
      filename: isProduction
        ? '[name].[contenthash].js'
        : 'bundle.[fullhash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.vue', '.jsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: 'asset/resource', // Webpack 5: Asset Modules for images
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: !isProduction,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: !isProduction,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: !isProduction,
        generateStatsFile: true,
        // Excludes module sources from stats file so there won't be any sensitive data
        statsOptions: { source: false },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html'),
      }),
      new VueLoaderPlugin(),
      new ModuleFederationPlugin({
        name: 'newsRemote',
        filename: 'remoteEntry.js',
        exposes: {
          './NewsWidget': './src/external/NewsWidget',
        },
        shared: {
          vue: {
            singleton: true,
            strictVersion: false,
            requiredVersion: '3.5.13',
          },
        },
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css', // Extracted CSS in production
            }),
          ]
        : []),
    ],
  };
};
