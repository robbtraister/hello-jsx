'use strict'

import React from 'react'

import { Provider } from '../contexts/theme'

const DarkLayout = (props) =>
  <Provider value={{ theme: 'dark' }}>
    {props.children}
  </Provider>

export default DarkLayout
