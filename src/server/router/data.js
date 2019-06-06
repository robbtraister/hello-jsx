'use strict'

const { Router } = require('express')

const getModel = require('../data')

const router = Router()

router.get('/:table', async (req, res, next) => {
  const data = await getModel(req.params.table).find(req.query)
  res.send({ data })
})

router.get('/:table/:id', async (req, res, next) => {
  const data = await getModel(req.params.table).get(req.params.id)
  res.send({ data })
})

router.post('/:table', async (req, res, next) => {
  const data = await getModel(req.params.table).put(req.query)
  res.send({ data })
})

router.put('/:table/:id', async (req, res, next) => {
  const data = await getModel(req.params.table).put({ ...req.query, _id: req.params.id })
  res.send({ data })
})

router.delete('/:table/:id', async (req, res, next) => {
  const data = await getModel(req.params.table).remove(req.params.id)
  res.send({ data })
})

router.use((req, res, next) => {
  res.sendStatus(405)
})

module.exports = router
