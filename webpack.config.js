'use strict'

const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devtool = 'hidden-source-map'

const resolve = {
  extensions: ['.mjsx', '.jsx', '.mjs', '.js', '.json']
}

const sharedRules = [
  {
    test: /\.s[ac]ss$/i,
    use: 'sass-loader'
  },
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
      rules: [
        {
          test: /\.(s[ac]|c)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        },
        ...sharedRules
      ]
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve('./dist')
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css'
      })
    ],
    resolve,
    target: 'web'
  },
  {
    devtool,
    entry: {
      server: './src/app/server'
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
        ...sharedRules
      ]
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
