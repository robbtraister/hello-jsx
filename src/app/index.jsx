'use strict'

import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'

import Footer from './footer'
import Header from './header'
import Loading from './_components/loading'

const withLoading = (Component) => () => <Suspense fallback={<Loading />}><Component /></Suspense>
const Accounts = withLoading(lazy(() => import(/* webpackMode: "lazy" */ './accounts')))
const Budget = withLoading(lazy(() => import(/* webpackMode: "lazy" */ './budget')))
const Home = withLoading(lazy(() => import(/* webpackMode: "lazy" */ './home')))
const Score = withLoading(lazy(() => import(/* webpackMode: "lazy" */ './score')))

const Container = styled.div`
  height: 100%;
`

const Body = styled.div`
  background-color: #09e;
  padding: 20px 0;
`

const Main = styled.div`
  background-color: #fff;
  margin: auto;
  padding: 20px;
  width: 920px;
`

class App extends Component {
  state = {
    Component: 'div'
  }

  setComponent = (Component) => {
    this.setState({ Component })
  }

  render () {
    const { Component } = this.state

    return (
      <BrowserRouter>
        <Container>
          <Header setComponent={this.setComponent} />
          <Body>
            <Main>
              <Route exact path='/' render={() => <Redirect to='/home' />} />
              <Route path='/home' render={Home} />
              <Route path='/score' render={Score} />
              <Route path='/accounts' render={Accounts} />
              <Route path='/budget' render={Budget} />
            </Main>
          </Body>
          <Footer />
        </Container>
      </BrowserRouter>
    )
  }
}

export default App
