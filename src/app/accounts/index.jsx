'use strict'

import React from 'react'

import Transaction from './transaction'

const txs = [
  {
    account: 'WF',
    title: 'mortgage',
    amount: -2500
  }
]

function Accounts () {
  return (
    <>
      { txs.map((tx, i) => <Transaction key={i} {...tx} />) }
    </>
  )
}

export default Accounts
