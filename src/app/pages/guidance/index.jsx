'use strict'

import React, { PureComponent } from 'react'

import Loading from '../../components/loading'

import Graph from './graph'

class Guidance extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { guidance: null }

    if (typeof window !== 'undefined') {
      window.fetch('/api/guidance')
        .then((resp) => resp.json())
        .then(({ guidance }) => {
          this.setState({ guidance })
        })
    }
  }

  render () {
    return (this.state.guidance)
      ? <Graph data={this.state.guidance.retirementSavings} />
      : <Loading />
  }
}

export default Guidance
