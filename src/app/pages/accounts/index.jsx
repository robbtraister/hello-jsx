'use strict'

import React from 'react'

import Transaction from './transaction'
import Loading from '../../components/loading'
import { useStore } from '../../store'

const Accounts = (props) => {
  const { get } = useStore()
  const txs = get('txs')

  return (txs)
    ? <>
      { txs.map((tx, i) => <Transaction key={i} {...tx} />) }
    </>
    : <Loading />
}

export default Accounts
