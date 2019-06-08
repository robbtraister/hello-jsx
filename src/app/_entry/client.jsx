'use strict'

import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from '..'
import Loading from '../components/loading'

const withLazy = (Component) => {
  const LazyComponent = lazy(Component)
  return (props) =>
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
}

const Accounts = withLazy(() => import(/* webpackChunkName: "accounts" */ '../pages/accounts'))
const Budget = withLazy(() => import(/* webpackChunkName: "budget" */ '../pages/budget'))
const Guidance = withLazy(() => import(/* webpackChunkName: "guidance" */ '../pages/guidance'))
const Home = withLazy(() => import(/* webpackChunkName: "home" */ '../pages/home'))
const Profile = withLazy(() => import(/* webpackChunkName: "score" */ '../pages/profile'))
const Score = withLazy(() => import(/* webpackChunkName: "score" */ '../pages/score'))

const pages = {
  accounts: Accounts,
  budget: Budget,
  guidance: Guidance,
  home: Home,
  profile: Profile,
  score: Score
}

const Page = (props) =>
  <BrowserRouter>
    <App pages={pages} {...props} />
  </BrowserRouter>

function render (props) {
  ReactDOM.hydrate(
    <Page {...props} />,
    window.document.getElementById('app')
  )
}

window.document.addEventListener('DOMContentLoaded', render)
// window.document.body.onload = render

export { Page }
