'use strict'

const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
    ...require('./_shared/devtool'),
    ...require('./_shared/resolve'),
    entry: {
      'components/features/body': path.join(__dirname, '../src/components/features/body'),
      'components/features/header': path.join(__dirname, '../src/components/features/header'),
      'components/layouts/dark': path.join(__dirname, '../src/components/layouts/dark')
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM'
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
      },
      splitChunks: {
        chunks: 'all',
        minSize: 0
      }
    },
    output: {
      filename: 'dist/[name].js',
      chunkFilename: 'dist/[name].js',
      path: path.resolve('.'),
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
