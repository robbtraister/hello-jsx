'use strict'

import React from 'react'
import ReactDOM from 'react-dom/server'
// import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'

// import App from '../app'

function Page (props) {
  // const { context = {}, location, page, ...appProps } = props || {}
  return (
    <html>
      <head>
        <title>Hello JSX</title>
        <link rel='stylesheet' type='text/css' href='/resources/main.css' />
        {/* <link rel='stylesheet' type='text/css' href='/dist/app.css' /> */}
        {/* <script type='application/javascript' src='/dist/runtime/client.js' defer='defer' /> */}
        {/* <script type='application/javascript' src='/dist/vendors~client.js' defer='defer' /> */}
        {/* <script type='application/javascript' src='/dist/libs.js' defer='defer' /> */}
        <script type='application/javascript' src='/dist/runtime.js' defer='defer' />
        <script type='application/javascript' src='/dist/engine.js' defer='defer' />
        <script type='application/javascript' src='/dist/templates/article.js' defer='defer' />
        <dynamic-styles />
        <link rel='icon' type='image/png' href='/resources/icon.png' />
      </head>
      <body>
        <div id='app' />
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
