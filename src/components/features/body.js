'use strict'

import React from 'react'

import { useTheme } from '../contexts/theme'

const themes = {
  dark: { backgroundColor: '#000', color: '#fff' },
  light: { backgroundColor: '#fff', color: '#000' }
}

const Body = (props) => {
  const theme = useTheme()
  return <div style={themes[theme]}>
    This is an article
  </div>
}

export default Body
