'use strict'

const path = require('path')

module.exports = [
  {
    ...require('./_shared/devtool'),
    ...require('./_shared/resolve'),
    entry: {
      server: './src/_entry/server'
    },
    module: {
      rules: [
        {
          test: /\.(s[ac]|c)ss$/i,
          use: [
            {
              loader: 'css-loader',
              options: {
                exportOnlyLocals: true,
                modules: true
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: 'sass-loader'
        },
        {
          test: /\.m?[jt]sx?$/i,
          exclude: /[\\/]node_modules[\\/]/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                ...require('../babel.config')
              }
            }
          ]
        }
      ]
    },
    output: {
      filename: 'dist/[name].js',
      libraryTarget: 'commonjs2',
      path: path.resolve('.')
    },
    target: 'node'
  }
]
