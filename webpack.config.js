const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const webpackPort = 3000;
const publicPath = '/';
const buildDir = path.join(__dirname, 'build');
const publicDir = path.join(__dirname, 'public');

module.exports = {
  entry: './src/index.js',
  output: {
    path: buildDir,
    publicPath,
    filename: 'bundle.[fullhash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          filename: 'vendor.[fullhash].js',
        },
      },
    },
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs|cjs)$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'public/image/[path][name][ext]',
        },
      },
      {
        test: /\.(woff2|woff|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'public/font/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', 'jsx', 'mjs', 'cjs'],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(publicDir, 'index.html'),
      favicon: path.join(publicDir, 'favicon.ico'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[fullhash].css',
    }),
    new TerserPlugin({
      extractComments: false,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    port: webpackPort,
    hot: true,
  },
};
