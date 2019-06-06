'use strict'

import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from '..'
import Loading from '../_components/loading'

const withLoading = (Component) =>
  (props) =>
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>

const Accounts = withLoading(lazy(() => import(/* webpackChunkName: "accounts" */ '../accounts')))
const Budget = withLoading(lazy(() => import(/* webpackChunkName: "budget" */ '../budget')))
const Guidance = withLoading(lazy(() => import(/* webpackChunkName: "guidance" */ '../guidance')))
const Home = withLoading(lazy(() => import(/* webpackChunkName: "home" */ '../home')))
const Score = withLoading(lazy(() => import(/* webpackChunkName: "score" */ '../score')))

const pages = {
  accounts: Accounts,
  budget: Budget,
  guidance: Guidance,
  home: Home,
  score: Score
}

function render () {
  ReactDOM.render(
    <BrowserRouter>
      <App pages={pages} />
    </BrowserRouter>,
    window.document.getElementById('app')
  )
}

window.document.addEventListener('DOMContentLoaded', render)
// window.document.body.onload = render
