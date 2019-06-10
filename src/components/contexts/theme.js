'use strict'

import { createContext, useContext } from 'react'

const themeContext = createContext({ theme: 'light' })
const { Consumer, Provider } = themeContext

function useTheme () {
  const { theme } = useContext(themeContext)
  return theme
}

export default themeContext

export {
  Consumer,
  Provider,
  useTheme
}
