'use strict'

import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  margin: 20px auto;
  text-align: right;
  width: 960px;
`

const Tab = styled(NavLink)`
  border-radius: 3px;
  color: #444;
  cursor: pointer;
  margin-left: 5px;
  padding: 5px 8px;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    background-color: #eec;
  }
  &.active {
    background-color: #fff;
    color: #bb6;
  }
`

function Header (props) {
  return (
    <Container>
      { props.tabs.map((tab) => <Tab key={tab} to={`/${tab}`}>{tab}</Tab>) }
    </Container>
  )
}

export default Header
