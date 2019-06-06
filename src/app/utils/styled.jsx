'use strict'

import React from 'react'

const styled = (Component) =>
  (styles) => {
    const StyledComponent = (props) =>
      <Component
        {...props}
        className={
          [styles, props.className]
            .map((c) => c && c.trim())
            .filter((c) => c)
            .join(' ')
        }
      />
    StyledComponent.displayName = `styled(${Component.displayName || Component.name || Component})`
    return StyledComponent
  }

function withStyles (Component, styles) {
  return (arguments.length > 1)
    ? styled(Component)(styles)
    : styled(Component)
}

const tags = [
  'a',
  'b',
  'body',
  'br',
  'div',
  'h1',
  'h2',
  'h3',
  'head',
  'html',
  'hr',
  'iframe',
  'section',
  'span'
]

Object.assign(
  withStyles,
  ...tags
    .map(component => ({ [component]: styled(component) }))
)

export default withStyles
