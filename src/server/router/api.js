'use strict'

const { Router } = require('express')

const router = Router()

router.get('/guidance', (req, res, next) => {
  res.send({
    guidance: {
      retirementSavings: [
        50000,
        55000,
        60000,
        80000,
        120000,
        150000,
        200000
      ]
    }
  })
})

router.get('/score', (req, res, next) => {
  res.send({
    score: {
      value: 84,
      sections: [
        {
          title: 'Spend Less Than You Earn',
          value: 5,
          total: 10
        },
        {
          title: 'Emergency Savings',
          value: 8,
          total: 12
        },
        {
          title: 'Credit Card Balance',
          value: 3,
          total: 7
        }
      ]
    }
  })
})

module.exports = router
