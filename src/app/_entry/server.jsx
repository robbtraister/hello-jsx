'use strict'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'

import App from '..'

function Page (props) {
  const { context = {}, location, page, ...appProps } = props || {}
  return (
    <html>
      <head>
        <title>Hello JSX</title>
        <link rel='stylesheet' type='text/css' href='/resources/main.css' />
        <link rel='stylesheet' type='text/css' href='/dist/client.css' />
        <script type='application/javascript' src='/dist/client.js' defer='defer' />
        <dynamic-styles />
        <link rel='icon' type='image/png' href='/resources/icon.png' />
      </head>
      <body>
        <div id='app'>
          <StaticRouter context={context} location={location} >
            <App {...appProps} />
          </StaticRouter>
        </div>
      </body>
    </html>
  )
}

function render (props) {
  const sheet = new ServerStyleSheet()
  try {
    const html = ReactDOM.renderToStaticMarkup(
      sheet.collectStyles(<Page {...props} />)
    )
    return html
      .replace(
        /<dynamic-styles><\/dynamic-styles>/g,
        sheet.getStyleTags()
      )
  } finally {
    sheet.seal()
  }
}

export {
  Page,
  render
}
