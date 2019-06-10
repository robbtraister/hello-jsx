'use strict'

const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const entryPath = path.join(__dirname, '../compile/template')

/* eslint-disable */
require.extensions['.jsx'] = require.extensions['.js']
const entryResolved = require.resolve(entryPath)
/* eslint-enable */

module.exports = [
  {
    ...require('./_shared/devtool'),
    ...require('./_shared/resolve'),
    entry: {
      'templates/article': entryPath
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM'
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
                ...require('../babel.config')
              }
            }
          ]
        },
        {
          test: /\.m?[jt]sx?$/i,
          exclude: entryResolved,
          use: [
            {
              loader: require.resolve('./loaders/ignore-loader')
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
      },
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          components: {
            test: /[\\/]src[\\/]components[\\/]/,
            enforce: true,
            name (mod) {
              const match = /[\\/]src[\\/]components[\\/]([^\\/.]+)[\\/]([^\\/.]+)/.exec(mod.resource || mod.context)
              return `components/${match[1]}/${match[2]}`
            }
          }
        }
      }
    },
    output: {
      filename: 'dist/[name].js',
      chunkFilename: 'dist/[name].js',
      path: path.resolve('./dist/junk'),
      publicPath: '/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'dist/[name].css',
        chunkFilename: 'dist/[name].css'
      })
    ],
    target: 'web'
  }
]
