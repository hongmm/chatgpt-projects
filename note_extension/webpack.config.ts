const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    background: './src/background.ts',
    content: './src/content.tsx',
    popup: './src/popup.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
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