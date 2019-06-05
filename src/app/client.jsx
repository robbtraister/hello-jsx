'use strict'

import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from '.'

import Loading from './_components/loading'

const withLoading = (Component) =>
  (props) =>
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>

const Accounts = withLoading(lazy(() => import(/* webpackChunkName: "accounts" */ './accounts')))
const Budget = withLoading(lazy(() => import(/* webpackChunkName: "budget" */ './budget')))
const Home = withLoading(lazy(() => import(/* webpackChunkName: "home" */ './home')))
const Score = withLoading(lazy(() => import(/* webpackChunkName: "score" */ './score')))

const pages = {
  home: Home,
  score: Score,
  accounts: Accounts,
  budget: Budget
}

function render () {
  ReactDOM.render(
    <BrowserRouter>
      <App pages={pages} />
    </BrowserRouter>,
    document.getElementById('app')
  )
}

window.document.addEventListener('DOMContentLoaded', render)
// window.document.body.onload = render
