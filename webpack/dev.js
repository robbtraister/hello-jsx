'use strict'

module.exports = [].concat(require('.') || [])
  .map((config) => ({
    ...config,
    devtool: 'eval-source-map'
  }))
