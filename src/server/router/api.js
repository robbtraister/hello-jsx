'use strict'

const { Router } = require('express')

const router = Router()

const guidance = {
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

const profile = {
  name: 'User',
  address: '123 Fake St'
}

const score = {
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

const txs = [
  {
    account: 'WF',
    title: 'mortgage',
    amount: -2500
  }
]

router.get('/guidance', (req, res, next) => {
  res.send({ guidance })
})

router.get('/profile', (req, res, next) => {
  res.send({ profile })
})

router.get('/score', (req, res, next) => {
  res.send({ score })
})

router.get('/txs', (req, res, next) => {
  res.send({ txs })
})

module.exports = router
