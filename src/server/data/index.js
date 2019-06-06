'use strict'

const mongoUrl = process.env.MONGO_URL

const dao = require('./dao')

function getTable (table) {
  const { getModel } = dao(mongoUrl)

  return getModel(table)
}

module.exports = getTable
