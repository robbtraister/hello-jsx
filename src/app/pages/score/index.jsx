'use strict'

import React from 'react'
// import styled from 'styled-components'

import Section from './section'
import Loading from '../../components/loading'
import Meter from '../../components/meter'
import { useStore } from '../../store'

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

const Score = (props) => {
  const score = useStore().get('score')

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

export default Score
