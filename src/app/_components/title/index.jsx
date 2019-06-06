'use strict'

import React from 'react'
// import styled from 'styled-components'

// const Title = styled.div`
//   color: #444;
//   font-size: 20px;
//   font-weight: bold;
//   text-align: center;
//   text-transform: uppercase;
//   width: 100%;
// `

import styles from './styles.scss'
import styled from '../../_utils/styled'

const Title = styled.div(styles.title)

export default (props) => <Title {...props} />
