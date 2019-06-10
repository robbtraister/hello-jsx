'use strict'

import React from 'react'

import { useTheme } from '../contexts/theme'

const themes = {
  dark: { backgroundColor: '#000', color: '#fff' },
  light: { backgroundColor: '#fff', color: '#000' }
}

const Header = (props) => {
  const theme = useTheme()
  return <h1 style={themes[theme]}>The Washington Post</h1>
}

export default Header
