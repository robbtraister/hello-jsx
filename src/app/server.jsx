'use strict'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'

import App from '.'

function render (props) {
  const sheet = new ServerStyleSheet()
  try {
    const html = ReactDOM.renderToStaticMarkup(
      sheet.collectStyles(
        <html>
          <head>
            <title>Hello JSX</title>
            <link rel='stylesheet' type='text/css' href='/main.css' />
            <dynamic-styles />
            <script type='application/javascript' src='/client.js' defer='defer' />
            {/* <script type='application/javascript' src={`/${props.app}.js`} defer='defer' /> */}
          </head>
          <body>
            <div id='app'>
              <StaticRouter {...props} >
                <App />
              </StaticRouter>
            </div>
          </body>
        </html>
      )
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

export { render }
