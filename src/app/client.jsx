'use strict'

import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'

import App from '.'

import Loading from './_components/loading'

const withLoading = (Component) => () => <Suspense fallback={<Loading />}><Component /></Suspense>
const Accounts = withLoading(lazy(() => import(/* webpackChunkName: "accounts" */ './accounts')))
const Budget = withLoading(lazy(() => import(/* webpackChunkName: "budget" */ './budget')))
const Home = withLoading(lazy(() => import(/* webpackChunkName: "home" */ './home')))
const Score = withLoading(lazy(() => import(/* webpackChunkName: "score" */ './score')))

const components = {
  home: Home,
  score: Score,
  accounts: Accounts,
  budget: Budget
}

function render () {
  ReactDOM.render(
    <App components={components} />,
    document.getElementById('app')
  )
}

window.document.addEventListener('DOMContentLoaded', render)
// window.document.body.onload = render
