'use strict'

import React from 'react'

import Dark from '../components/layouts/dark'
import Header from '../components/features/header'
import Body from '../components/features/body'

window.Fusion = window.Fusion || {}
window.Fusion.App = (props) =>
  <Dark>
    <Header />
    <Body />
  </Dark>
