#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')

const express = require('express')

const app = express()

app.use(require('compression')())

app.use(express.static(path.join(__dirname, '..', '..', 'resources')))
app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

app.get('*', (req, res, next) => {
  fs.createReadStream(path.join(__dirname, '..', '..', 'resources', 'index.html')).pipe(res)
})

const port = process.env.PORT || 8080
app.listen(port, (error) => {
  (error)
    ? console.error(error)
    : console.log(`Listening on port: ${port}`)
})
