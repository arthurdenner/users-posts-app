/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { OPEN_BROWSER = false, PORT = 3000 } = process.env;

const cleanPlugin = new CleanWebpackPlugin(['build'], { verbose: false });
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  title: 'Users Posts app',
  template: 'public/index.html',
  filename: 'index.html',
  inject: true,
});

module.exports = function(env, argv) {
  const isDev = argv.mode === 'development';
  const styleLoaders = [
    isDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
    {
      loader: 'typings-for-css-modules-loader',
      options: {
        namedExport: true,
        camelCase: true,
        sourceMap: true,
        modules: true,
        importLoaders: true,
        localIdentName: '[name]__[local]__[hash:base64:4]',
      },
    },
    { loader: 'postcss-loader' },
    { loader: 'less-loader' },
  ];

  return {
    devtool: isDev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    devServer: {
      port: PORT,
      open: OPEN_BROWSER,
      overlay: true,
      hot: true,
      contentBase: path.join(__dirname, 'build/'),
      historyApiFallback: true,
    },
    entry: path.join(__dirname, '/src/index.tsx'),
    module: {
      rules: [
        {
          test: /\.(tsx?)|(js)$/,
          loader: 'babel-loader',
        },
        {
          test: /\.less$/,
          use: styleLoaders,
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.d.ts'],
    },
    output: {
      filename: isDev ? '[name].js' : '[name].[hash].min.js',
      path: path.join(__dirname, '/build'),
      publicPath: '/',
    },
    plugins: [cleanPlugin, HTMLWebpackPluginConfig].concat(
      isDev
        ? [new webpack.HotModuleReplacementPlugin()]
        : [
            new MiniCssExtractPlugin({ filename: 'style.css' }),
            new CopyPlugin([{ from: 'public/_redirects', to: '' }]),
          ]
    ),
  };
};
