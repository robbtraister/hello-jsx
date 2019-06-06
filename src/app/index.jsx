'use strict'

import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// import styled from 'styled-components'

import Footer from './components/footer'
import Header from './components/header'
import Loading from './components/loading'
import Title from './components/title'

import { Store } from './store'

// const Container = styled.div`
//   height: 100%;
// `

// const Body = styled.div`
//   background-color: #09e;
//   padding: 20px 0;
// `

// const Main = styled.div`
//   background-color: #fff;
//   margin: auto;
//   padding: 20px;
//   width: 920px;
// `

import styles from './styles.scss'
import styled from './utils/styled'

const Container = styled.div(styles.container)
const Body = styled.div(styles.body)
const Main = styled.div(styles.main)

const titles = {
  home: 'Home',
  score: 'Wellness Score',
  guidance: 'Guidance',
  accounts: 'Accounts',
  budget: 'Budget'
}

const GoHome = () => <Redirect to='/home' />

const blocked = [
  // 'guidance'
]

const withTitle = (Page, title) => {
  const Component = Page || Loading
  return () =>
    <>
      <Title>{title}</Title>
      <Component />
    </>
}

class App extends Component {
  render () {
    const { pages = {} } = this.props

    const allowed = Object.keys(titles).filter(title => !blocked.includes(title))

    return (
      <Container>
        <Store>
          <Header tabs={allowed} />
          <Body>
            <Main>
              <Switch>
                {
                  allowed.map((key) => {
                    return <Route path={`/${key}`} key={`${key}`} render={withTitle(pages[key], titles[key])} />
                  })
                }
                <Route path='/profile' component={withTitle(pages.profile, 'Profile')} />
                <Route path='/' component={GoHome} />
              </Switch>
            </Main>
          </Body>
          <Footer />
        </Store>
      </Container>
    )
  }
}

export default App
