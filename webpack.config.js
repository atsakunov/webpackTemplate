const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const basePath = __dirname;
// __webpack_public_path__ = 'http://localhost:5000/';

module.exports = {

  entry: './src/index.js',
  output: {
    path: path.join(basePath, 'dist'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    inline: true,
    host: '127.0.0.1',
    port: 5000,
    stats: 'errors-only',
    contentBase: './dist',
    open: true
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',

        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: 'http://localhost:5000/fonts/',
            // postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
          },
        }, ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // Name of file in ./dist/
      template: './src/index.html', // Name of template in ./src
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};