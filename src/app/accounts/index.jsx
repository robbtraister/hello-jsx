'use strict'

import React from 'react'

import Title from '../_components/title'

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
      <Title>Accounts</Title>
      { txs.map((tx, i) => <Transaction key={i} {...tx} />)}
    </>
  )
}

export default Accounts
