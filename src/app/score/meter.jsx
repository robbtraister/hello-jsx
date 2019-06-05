'use strict'

import React, { PureComponent } from 'react'
import * as d3 from 'd3'

function getRotation (value) {
  return value * 260 - 130
}

class Meter extends PureComponent {
  constructor (props) {
    super(props)

    this.svg = React.createRef()
  }

  componentDidMount () {
    this.animate()
  }

  animate () {
    const svg = d3.select(this.svg.current)
    const value = this.props.score / this.props.total
    svg.select('.tick')
      .transition()
      .attrTween('transform', () => (t) => `rotate(${getRotation(value * t)})`)
      .duration(1500)
      .ease(d3.easeBounce)
  }

  render () {
    return (
      <svg
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        width={this.props.size || '200'}
        height={this.props.size || '200'}
        viewBox='-120 -120 240 240'
        ref={this.svg}
      >
        <g transform='rotate(-45)' strokeWidth='16' fill='none'>
          <path d='M-100,0A100,100 0,0,1 0,-100' stroke='#f80' />
          <path d='M0,-100A100,100 0,0,1 100,0' stroke='#ff0' />
          <path d='M100,0A100,100 0,0,1 0,100' stroke='#0f0' />
          <g stroke={this.props.backgroundColor || '#fff'} strokeWidth='5'>
            <path d='M-120,0L120,0' />
            <path d='M0,-120L0,120' />
          </g>
        </g>
        <g fill='#444' textAnchor='middle' alignmentBaseline='middle'>
          <text x='0' y='-20' fontSize='50'>{this.props.score}</text>
          <text x='0' y='5' fontSize='20'>out of</text>
          <text x='0' y='30' fontSize='40'>{this.props.total}</text>
        </g>
        <g className='tick' transform='rotate(-130)' stroke='#fff' strokeWidth='2' fill='#444'>
          <path d='M0,-96l-8,-20h16z' />
        </g>
      </svg>
    )
  }
}

export default Meter
