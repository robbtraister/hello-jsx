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
          ...require('./babel.config')
        }
      }
    ]
  }
]

module.exports = [
  {
    devtool,
    entry: {
      client: './src/app/_entry/client',
      electron: './src/app/_entry/electron'
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
    resolve,
    target: 'web'
  },
  {
    devtool,
    entry: {
      server: './src/app/_entry/server'
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
      filename: 'dist/[name].js',
      libraryTarget: 'commonjs2',
      path: path.resolve('.')
    },
    resolve,
    target: 'node'
  }
]
