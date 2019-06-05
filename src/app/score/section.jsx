'use strict'

import React from 'react'
import styled from 'styled-components'

import Meter from './meter'

const Container = styled.section`
  background-color: #eec;
`

function Section (props) {
  return (
    <Container>
      <Meter backgroundColor='#eec' size='160' score='7' total='10' />
      <h3>{props.title}</h3>
    </Container>
  )
}

export default Section
