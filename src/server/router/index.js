'use strict'

const { Router } = require('express')

const router = Router()

router.use(/.*\.(css|ico|js)$/, (req, res, next) => {
  res.sendStatus(404)
})

router.use(require('./render'))

module.exports = router
