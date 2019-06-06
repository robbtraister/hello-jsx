'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import App from '..'

import Accounts from '../accounts'
import Budget from '../budget'
import Guidance from '../guidance'
import Home from '../home'
import Score from '../score'

const pages = {
  accounts: Accounts,
  budget: Budget,
  home: Home,
  guidance: Guidance,
  score: Score
}

ReactDOM.render(
  <HashRouter>
    <App pages={pages} />
  </HashRouter>,
  window.document.getElementById('app')
)
