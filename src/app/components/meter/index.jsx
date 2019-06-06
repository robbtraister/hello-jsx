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

    const { value } = this.props
    const percent = value / this.props.total

    svg.select('.value')
      .transition()
      .duration(1500)
      .tween('text', function () {
        return function (t) {
          this.textContent = Math.round(value * t)
        }
      })

    svg.select('.tick')
      .transition()
      .duration(1500)
      .ease(d3.easeBounce)
      .attrTween('transform', () => (t) => `rotate(${getRotation(percent * t)})`)
  }

  render () {
    return (
      <svg
        width={this.props.size || '200'}
        height={this.props.size || '200'}
        viewBox='-125 -125 250 250'
        ref={this.svg}
      >
        <g transform='rotate(-45)' strokeWidth='20' fill='none'>
          <path d='M-100,0A100,100 0,0,1 0,-100' stroke='#f80' />
          <path d='M0,-100A100,100 0,0,1 100,0' stroke='#ff0' />
          <path d='M100,0A100,100 0,0,1 0,100' stroke='#0f0' />
          <g stroke={this.props.backgroundColor || '#fff'} strokeWidth='5'>
            <path d='M-125,0L125,0' />
            <path d='M0,-125L0,125' />
          </g>
        </g>
        <g fill='#444' textAnchor='middle' alignmentBaseline='middle'>
          <text x='0' y='-20' fontSize='50' className='value'>0</text>
          <text x='0' y='5' fontSize='20'>out of</text>
          <text x='0' y='30' fontSize='40'>{this.props.total}</text>
        </g>
        {
          this.props.banner &&
          <>
            <g stroke='#fff' strokeWidth='2' fill={this.props.banner.color || '#a0f'}>
              {
                this.props.banner.tails &&
                <>
                  <path d='M-105,50h40v40h-40l15,-20z' />
                  <path d='M105,50h-40v40h40l-15,-20z' />
                </>
              }
              <path d='M-90,60v40h180v-40z' />
            </g>
            <text x='0' y='82' fontSize='18' textAnchor='middle' alignmentBaseline='middle' fill='#fff' style={{ textTransform: 'uppercase', fontWeight: 100 }}>{this.props.banner.text}</text>
          </>
        }
        <g className='tick' transform='rotate(-130)' stroke='#fff' strokeWidth='2' fill='#444'>
          <path d='M0,-80l-16,-40h32z' />
        </g>
      </svg>
    )
  }
}

export default Meter
