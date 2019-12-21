const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: isProduction() ? 'production' : 'development',
  target: 'electron-main',
  devtool: isProduction() ? 'none' : 'cheap-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.node'],
  },
  entry: './src/index.ts',
  externals: {
    atom: 'atom',
    remote: 'remote'
  },
  node: {
    __dirname: false
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    publicPath: '',
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],
};

function isProduction() {
  return process.env.NODE_ENV === 'production';
}
