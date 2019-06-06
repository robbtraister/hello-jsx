'use strict'

import React from 'react'

import Meter from '../meter'
// import styled from 'styled-components'

// const Container = styled.section`
//   background-color: #eec;
// `

import styles from './styles.scss'
import styled from '../../_utils/styled'

const Container = styled.section(styles.section)

function Section (props) {
  return (
    <Container>
      <Meter backgroundColor='#eec' size='160' score={Math.floor(Math.random() * 10)} total='10' />
      <h3>{props.title}</h3>
    </Container>
  )
}

export default Section
