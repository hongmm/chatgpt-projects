//import path from 'path';
const path = require('path');
//import webpack from 'webpack';
//import HtmlWebpackPlugin from 'html-webpack-plugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');
//import CopyWebpackPlugin from 'copy-webpack-plugin';
const CopyWebpackPlugin = require('copy-webpack-plugin');
//import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './src/index.tsx',
    background: './src/background.tsx',
    content: './src/content.tsx',
    popup: './src/popup.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    path: __dirname + '/public'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public', to: '.' },
        { from: './src/background.js', to: '.' },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = config;



// Original
// import * as path from 'path';
// import * as webpack from 'webpack';
// // in case you run into any typescript error when configuring `devServer`
// import 'webpack-dev-server';

// const config: webpack.Configuration = {
//   mode: 'production',
//   entry: {
//     main: './src/main.ts',
//     background: './src/background.ts',
//     popup: './src/popup.ts',

//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.bundle.js',
//   },
//   module: {
//     rules: [
//         {
//             test: /\.tsx?$/,
//             exclude: /node_modules/,
//             use: {
//                 loader: 'babel-loader',
//                 options: {
//                     presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
//                 }
//             }
//         }
//     ]
//   }
// };

// export default config;