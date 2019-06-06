'use strict'

module.exports = [].concat(require('./webpack.config') || [])
  .map((config) => ({
    ...config,
    devtool: 'eval-source-map'
  }))
