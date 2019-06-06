'use strict'

import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// import styled from 'styled-components'

import Footer from './_components/footer'
import Header from './_components/header'
import Loading from './_components/loading'
import Title from './_components/title'

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
import styled from './_utils/styled'

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

class App extends Component {
  render () {
    const { pages = {} } = this.props

    const allowed = Object.keys(titles).filter(title => !blocked.includes(title))

    return (
      <Container>
        <Header tabs={allowed} />
        <Body>
          <Main>
            <Switch>
              {
                allowed.map((key) => {
                  const Component = pages[key] || Loading
                  const render = () =>
                    <>
                      <Title>{titles[key]}</Title>
                      <Component />
                    </>

                  return <Route path={`/${key}`} key={`${key}`} render={render} />
                })
              }
              <Route path='/' component={GoHome} />
            </Switch>
          </Main>
        </Body>
        <Footer />
      </Container>
    )
  }
}

export default App
