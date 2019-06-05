'use strict'

const path = require('path')

const devtool = 'source-map'

const resolve = {
  extensions: ['.mjsx', '.jsx', '.mjs', '.js', '.json']
}

const rules = [
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

module.exports = [
  {
    devtool,
    entry: {
      client: './src/app/client'
    },
    module: {
      rules
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve('./dist')
    },
    resolve,
    target: 'web'
  },
  {
    devtool,
    entry: {
      server: './src/app/server'
    },
    module: {
      rules
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      path: path.resolve('./dist')
    },
    resolve,
    target: 'node'
  }
]
