'use strict'

import React, { createContext, PureComponent, useContext } from 'react'

const METHOD_SYMBOL = Symbol('store-methods')

const context = createContext({
  guidance: null,
  profile: null,
  score: null,

  [METHOD_SYMBOL]: {
    fetch: () => null,
    get: () => null,
    put: () => undefined
  }
})

const isClient = (typeof window !== 'undefined')

class Store extends PureComponent {
  constructor (props) {
    super(props)

    const fetch = (isClient)
      ? (field) => {
        return window.fetch(`/api/${field}`)
          .then((resp) => resp.json())
          .then((data) => {
            this.setState({ [field]: data[field] })
          })
          .catch(() => {
            this.setState({ [field]: undefined })
          })
      }
      : () => null

    const get = (isClient)
      ? (field) => {
        if (this.state[field] !== undefined) {
          return (this.state[field] instanceof Promise)
            ? undefined
            : this.state[field]
        }

        this.state[field] = fetch(field)
      }
      : () => null

    const put = (isClient)
      ? (field, doc) => {
        let prevDoc
        this.setState((prevState) => {
          prevDoc = prevState[field]
          return { [field]: doc }
        })

        window.fetch(
          `/api/${field}`,
          {
            method: 'POST',
            body: JSON.stringify(doc)
          }
        )
          .then(() => {
            this.setState({ [field]: doc })
          })
          .catch(() => {
            this.setState({ [field]: prevDoc })
          })
      }
      : () => undefined

    this.state = {
      [METHOD_SYMBOL]: {
        fetch,
        get,
        put
      }
    }
  }

  render () {
    return (
      <context.Provider value={this.state}>
        {this.props.children}
      </context.Provider>
    )
  }
}

const useStore = () => useContext(context)[METHOD_SYMBOL]

export {
  // Consumer,
  Store,
  useStore
}
