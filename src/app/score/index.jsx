'use strict'

import React, { PureComponent } from 'react'
// import styled from 'styled-components'

import Section from './section'
import Meter from './meter'

// const Left = styled.div`
//   display: inline-block;
//   width: 220px;
// `

// const Main = styled.div`
//   display: inline-block;
// `

import styles from './styles.scss'
import styled from '../_utils/styled'

const Left = styled.div(styles.left)
const Main = styled.div(styles.main)

const sections = [
  {
    title: 'Spend Less Than You Earn'
  },
  {
    title: 'Emergency Savings'
  },
  {
    title: 'Credit Card Balance'
  }
]

class Score extends PureComponent {
  render () {
    return <>
      <div>
        <Left>
          <Meter score='84' total='100' banner={{ color: '#a0f', tails: true, text: 'Wellness Score' }} />
        </Left>
        <Main>
          { sections.map(section => <Section key={section.title} {...section} />) }
        </Main>
      </div>
    </>
  }
}

export default Score
