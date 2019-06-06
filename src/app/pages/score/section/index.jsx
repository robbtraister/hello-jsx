'use strict'

import React from 'react'

import Meter from '../../../components/meter'
// import styled from 'styled-components'

// const Container = styled.section`
//   background-color: #eec;
// `

import styles from './styles.scss'
import styled from '../../../utils/styled'

const Container = styled.section(styles.section)
const Title = styled.h3(styles.title)

function Section (props) {
  return (
    <Container>
      <Meter {...props} backgroundColor='#eec' size='160' />
      <Title>{props.title}</Title>
    </Container>
  )
}

export default Section
