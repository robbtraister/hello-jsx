'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import App from '../app'

function render () {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}

window.document.addEventListener('DOMContentLoaded', render)
// window.document.body.onload = render
