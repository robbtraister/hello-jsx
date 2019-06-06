'use strict'

const { Router } = require('express')

const { render } = require('../../dist/server')

const router = Router()

router.use(/.*\.(css|js)$/, (req, res, next) => {
  res.sendStatus(404)
})

router.get('*', (req, res, next) => {
  const context = {}
  const location = req.url

  const html = render({
    // app: location.replace(/^\/+/, '').split('/').shift(),
    context,
    location
  })

  if (context.url) {
    res.redirect(context.url)
  } else {
    res.send(html)
  }
})

module.exports = router
