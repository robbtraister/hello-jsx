'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import App from '..'

import Accounts from '../pages/accounts'
import Budget from '../pages/budget'
import Guidance from '../pages/guidance'
import Home from '../pages/home'
import Profile from '../pages/profile'
import Score from '../pages/score'

const pages = {
  accounts: Accounts,
  budget: Budget,
  home: Home,
  guidance: Guidance,
  profile: Profile,
  score: Score
}

ReactDOM.render(
  <HashRouter>
    <App pages={pages} />
  </HashRouter>,
  window.document.getElementById('app')
)
