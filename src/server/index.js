#!/usr/bin/env node

'use strict'

const path = require('path')

const express = require('express')

const app = express()

app.use(require('compression')())

app.use('/dist', express.static(path.join(__dirname, '..', '..', 'dist'), { fallthrough: false }))
app.use('/resources', express.static(path.join(__dirname, '..', '..', 'resources'), { fallthrough: false }))

if (/^prod/i.test(process.env.NODE_ENV)) {
  app.use(require('./router'))
} else {
  app.use((req, res, next) => {
    Object.keys(require.cache)
      .filter((mod) => !/\/node_modules\//.test(mod))
      .forEach((mod) => { delete require.cache[mod] })

    require('./router')(req, res, next)
  })
}

const port = process.env.PORT || 8080
app.listen(port, (error) => {
  (error)
    ? console.error(error)
    : console.log(`Listening on port: ${port}`)
})
