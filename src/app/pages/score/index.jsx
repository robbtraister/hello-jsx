'use strict'

import React, { PureComponent } from 'react'
// import styled from 'styled-components'

import Section from './section'
import Loading from '../../components/loading'
import Meter from '../../components/meter'

// const Left = styled.div`
//   display: inline-block;
//   width: 220px;
// `

// const Main = styled.div`
//   display: inline-block;
// `

import styles from './styles.scss'
import styled from '../../utils/styled'

const Left = styled.div(styles.left)
const Main = styled.div(styles.main)

class Score extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { score: null }

    if (typeof window !== 'undefined') {
      window.fetch('/api/score')
        .then((resp) => resp.json())
        .then(({ score }) => {
          this.setState({ score })
        })
    }
  }

  render () {
    const { score } = this.state

    return (score)
      ? <>
        <div>
          <Left>
            <Meter value={score.value} total='100' banner={{ color: '#a0f', tails: true, text: 'Wellness Score' }} />
          </Left>
          <Main>
            { score && score.sections && score.sections.map(section => <Section key={section.title} {...section} />) }
          </Main>
        </div>
      </>
      : <Loading />
  }
}

export default Score
