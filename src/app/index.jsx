'use strict'

import React, { Component, Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
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
  accounts: 'Accounts',
  budget: 'Budget'
}

class App extends Component {
  render () {
    const { pages = {} } = this.props

    return (
      <Container className={styles.container}>
        <Header tabs={Object.keys(titles)} />
        <Body className={styles.body}>
          <Main className={styles.main}>
            <Route exact path='/' render={() => <Redirect to='/home' />} />
            {
              Object.keys(titles)
                .map((key) =>
                  <Fragment key={key}>
                    <Route path={`/${key}`} key={`${key}-title`} render={() => <Title>{titles[key]}</Title>} />
                    <Route path={`/${key}`} key={key} component={pages[key] || Loading} />
                  </Fragment>
                )
            }
          </Main>
        </Body>
        <Footer />
      </Container>
    )
  }
}

export default App
