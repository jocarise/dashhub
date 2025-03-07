const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3010,
      hot: true,
    },
    output: {
      publicPath: 'auto',
      filename: isProduction
        ? '[name].[contenthash].js'
        : 'bundle.[fullhash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      modules: [__dirname, 'src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
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
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: /node_modules/,
          type: 'asset/resource', // Webpack 5: Asset Modules
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        WEATHER_API_URL: JSON.stringify(process.env.WEATHER_API_URL),
        WEATHER_API_KEY: JSON.stringify(process.env.WEATHER_API_KEY),
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new ModuleFederationPlugin({
        name: 'weatherRemote',
        filename: 'remoteEntry.js',
        exposes: {
          './CurrentWeatherWidget': './src/external/CurrentWeatherWidget.tsx',
          './ForecastWeatherWidget': './src/external/ForecastWeatherWidget.tsx',
        },
        shared: {
          '@reduxjs/toolkit': {
            singleton: true,
            strictVersion: false,
            requiredVersion: '2.5.1',
          },
          axios: {
            singleton: true,
            strictVersion: false,
            requiredVersion: '1.7.9',
          },
          react: {
            singleton: true,
            strictVersion: false,
            requiredVersion: '19.0.0',
          },
          'react-dom': {
            singleton: true,
            strictVersion: false,
            requiredVersion: '19.0.0',
          },
          'react-redux': {
            singleton: true,
            strictVersion: false,
            requiredVersion: '9.2.0',
          },
        },
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css', // Extract CSS in production
            }),
          ]
        : []),
    ],
  };
};
