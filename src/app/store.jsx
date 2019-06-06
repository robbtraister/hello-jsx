'use strict'

import React, { createContext, PureComponent, useContext } from 'react'

const context = createContext({
  guidance: null,
  score: null,
  get: () => null
})

const { Consumer, Provider } = context

class Store extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      get: (field) => {
        if (this.state[field] !== undefined) {
          return (this.state[field] instanceof Promise)
            ? undefined
            : this.state[field]
        }

        if (typeof window !== 'undefined') {
          this.state[field] = window.fetch(`/api/${field}`)
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({ [field]: data[field] })
            })
            .catch(() => {
              this.setState({ [field]: undefined })
            })
        }
      }
    }
  }

  render () {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

const useStore = () => useContext(context)

export {
  Consumer,
  Store,
  useStore
}
