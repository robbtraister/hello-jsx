'use strict'

const { Router } = require('express')

const router = Router()

router.get('*', (req, res, next) => {
  const { render } = require('../../../dist/server')

  const context = {}
  const location = req.url
  const pageMatch = /^\/([^/]*)/.exec(location)

  const html = render({
    context,
    location,
    page: pageMatch && pageMatch[1]
  })

  if (context.url) {
    res.redirect(context.url)
  } else {
    res.send(html)
  }
})

module.exports = router
