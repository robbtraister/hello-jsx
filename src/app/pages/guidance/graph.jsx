'use strict'

import React, { PureComponent } from 'react'
import * as d3 from 'd3'

// const data = [5, 2, 6, 2, 7, 8, 3, 9]

class Graph extends PureComponent {
  constructor (props) {
    super(props)

    this.height = this.props.height || 300
    this.width = this.props.width || 400

    this.svg = React.createRef()
  }

  componentDidMount () {
    this.draw()
  }

  draw () {
    const { data } = this.props
    const count = data.length

    const x = d3.scaleLinear().domain([0, count - 1]).range([20, this.width - 20])
    const y = d3.scaleLinear().domain([0, Math.max(...data) * 1.1]).range([this.height - 20, 20])

    const svg = d3.select(this.svg.current)

    const lineData = d3.line()
      .x((d, i) => x(i))
      .y((d, i) => y(d))

    svg.select('.line')
      .datum([...new Array(count)].map(() => 0))
      .attr('d', lineData)
      .datum(data)
      .transition()
      .duration(800)
      .attr('d', lineData)

    const areaData = d3.area()
      .x((d, i) => x(i))
      .y1((d, i) => y(d))
      .y0(y(0))

    svg.select('.area')
      .datum([...new Array(count)].map(() => 0))
      .attr('d', areaData)
      .datum(data)
      .transition()
      .duration(800)
      .attr('d', areaData)
  }

  render () {
    return (
      <svg
        width={this.width}
        height={this.height}
        viewBox={`0 0 ${this.width} ${this.height}`}
        ref={this.svg}
      >
        <path d='M5,5h390v290h-390z' stroke='#000' fill='none' />
        <path className='area' stroke='none' fill='#bfa' />
        <path className='line' stroke='#0a0' strokeWidth='5' fill='none' />
      </svg>
    )
  }
}

export default Graph
