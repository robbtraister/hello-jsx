'use strict'

import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from '..'
import Loading from '../_components/loading'

const withLazy = (Component) => {
  const LazyComponent = lazy(Component)
  return (props) =>
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
}

const Accounts = withLazy(() => import(/* webpackChunkName: "accounts" */ '../accounts'))
const Budget = withLazy(() => import(/* webpackChunkName: "budget" */ '../budget'))
const Guidance = withLazy(() => import(/* webpackChunkName: "guidance" */ '../guidance'))
const Home = withLazy(() => import(/* webpackChunkName: "home" */ '../home'))
const Score = withLazy(() => import(/* webpackChunkName: "score" */ '../score'))

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
