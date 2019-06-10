'use strict'

const path = require('path')

module.exports = [
  {
    ...require('./_shared/devtool'),
    ...require('./_shared/resolve'),
    entry: {
      engine: './src/_entry/client'
    },
    module: {
      rules: [
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
    optimization: {
      chunkIds: 'named',
      moduleIds: 'named',
      runtimeChunk: {
        name: 'runtime'
      }
    },
    output: {
      filename: 'dist/[name].js',
      chunkFilename: 'dist/[name].js',
      // library: 'render',
      // libraryTarget: 'window',
      path: path.resolve('.'),
      publicPath: '/'
    },
    target: 'web'
  }
]
