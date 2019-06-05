'use strict'

const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    // app: './src/app',
    client: './src/client'
  },
  module: {
    rules: [
      {
        test: /\.m?[jt]sx?$/i,
        exclude: /\/node_modules\//,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                '@babel/env',
                '@babel/react'
              ],
              plugins: [
                '@babel/proposal-class-properties',
                '@babel/syntax-dynamic-import'
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve('./dist')
  },
  resolve: {
    extensions: ['.mjsx', '.jsx', '.mjs', '.js', '.json']
  }
}
