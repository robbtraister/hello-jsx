'use strict'

import React from 'react'

import Loading from '../../components/loading'
import { useStore } from '../../store'

import Graph from './graph'

const Guidance = (props) => {
  const { get } = useStore()

  const guidance = get('guidance')

  return (guidance)
    ? <Graph data={guidance.retirementSavings} />
    : <Loading />
}

export default Guidance
