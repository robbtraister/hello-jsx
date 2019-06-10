'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRouterDOM from 'react-router-dom'

window.React = React
window.ReactDOM = ReactDOM
window.ReactRouterDOM = ReactRouterDOM

window.render = function (App) {
  const element = window.document.getElementById('app')
  if (!element) return

  if (!App) return

  ReactDOM.render(
    App,
    element
  )
}
